

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Text Search (New)
## Page Summary
## 
Select platform:

## Android (/maps/documentation/places/android-sdk/text-search)
iOS (/maps/documentation/places/ios-sdk/text-search)
JavaScript (/maps/documentation/javascript/place-search)
## Web Service (/maps/documentation/places/web-service/text-search)
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Text Search (New) takes a text query and returns a list of matching places.
2/6/26, 10:49 AMText Search (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-search1/6

Search for a place
## Search
To use Text Search (New), you must enable "Places API (New)" on your Google Cloud project. See
Get started (/maps/documentation/javascript/place-get-started) for details.
Find places by text query
Call searchByText (/maps/documentation/javascript/reference/place#Place.searchByText) to return a list
of places from a text query or phone number. Specify search parameters using a request, and then
call searchByText(). Results are returned as a list of Place objects, from which you can get place
details (/maps/documentation/javascript/place-details). The following snippet shows an example of a
request and call to searchByText:
Text Search (New) returns information about a set of places based on a string — for example "pizza
in New York" or "shoe stores near Ottawa" or "123 Main Street". The service responds with a list of
places matching the text string and any location bias that has been set. Text Search (New) lets you
search for places by type, filter using criteria such as business hours and rating, and restrict or bias
results to a specific location.
TypeScript
## (#typescript)
JavaScript (#javascript)
constrequest={
textQuery:query,
fields:['displayName','location','businessStatus'],
2/6/26, 10:49 AMText Search (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-search2/6

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Specify a text query or phone number to search with the textQuery parameter.
Use the fields parameter (required) to specify a comma-separated list of one or more data
fields (/maps/documentation/javascript/place-class-data-fields) in camel case.
Use the includedType parameter to return only results of the specified type.
Use either locationBias or locationRestriction to bias or restrict your text search results
to a specific region.
See the full list of properties. (/maps/documentation/javascript/reference/place#SearchByTextRequest)
If the query contains a phone number, the region parameter should be set. For example, if you use a
phone number to search for a place in Japan, and the requesting domain is jp, you must set the
region parameter to 'jp'. If region is omitted from the request, the API will default to the United
States ('us') region.
Results are returned as a list of Place objects, from which you can get place details
## (/maps/documentation/javascript/place-details).
## Example
The following example calls searchByText with the provided query text, and then populates a map
with clickable markers to show the results.
includedType:'',// Restrict query to a specific type (leave blank for any
useStrictTypeFiltering:true,
locationBias:map.center,
isOpenNow:true,
language:'en-US',
maxResultCount:8,
minRating:1,// Specify a minimum rating.
region:'us',
## };
const{places}=awaitPlace.searchByText(request);
a24a15323e7230973d44b60568147f527dab3a/dist/samples/place-text-search/docs/index.ts#L53-L66)
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
2/6/26, 10:49 AMText Search (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-search3/6

letmap;
letmarkers={};
letinfoWindow;
asyncfunctioninitMap(){
const{Map,InfoWindow}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
constcenter={lat:37.4161493,lng:-122.0812166};
map=newMap(document.getElementById('map')asHTMLElement,{
center:center,
zoom:11,
mapTypeControl:false,
mapId:'DEMO_MAP_ID',
## });
consttextInput=document.getElementById('text-input')asHTMLInputElement
consttextInputButton=document.getElementById(
## 'text-input-button'
)asHTMLButtonElement;
constcard=document.getElementById('text-input-card')asHTMLElement;
map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
textInputButton.addEventListener('click',()=>{
findPlaces(textInput.value);
## });
textInput.addEventListener('keydown',(event)=>{
if(event.key==='Enter'){
findPlaces(textInput.value);
## }
## });
infoWindow=newgoogle.maps.InfoWindow();
## }
asyncfunctionfindPlaces(query){
const{Place}=(awaitgoogle.maps.importLibrary(
## 'places'
))asgoogle.maps.PlacesLibrary;
const{AdvancedMarkerElement}=(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
constrequest={
textQuery:query,
2/6/26, 10:49 AMText Search (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-search4/6

fields:['displayName','location','businessStatus'],
includedType:'',// Restrict query to a specific type (leave blank for
useStrictTypeFiltering:true,
locationBias:map.center,
isOpenNow:true,
language:'en-US',
maxResultCount:8,
minRating:1,// Specify a minimum rating.
region:'us',
## };
const{places}=awaitPlace.searchByText(request);
if(places.length){
const{LatLngBounds}=(awaitgoogle.maps.importLibrary(
## 'core'
))asgoogle.maps.CoreLibrary;
constbounds=newLatLngBounds();
// First remove all existing markers.
for(constidinmarkers){
markers[id].map=null;
## }
markers={};
// Loop through and get all the results.
places.forEach((place)=>{
constmarker=newAdvancedMarkerElement({
map,
position:place.location,
title:place.displayName,
## });
markers[place.id]=marker;
marker.addListener('gmp-click',()=>{
map.panTo(place.location);
updateInfoWindow(place.displayName,place.id,marker);
## });
if(place.location!=null){
bounds.extend(place.location);
## }
## });
map.fitBounds(bounds);
## }else{
console.log('No results');
## }
2/6/26, 10:49 AMText Search (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-search5/6

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
## }
// Helper function to create an info window.
asyncfunctionupdateInfoWindow(title,content,anchor){
infoWindow.setContent(content);
infoWindow.setHeaderContent(title);
infoWindow.open({
map,
anchor,
shouldFocus:false,
## });
## }
initMap();
a24a15323e7230973d44b60568147f527dab3a/dist/samples/place-text-search/docs/index.ts#L8-L117)
2/6/26, 10:49 AMText Search (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-search6/6