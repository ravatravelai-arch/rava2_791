

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Make markers clickable and accessible
## Page Summary
## 
You can make markers more accessible by enabling click event handling, adding descriptive text
for screen readers, and adjusting the marker scale.
When a marker is clickable (or draggable
(/maps/documentation/javascript/advanced-markers/draggable-markers)), it can respond to
keyboard and mouse input.
Text specified in the title option is readable by screen readers, and will display when a user
holds the mouse pointer over the marker.
Increasing the size of markers reduces the precision required to interact with it across all
devices — especially touchscreen devices — and improves accessibility. Default markers
meet the WCAG AA minimum size
(https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
standard but for
developers aiming to comply with the WCAG AAA target size
(https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
standard the marker size
should be increased.
See basic marker customization
(/maps/documentation/javascript/advanced-markers/basic-customization#scale_the_marker) to learn how
to change marker scale, add title text, and more.
The following example shows a map with five clickable, focusable markers that include title text,
and have been set to 1.5x scale:
2/6/26, 10:48 AMMake markers clickable and accessible  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/accessible-markers1/6

## 1
## 2
## 3
## 4
## 5
Map data ©2026 GoogleReport a map error
To navigate markers using the keyboard:
- Use the tab key to focus on the first marker; if there are multiple markers on the same map,
use the arrow keys to cycle through the markers.
- If the marker is clickable, press the enter key to "click". If a marker has an info window, you
can open it by clicking, or by pressing the enter key or space bar. When the info window
closes, focus will return to the associated marker.
- Press tab again to continue moving through the rest of the map controls.
Make a marker clickable
This section shows you how to make markers respond to click events. To make a marker clickable:
Set the gmpClickable property to true.
TypeScript
## (#typescript)
JavaScript (#javascript)
constpin=newPinElement({
## //@ts-ignore
glyphText:`${i+1}`,
2/6/26, 10:48 AMMake markers clickable and accessible  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/accessible-markers2/6

## 
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Add a click event listener to respond to user input.
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
To make a marker unclickable again, call removeListener to remove the click event listener:
To further enhance accessibility:
Set descriptive text for a marker using the AdvancedMarkerElement.title option.
scale:1.5,
## });
constmarker=newAdvancedMarkerElement({
position,
title:`${i+1}. ${title}`,
gmpClickable:true,
## });
marker.append(pin);
mapElement.append(marker);
30973d44b60568147f527dab3a/dist/samples/advanced-markers-accessibility/docs/index.ts#L52-L63)
TypeScript
## (#typescript)
JavaScript (#javascript)
// Add a click listener for each marker, and set up the info window.
marker.addListener('click',({domEvent,latLng})=>{
const{target}=domEvent;
infoWindow.close();
infoWindow.setContent(marker.title);
infoWindow.open(marker.map,marker);
## });
30973d44b60568147f527dab3a/dist/samples/advanced-markers-accessibility/docs/index.ts#L66-L72)
// Remove the listener.
google.maps.event.removeListener(clickListener);
2/6/26, 10:48 AMMake markers clickable and accessible  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/accessible-markers3/6

Increase marker scale using the scale property of PinElement.
Complete example code
## 
See the complete example source code
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
asyncfunctioninitMap(){
// Request needed libraries.
const{Map,InfoWindow}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement,PinElement}=
(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
// Set LatLng and title text for the markers. The first marker (Boynton Pas
// receives the initial focus when tab is pressed. Use arrow keys to move
// between markers; press tab again to cycle through the map controls.
consttourStops=[
## {
position:{lat:34.8791806,lng:-111.8265049},
title:'Boynton Pass',
## },
## {
position:{lat:34.8559195,lng:-111.7988186},
title:'Airport Mesa',
## },
## {
position:{lat:34.832149,lng:-111.7695277},
title:'Chapel of the Holy Cross',
## },
## {
position:{lat:34.823736,lng:-111.8001857},
title:'Red Rock Crossing',
## },
## {
position:{lat:34.800326,lng:-111.7665047},
title:'Bell Rock',
## },
## More
## 
2/6/26, 10:48 AMMake markers clickable and accessible  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/accessible-markers4/6

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
## ];
// Create an info window to share between markers.
constinfoWindow=newInfoWindow();
// Create the markers.
tourStops.forEach(({position,title},i)=>{
constpin=newPinElement({
## //@ts-ignore
glyphText:`${i+1}`,
scale:1.5,
## });
constmarker=newAdvancedMarkerElement({
position,
title:`${i+1}. ${title}`,
gmpClickable:true,
## });
marker.append(pin);
mapElement.append(marker);
// Add a click listener for each marker, and set up the info window.
marker.addListener('click',({domEvent,latLng})=>{
const{target}=domEvent;
infoWindow.close();
infoWindow.setContent(marker.title);
infoWindow.open(marker.map,marker);
## });
## });
## }
initMap();
230973d44b60568147f527dab3a/dist/samples/advanced-markers-accessibility/docs/index.ts#L8-L77)
2/6/26, 10:48 AMMake markers clickable and accessible  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/accessible-markers5/6

Last updated 2026-02-02 UTC.
2/6/26, 10:48 AMMake markers clickable and accessible  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/accessible-markers6/6