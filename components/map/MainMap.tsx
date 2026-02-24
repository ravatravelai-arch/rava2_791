
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

// کامپوننت مارکر مکان‌های منتخب (پاکسازی شده از Props کلاسترر)
const CuratedMarker = React.memo(({ poi, onClick }: { 
  poi: any, 
  onClick: () => void 
}) => {
  // استفاده از GeoPoint برای اطمینان از صحت مختصات
  const position = useMemo(() => {
    const geo = new GeoPoint(poi.lat, poi.lng);
    return geo.toGoogle();
  }, [poi.lat, poi.lng]);
  
  return (
    <AdvancedMarker 
      position={position} 
      onClick={onClick}
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

// کامپوننت مارکر ردپاها (پاکسازی شده از Props کلاسترر)
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

    // ۱. اگر شهر انتخاب شده، دوربین را به آنجا ببر
    if (cityMode) {
      // مقداردهی اولیه سرویس‌ها
      PlaceService.init();
      
      // دریافت مکان‌های منتخب شهر جدید
      fetchCurated(cityMode);
      
      const center = cityMode === 'Istanbul' 
        ? new GeoPoint(41.0082, 28.9784) 
        : new GeoPoint(25.2048, 55.2708);
        
      map.panTo(center.toGoogle());
      map.setZoom(13);
    }
  }, [cityMode, map, fetchCurated]);

  useEffect(() => {
    // ۲. ردیابی موقعیت کاربر
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
  // استخراج pendingFootprints برای استفاده در فاز ۲ و جلوگیری از باگ‌های رندرینگ
  const { setActivePOI, setFullDetailPOI, setLoadingDetails, nearbyFootprints, pendingFootprints, userLocation } = useMapStore();
  
  const mapRef = useRef<any | null>(null);
  const fetchingRef = useRef<string | null>(null);
  // مدیریت حافظه: ذخیره رفرنس تایمر برای جلوگیری از نشت حافظه
  const fetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // پاکسازی تایمرها هنگام Unmount شدن کامپوننت
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    };
  }, []);

  const visibleCurated = useMemo(() => showCurated ? curatedPlaces : [], [showCurated, curatedPlaces]);

  const handlePoiClick = useCallback(async (event: any) => {
    // جلوگیری از باز شدن InfoWindow پیش‌فرض و سفید گوگل
    event.stop();
    
    const placeId = event.placeId || (event.detail && event.detail.placeId);
    
    if (!placeId || fetchingRef.current === placeId) return;

    fetchingRef.current = placeId;
    setLoadingDetails(true);
    setFullDetailPOI(null);
    
    setActivePOI({ id: placeId, name: "در حال شناسایی...", lat: 0, lng: 0, category: 'loading' } as any);

    try {
      const essentials = await PlaceService.fetchEssentials(placeId);
      const geo = new GeoPoint(essentials.lat || 0, essentials.lng || 0);
      setActivePOI({ ...essentials, id: placeId, lat: geo.lat, lng: geo.lng } as any);
    } catch (err) {
      console.error("[Map] Interaction Error:", err);
      setActivePOI(null);
    } finally {
      setLoadingDetails(false);
      // مدیریت صحیح تایمر با استفاده از ref
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
      fetchTimeoutRef.current = setTimeout(() => { fetchingRef.current = null; }, 500);
    }
  }, [setActivePOI, setFullDetailPOI, setLoadingDetails]);

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
              onClick={() => { setFullDetailPOI(null); setActivePOI(poi); }} 
            />
          ))}

          {/* ترکیب ردپاهای سرور و ردپاهای موقت جلسه جاری */}
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
