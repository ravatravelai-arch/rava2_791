

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Add a marker to a map
## Page Summary
## 
Select platform:

## Android (/maps/documentation/android-sdk/advanced-markers/add-marker)
iOS (/maps/documentation/ios-sdk/advanced-markers/add-marker)
JavaScript (/maps/documentation/javascript/advanced-markers/add-marker)
Use markers to display single locations on a map. This page shows how to add a marker to a map
programmatically, and by using custom HTML elements.
Add a marker using custom HTML elements (#web-components)
Add a marker programmatically (#javascript)
2/6/26, 10:47 AMAdd a marker to a map  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/add-marker1/6

Load the advanced marker library
In order to add an advanced marker to a map, your map code must load the marker library, which
provides the AdvancedMarkerElement and PinElement classes. This applies whether your app
loads markers programmatically or by using HTML. To do this, your app must first load the Maps
JavaScript API (/maps/documentation/javascript/load-maps-js-api).
The method you use for loading libraries depends on how your web page loads the Maps
JavaScript API.
If your web page uses dynamic script loading, add the markers library and import
AdvancedMarkerElement (and optionally PinElement) at runtime, as shown here.
If your web page uses the direct script loading tag, add libraries=marker to the loading
script, as shown in the following snippet. Doing this will cause both AdvancedMarkerElement
and PinElement to be imported.
Set a map ID
A map ID is required to use Advanced Markers (the DEMO_MAP_ID can be used). Set a map ID in map
options, as shown here:
const{AdvancedMarkerElement,PinElement}=awaitgoogle.maps.importLibrary("m
## <script
src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEYcallback=initMapv
defer
## ></script>
constmap=newMap(document.getElementById('map')asHTMLElement,{
center:{lat:37.4239163,lng:-122.0947209},
zoom:14,
mapId:'DEMO_MAP_ID',
## });
2/6/26, 10:47 AMAdd a marker to a map  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/add-marker2/6

If you're using web components, you can set the map ID directly on the gmp-map element:
Learn more (/maps/documentation/javascript/map-ids/mapid-over) about map IDs.
Add a marker using custom HTML elements
Note: Some frameworks like React will automatically add and remove DOM nodes during rendering, and may be
incompatible with adding and removing markers' corresponding DOM nodes independently (e.g. when using
Maps JavaScript API constructors and properties). In such frameworks if you intend to use other marker-
managing code or libraries, you may need to add and remove markers solely using JavaScript syntax (e.g. new
AdvancedMarker({map})).
To add an advanced marker by using custom HTML elements, add a gmp-advanced-marker child
element to the gmp-map element. The following snippet shows adding markers to a web page:
## 
See the complete example source code
<gmp-map center="37.4239163,-122.0947209" zoom="14" map-id="DEMO_MAP_ID"></gmp-map>
## <gmp-map
center="43.4142989,-124.2301242"
zoom="4"
map-id="DEMO_MAP_ID"
style="height: 400px"
## >
## <gmp-advanced-marker
position="37.4220656,-122.0840897"
title="Mountain View, CA"
## ></gmp-advanced-marker>
## <gmp-advanced-marker
position="47.648994,-122.3503845"
title="Seattle, WA"
## ></gmp-advanced-marker>
## </gmp-map>
7366fb27829401945d2a7e27d77ed2df8e5/dist/samples/web-components-markers/docs/index.html#L17-L31)
2/6/26, 10:47 AMAdd a marker to a map  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/add-marker3/6

## 
This example shows creating a map with markers using HTML.
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
## Google Cloud Shell...
Add a marker programmatically
To add an advanced marker to a map programmatically, create a new AdvancedMarkerElement and
append it to the map as shown in this example:
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
// This example adds a map with markers, using web components.
asyncfunctioninitMap():Promise<void>{
console.log('Maps JavaScript API loaded.');
## }
declareglobal{
interfaceWindow{
initMap:()=>void;
## }
## }
window.initMap=initMap;
/2683f7366fb27829401945d2a7e27d77ed2df8e5/samples/web-components-markers/index.ts#L8-L19)
TypeScript
## (#typescript)
JavaScript (#javascript)
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
asyncfunctioninitMap(){
// Request needed libraries.
const{Map}=(awaitgoogle.maps.importLibrary(
## More
## 
2/6/26, 10:47 AMAdd a marker to a map  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/add-marker4/6

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Appending elements is only possible when using web components. If the div element is used to
load the map, use the map property to associate the marker with the map instance as shown here:
To remove a marker from the map, set either marker.map or marker.position to null.
## 
See the complete example source code
This example shows how to add a marker to a map.
## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement}=(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
constmarker=newAdvancedMarkerElement({
position:{lat:37.4239163,lng:-122.0947209},
## });
mapElement.append(marker);
## }
323e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-simple/docs/index.ts#L9-L24)
myMap = new google.maps.Map(document.getElementById("map"), {
center: { lat: -34.397, lng: 150.644 },
zoom: 8,
## });
const marker = new AdvancedMarkerElement({
map: myMap,
position: { lat: -34.397, lng: 150.644 },
## });
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
asyncfunctioninitMap(){
## More
## 
2/6/26, 10:47 AMAdd a marker to a map  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/add-marker5/6

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
Next steps
Basic marker customization
## (/maps/documentation/javascript/advanced-markers/basic-customization)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
// Request needed libraries.
const{Map}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement}=(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
constmarker=newAdvancedMarkerElement({
position:{lat:37.4239163,lng:-122.0947209},
## });
mapElement.append(marker);
## }
initMap();
323e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-simple/docs/index.ts#L8-L26)
2/6/26, 10:47 AMAdd a marker to a map  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/add-marker6/6