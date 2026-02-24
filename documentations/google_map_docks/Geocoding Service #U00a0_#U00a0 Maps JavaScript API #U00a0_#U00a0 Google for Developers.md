

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
## Geocoding Service
## Page Summary
## 
## 
Note: Server-side libraries
This page describes the client-side service available with the Maps JavaScript API. If you want to work with
Google Maps web services on your server, take a look at the Node.js Client for Google Maps Services
(/maps/web-services/client-library). The page at that link also introduces the Java Client, Python Client and Go
Client for Google Maps Services.
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
## Overview
Also see the Maps JavaScript API Reference: Geocoder (/maps/documentation/javascript/reference/geocoder)
Geocoding is the process of converting addresses
## (like "1600 Amphitheatre Parkway, Mountain View,
CA") into geographic coordinates (like latitude
37.423021 and longitude -122.083739), which you
can use to place markers or position the map.
Reverse geocoding is the process of converting
geographic coordinates into a human-readable
How to convert addresses to mHow to convert addresses to m......
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding1/29

address (see Reverse geocoding (Address Lookup)
(#ReverseGeocoding)).
You can also use the geocoder to find the address for a given place ID (#place-id).
The Maps JavaScript API provides a Geocoder class
(/maps/documentation/javascript/reference/geocoder) for geocoding and reverse geocoding dynamically
from user input. If instead you want to geocode static, known addresses, see the Geocoding web
service (/maps/documentation/geocoding).
Get started
Before using the Geocoding service in the Maps JavaScript API, first ensure that the Geocoding API
is enabled in the Google Cloud console, in the same project you set up for the Maps JavaScript API.
To view your list of enabled APIs:
- Go to the Google Cloud console
(https://console.cloud.google.com/project/_/apiui/apis/enabled?utm_source=Docs_EnabledAPIsView)
## .
- Click the Select a project button, then select the same project you set up for the Maps
JavaScript API and click Open.
- From the list of APIs on the Dashboard, look for Geocoding API.
- If you see the API in the list, you're all set. If the API is not listed, enable it:
a. At the top of the page, select ENABLE API to display the Library tab. Alternatively, from
the left side menu, select Library.
b. Search for Geocoding API, then select it from the results list.
c. Select ENABLE. When the process finishes, Geocoding API appears in the list of APIs on
the Dashboard.
Pricing and policies
## Pricing
To learn about pricing and usage policies for the JavaScript Geocoding service, see Usage and
Billing (/maps/documentation/geocoding/usage-and-billing) for the Geocoding API.
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding2/29

## Policies
Your use of the Geocoding service must be in accordance with the Policies for Geocoding API
## (/maps/documentation/geocoding/policies).
## Geocoding Requests
Accessing the Geocoding service is asynchronous, requiring a call to an external server. For this
reason, the geocode method returns a promise that resolves upon completion of the request. Once
resolved, you can use .then() or await to handle the response.
re
You access the Google Maps API geocoding service within your code using the
google.maps.Geocoder constructor object. The Geocoder.geocode() method initiates a request
to the geocoding service, passing it a GeocoderRequest object literal containing the input terms
and a callback method to execute upon receipt of the response.
The GeocoderRequest object literal contains the following fields:
Required parameters: You must supply one, and only one, of the following fields:
address — The address which you want to geocode.
or
location — The LatLng (or LatLngLiteral) for which you want to obtain the closest,
human-readable address. The geocoder performs a reverse geocode. See Reverse Geocoding
(#ReverseGeocoding) for more information.
or
## Code Tutor
## 
## {
address:string,
location:LatLng,
placeId:string,
bounds:LatLngBounds,
componentRestrictions:GeocoderComponentRestrictions,
region:string
## }
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding3/29

placeId — The place ID of the place for which you want to obtain the closest, human-
readable address. See more about retrieving an address for a place ID (#place-id).
Optional parameters:
bounds — The LatLngBounds
(/maps/documentation/javascript/reference/coordinates#LatLngBounds) within which to bias
geocode results more prominently. The bounds parameter will only influence, not fully restrict,
results from the geocoder. See more information about viewport biasing  (#GeocodingViewports)
below.
componentRestrictions — Used to restrict results to a specific area. See more information
about component filtering (#ComponentFiltering) below.
region — The region code, specified as a specified as a two-character (non-numeric)
Unicode region subtag. In most cases, these tags map directly to familiar ccTLD ("top-level
domain") two-character values. The region parameter will only influence, not fully restrict,
results from the geocoder. See more information about region code biasing
(#GeocodingRegionCodes) below.
extraComputations — The only allowed value for this parameter is ADDRESS_DESCRIPTORS.
See address descriptors (#GeocodingAddressDescriptors) for more details.
fulfillOnZeroResults — Fulfill the promise on a ZERO_RESULT status in the response. This
may be desired because even with zero geocoding results there may still be additional
response level fields returned. See Fulfill on Zero Results (#GeocodingFulfillOnZeroResults) for
more details.
## Geocoding Responses
The Geocoding service requires a callback method to execute upon retrieval of the geocoder's
results. This callback should pass two parameters to hold the results and a status code, in that
order.
Note: The Geocoding response also contains plus_code and address_descriptor fields at the response level,
but these are not accessible through the address_descriptor fields at the response level, but these are not
accessible through the callback. Instead, they should be accessed through the promise. See Fulfill on Zero
Results (#GeocodingFulfillOnZeroResults) for more details.
## Geocoding Results
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding4/29

The GeocoderResult object represents a single geocoding result. A geocode request may return
multiple result objects:
These fields are explained below:
types[] is an array indicating the address type of the returned result. This array contains a
set of zero or more tags identifying the type of feature returned in the result. For example, a
geocode of "Chicago" returns "locality" which indicates that "Chicago" is a city, and also
returns "political" which indicates it is a political entity. See more information about address
types and address component types (#address-types) below.
formatted_address is a string containing the human-readable address of this location.
Often this address is equivalent to the postal address. Note that some countries, such as the
United Kingdom, do not allow distribution of true postal addresses due to licensing
restrictions.
The formatted address is logically composed of one or more address components. For
example, the address "111 8th Avenue, New York, NY" consists of the following components:
"111" (the street number), "8th Avenue" (the route), "New York" (the city) and "NY" (the US
state).
Do not parse the formatted address programmatically. Instead you should use the individual
address components, which the API response includes in addition to the formatted address
results[]:{
types[]:string,
formatted_address:string,
address_components[]:{
short_name:string,
long_name:string,
postcode_localities[]:string,
types[]:string
## },
partial_match:boolean,
place_id:string,
postcode_localities[]:string,
geometry:{
location:LatLng,
location_type:GeocoderLocationType
viewport:LatLngBounds,
bounds:LatLngBounds
## }
## }
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding5/29

field.
address_components[] is an array containing the separate components applicable to this
address.
Each address component typically contains the following fields:
types[] is an array indicating the type of the address component. See the list of
supported types (/maps/documentation/places/web-service/place-types).
long_name is the full text description or name of the address component as returned by
the Geocoder.
short_name is an abbreviated textual name for the address component, if available. For
example, an address component for the state of Alaska may have a long_name of
"Alaska" and a short_name of "AK" using the 2-letter postal abbreviation.
Note the following facts about the address_components[] array:
The array of address components may contain more components than the
formatted_address.
The array does not necessarily include all the political entities that contain an address,
apart from those included in the formatted_address. To retrieve all the political entities
that contain a specific address, you should use reverse geocoding, passing the
latitude/longitude of the address as a parameter to the request.
The format of the response is not guaranteed to remain the same between requests. In
particular, the number of address_components varies based on the address requested
and can change over time for the same address. A component can change position in
the array. The type of the component can change. A particular component may be
missing in a later response.
See more information about address types and address component types (#address-types)
below.
partial_match indicates that the geocoder did not return an exact match for the original
request, though it was able to match part of the requested address. You may wish to examine
the original request for misspellings and/or an incomplete address.
Partial matches most often occur for street addresses that do not exist within the locality you
pass in the request. Partial matches may also be returned when a request matches two or
more locations in the same locality. For example, "Hillpar St, Bristol, UK" will return a partial
match for both Henry Street and Henrietta Street. Note that if a request includes a misspelled
address component, the geocoding service may suggest an alternative address. Suggestions
triggered in this way will also be marked as a partial match.
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding6/29

place_idis a unique identifier of a place, which can be used with other Google APIs. For
example, you can use the place_id with the Google Places API
(/maps/documentation/javascript/places) library to get details of a local business, such as phone
number, opening hours, user reviews, and more. See the place ID overview
## (/maps/documentation/javascript/place-id).
postcode_localities[] is an array denoting all the localities contained in a postal code, and
is only present when the result is a postal code that contains multiple localities.
geometry contains the following information:
location contains the geocoded latitude,longitude value. Note that we return this
location as a LatLng object, not as a formatted string.
location_type stores additional data about the specified location. The following values
are supported:
ROOFTOP indicates that the returned result reflects a precise geocode.
RANGE_INTERPOLATED indicates that the returned result reflects an approximation
(usually on a road) interpolated between two precise points (such as
intersections). Interpolated results are generally returned when rooftop geocodes
are unavailable for a street address.
GEOMETRIC_CENTER indicates that the returned result is the geometric center of a
result such as a polyline (for example, a street) or polygon (region).
APPROXIMATE indicates that the returned result is approximate.
viewport stores the recommended viewport for the returned result.
bounds (optionally returned) stores the LatLngBounds which can fully contain the
returned result. Note that these bounds may not match the recommended viewport. (For
example, San Francisco includes the Farallon Islands
(https://en.wikipedia.org/wiki/Farallon_Islands), which are technically part of the city, but
shouldn't be returned in the viewport.)
Addresses are returned by the Geocoder using the browser's preferred language setting, or the
language specified when loading the API JavaScript using the language parameter. (For more
information, see Localization. (/maps/documentation/javascript/localization))
Address types and address component types
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding7/29

The types[] array in the GeocoderResult
(/maps/documentation/javascript/3.exp/reference#GeocoderResult) in the response indicates the address
type. Examples of address types include a street address, a country, or a political entity. The types
array in the GeocoderAddressComponent
(/maps/documentation/javascript/3.exp/reference#GeocoderAddressComponent) indicates the type of each
part of the address. Examples include street number or country.
Addresses may have multiple types. The types may be considered 'tags'. For example, many cities
are tagged with the political and locality types.
The following types are supported and returned in both the address type and address component
type arrays:
Address TypeDescription
street_addressA precise street address.
routeA named route (such as "US 101").
intersectionA major intersection, usually of two major roads.
politicalA political entity. Usually, this type indicates a polygon of some civil
administration.
countryThe national political entity, and is typically the highest order type returned by
the Geocoder.
administrative_area_level_1A first-order civil entity below the country level. Within the United States,
these administrative levels are states. Not all nations exhibit these
administrative levels. In most cases, administrative_area_level_1
short names will closely match ISO 3166-2 subdivisions and other widely
circulated lists; however this is not guaranteed as our geocoding results are
based on a variety of signals and location data.
administrative_area_level_2A second-order civil entity below the country level. Within the United States,
these administrative levels are counties. Not all nations exhibit these
administrative levels.
administrative_area_level_3A third-order civil entity below the country level. This type indicates a minor
civil division. Not all nations exhibit these administrative levels.
administrative_area_level_4A fourth-order civil entity below the country level. This type indicates a minor
civil division. Not all nations exhibit these administrative levels.
administrative_area_level_5A fifth-order civil entity below the country level. This type indicates a minor
civil division. Not all nations exhibit these administrative levels.
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding8/29

Address TypeDescription
administrative_area_level_6A sixth-order civil entity below the country level. This type indicates a minor
civil division. Not all nations exhibit these administrative levels.
administrative_area_level_7A seventh-order civil entity below the country level. This type indicates a
minor civil division. Not all nations exhibit these administrative levels.
colloquial_areaA commonly-used alternative name for the entity.
localityAn incorporated city or town political entity.
sublocalityA first-order civil entity below a locality. For some locations may receive one
of the additional types: sublocality_level_1 to
sublocality_level_5. Each sublocality level is a civil entity. Larger
numbers indicate a smaller geographic area.
neighborhoodA named neighborhood.
premiseA named location, usually a building or collection of buildings with a common
name.
subpremiseAn addressable entity below the premise level, such as an apartment, unit, or
suite.
plus_codeAn encoded location reference, derived from latitude and longitude. Plus
codes can be used as a replacement for street addresses in places where
they do not exist (where buildings are not numbered or streets are not
named). See https://plus.codes
## (https://plus.codes)
for details.
postal_codeA postal code as used to address postal mail within the country.
natural_featureA prominent natural feature.
airportAn airport.
parkA named park.
point_of_interestA named point of interest. Typically, these "POI"s are prominent local entities
that don't easily fit in another category, such as "Empire State Building" or
"Eiffel Tower".
An empty list of types indicates there are no known types for the particular address component (for
example, Lieu-dit in France).
In addition to the above, address components may include the types below.
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding9/29

Note: This list is not exhaustive, and is subject to change.
In addition to the above, address components may include the types listed below.
Note: This list is not exhaustive, and is subject to change.
Address Component TypeDescription
floorThe floor of a building address.
establishmentTypically a place that has not yet been categorized.
landmarkA nearby place that is used as a reference, to aid navigation.
point_of_interestA named point of interest.
parkingA parking lot or parking structure.
post_boxA specific postal box.
postal_townA grouping of geographic areas, such as locality and sublocality, used
for mailing addresses in some countries.
roomThe room of a building address.
street_numberThe precise street number.
bus_station, train_station
and transit_station
The location of a bus, train or public transit stop.
## Status Codes
The status code may return one of the following values:
"OK" indicates that no errors occurred; the address was successfully parsed and at least one
geocode was returned.
"ZERO_RESULTS" indicates that the geocode was successful but returned no results. This may
occur if the geocoder was passed a non-existent address.
"OVER_QUERY_LIMIT" indicates that you are over your quota.
"REQUEST_DENIED" indicates that your request was denied. The web page is not allowed to
use the geocoder.
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding10/29

"INVALID_REQUEST" generally indicates that the query (address, components or latlng) is
missing.
"UNKNOWN_ERROR" indicates that the request couldn't be processed due to a server error. The
request may succeed if you try again.
"ERROR" indicates that the request timed out or there was a problem contacting the Google
servers. The request may succeed if you try again.
## Geocoding Example
The following example demonstrates geocoding an address and placing a marker at the returned
latitude and longitude values. The geocoding result is handled using a promise. Click anywhere on
the map to geocode the address at that location.
TypeScript
## (#typescript)
JavaScript (#javascript)
asyncfunctiongeocode(request:google.maps.GeocoderRequest){
clear();
geocoder
## .geocode(request)
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding11/29

View the complete example. (/maps/documentation/javascript/examples/geocoding-simple)
## Viewport Biasing
You can instruct the Geocoding Service to prefer results within a given viewport (expressed as a
bounding box). You do so by setting the bounds parameter within the GeocoderRequest object
literal to define the bounds of this viewport. Note that biasing only prefers results within the
bounds; if more relevant results exist outside of these bounds, they may be included.
For example, a geocode for "Winnetka" generally returns this suburb of Chicago:
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## .then((result)=>{
const{results}=result;
innerMap.setCenter(results[0].geometry.location);
marker.position=newgoogle.maps.LatLng(results[0].geometry.locati
mapElement.append(marker);
responseDiv.style.display='block';
response.innerText=JSON.stringify(result,null,2);
returnresults;
## })
## .catch((e)=>{
alert('Geocode was not successful for the following reason: '+e);
## });
## }
a24a15323e7230973d44b60568147f527dab3a/dist/samples/geocoding-simple/docs/index.ts#L79-L96)
## {
## "types":["locality","political"],
"formatted_address":"Winnetka, IL, USA",
## "address_components":[{
"long_name":"Winnetka",
"short_name":"Winnetka",
## "types":["locality","political"]
## },{
"long_name":"Illinois",
"short_name":"IL",
## "types":["administrative_area_level_1","political"]
## },{
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding12/29

However, specifying a bounds parameter defining a bounding box for the San Fernando Valley of
Los Angeles results in this geocode returning the neighborhood named "Winnetka" in that location:
"long_name":"United States",
"short_name":"US",
## "types":["country","political"]
## }],
## "geometry":{
## "location":[-87.7417070,42.1083080],
"location_type":"APPROXIMATE"
## },
"place_id":"ChIJW8Va5TnED4gRY91Ng47qy3Q"
## }
## {
## "types":["sublocality","political"],
"formatted_address":"Winnetka, California, USA",
## "address_components":[{
"long_name":"Winnetka",
"short_name":"Winnetka",
## "types":["sublocality","political"]
## },{
"long_name":"Los Angeles",
"short_name":"Los Angeles",
## "types":["administrative_area_level_3","political"]
## },{
"long_name":"Los Angeles",
"short_name":"Los Angeles",
## "types":["administrative_area_level_2","political"]
## },{
"long_name":"California",
"short_name":"CA",
## "types":["administrative_area_level_1","political"]
## },{
"long_name":"United States",
"short_name":"US",
## "types":["country","political"]
## }],
## "geometry":{
## "location":[34.213171,-118.571022],
"location_type":"APPROXIMATE"
## },
"place_id":"ChIJ0fd4S_KbwoAR2hRDrsr3HmQ"
## }
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding13/29

## Region Code Biasing
You can set the Geocoding Service to return results biased to a particular region explicitly using the
region parameter. This parameter takes a region code, specified as a two-character (non-numeric)
Unicode region subtag. These tags map directly to familiar ccTLD ("top-level domain") two-
character values such as "uk" in "co.uk" for example. In some cases, the region tag also supports
ISO-3166-1 codes, which sometimes differ from ccTLD values ("GB" for "Great Britain" for
example).
When using the region parameter:
Specify only one country or region. Multiple values are ignored, and could result in a failed
request.
Use only two-character region subtags (Unicode CLDR format). All other inputs will result in
errors.
Only the countries and regions listed in Google Maps Platform Coverage Details
(/maps/coverage) are supported.
Geocoding requests can be sent for every domain in which the main Google Maps application
offers geocoding. Note that biasing only prefers results for a specific domain; if more relevant
results exist outside of this domain, they may be included.
For example, a geocode for "Toledo" returns this result, as the default domain for the Geocoding
Service is set to the United States:
## {
## "types":["locality","political"],
"formatted_address":"Toledo, OH, USA",
## "address_components":[{
"long_name":"Toledo",
"short_name":"Toledo",
## "types":["locality","political"]
## },{
"long_name":"Ohio",
"short_name":"OH",
## "types":["administrative_area_level_1","political"]
## },{
"long_name":"United States",
"short_name":"US",
## "types":["country","political"]
## }],
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding14/29

A geocode for "Toledo" with the region field set to 'es' (Spain) will return the Spanish city:
## Component Filtering
You can set the Geocoding Service to return address results restricted to a specific area, by using a
components filter. Specify the filter in the componentRestrictions
(/maps/documentation/javascript/reference#GeocoderComponentRestrictions) parameter. Filter values
support the same methods of spelling correction and partial matching as other geocoding
requests.
The geocoder returns only the results that match all the component filters. That is, it evaluates the
filter specifications as an AND, not an OR.
A components filter consists of one or more of the following items:
"place_id":"ChIJeU4e_C2HO4gRRcM6RZ_IPHw"
## }
## {
## "types":["locality","political"],
"formatted_address":"Toledo, España",
## "address_components":[{
"long_name":"Toledo",
"short_name":"Toledo",
## "types":["locality","political"]
## },{
"long_name":"Toledo",
"short_name":"TO",
## "types":["administrative_area_level_2","political"]
## },{
"long_name":"Castilla-La Mancha",
"short_name":"CM",
## "types":["administrative_area_level_1","political"]
## },{
"long_name":"España",
"short_name":"ES",
## "types":["country","political"]
## }],
"place_id":"ChIJ8f21C60Lag0R_q11auhbf8Y"
## }
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding15/29

route matches long or short name of a route.
locality matches against locality and sublocality types.
administrativeArea matches all the levels of administrative area.
postalCode matches postal codes and postal code prefix  es.
country matches a country name or a two letter ISO 3166-1
(https://en.wikipedia.org/wiki/ISO_3166-1) country code. Note: The API follows the ISO standard
for defining countries, and the filtering works best when using the corresponding ISO code of
the country.
The following example demonstrates using the componentRestrictions
(/maps/documentation/javascript/reference#GeocoderComponentRestrictions) parameter to filter by
country and postalCode:
Fulfill on Zero Results
For reverse geocoding, by default the promise is broken on status=ZERO_RESULTS. However, the
additional response level fields of plus_code and address_descriptor may still be populated in
asyncfunctioncodeAddress(request:google.maps.GeocoderRequest){
clear();
geocoder.geocode({
componentRestrictions:{
country:'AU',
postalCode:'2000'
## }
## })
## .then((result)=>{
const{results}=result;
innerMap.setCenter(results[0].geometry.location);
letmarker=newgoogle.maps.marker.AdvancedMarkerElement({
map:innerMap,
position:results[0].geometry.location
## });
## })
## .catch((e)=>{
alert('Geocode was not successful for the following reason: '+e);
## });
## };
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding16/29

this case. If true is provided for the fulfillOnZeroResults parameter, populated in this case. If
true is provided for the fulfillOnZeroResults parameter, the promise is not broken and these
additional fields are accessible from the promise if present.
The following is an example of this behavior for a latitude/longitude in Antarctica. Even though
there are no reverse geocoding results, we can still print the plus code in the promise if we set
fulfillOnZeroResults=true.
## Address Descriptors
Address descriptors include additional information that help describe a location using landmarks
and areas. Check out the address descriptors demo
(https://mapsplatform.google.com/demos/address-descriptors/) to explore the feature.
Address descriptors can be enabled through the use of the extraComputations parameter. Include
extra_computations=ADDRESS_DESCRIPTORS in a geocoding request (#GeocodingExample) , reverse
geocoding request (#ReverseGeocoding) , or a places geocoding request (#place-id) to receive address
descriptors in your response.
Example in places geocoding
The following query contains the address of a place in Delhi.
functionaddressDescriptorReverseGeocoding(){
varlatlng=newgoogle.maps.LatLng(-75.290330,38.653861);
geocoder
## .geocode({
## 'location':latlng,
'fulfillOnZeroResults':true,
## })
## .then((response)=>{
console.log(response.plus_code);
## })
## .catch((error)=>{
window.alert(`Error: ${error}`);
## });
## }
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding17/29

Note: Not all places are compatible with address descriptors. Very large places (for example, an airport) or areas
(for example, a postal region) will never receive an address descriptor.
Example in reverse geocoding
The following query contains the latitude/longitude value for a location in Delhi.
functionaddressDescriptorPlaceIdLookup(){
geocoder.geocode({
geocoder.geocode({
'placeId':'ChIJyxAX8Bj9DDkRgBfAnBYa66Q',
'extraComputations':['ADDRESS_DESCRIPTORS']
## },function(results,status){
if(status=='OK'){
console.log(results[0].address_descriptor);
## }else{
window.alert('Geocode was not successful for the following reason: '+status);
## }
## });
## }
functionaddressDescriptorReverseGeocoding(){
varlatlng=newgoogle.maps.LatLng(28.640964,77.235875);
geocoder
## .geocode({
## 'location':latlng,
'extraComputations':["ADDRESS_DESCRIPTORS"],
## })
## .then((response)=>{
console.log(response.address_descriptor);
## })
## .catch((error)=>{
window.alert(`Error`);
## });
## }
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding18/29

Note: Reverse geocoding includes a single address descriptor at the response level. Geocoding and places
geocoding will receive an address descriptor for each compatible result in the response
## Address Descriptor Example
An example address_descriptor is as follows.
## {
## "address_descriptor":{
## "areas":[
## {
"containment":"OUTSKIRTS",
## "display_name":{
## "language_code":"en",
"text":"Turkman Gate"
## },
"place_id":"ChIJ_7LLvyb9DDkRMKKxP9YyXgs"
## },
## {
"containment":"OUTSKIRTS",
## "display_name":{
## "language_code":"en",
"text":"Chandni Chowk"
## },
"place_id":"ChIJWcXciBr9DDkRUb4dCDykTwI"
## },
## {
"containment":"NEAR",
## "display_name":{
## "language_code":"en",
"text":"Katar Ganj"
## },
"place_id":"ChIJH3cWUyH9DDkRaw-9CjvcRvY"
## }
## ],
## "landmarks":[
## {
## "display_name":{
## "language_code":"en",
"text":"Delite Cinema"
## },
## "straight_line_distance_meters":29.9306755065918,
"place_id":"ChIJLfiYDCT9DDkROoEa7NdupUM",
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding19/29

## "travel_distance_meters":418.7794799804688,
"spatial_relationship":"ACROSS_THE_ROAD",
## "types":["establishment","movie_theater","point_of_interest"]
## },
## {
## "display_name":{
## "language_code":"en",
"text":"YES Bank"
## },
## "straight_line_distance_meters":66.83731079101562,
"place_id":"ChIJFYHM3yb9DDkRRKGkZl2mpSQ",
## "travel_distance_meters":489.0340270996094,
"spatial_relationship":"DOWN_THE_ROAD",
## "types":["bank","establishment","finance","point_of_interest"]
## },
## {
## "display_name":{
## "language_code":"en",
"text":"UCO Bank"
## },
## "straight_line_distance_meters":25.38849639892578,
"place_id":"ChIJ-c6_wCb9DDkRjIk1LeqRtGM",
## "travel_distance_meters":403.2246398925781,
"spatial_relationship":"ACROSS_THE_ROAD",
## "types":["atm","bank","establishment","finance","point_of_interes
## },
## {
## "display_name":{
## "language_code":"en",
"text":"Delhi By Cycle Meeting Point"
## },
## "straight_line_distance_meters":44.02867126464844,
"place_id":"ChIJNxVfkSb9DDkRJD22l-eGFdM",
## "travel_distance_meters":97.41281890869141,
"spatial_relationship":"AROUND_THE_CORNER",
## "types":[
## "establishment",
## "point_of_interest",
## "tourist_attraction",
## "travel_agency"
## ]
## },
## {
## "display_name":{
## "language_code":"en",
"text":"Axis Bank Branch"
## },
## "straight_line_distance_meters":102.3495178222656,
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding20/29

There are two arrays in each address_descriptor object: landmarks and areas. The landmarks
array contains up to 5 results ranked in order of relevance by taking account of proximity to the
requested coordinate, the prevalence of the landmark and its visibility. Each landmark result
contains the following values:
place_id is the place ID of the landmarks result. See the place ID overview
## (/maps/documentation/javascript/place-id).
display_name is the display name of the landmark and contains language_code and text.
straight_line_distance_meters is the point to point distance in meters between the input
coordinate and the landmarks result.
travel_distance_meters is the distance in meters as traveled using the road network
(ignoring road restrictions) between the input coordinate and the landmarks result.
spatial_relationship is the estimated relationship between the input coordinate and the
landmarks result:
"NEAR" is the default relationship when none of the following applies.
"WITHIN" when the input coordinate is contained within the bounds of the structure
associated with the landmark.
"BESIDE" when the input coordinate is directly adjacent to the landmark or landmark's
access point.
"ACROSS_THE_ROAD" when the input coordinate is directly opposite of the landmark on
the other side of the route.
"DOWN_THE_ROAD" when the input coordinate is along the same route as the landmark,
but not "BESIDES" or "ACROSS_THE_ROAD".
"AROUND_THE_CORNER" when the input coordinate is along a perpendicular route as the
landmark (restricted to a single turn).
"place_id":"ChIJr3uaDCT9DDkR8roHTVSn1x4",
## "travel_distance_meters":330.8566284179688,
"spatial_relationship":"DOWN_THE_ROAD",
## "types":["bank","establishment","finance","point_of_interest"]
## }
## ]
## }
## }
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding21/29

"BEHIND" when the input coordinate is spatially close to the landmark, but far from its
access point.
types are the Place types (/maps/documentation/javascript/supported_types#table1) of the
landmark.
The areas object contains up to 3 responses and limits itself to places that represent small
regions, such as neighborhoods, sublocalities, and large complexes. Areas that contain the
requested coordinate are listed first and ordered from smallest to largest. Each areas result
contains the following values:
place_id is the place ID of the areas result. See the place ID overview
## (/maps/documentation/javascript/place-id).
display_name is the display name of the area and contains language_code and text.
containment is the estimated containment relationship between the input coordinate and the
areas result:
"NEAR" is the default relationship when none of the following applies.
"WITHIN" when the input coordinate is close to the center of the area.
"OUTSKIRTS" when the input coordinate is close to the edge of the area.
## Address Descriptor Coverage
Address descriptors are in GA for India. The use of address descriptors in India incurs no additional
cost and usage is covered by the existing Geocoding (India) Essentials SKU
## (/maps/billing-and-pricing/pricing-india#places-pricing).
## Feedback
This feature is available in all regions. It is in GA for India and in the pre-GA Experimental launch
stage for all other regions. We would appreciate feedback:
For issues related to the India region only, contact the support team
## (/maps/documentation/geocoding/support#contact-maps-support).
For feedback on the experimental release, email us at address-descriptors-
feedback@google.com (mailto:address-descriptors-feedback@google.com).
See Address descriptors coverage details
(/maps/documentation/geocoding/address-descriptors/coverage) for more information.
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding22/29

Reverse Geocoding (Address Lookup)
The term geocoding generally refers to translating a human-readable address into a location on a
map. The process of doing the converse, translating a location on the map into a human-readable
address, is known as reverse geocoding.
Instead of supplying a textual address, supply a comma-separated latitude/longitude pair in the
location parameter.
Note: If you include the componentRestrictions parameter in the request then the location parameter is
ignored.
The following example geocodes a latitude/longitude value and centers the map at that location,
bringing up an info window with the formatted address. Click anywhere on the map to geocode the
location or enter your own coordinates.
TypeScript
## (#typescript)
JavaScript (#javascript)
letmarker;
asyncfunctioninitMap(){
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding23/29

//  Request the needed libraries.
const[{Map,InfoWindow},{Geocoder},{AdvancedMarkerElement}]=
awaitPromise.all([
google.maps.importLibrary(
## 'maps'
)asPromise<google.maps.MapsLibrary>,
google.maps.importLibrary(
## 'geocoding'
)asPromise<google.maps.GeocodingLibrary>,
google.maps.importLibrary(
## 'marker'
)asPromise<google.maps.MarkerLibrary>,
## ]);
// Get the gmp-map element.
constmapElement=document.querySelector(
## 'gmp-map'
)asgoogle.maps.MapElement;
// Get the inner map.
constinnerMap=mapElement.innerMap;
// Get the latlng input box.
constlatLngQuery=document.getElementById('latlng')asHTMLInputElement;
// Get the submit button.
constsubmitButton=document.getElementById('submit')asHTMLElement;
// Set the cursor to crosshair.
innerMap.setOptions({
draggableCursor:'crosshair',
zoom:13,
mapTypeControl:false,
## });
// Create a marker for re-use.
marker=newAdvancedMarkerElement({
map:innerMap,
## });
marker.anchorTop="40px";
constgeocoder=newGeocoder();
constinfowindow=newInfoWindow();
// Add a click event listener to the submit button.
submitButton.addEventListener('click',()=>{
geocodeLatLng(geocoder,innerMap,infowindow);
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding24/29

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## });
// Add a click event listener to the map.
innerMap.addListener('click',(event)=>{
latLngQuery.value=`${event.latLng.lat()}, ${event.latLng.lng()}`;
geocodeLatLng(geocoder,innerMap,infowindow);
## });
// Make an initial request upon loading.
geocodeLatLng(geocoder,innerMap,infowindow);
## }
asyncfunctiongeocodeLatLng(
geocoder:google.maps.Geocoder,
map:google.maps.Map,
infowindow:google.maps.InfoWindow
## ){
constinput=(document.getElementById('latlng')asHTMLInputElement).value
constlatlngStr=input.split(',',2);
constlatlng={
lat:parseFloat(latlngStr[0]),
lng:parseFloat(latlngStr[1]),
## };
geocoder
## .geocode({location:latlng})
## .then((response)=>{
if(response.results[0]){
marker.position=latlng;
map.setCenter(latlng);
infowindow.setContent(response.results[0].formatted_address);
infowindow.open(map,marker);
## }else{
window.alert('No results found');
## }
## })
.catch((e)=>window.alert('Geocoder failed due to: '+e));
## }
initMap();
a24a15323e7230973d44b60568147f527dab3a/dist/samples/geocoding-reverse/docs/index.ts#L7-L97)
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding25/29

Note that in the previous example we showed the first result by selecting results[0]. The reverse
geocoder often returns more than one result. Geocoded addresses are not just postal addresses,
but any way to geographically name a location. For example, when geocoding a point in the city of
Chicago, the geocoded point may be labeled as a street address, as the city (Chicago), as its state
(Illinois) or as a country (The United States). All are addresses to the geocoder. The reverse
geocoder returns all of these results.
The reverse geocoder matches political entities (countries, provinces, cities and neighborhoods),
street addresses, and postal codes.
Here's an example of the list of addresses that the above query may return:
Addresses are returned in the order of best to least matches. Generally, the more exact address is
the most prominent result, as it is in this case. Note that we return different types of addresses,
from the most specific street address to less specific political entities such as neighborhoods,
cities, counties, states, etc. If you want to match a more general address, you may want to inspect
the results[].types field.
Note: Reverse geocoding is not an exact science. The geocoder will attempt to find the closest
addressable location within a certain tolerance.
View example (/maps/documentation/javascript/examples/geocoding-reverse)
## Try Sample
JSFiddle.net...
results[0].formatted_address:"277 Bedford Ave, Brooklyn, NY 11211, USA"
results[1].formatted_address:"Grand St/Bedford Av, Brooklyn, NY 11211, USA"
results[2].formatted_address:"Williamsburg, Brooklyn, NY, USA"
results[3].formatted_address:"Brooklyn, NY, USA"
results[4].formatted_address:"New York, NY, USA"
results[5].formatted_address:"Brooklyn, NY 11211, USA"
results[6].formatted_address:"Kings County, NY, USA"
results[7].formatted_address:"New York-Northern New Jersey-Long Island, NY-NJ-PA, US
results[8].formatted_address:"New York Metropolitan Area, USA"
results[9].formatted_address:"New York, USA"
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding26/29

Retrieving an Address for a Place ID
Supply a placeId to find the address for a given place ID. The place ID is a unique identifier that
can be used with other Google APIs. For example, you can supply the placeId returned by the
Roads API (/maps/documentation/roads/snap) to get the address for a snapped point. For more
information about place IDs, see the place ID overview (/maps/documentation/javascript/place-id).
When you supply a placeId, the request cannot contain any of the following fields:
address
latLng
location
componentRestrictions
The following example accepts a place ID, finds the corresponding address, and centers the map at
that location. It also brings up an info window showing the formatted address of the relevant place:
TypeScript
## (#typescript)
JavaScript (#javascript)
// Initialize the map.
functioninitMap():void{
constmap=newgoogle.maps.Map(
document.getElementById("map")asHTMLElement,
## {
zoom:8,
center:{lat:40.72,lng:-73.96},
## }
## );
constgeocoder=newgoogle.maps.Geocoder();
constinfowindow=newgoogle.maps.InfoWindow();
(document.getElementById("submit")asHTMLElement).addEventListener(
## "click",
## ()=>{
geocodePlaceId(geocoder,map,infowindow);
## }
## );
## }
// This function is called when the user clicks the UI button requesting
// a geocode of a place ID.
functiongeocodePlaceId(
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding27/29

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
View example (/maps/documentation/javascript/examples/geocoding-place-id)
## Try Sample
geocoder:google.maps.Geocoder,
map:google.maps.Map,
infowindow:google.maps.InfoWindow
## ){
constplaceId=(document.getElementById("place-id")asHTMLInputElement)
## .value;
geocoder
.geocode({placeId:placeId})
## .then(({results})=>{
if(results[0]){
map.setZoom(11);
map.setCenter(results[0].geometry.location);
constmarker=newgoogle.maps.Marker({
map,
position:results[0].geometry.location,
## });
infowindow.setContent(results[0].formatted_address);
infowindow.open(map,marker);
## }else{
window.alert("No results found");
## }
## })
.catch((e)=>window.alert("Geocoder failed due to: "+e));
## }
declareglobal{
interfaceWindow{
initMap:()=>void;
## }
## }
window.initMap=initMap;
s/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/samples/geocoding-place-id/index.ts#L10-L66)
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding28/29

JSFiddle.net...
## Google Cloud Shell...
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 10:45 AMGeocoding Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geocoding29/29