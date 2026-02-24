

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Get a route
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
A route is a navigable path between a start location, or origin, and an end location, or destination.
You can choose to get a route for different modes of transportation, such as walking, biking, or
different types of vehicles. You can also request route details such as distance, estimated time to
navigate the route, expected tolls, and step-by-step instructions to navigate the route.
## 
See the complete example source code
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route1/10

The following code sample shows how to get a route for driving directions between two locations.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
// Initialize and add the map.
letmap;
letmapPolylines:google.maps.Polyline[]=[];
constcenter={lat:37.447646,lng:-122.113878};// Palo Alto, CA
// Initialize and add the map.
asyncfunctioninitMap():Promise<void>{
//  Request the needed libraries.
const[{Map},{Place},{Route}]=awaitPromise.all([
google.maps.importLibrary('maps')asPromise<google.maps.MapsLibrary>,
google.maps.importLibrary(
## 'places'
)asPromise<google.maps.PlacesLibrary>,
## //@ts-ignore
google.maps.importLibrary('routes')asPromise<google.maps.Routes>,
## ]);
map=newMap(document.getElementById('map')asHTMLElement,{
zoom:12,
center:center,
mapTypeControl:false,
mapId:'DEMO_MAP_ID',
## });
// Use address strings in a directions request.
constrequestWithAddressStrings={
origin:'1600 Amphitheatre Parkway, Mountain View, CA',
destination:'345 Spear Street, San Francisco, CA',
fields:['path'],
## };
// Use Place IDs in a directions request.
constoriginPlaceInstance=newPlace({
id:'ChIJiQHsW0m3j4ARm69rRkrUF3w',// Mountain View, CA
## });
constdestinationPlaceInstance=newPlace({
id:'ChIJIQBpAG2ahYAR_6128GcTUEo',// San Francisco, CA
## });
constrequestWithPlaceIds={
## More
## 
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route2/10

origin:originPlaceInstance,
destination:destinationPlaceInstance,
fields:['path'],// Request fields needed to draw polylines.
## };
// Use lat/lng in a directions request.
// Mountain View, CA
constoriginLatLng={lat:37.422,lng:-122.084058};
// San Francisco, CA
constdestinationLatLng={lat:37.774929,lng:-122.419415};
// Define a computeRoutes request.
constrequestWithLatLngs={
origin:originLatLng,
destination:destinationLatLng,
fields:['path'],
## };
// Use Plus Codes in a directions request.
constrequestWithPlusCodes={
origin:'849VCWC8+R9',// Mountain View, CA
destination:'CRHJ+C3 Stanford, CA 94305, USA',// Stanford, CA
fields:['path'],
## };
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
// Display the raw JSON for the result in the console.
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route3/10

Call the computeRoutes() (/maps/documentation/javascript/reference/route#Route.computeRoutes)
method to request a route between two locations. The following example shows defining a request
and then calling computeRoutes() to get a route.
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
console.log(`Response:\n ${JSON.stringify(routes,null,2)}`);
// Fit the map to the path.
fitMapToPath(routes[0].path!);
## }
// Helper function to fit the map to the path.
asyncfunctionfitMapToPath(path){
const{LatLngBounds}=(awaitgoogle.maps.importLibrary(
## 'core'
))asgoogle.maps.CoreLibrary;
constbounds=newLatLngBounds();
path.forEach((point)=>{
bounds.extend(point);
## });
map.fitBounds(bounds);
## }
initMap();
a15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-directions/docs/index.ts#L7-L130)
// Import the Routes library.
const{Route}=awaitgoogle.maps.importLibrary('routes');
// Define a computeRoutes request.
constrequest={
origin:'Mountain View, CA',
destination:'San Francisco, CA',
## };
// Call the computeRoutes() method to get routes.
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route4/10

## 
Choose fields to return
When you request a route, you must use a field mask to specify what information the response
should return. You can specify the names of the Route class properties
(/maps/documentation/javascript/reference/route#Route-Properties) in the field mask.
Using a field mask also ensures that you don't request unnecessary data, which in turn helps with
response latency and avoids returning information your system doesn't need.
Specify the list of fields you need by setting the ComputeRoutesRequest.fields
(/maps/documentation/javascript/reference/route#ComputeRoutesRequest.fields) property, as shown in the
following snippet:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Specify locations for a route
To calculate a route, you must specify at a minimum the locations of the route origin and route
destination, and a field mask. You can also specify intermediate waypoints along a route, and use
waypoints to do other things like adding stops or passthrough points along a route.
const{routes}=awaitRoute.computeRoutes(request);
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
a15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-directions/docs/index.ts#L83-L89)
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route5/10

In the ComputeRoutesRequest, you can specify a location in any of the following ways:
## Place (#place) (preferred)
Latitude/longitude coordinates (#lat-lng)
Address string (#address-string) ("Chicago, IL" or "Darwin, NT, Australia")
## Plus Code (#plus-code)
You can specify locations for all waypoints in a request the same way, or you can mix them. For
example, you can use latitude/longitude coordinates for the origin waypoint and use a Place object
for the destination waypoint.
For efficiency and accuracy, use Place objects instead of latitude/longitude coordinates or address
strings. Place IDs are uniquely explicit and provide geocoding benefits for routing such as access
points and traffic variables. They help avoid the following situations that can result from other
ways of specifying a location:
Using latitude/longitude coordinates can result in the location being snapped to the road
nearest to those coordinates - which might not be an access point to the property, or even a
road that quickly or safely leads to the destination.
Address strings must first be geocoded by the Routes API to convert them to
latitude/longitude coordinates before it can calculate a route. This conversion can affect
performance.
Specify a location as a Place object (preferred)
To specify a location using a Place, create a new Place instance. The following snippet shows
creating new Place instances for origin and destination, and then using them in a
ComputeRoutesRequest:
TypeScript
## (#typescript)
JavaScript (#javascript)
// Use Place IDs in a directions request.
constoriginPlaceInstance=newPlace({
id:'ChIJiQHsW0m3j4ARm69rRkrUF3w',// Mountain View, CA
## });
constdestinationPlaceInstance=newPlace({
id:'ChIJIQBpAG2ahYAR_6128GcTUEo',// San Francisco, CA
## });
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route6/10

## 
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Latitude/longitude coordinates
To specify a location as latitude/longitude coordinates, create either a new
google.maps.LatLngLiteral, google.maps.LatLngAltitude, or
google.maps.LatLngAltitudeLiteral instance. The following snippet shows creating new
google.maps.LatLngLiteral instances for origin and destination, and then using them in a
computeRoutesRequest:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Address string
constrequestWithPlaceIds={
origin:originPlaceInstance,
destination:destinationPlaceInstance,
fields:['path'],// Request fields needed to draw polylines.
## };
a15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-directions/docs/index.ts#L41-L54)
TypeScript
## (#typescript)
JavaScript (#javascript)
// Use lat/lng in a directions request.
// Mountain View, CA
constoriginLatLng={lat:37.422,lng:-122.084058};
// San Francisco, CA
constdestinationLatLng={lat:37.774929,lng:-122.419415};
// Define a computeRoutes request.
constrequestWithLatLngs={
origin:originLatLng,
destination:destinationLatLng,
fields:['path'],
## };
a15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-directions/docs/index.ts#L58-L69)
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route7/10

## 
Address strings are literal addresses represented by a string (such as "1600 Amphitheatre Parkway,
Mountain View, CA"). Geocoding is the process of converting an address string into latitudes and
longitude coordinates (such as latitude 37.423021 and longitude -122.083739).
When you pass an address string as the location of a waypoint, the Routes library internally
geocodes the string to convert it to latitude and longitude coordinates.
The following snippet shows creating a ComputeRoutesRequest with an address string for origin
and destination:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Set the region for the address
If you pass an incomplete address string as the location of a waypoint, the API might use the wrong
geocoded latitude/longitude coordinates. For example, you make a request specifying "Toledo" as
the origin and "Madrid" as the destination for a driving route:
In this example, "Toledo" is interpreted as a city in the state of Ohio in the United States, not in
Spain. Therefore, the request returns an empty array, meaning no routes exist.
TypeScript
## (#typescript)
JavaScript (#javascript)
// Use address strings in a directions request.
constrequestWithAddressStrings={
origin:'1600 Amphitheatre Parkway, Mountain View, CA',
destination:'345 Spear Street, San Francisco, CA',
fields:['path'],
## };
a15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-directions/docs/index.ts#L32-L37)
// Define a request with an incomplete address string.
constrequest={
origin:'Toledo',
destination:'Madrid',
## };
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route8/10

You can configure the API to return results biased to a particular region by including the
regionCode parameter. This parameter specifies the region code as a ccTLD ("top-level domain")
(https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains#Country_code_top-level_domains) two-
character value. Most ccTLD codes are identical to ISO 3166-1 codes, with some notable
exceptions. For example, the United Kingdom's ccTLD is "uk" (.co.uk) while its ISO 3166-1 code is
"gb" (technically for the entity of "The United Kingdom of Great Britain and Northern Ireland").
A directions request for "Toledo" to "Madrid" that includes the regionCode parameter returns
appropriate results because "Toledo" is interpreted as a city in Spain:
## Plus Code
Many people don't have a precise address, which can make it difficult for them to receive deliveries.
Or, people with an address might prefer to accept deliveries at more specific locations, such as a
back entrance or a loading dock.
Plus Codes are like street addresses for people or places that don't have an actual address. Instead
of addresses with street names and numbers, Plus Codes are based on latitude/longitude
coordinates, and are displayed as numbers and letters.
Google developed Plus Codes
## (https://maps.google.com/pluscodes/)
to give the benefit of addresses
to everyone and everything. A Plus Code is an encoded location reference, derived from
latitude/longitude coordinates, that represents an area: 1/8000th of a degree by 1/8000th of a
degree (about 14m x 14m at the equator) or smaller. You can use Plus Codes as a replacement for
street addresses in places where they don't exist or where buildings are not numbered or streets
are not named.
Plus Codes must be formatted as a global code or a compound code:
global code is composed of a 4 character area code and 6 character or longer local code. For
example, for the address "1600 Amphitheatre Parkway, Mountain View, CA", the global code is
"849V" and the local code is "CWC8+R9". You then use the entire 10 character Plus Code to
specify the location value as "849VCWC8+R9".
constrequest={
origin:'Toledo',
destination:'Madrid',
region:'es',// Specify the region code for Spain.
## };
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route9/10

## 
compound code is composed of a 6 character or longer local code combined with an explicit
location. For example, the address "450 Serra Mall, Stanford, CA 94305, USA" has a local code
of "CRHJ+C3". For a compound address, combine the local code with the city, state, ZIP code,
and country portion of the address in the form "CRHJ+C3 Stanford, CA 94305, USA".
The following snippet shows calculating a route by specifying a waypoint for the route origin and
destination using Plus Codes:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
TypeScript
## (#typescript)
JavaScript (#javascript)
// Use Plus Codes in a directions request.
constrequestWithPlusCodes={
origin:'849VCWC8+R9',// Mountain View, CA
destination:'CRHJ+C3 Stanford, CA 94305, USA',// Stanford, CA
fields:['path'],
## };
a15323e7230973d44b60568147f527dab3a/dist/samples/routes-get-directions/docs/index.ts#L73-L78)
2/6/26, 11:27 AMGet a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/get-a-route10/10