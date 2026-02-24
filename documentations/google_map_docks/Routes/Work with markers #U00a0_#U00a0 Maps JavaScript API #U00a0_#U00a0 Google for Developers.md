

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Work with markers
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Create markers for route waypoints by calling createWaypointAdvancedMarkers()
(/maps/documentation/javascript/reference/route#Route.createWaypointAdvancedMarkers). By default,
createWaypointAdvancedMarkers() creates markers for the route labeled 'A', 'B', 'C', etc. for each
waypoint. You can further customize the markers by passing in options to alter the marker style
based on the marker index or properties of the corresponding RouteLeg.
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers1/10

## 
See the complete example source code
The following code sample shows how to create custom markers for route waypoints.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
letmapPolylines:google.maps.Polyline[]=[];
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
letinnerMap;
// Initialize and add the map.
asyncfunctioninitMap(){
//  Request the needed libraries.
awaitgoogle.maps.importLibrary('maps');
innerMap=awaitmapElement.innerMap;
innerMap.setOptions({
mapTypeControl:false,
mapId:'DEMO_MAP_ID',
## });
// Call the function after the map is loaded.
google.maps.event.addListenerOnce(innerMap,'idle',()=>{
getDirections();
## });
## }
asyncfunctiongetDirections(){
## //@ts-ignore
// Request the needed libraries.
const[{Route},{PinElement}]=awaitPromise.all([
google.maps.importLibrary('routes'),
google.maps.importLibrary('marker'),
## ]);
// Define routes request with an intermediate stop.
constrequest={
origin:'Parking lot, Christmas Tree Point Rd, San Francisco, CA 94131'
destination:'100 Spinnaker Dr, Sausalito, CA 94965',// We're having a
intermediates:[{location:'300 Finley Rd San Francisco, CA 94129'}],
travelMode:'DRIVING',
fields:['path','legs','viewport'],
## };
// Call computeRoutes to get the directions.
constresult=awaitRoute.computeRoutes(request);
## More
## 
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers2/10

if(!result.routes||result.routes.length===0){
console.warn('No routes found');
return;
## }
// Alter style based on marker index.
functionmarkerOptionsMaker(
defaultOptions:google.maps.marker.AdvancedMarkerElementOptions,
## //@ts-ignore
waypointMarkerDetails:google.maps.routes.WaypointMarkerDetails
## ){
const{index,totalMarkers,leg}=waypointMarkerDetails;
// Style the origin waypoint.
if(index===0){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
glyphColor:'white',
background:'green',
borderColor:'green',
## }).element,
## };
## }
// Style all intermediate waypoints.
if(!(index===0||index===totalMarkers-1)){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
glyphColor:'white',
background:'blue',
borderColor:'blue',
## }).element,
## };
## }
// Style the destination waypoint.
if(index===totalMarkers-1){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers3/10

Add default markers
To add markers using the default style, call createWaypointAdvancedMarkers() passing a marker
option to specify the current map, as shown in the following code snippet.
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
glyphColor:'white',
background:'red',
borderColor:'red',
## }).element,
## };
## }
return{...defaultOptions,map:innerMap};
## }
constmarkers=
awaitresult.routes[0].createWaypointAdvancedMarkers(
markerOptionsMaker
## );
// Fit the map to the route.
innerMap.fitBounds(result.routes[0].viewport);
innerMap.setHeading(270);
// Create polylines and add them to the map.
mapPolylines=result.routes[0].createPolylines();
mapPolylines.forEach((polyline)=>polyline.setMap(innerMap));
## }
initMap();
42a24a15323e7230973d44b60568147f527dab3a/dist/samples/routes-markers/docs/index.ts#L7-L125)
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers4/10

Important: The legs field must be requested in ComputeRoutesRequest.fields in order for intermediate
waypoints to be included.
Add markers with a custom style
To add markers using a custom style, call createWaypointAdvancedMarkers() passing marker
options that include custom style properties. When you apply styles like this, all markers are styled
the same way. The following code snippet shows how to create markers with a custom style.
Apply a custom style to individual markers
To apply a custom style to individual markers, pass a function to
createWaypointAdvancedMarkers() to set marker style options based on either marker index or
RouteLeg properties. The following code snippet shows a function to create markers and style
them based on marker index:
// Create markers using default style.
constmarkers=awaitresult.routes[0].createWaypointAdvancedMarkers({map:innerMap
// Create markers with a custom style.
constmarkerOptions={
map:innerMap,
content:newPinElement({
scale:1.5,
background:'#8C0DD1',
borderColor:'#6D0AA5',
glyphColor:'#6D0AA5',
## }).element
## }
constmarkers=awaitresult.routes[0].createWaypointAdvancedMarkers(markerOptions);
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers5/10

TypeScriptJavaScript(#javascript)
// Alter style based on marker index.
functionmarkerOptionsMaker(
defaultOptions:google.maps.marker.AdvancedMarkerElementOptions,
## //@ts-ignore
waypointMarkerDetails:google.maps.routes.WaypointMarkerDetails
## ){
const{index,totalMarkers,leg}=waypointMarkerDetails;
// Style the origin waypoint.
if(index===0){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
glyphColor:'white',
background:'green',
borderColor:'green',
## }).element,
## };
## }
// Style all intermediate waypoints.
if(!(index===0||index===totalMarkers-1)){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
glyphColor:'white',
background:'blue',
borderColor:'blue',
## }).element,
## };
## }
// Style the destination waypoint.
if(index===totalMarkers-1){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
glyphColor:'white',
background:'red',
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers6/10

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
See the complete code sample
borderColor:'red',
## }).element,
## };
## }
return{...defaultOptions,map:innerMap};
## }
constmarkers=
awaitresult.routes[0].createWaypointAdvancedMarkers(
markerOptionsMaker
## );
2a24a15323e7230973d44b60568147f527dab3a/dist/samples/routes-markers/docs/index.ts#L57-L113)
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
letmapPolylines:google.maps.Polyline[]=[];
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
letinnerMap;
// Initialize and add the map.
asyncfunctioninitMap(){
//  Request the needed libraries.
awaitgoogle.maps.importLibrary('maps');
innerMap=awaitmapElement.innerMap;
innerMap.setOptions({
mapTypeControl:false,
mapId:'DEMO_MAP_ID',
## });
// Call the function after the map is loaded.
google.maps.event.addListenerOnce(innerMap,'idle',()=>{
getDirections();
## });
## }
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers7/10

asyncfunctiongetDirections(){
## //@ts-ignore
// Request the needed libraries.
const[{Route},{PinElement}]=awaitPromise.all([
google.maps.importLibrary('routes'),
google.maps.importLibrary('marker'),
## ]);
// Define routes request with an intermediate stop.
constrequest={
origin:'Parking lot, Christmas Tree Point Rd, San Francisco, CA 94131'
destination:'100 Spinnaker Dr, Sausalito, CA 94965',// We're having a
intermediates:[{location:'300 Finley Rd San Francisco, CA 94129'}],
travelMode:'DRIVING',
fields:['path','legs','viewport'],
## };
// Call computeRoutes to get the directions.
constresult=awaitRoute.computeRoutes(request);
if(!result.routes||result.routes.length===0){
console.warn('No routes found');
return;
## }
// Alter style based on marker index.
functionmarkerOptionsMaker(
defaultOptions:google.maps.marker.AdvancedMarkerElementOptions,
## //@ts-ignore
waypointMarkerDetails:google.maps.routes.WaypointMarkerDetails
## ){
const{index,totalMarkers,leg}=waypointMarkerDetails;
// Style the origin waypoint.
if(index===0){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
glyphColor:'white',
background:'green',
borderColor:'green',
## }).element,
## };
## }
// Style all intermediate waypoints.
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers8/10

if(!(index===0||index===totalMarkers-1)){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
glyphColor:'white',
background:'blue',
borderColor:'blue',
## }).element,
## };
## }
// Style the destination waypoint.
if(index===totalMarkers-1){
return{
...defaultOptions,
map:innerMap,
content:newPinElement({
glyphText:(index+1).toString(),
glyphColor:'white',
background:'red',
borderColor:'red',
## }).element,
## };
## }
return{...defaultOptions,map:innerMap};
## }
constmarkers=
awaitresult.routes[0].createWaypointAdvancedMarkers(
markerOptionsMaker
## );
// Fit the map to the route.
innerMap.fitBounds(result.routes[0].viewport);
innerMap.setHeading(270);
// Create polylines and add them to the map.
mapPolylines=result.routes[0].createPolylines();
mapPolylines.forEach((polyline)=>polyline.setMap(innerMap));
## }
initMap();
42a24a15323e7230973d44b60568147f527dab3a/dist/samples/routes-markers/docs/index.ts#L7-L125)
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers9/10

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:27 AMWork with markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-markers10/10