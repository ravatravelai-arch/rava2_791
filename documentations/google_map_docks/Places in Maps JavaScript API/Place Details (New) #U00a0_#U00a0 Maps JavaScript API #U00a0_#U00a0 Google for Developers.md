

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Place Details (New)
## Page Summary
## 
Select platform:

## Android (/maps/documentation/places/android-sdk/details-place)
iOS (/maps/documentation/places/ios-sdk/details-place)
JavaScript (/maps/documentation/javascript/place-details)
## Web Service (/maps/documentation/places/web-service/place-details)
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Fetch fields
If you have an existing Place object or place ID, use the Place.fetchFields() method to get
details about that place. Provide a comma-separated list of place data fields
(/maps/documentation/javascript/place-class-data-fields) to return; specify field names in camel case.
Use the returned Place object to get data for the requested fields.
The following example uses a place ID to create a new Place, calls Place.fetchFields()
requesting the displayName and formattedAddress fields, adds a marker to the map, and logs
some data to the console.
2/6/26, 10:50 AMPlace Details (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-details1/4

TypeScript
## (#typescript)
JavaScript (#javascript)
asyncfunctiongetPlaceDetails(){
const{Place}=(awaitgoogle.maps.importLibrary(
## 'places'
))asgoogle.maps.PlacesLibrary;
const{AdvancedMarkerElement}=(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
// Use place ID to create a new Place instance.
constplace=newPlace({
id:'ChIJyYB_SZVU2YARR-I1Jjf08F0',// San Diego Zoo
## });
// Call fetchFields, passing the desired data fields.
awaitplace.fetchFields({
fields:[
'displayName',
'formattedAddress',
## 'location',
'googleMapsURI',
## ],
## });
// Add an Advanced Marker
2/6/26, 10:50 AMPlace Details (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-details2/4

Note that Map and Place have been declared prior to this function:
See the complete example (/maps/documentation/javascript/examples/place-class)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
constmarker=newAdvancedMarkerElement({
map:innerMap,
position:place.location,
title:place.displayName,
## });
// Assemble the info window content.
constcontent=document.createElement('div');
constaddress=document.createElement('div');
constplaceId=document.createElement('div');
address.textContent=place.formattedAddress||'';
placeId.textContent=place.id;
content.append(placeId,address);
if(place.googleMapsURI){
constlink=document.createElement('a');
link.href=place.googleMapsURI;
link.target='_blank';
link.textContent='View Details on Google Maps';
content.appendChild(link);
## }
// Display an info window.
infoWindow.setHeaderContent(place.displayName);
infoWindow.setContent(content);
infoWindow.open({
anchor:marker,
## });
## }
ob/42a24a15323e7230973d44b60568147f527dab3a/dist/samples/place-class/docs/index.ts#L23-L74)
const{Map}=awaitgoogle.maps.importLibrary("maps");
const{Place}=awaitgoogle.maps.importLibrary("places");
2/6/26, 10:50 AMPlace Details (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-details3/4

(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 10:50 AMPlace Details (New)  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-details4/4