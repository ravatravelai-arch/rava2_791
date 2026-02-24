

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Make markers draggable
## Page Summary
## 
When draggability is enabled, users can drag markers on the map using the mouse or the arrow
keys. To make a marker draggable, set the AdvancedMarkerElement.gmpDraggable property to
true.
The following example map shows a draggable marker that displays its updated position when
dragging is finished (the dragend event is fired):
Map data ©2026 GoogleReport a map error
To drag a marker with the keyboard:
- Press the tab key until markers are focused.
- Use the arrow key to move to the desired marker.
2/6/26, 10:48 AMMake markers draggable  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/draggable-markers1/3

- To activate dragging, press Option + Space or Option + Enter (Mac), Alt + Space or Alt + Enter
(Windows).
- Use the arrow keys to move the marker.
- To drop the marker at its new location, press Space or Enter. This will also turn dragging off.
- To turn dragging off and return the marker to its previous position, press Esc.
See the code
TypeScript
## (#typescript)
JavaScript (#javascript)
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
asyncfunctioninitMap(){
// Request needed libraries.
const{Map,InfoWindow}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement}=(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
constinfoWindow=newInfoWindow();
constdraggableMarker=newAdvancedMarkerElement({
position:{lat:37.39094933041195,lng:-122.02503913145092},
gmpDraggable:true,
title:'This marker is draggable.',
## });
mapElement.append(draggableMarker);
draggableMarker.addListener('dragend',(event)=>{
constposition=draggableMarker.positionasgoogle.maps.LatLng;
infoWindow.close();
infoWindow.setContent(
`Pin dropped at: ${position.lat}, ${position.lng}`
## );
infoWindow.open(draggableMarker.map,draggableMarker);
## });
## }
initMap();
2/6/26, 10:48 AMMake markers draggable  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/draggable-markers2/3

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Set descriptive text
To set descriptive text for a marker, which can be read by screen readers, use the
AdvancedMarkerElement.title attribute, as shown here:
When the title attribute is set, the text is visible to screen readers, and will appear when the
mouse hovers over the marker.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-draggable/docs/index.ts#L8-L40)
constmarkerView=newgoogle.maps.marker.AdvancedMarkerElement({
map,
position:{lat:37.4239163,lng:-122.0947209},
title:"Some descriptive text.",
## });
2/6/26, 10:48 AMMake markers draggable  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/draggable-markers3/3