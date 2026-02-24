

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Get alternative routes
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
The default route returned by the Routes API is typically the fastest route from the origin to the
destination. When you request alternative routes, the API returns an array of up to three routes
along with the default route. Your customers can then choose a route that is best for them.
## 
See the complete example source code
2/6/26, 11:27 AMGet alternative routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-alternative-routes1/5

The following code sample shows how to request alternative routes and then draw the routes on a
map.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
letmapPolylines:google.maps.Polyline[]=[];
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
letinnerMap;
// Initialize and add the map.
asyncfunctioninitMap(){
//  Request the needed libraries.
(awaitgoogle.maps.importLibrary('maps'))asgoogle.maps.MapsLibrary;
innerMap=mapElement.innerMap;
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
const[{Route,RouteLabel}]=awaitPromise.all([
google.maps.importLibrary('routes'),
## ]);
// Build a request.
constrequest={
origin:'San Francisco, CA',
destination:'Sunset Dr Pacific Grove, CA 93950',
travelMode:'DRIVING',
computeAlternativeRoutes:true,
fields:['path','routeLabels','viewport'],// Request the routeLabels
## };
// Call computeRoutes to get the directions.
constresult=awaitRoute.computeRoutes(request);
if(!result.routes||result.routes.length===0){
console.warn('No routes found');
return;
## More
## 
2/6/26, 11:27 AMGet alternative routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-alternative-routes2/5

## }
letprimaryRoute;
for(constrouteofresult.routes){
// Save the primary route for last so it's drawn on top.
if(
// Check for the default route.
route.routeLabels?.includes(RouteLabel.DEFAULT_ROUTE)
## ){
primaryRoute=route;
## }else{
drawRoute(route,false);
## }
## }
if(primaryRoute){
drawRoute(primaryRoute,true);
awaitprimaryRoute.createWaypointAdvancedMarkers({map:innerMap});
innerMap.fitBounds(primaryRoute.viewport,50);
innerMap.setHeading(70);
## }
// Display the raw JSON for the result in the console.
console.log(`Response:\n ${JSON.stringify(result,null,2)}`);
## }
functiondrawRoute(route,isPrimaryRoute){
mapPolylines=mapPolylines.concat(
route.createPolylines({
polylineOptions:isPrimaryRoute
## ?{
map:innerMap,
strokeWeight:5,
## }
## :{
map:innerMap,
strokeColor:'#669DF6',
strokeOpacity:0.5,
strokeWeight:5,
## },
colorScheme:innerMap.get('colorScheme'),
## })
## );
## }
initMap();
2/6/26, 11:27 AMGet alternative routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-alternative-routes3/5

Considerations when requesting alternative routes
When requesting alternative routes, consider the following:
You can only request alternative routes for routes without intermediate waypoints.
Requesting alternative routes when the route specifies intermediate waypoints does not
cause an error. However, no alternative routes are returned.
The response contains a maximum of three alternative routes. However, sometimes no
alternative routes are available so the response only contains the default route.
Because of the additional processing required to calculate alternative routes, requesting
alternative routes might increase the response time of the API.
Request alternative routes
To request alternative routes, set computeAlternativeRoutes to true in the computeRoutes
request.
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
5323e7230973d44b60568147f527dab3a/dist/samples/routes-get-alternatives/docs/index.ts#L7-L100)
// Build a request.
constrequest={
origin:'San Francisco, CA',
destination:'Sunset Dr Pacific Grove, CA 93950',
travelMode:'DRIVING',
computeAlternativeRoutes:true,
fields:['path','routeLabels','viewport'],// Request the routeLabels field.
## };
2/6/26, 11:27 AMGet alternative routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-alternative-routes4/5

To get the routes, iterate through the routes array (for example, result.routes). The default route
has the route label RouteLabel.DEFAULT_ROUTE. The following code sample shows iterating
through the routes, and drawing the primary route last.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
42a24a15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-alternatives/docs/index.js#L33-L40)
// Call computeRoutes to get the directions.
constresult=awaitRoute.computeRoutes(request);
if(!result.routes||result.routes.length===0){
console.warn('No routes found');
return;
## }
letprimaryRoute;
for(constrouteofresult.routes){
// Save the primary route for last so it's drawn on top.
if(
// Check for the default route.
route.routeLabels?.includes(RouteLabel.DEFAULT_ROUTE)){
primaryRoute=route;
## }
else{
drawRoute(route,false);
## }
## }
if(primaryRoute){
drawRoute(primaryRoute,true);
awaitprimaryRoute.createWaypointAdvancedMarkers({map:innerMap});
innerMap.fitBounds(primaryRoute.viewport,50);
innerMap.setHeading(70);
## }
42a24a15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-alternatives/docs/index.js#L43-L66)
2/6/26, 11:27 AMGet alternative routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-alternative-routes5/5