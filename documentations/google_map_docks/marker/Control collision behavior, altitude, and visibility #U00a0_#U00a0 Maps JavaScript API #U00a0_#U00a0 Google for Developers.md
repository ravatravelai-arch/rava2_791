

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Control collision behavior, altitude, and visibility
## Page Summary
## 
Select platform:

## Android (/maps/documentation/android-sdk/advanced-markers/collision-behavior)
iOS (/maps/documentation/ios-sdk/advanced-markers/collision-behavior)
JavaScript (/maps/documentation/javascript/advanced-markers/collision-behavior)
This page shows you how to control the following aspects of Advanced Markers:
Set collision behavior for a marker
Set marker altitude
Control marker visibility by map zoom level
Set collision behavior for a marker
2/6/26, 10:48 AMControl collision behavior, altitude, and visibility  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/collision-behavior1/6

Map data ©2026 GoogleReport a map error
Pick a Collision Behavior
## Required
Collision behavior controls how a marker will display if it collides (overlaps) with another marker.
Collision behavior is only supported on vector maps.
To set collision behavior, set AdvancedMarkerElement.collisionBehavior to one of the following:
REQUIRED: (default) Always display the marker regardless of collision.
OPTIONAL_AND_HIDES_LOWER_PRIORITY Display the marker only if it does not overlap with
other markers. If two markers of this type would overlap, the one with the higher zIndex is
shown. If they have the same zIndex, the one with the lower vertical screen position is
shown.
REQUIRED_AND_HIDES_OPTIONAL Always display the marker regardless of collision, and hide
any OPTIONAL_AND_HIDES_LOWER_PRIORITY markers or labels that would overlap with the
marker.
Note: On raster maps, only marker-to-marker collisions are detected. Marker collisions with basemap labels are
supported only on vector maps.
The following example shows setting collision behavior for a marker:
TypeScript
## (#typescript)
JavaScript (#javascript)
2/6/26, 10:48 AMControl collision behavior, altitude, and visibility  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/collision-behavior2/6

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Set marker altitude
On vector maps, you can set the altitude at which a marker appears. This is useful for making
markers appear correctly in relation to 3D map content. To set the altitude for a marker, specify a
LatLngAltitude as the value for the MarkerView.position option:
constadvancedMarker=newAdvancedMarkerElement({
position:newgoogle.maps.LatLng({lat,lng}),
collisionBehavior:collisionBehavior,
## });
mapElement.appendChild(advancedMarker);
3e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-collision/docs/index.ts#L58-L62)
TypeScript
## (#typescript)
JavaScript (#javascript)
2/6/26, 10:48 AMControl collision behavior, altitude, and visibility  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/collision-behavior3/6

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Control marker visibility by map zoom level
See the markers' visibility change (begin by zooming out):
constpin=newPinElement({
background:'#4b2e83',
borderColor:'#b7a57a',
glyphColor:'#b7a57a',
scale:2.0,
## });
constmarker=newAdvancedMarkerElement({
// Set altitude to 20 meters above the ground.
position:{
lat:47.65170843460547,
lng:-122.30754,
altitude:20,
}asgoogle.maps.LatLngAltitudeLiteral,
## });
marker.append(pin);
mapElement.append(marker);
3e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-altitude/docs/index.ts#L26-L43)
2/6/26, 10:48 AMControl collision behavior, altitude, and visibility  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/collision-behavior4/6

## 
To control the visibility of an Advanced Marker, create a zoom_changed listener, and add a
conditional function to set AdvancedMarkerElement.map to null if the zoom exceeds the specified
level, as shown in the following example:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Next steps
TypeScript
## (#typescript)
JavaScript (#javascript)
mapElement.innerMap.addListener('zoom_changed',()=>{
letzoom=mapElement.innerMap.getZoom();
for(leti=0;i < markers.length;i++){
const{position,minZoom}=markerOptions[i];
markers[i].position=zoom! > minZoom?position:null;
## }
## });
323e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-zoom/docs/index.ts#L50-L56)
2/6/26, 10:48 AMControl collision behavior, altitude, and visibility  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/collision-behavior5/6

Make markers clickable and accessible
## (/maps/documentation/javascript/advanced-markers/accessible-markers)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 10:48 AMControl collision behavior, altitude, and visibility  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/collision-behavior6/6