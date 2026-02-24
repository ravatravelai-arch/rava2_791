

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
## Nearby Search
## Page Summary
## 
Select platform:

## Android (/maps/documentation/places/android-sdk/nearby-search)
iOS (/maps/documentation/places/ios-sdk/nearby-search)
JavaScript (/maps/documentation/javascript/nearby-search)
## Web Service (/maps/documentation/places/web-service/nearby-search)
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Nearby Search (New) takes one or more place types, and returns a list of matching places. In the
following example, you can choose a place type and see the results on a map. Click the markers to
see more details about the places.
2/6/26, 10:50 AMNearby Search  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/nearby-search1/7

To use Nearby Search (New), you must enable "Places API (New)" on your Google Cloud project.
See Get started (/maps/documentation/javascript/place-get-started) for details.
Find nearby places
Call searchNearby() (/maps/documentation/javascript/reference/place#Place.searchNearby) to return a
list of places based on the specified place types, location, and radius. Specify search parameters
using a request, and then call searchNearby(). Results are returned as a list of Place objects, from
which you can get place details (/maps/documentation/javascript/place-details). The following snippet
shows an example of a request and a call to searchNearby():
Nearby Search (New) returns information about a set of places based on the place types that you
specify — for example restaurant or book_store or bowling_alley. The service responds with a
list of places matching the specified place types within the radius of the specified
locationRestriction.
TypeScript
## (#typescript)
JavaScript (#javascript)
// Get bounds and radius to constrain search.
center=mapElement.center;
letbounds=innerMap.getBounds();
constne=bounds.getNorthEast();
2/6/26, 10:50 AMNearby Search  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/nearby-search2/7

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Use the fields parameter (required) to specify a comma-separated list of one or more data
fields (/maps/documentation/javascript/place-class-data-fields).
Use the locationRestriction parameter (required) to specify a radius of up to 50,000
meters.
Use the includedPrimaryTypes parameter to specify one or more place types
(/maps/documentation/javascript/place-types) to search for.
Use the rankPreference parameter to specify a SearchNearbyRankPreference of either
POPULARITY or DISTANCE.
See the full list of parameters.
(/maps/documentation/javascript/reference/place#SearchNearbyRequest)
## Example
constsw=bounds.getSouthWest();
constdiameter=spherical.computeDistanceBetween(ne,sw);
constradius=Math.min(diameter/2,50000);// Radius cannot be more than 500
constrequest={
// required parameters
fields:[
'displayName',
## 'location',
'formattedAddress',
'googleMapsURI',
## ],
locationRestriction:{
center,
radius,
## },
// optional parameters
includedPrimaryTypes:[typeSelect.value],
maxResultCount:5,
rankPreference:SearchNearbyRankPreference.POPULARITY,
## };
const{places}=awaitPlace.searchNearby(request);
a15323e7230973d44b60568147f527dab3a/dist/samples/place-nearby-search/docs/index.ts#L56-L82)
2/6/26, 10:50 AMNearby Search  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/nearby-search3/7

The following example uses searchNearby() to query for places of the selected type within the
map bounds, and populates a map with markers to show the results.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
letinnerMap;
constadvancedMarkerElement=document.querySelector(
## 'gmp-advanced-marker'
)asgoogle.maps.marker.AdvancedMarkerElement;
letcenter;
lettypeSelect;
letinfoWindow;
asyncfunctioninitMap(){
const{Map,InfoWindow}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
const{LatLng}=(awaitgoogle.maps.importLibrary(
## 'core'
))asgoogle.maps.CoreLibrary;
innerMap=mapElement.innerMap;
innerMap.setOptions({
mapTypeControl:false,
## });
typeSelect=document.querySelector('.type-select');
typeSelect.addEventListener('change',()=>{
nearbySearch();
## });
infoWindow=newInfoWindow();
// Kick off an initial search once map has loaded.
google.maps.event.addListenerOnce(innerMap,'idle',()=>{
nearbySearch();
## });
## }
asyncfunctionnearbySearch(){
const{Place,SearchNearbyRankPreference}=
(awaitgoogle.maps.importLibrary(
## 'places'
))asgoogle.maps.PlacesLibrary;
2/6/26, 10:50 AMNearby Search  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/nearby-search4/7

const{AdvancedMarkerElement}=(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
const{spherical}=(awaitgoogle.maps.importLibrary(
## 'geometry'
))asgoogle.maps.GeometryLibrary;
// Get bounds and radius to constrain search.
center=mapElement.center;
letbounds=innerMap.getBounds();
constne=bounds.getNorthEast();
constsw=bounds.getSouthWest();
constdiameter=spherical.computeDistanceBetween(ne,sw);
constradius=Math.min(diameter/2,50000);// Radius cannot be more than
constrequest={
// required parameters
fields:[
'displayName',
## 'location',
'formattedAddress',
'googleMapsURI',
## ],
locationRestriction:{
center,
radius,
## },
// optional parameters
includedPrimaryTypes:[typeSelect.value],
maxResultCount:5,
rankPreference:SearchNearbyRankPreference.POPULARITY,
## };
const{places}=awaitPlace.searchNearby(request);
if(places.length){
const{LatLngBounds}=(awaitgoogle.maps.importLibrary(
## 'core'
))asgoogle.maps.CoreLibrary;
constbounds=newLatLngBounds();
// First remove all existing markers.
for(constmarkerofmapElement.querySelectorAll('gmp-advanced-marker')
marker.remove();
// Loop through and get all the results.
places.forEach((place)=>{
if(!place.location)return;
bounds.extend(place.location);
2/6/26, 10:50 AMNearby Search  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/nearby-search5/7

constmarker=newAdvancedMarkerElement({
map:innerMap,
position:place.location,
title:place.displayName,
## });
// Build the content of the InfoWindow safely using DOM elements.
constcontent=document.createElement('div');
constaddress=document.createElement('div');
address.textContent=place.formattedAddress||'';
constplaceId=document.createElement('div');
placeId.textContent=place.id;
content.append(address,placeId);
if(place.googleMapsURI){
constlink=document.createElement('a');
link.href=place.googleMapsURI;
link.target='_blank';
link.textContent='View Details on Google Maps';
content.appendChild(link);
## }
marker.addListener('gmp-click',()=>{
innerMap.panTo(place.location);
updateInfoWindow(place.displayName,content,marker);
## });
## });
innerMap.fitBounds(bounds,100);
## }else{
console.log('No results');
## }
## }
functionupdateInfoWindow(title,content,anchor){
infoWindow.setContent(content);
infoWindow.setHeaderContent(title);
infoWindow.open({
anchor,
## });
## }
initMap();
a15323e7230973d44b60568147f527dab3a/dist/samples/place-nearby-search/docs/index.ts#L8-L142)
2/6/26, 10:50 AMNearby Search  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/nearby-search6/7

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
2/6/26, 10:50 AMNearby Search  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/nearby-search7/7