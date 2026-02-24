

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Migrate to the Route class
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
The new Routes Library, Maps JavaScript API includes the Route class, which replaces the legacy
Directions Service (/maps/documentation/javascript/legacy/directions). This page explains the
differences between the legacy directions service and the new Route class, and provides some
code for comparison.
Directions service (Legacy) versus Route class
Request parameters
The following table compares the request parameters for the legacy Directions service and the
Route class.
Directions Service (Legacy)
## (/maps/documentation/javascript/legacy/directions)
## Route (/maps/documentation/javascr
DirectionsService.route() method
(/maps/documentation/javascript/legacy/directions#DirectionsRequests)
Route.computeRoutes() method
## (/maps/documentation/javascript/refe
## Required Parameters
origin
(/maps/documentation/javascript/legacy/directions#DirectionsRequests)
origin (/maps/documentation/javasc
destination
(/maps/documentation/javascript/legacy/directions#DirectionsRequests)
destination (/maps/documentation
2/6/26, 11:30 AMMigrate to the Route class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-js-migration1/5

Directions Service (Legacy)
## (/maps/documentation/javascript/legacy/directions)
## Route (/maps/documentation/javascr
travelMode
(/maps/documentation/javascript/legacy/directions#TravelModes)
travelMode (optional)
## (/maps/documentation/javascript/refe
## Optional Parameters
optimizeWaypoints
(/maps/documentation/javascript/legacy/directions#DirectionsRequests)
optimizeWaypointOrder
## (/maps/documentation/javascript/refe
provideRouteAlternatives
(/maps/documentation/javascript/legacy/directions#DirectionsRequests)
computeAlternativeRoutes
## (/maps/documentation/javascript/refe
avoidFerries, avoidHighways, avoidTolls
(/maps/documentation/javascript/legacy/directions#DirectionsRequests)
routeModifiers
## (/maps/documentation/javascript/refe
drivingOptions
(/maps/documentation/javascript/legacy/directions#DrivingOptions)
departureTime
## (/maps/documentation/javascript/refe
trafficModel
## (/maps/documentation/javascript/refe
region
(/maps/documentation/javascript/legacy/directions#DirectionsRequests)
region (/maps/documentation/javasc
transitOptions
(/maps/documentation/javascript/legacy/directions#TransitOptions)
transitPreference
## (/maps/documentation/javascript/refe
arrivalTime (/maps/documentation/javascript/legacy/directions)arrivalTime (/maps/documentation
unitSystem
(/maps/documentation/javascript/legacy/directions#UnitSystems)
units (/maps/documentation/javascr
waypoints
(/maps/documentation/javascript/legacy/directions#DirectionsRequests)
intermediates
## (/maps/documentation/javascript/refe
Methods comparison
The following table compares key methods for the legacy Directions service and the Route class.
Directions Service (Legacy)
## (/maps/documentation/javascript/legacy/directions)
## Route (/maps/documentation/javasc
route() method
(/maps/documentation/javascript/legacy/directions#RenderingDirections)
computeRoutes() method
## (/maps/documentation/javascript/ref
2/6/26, 11:30 AMMigrate to the Route class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-js-migration2/5

Directions Service (Legacy)
## (/maps/documentation/javascript/legacy/directions)
## Route (/maps/documentation/javasc
DirectionsRenderer.setDirections() method
(/maps/documentation/javascript/legacy/directions#DisplayingResults)
createPolylines() method
## (/maps/documentation/javascript/ref
createWaypointAdvancedMarkers
## (/maps/documentation/javascript/ref
Code comparison
This section compares two similar pieces of code to illustrate the differences between the legacy
Directions service and the new Route class. The code snippets show the code required on each
respective API to make a directions request, and then use the result to draw a polyline and markers
on the map.
In the legacy Directions service, the DirectionsRenderer
(/maps/documentation/javascript/legacy/directions#DisplayingResults) object is used to display polylines
and markers to represent directions results on a map. In the Routes library, the
DirectionsRenderer object has been replaced by the createPolylines() and
createWaypointAdvancedMarkers() methods. This page explains the differences between the
legacy Directions Service and the new Route class, and provides some code for comparison.
Get driving directions
Directions service (Legacy)
The following code gets driving directions using the legacy Directions service, and then uses the
DirectionsRenderer to draw a polyline and markers on the map:
// Define a simple request.
varrequest={
origin:'Mountain View, CA',
destination:'San Francisco, CA',
travelMode:'DRIVING'
## };
// Call the Directions Service to get the directions.
directionsService.route(request,function(result,status){
if(status=='OK'){
directionsRenderer.setDirections(result);// Add polyline and markers to the map.
2/6/26, 11:30 AMMigrate to the Route class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-js-migration3/5

Important: The legacy DirectionsRenderer object uses the legacy Marker class
(/maps/documentation/javascript/reference#marker), which is deprecated.
Route class
The following code gets driving directions using the new Route class, then uses the
createPolylines method to draw a polyline on the map, and the
createWaypointAdvancedMarkers method to draw markers on the map.
The new Route class does not automatically render markers. You must call
createWaypointAdvancedMarkers to render markers.
## }
## });
TypeScript
## (#typescript)
JavaScript (#javascript)
// Define a routes request.
constrequest={
origin:'Mountain View, CA',
destination:'San Francisco, CA',
travelMode:'DRIVING',
fields:['path'],// Request fields needed to draw polylines.
## };
// Call computeRoutes to get the directions.
const{routes,fallbackInfo,geocodingResults}=
awaitRoute.computeRoutes(request);
// Use createPolylines to create polylines for the route.
mapPolylines=routes[0].createPolylines();
// Add polylines to the map.
mapPolylines.forEach((polyline)=>polyline.setMap(map));
// Create markers to start and end points.
constmarkers=awaitroutes[0].createWaypointAdvancedMarkers();
// Add markers to the map
markers.forEach((marker)=>marker.setMap(map));
15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-directions/docs/index.ts#L82-L108)
2/6/26, 11:30 AMMigrate to the Route class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-js-migration4/5

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Important: The Advanced Marker class (/maps/documentation/javascript/reference/advanced-markers)
Requires a map ID to be set in map options. If you don't have a custom map ID, you can use DEMO_MAP_ID. Learn
more (/maps/documentation/javascript/map-ids/mapid-over).
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:30 AMMigrate to the Route class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-js-migration5/5