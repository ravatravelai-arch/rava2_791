
import { APIProvider, Map as GoogleMap, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { useMapStore } from '../../store/useMapStore';
import { useDiscoveryStore } from '../../store/useDiscoveryStore';
import { PlaceService } from '../../services/placeService';
import { GeoPoint } from '../../utils/geoPoint';
import { Footprints as StepIcon, Star } from 'lucide-react';
import { APP_CONFIG } from '../../config';
import { MapControls } from './MapControls';

// کامپوننت مارکر مکان‌های منتخب
// تغییر: اضافه کردن هندلینگ دقیق ایونت برای جلوگیری از انتشار کلیک به نقشه
const CuratedMarker = React.memo(({ poi, onClick }: { 
  poi: any, 
  onClick: (e: google.maps.MapMouseEvent) => void 
}) => {
  const position = useMemo(() => {
    const geo = new GeoPoint(poi.lat, poi.lng);
    return geo.toGoogle();
  }, [poi.lat, poi.lng]);
  
  return (
    <AdvancedMarker 
      position={position} 
      onClick={onClick}
      className="curated-marker-z-index" // کلاس برای مدیریت Z-Index در صورت نیاز
    >
      <div className="relative cursor-pointer transition-transform active:scale-95 group">
        <div className="bg-white p-1 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.6)] border-2 border-yellow-500 group-hover:scale-110 transition-transform">
          <div className="bg-yellow-500 p-2 rounded-full">
             <Star size={18} className="text-black fill-current" />
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[1000] pointer-events-none">
           <span className="text-white text-[9px] font-black">{poi.name}</span>
        </div>
      </div>
    </AdvancedMarker>
  );
});

// کامپوننت مارکر ردپاها
const FootprintMarker = React.memo(({ fp }: { 
  fp: any
}) => {
  const position = useMemo(() => {
    const geo = GeoPoint.fromArray([fp.lat, fp.lng]);
    return geo?.toGoogle() || { lat: 0, lng: 0 };
  }, [fp.lat, fp.lng]);
  
  return (
    <AdvancedMarker 
      position={position}
    >
      <div className={`relative transition-all ${fp.is_verified === false ? 'opacity-40 grayscale-[0.5]' : 'opacity-80'}`}>
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-xl">
          <StepIcon size={14} className={fp.is_verified === false ? 'text-white' : 'text-yellow-500'} />
        </div>
      </div>
    </AdvancedMarker>
  );
});

// کنترل‌کننده هوشمند نقشه (برای تغییر شهر و آپدیت دیتا)
const MapController = () => {
  const map = useMap();
  const cityMode = useUserStore(s => s.cityMode);
  const { fetchCurated } = useDiscoveryStore();
  const { setUserLocation } = useMapStore();

  useEffect(() => {
    if (!map) return;

    if (cityMode) {
      PlaceService.init();
      fetchCurated(cityMode);
      
      const center = cityMode === 'Istanbul' 
        ? new GeoPoint(41.0082, 28.9784) 
        : new GeoPoint(25.2048, 55.2708);
        
      map.panTo(center.toGoogle());
      map.setZoom(13);
    }
  }, [cityMode, map, fetchCurated]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.warn("Geolocation warning:", err),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [setUserLocation]);

  return null;
};

export const MainMap: React.FC = () => {
  const { curatedPlaces, showCurated } = useDiscoveryStore();
  // نکته: pendingFootprints در فاز ۲ به استور اضافه می‌شود. اینجا هندل شده تا undefined نباشد.
  const { setActivePOI, setFullDetailPOI, setLoadingDetails, nearbyFootprints, pendingFootprints, userLocation } = useMapStore();
  
  const fetchingRef = useRef<string | null>(null);
  const fetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    };
  }, []);

  const visibleCurated = useMemo(() => showCurated ? curatedPlaces : [], [showCurated, curatedPlaces]);

  // هندلر کلیک روی مکان‌های خود گوگل
  const handlePoiClick = useCallback(async (event: any) => {
    // حیاتی: جلوگیری از باز شدن پنجره سفید پیش‌فرض گوگل
    if (event.stop) event.stop();
    
    const placeId = event.placeId || (event.detail && event.detail.placeId);
    
    if (!placeId || fetchingRef.current === placeId) return;

    fetchingRef.current = placeId;
    setLoadingDetails(true);
    // وقتی روی مکان جدید کلیک میشه، جزئیات قبلی باید بسته شه
    setFullDetailPOI(null);
    
    // نمایش لودینگ در کارت پایین
    setActivePOI({ id: placeId, name: "در حال شناسایی...", lat: 0, lng: 0, category: 'loading' } as any);

    try {
      const essentials = await PlaceService.fetchEssentials(placeId);
      const geo = new GeoPoint(essentials.lat || 0, essentials.lng || 0);
      setActivePOI({ ...essentials, id: placeId, lat: geo.lat, lng: geo.lng } as any);
    } catch (err) {
      console.error("[Map] Interaction Error:", err);
      // در صورت خطا، POI را نال می‌کنیم تا کاربر گیر نکند
      setActivePOI(null);
    } finally {
      setLoadingDetails(false);
      // پاکسازی تایمر قبلی و تنظیم تایمر جدید برای آزاد کردن قفل فچ
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
      fetchTimeoutRef.current = setTimeout(() => { fetchingRef.current = null; }, 500);
    }
  }, [setActivePOI, setFullDetailPOI, setLoadingDetails]);

  // هندلر کلیک روی مارکرهای اختصاصی (Curated)
  const handleCuratedClick = useCallback((poi: any) => {
    // نکته: AdvancedMarker خودش ایونت را مدیریت می‌کند، اما ما لاجیک بیزنس را اینجا می‌زنیم
    setFullDetailPOI(null);
    setActivePOI(poi);
  }, [setFullDetailPOI, setActivePOI]);

  const userGeo = useMemo(() => GeoPoint.fromArray(userLocation), [userLocation]);

  return (
    <div className="w-full h-full relative map-container">
      <APIProvider apiKey={APP_CONFIG.GOOGLE.MAPS_API_KEY}>
        <GoogleMap
          defaultCenter={{ lat: 41.0082, lng: 28.9784 }}
          defaultZoom={13}
          mapId="8e589146f4837837" 
          disableDefaultUI={true}
          onPoiClick={handlePoiClick}
          className="w-full h-full"
          gestureHandling={'greedy'}
          colorScheme="DARK"
        >
          <MapController />
          
          {visibleCurated.map(poi => (
            <CuratedMarker 
              key={poi.id} 
              poi={poi} 
              onClick={() => handleCuratedClick(poi)} 
            />
          ))}

          {[...nearbyFootprints, ...(pendingFootprints || [])].map(fp => (
            <FootprintMarker 
              key={fp.id} 
              fp={fp} 
            />
          ))}

          {userGeo && (
            <AdvancedMarker position={userGeo.toGoogle()}>
               <div className="relative">
                 <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30" />
                 <div className="relative w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                 </div>
               </div>
            </AdvancedMarker>
          )}

          <MapControls />
        </GoogleMap>
      </APIProvider>
    </div>
  );
};
