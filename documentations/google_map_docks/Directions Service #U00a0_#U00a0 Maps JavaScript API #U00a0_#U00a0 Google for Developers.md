

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
## Directions Service
Important: Using this service requires enabling the Directions API (Legacy) on your project
(https://console.cloud.google.com/apis/library/directions-backend.googleapis.com).
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
## 
Note: Server-side libraries
This page describes the client-side service available with the Maps JavaScript API. If you want to work with
Google Maps web services on your server, take a look at the Node.js Client for Google Maps Services
(/maps/web-services/client-library). The page at that link also introduces the Java Client, Python Client and Go
Client for Google Maps Services.
## Overview
Also see the Maps JavaScript API Reference: Directions (/maps/documentation/javascript/reference/directions)
You can calculate directions (using a variety of methods of transportation) by using the
DirectionsService object. This object communicates with the Google Maps API Directions
Service which receives direction requests and returns an efficient path. Travel time is the primary
factor which is optimized, but other factors such as distance, number of turns and many more may
be taken into account. You may either handle these directions results yourself or use the
DirectionsRenderer object to render these results.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions1/32

When specifying the origin or destination in a directions request, you can specify a query string (for
example, "Chicago, IL" or "Darwin, NSW, Australia"), a LatLng value, or a Place
(/maps/documentation/javascript/reference/directions#Place) object.
The Directions service can return multi-part directions using a series of waypoints. Directions are
displayed as a polyline drawing the route on a map, or additionally as a series of textual description
within a <div> element (for example, "Turn right onto the Williamsburg Bridge ramp").
Getting started
Before using the Directions service in the Maps JavaScript API, first ensure that the Directions API
(Legacy) is enabled in the Google Cloud console, in the same project you set up for the Maps
JavaScript API.
To view your list of enabled APIs:
- Go to the Google Cloud console
(https://console.cloud.google.com/project/_/apiui/apis/enabled?utm_source=Docs_EnabledAPIsView).
- Click the Select a project button, then select the same project you set up for the Maps
JavaScript API and click Open.
- From the list of APIs on the Dashboard, look for Directions API (Legacy).
- If you see the API in the list, you’re all set. If the API is not listed, enable it at
https://console.cloud.google.com/apis/library/directions-backend.googleapis.com
(https://console.cloud.google.com/apis/library/directions-backend.googleapis.com)
Pricing and policies
## Pricing
To learn about pricing and usage policies for the JavaScript Directions service, see Usage and
Billing (/maps/documentation/directions/usage-and-billing) for the Directions API (Legacy).
## Policies
Use of the Directions service must be in accordance with the policies described for the Directions
API (Legacy) (/maps/documentation/directions/policies).
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions2/32

## Directions Requests
Accessing the Directions service is asynchronous, since the Google Maps API needs to make a call
to an external server. For that reason, you need to pass a callback method to execute upon
completion of the request. This callback method should process the result(s). Note that the
Directions service may return more than one possible itinerary as an array of separate routes[].
To use directions in the Maps JavaScript API, create an object of type DirectionsService and call
DirectionsService.route() to initiate a request to the Directions service, passing it a
DirectionsRequest object literal containing the input terms and a callback method to execute
upon receipt of the response.
The DirectionsRequest object literal contains the following fields:
These fields are explained below:
origin (required) specifies the start location from which to calculate directions. This value
may be specified as a String (for example, "Chicago, IL"), as a LatLng value or as a Place
(/maps/documentation/javascript/reference/directions#Place) object. If you use a Place
(/maps/documentation/javascript/reference/directions#Place) object, you can specify a place ID
(/maps/documentation/places/web-service/place-id), a query string or a LatLng location. You can
retrieve place IDs from the Geocoding, Place Search and Place Autocomplete services in the
Maps JavaScript API. For an example using place IDs from Place Autocomplete, see Place
Autocomplete and Directions
## (/maps/documentation/javascript/examples/places-autocomplete-directions).
## {
origin:LatLng|String|google.maps.Place,
destination:LatLng|String|google.maps.Place,
travelMode:TravelMode,
transitOptions:TransitOptions,
drivingOptions:DrivingOptions,
unitSystem:UnitSystem,
waypoints[]:DirectionsWaypoint,
optimizeWaypoints:Boolean,
provideRouteAlternatives:Boolean,
avoidFerries:Boolean,
avoidHighways:Boolean,
avoidTolls:Boolean,
region:String
## }
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions3/32

destination (required) specifies the end location to which to calculate directions. The
options are the same as for the origin field described above.
travelMode (required) specifies what mode of transport to use when calculating directions.
Valid values are specified in Travel Modes (#TravelModes) below.
transitOptions (optional) specifies values that apply only to requests where travelMode is
TRANSIT. Valid values are described in Transit Options (#TransitOptions), below.
drivingOptions (optional) specifies values that apply only to requests where travelMode is
DRIVING. Valid values are described in Driving Options (#DrivingOptions), below.
unitSystem (optional) specifies what unit system to use when displaying results. Valid values
are specified in Unit Systems (#UnitSystems) below.
waypoints[] (optional) specifies an array of DirectionsWaypoints. Waypoints alter a route
by routing it through the specified location(s). A waypoint is specified as an object literal with
fields shown below:
location specifies the location of the waypoint, as a LatLng, as a Place
(/maps/documentation/javascript/reference/directions#Place) object or as a String which will
be geocoded.
stopover is a boolean which indicates that the waypoint is a stop on the route, which
has the effect of splitting the route into two routes.
(For more information on waypoints, see Using Waypoints in Routes (#Waypoints) below.)
optimizeWaypoints (optional) specifies that the route using the supplied waypoints may be
optimized by rearranging the waypoints in a more efficient order. If true, the Directions
service will return the reordered waypoints in a waypoint_order field.(For more information,
see Using Waypoints in Routes (#Waypoints) below.)
provideRouteAlternatives (optional) when set to true specifies that the Directions service
may provide more than one route alternative in the response. Note that providing route
alternatives may increase the response time from the server. This is only available for
requests without intermediate waypoints.
avoidFerries (optional) when set to true indicates that the calculated route(s) should avoid
ferries, if possible.
avoidHighways (optional) when set to true indicates that the calculated route(s) should
avoid major highways, if possible.
avoidTolls (optional) when set to true indicates that the calculated route(s) should avoid
toll roads, if possible.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions4/32

region (optional) specifies the region code, specified as a ccTLD ("top-level domain") two-
character value. (For more information see Region Biasing (#DirectionsRegionBiasing) below.)
Note: The durationInTraffic field is now deprecated. It was previously the recommended way for Google Maps
Platform Premium Plan customers to specify whether the result should include a duration that takes into account
current traffic conditions. You should now use the drivingOptions field instead.
Below is a sample DirectionsRequest:
## Travel Modes
When you calculate directions, you need to specify which transportation mode to use. The
following travel modes are currently supported:
DRIVING (Default) indicates standard driving directions using the road network.
BICYCLING requests bicycling directions via bicycle paths & preferred streets.
TRANSIT requests directions via public transit routes.
WALKING requests walking directions via pedestrian paths & sidewalks.
## {
origin:'Chicago, IL',
destination:'Los Angeles, CA',
waypoints:[
## {
location:'Joplin, MO',
stopover:false
## },{
location:'Oklahoma City, OK',
stopover:true
## }],
provideRouteAlternatives:false,
travelMode:'DRIVING',
drivingOptions:{
departureTime:newDate(/* now, or future date */),
trafficModel:'pessimistic'
## },
unitSystem:google.maps.UnitSystem.IMPERIAL
## }
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions5/32

Consult the Google Maps Platform Coverage Details (/maps/coverage) to determine to what extent a
country supports directions. If you request directions for a region in which that direction type is not
available, the response will return the DirectionsStatus="ZERO_RESULTS".
Note: Walking directions may not include clear pedestrian paths, so walking directions will return warnings in the
DirectionsResult. These warnings must always be displayed to the user. If you do not use the default
DirectionsRenderer then you are responsible for ensuring the warnings are displayed.
## Transit Options
The available options for a directions request vary between travel modes. When requesting transit
directions, the avoidHighways, avoidTolls, waypoints[] and optimizeWaypoints options will be
ignored. You can specify transit specific routing options through the TransitOptions
(/maps/documentation/javascript/3.exp/reference#TransitOptions) object literal.
Transit directions are time sensitive. Directions will only be returned for times in the future.
The TransitOptions object literal contains the following fields:
These fields are explained below:
arrivalTime (optional) specifies the desired time of arrival as a Date object. If arrival time is
specified, departure time is ignored.
departureTime (optional) specifies the desired time of departure as a Date object. The
departureTime will be ignored if arrivalTime is specified. Defaults to now (that is, the
current time) if no value is specified for either departureTime or arrivalTime.
modes[] (optional) is an array containing one or more TransitMode object literals. This field
may only be included if the request includes an API key. Each TransitMode specifies a
preferred mode of transit. The following values are permitted:
BUS indicates that the calculated route should prefer travel by bus.
## {
arrivalTime:Date,
departureTime:Date,
modes[]:TransitMode,
routingPreference:TransitRoutePreference
## }
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions6/32

RAIL indicates that the calculated route should prefer travel by train, tram, light rail, and
subway.
SUBWAY indicates that the calculated route should prefer travel by subway.
TRAIN indicates that the calculated route should prefer travel by train.
TRAM indicates that the calculated route should prefer travel by tram and light rail.
routingPreference (optional) specifies preferences for transit routes. Using this option, you
can bias the options returned, rather than accepting the default best route chosen by the API.
This field may only be specified if the request includes an API key. The following values are
permitted:
FEWER_TRANSFERS indicates that the calculated route should prefer a limited number of
transfers.
LESS_WALKING indicates that the calculated route should prefer limited amounts of
walking.
A sample DirectionsRequest by transit is shown below:
## Driving Options
You can specify routing options for driving directions through the DrivingOptions
(/maps/documentation/javascript/3.exp/reference#DrivingOptions) object.
The DrivingOptions object contains the following fields:
## {
origin:'Hoboken NJ',
destination:'Carroll Gardens, Brooklyn',
travelMode:'TRANSIT',
transitOptions:{
departureTime:newDate(1337675679473),
modes:['BUS'],
routingPreference:'FEWER_TRANSFERS'
## },
unitSystem:google.maps.UnitSystem.IMPERIAL
## }
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions7/32

These fields are explained below:
departureTime (required for the drivingOptions object literal to be valid) specifies the
desired time of departure as a Date object. The value must be set to the current time or some
time in the future. It cannot be in the past. (The API converts all dates to UTC to ensure
consistent handling across time zones.) For Google Maps Platform Premium Plan customers,
if you include the departureTime in the request, the API returns the best route given the
expected traffic conditions at the time, and includes the predicted time in traffic
(duration_in_traffic) in the response. If you don't specify a departure time (that is, if the
request does not include drivingOptions), the returned route is a generally good route
without taking traffic conditions into account.
trafficModel (optional) specifies the assumptions to use when calculating time in traffic.
This setting affects the value returned in the duration_in_traffic field in the response,
which contains the predicted time in traffic based on historical averages. Defaults to
bestguess. The following values are permitted:
bestguess (default) indicates that the returned duration_in_traffic should be the
best estimate of travel time given what is known about both historical traffic conditions
and live traffic. Live traffic becomes more important the closer the departureTime is to
now.
pessimistic indicates that the returned duration_in_traffic should be longer than
the actual travel time on most days, though occasional days with particularly bad traffic
conditions may exceed this value.
optimistic indicates that the returned duration_in_traffic should be shorter than
the actual travel time on most days, though occasional days with particularly good
traffic conditions may be faster than this value.
Caution: If you do not specify a departure time, the route and duration chosen are based on road network and
average time-independent traffic conditions, not current road conditions. Consequently, routes may include roads
that are temporarily closed. Results for a given request may vary over time due to changes in the road network,
updated average traffic conditions, and the distributed nature of the service. Results may also vary between
nearly-equivalent routes at any time or frequency.
## {
departureTime:Date,
trafficModel:TrafficModel
## }
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions8/32

Note: To ensure that your request uses live traffic information, set the departureTime to now. Requests using
traffic information are billed at a higher rate. Learn more about how Google Maps Platform products are billed.
## (/maps/billing/understanding-cost-of-use)
Below is a sample DirectionsRequest for driving directions:
## Unit Systems
By default, directions are calculated and displayed using the unit system of the origin's country or
region. (Note: Origins expressed using latitude/longitude coordinates rather than addresses always
default to metric units.) For example, a route from "Chicago, IL" to "Toronto, ONT" will display
results in miles, while the reverse route will display results in kilometers. You can override this unit
system by setting one explicitly within the request using one of the following UnitSystem values:
UnitSystem.METRIC specifies usage of the metric system. Distances are shown using
kilometers.
UnitSystem.IMPERIAL specifies usage of the Imperial (English) system. Distances are shown
using miles.
Note: This unit system setting only affects the text displayed to the user. The directions result also
contains distance values, not shown to the user, which are always expressed in meters.
Region Biasing for Directions
The Google Maps API Directions Service returns address results influenced by the domain (region
or country) from which you loaded the JavaScript bootstrap. (Since most users load
https://maps.googleapis.com/ this sets an implicit domain to the United States.) If you load the
bootstrap from a different supported domain, you will get results influenced by that domain. For
## {
origin:'Chicago, IL',
destination:'Los Angeles, CA',
travelMode:'DRIVING',
drivingOptions:{
departureTime:newDate(Date.now()+N),// for the time N milliseconds from now
trafficModel:'optimistic'
## }
## }
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions9/32

example, searches for "San Francisco" may return different results from applications loading
https://maps.googleapis.com/ (the United States) than one loading http://maps.google.es/
(Spain).
You can also set the Directions service to return results biased to a particular region using the
region parameter. This parameter takes a region code, specified as a two-character (non-numeric)
Unicode region subtag. In most cases, these tags map directly to ccTLD ("top-level domain") two-
character values such as "uk" in "co.uk" for example. In some cases, the region tag also supports
ISO-3166-1 codes, which sometimes differ from ccTLD values ("GB" for "Great Britain" for
example).
When using the region parameter:
Specify only one country or region. Multiple values are ignored, and could result in a failed
request.
Use only two-character region subtags (Unicode CLDR format). All other inputs will result in
errors.
Region biasing is supported only for the countries and regions supporting directions. Consult
Google Maps Platform Coverage Details (/maps/coverage) to see international coverage for the
Directions API (Legacy).
## Rendering Directions
Initiating a directions request to the DirectionsService with the route() method requires
passing a callback which executes upon completion of the service request. This callback will return
a DirectionsResult and a DirectionsStatus code in the response.
Status of Directions Query
The DirectionsStatus may return the following values:
OK indicates the response contains a valid DirectionsResult.
NOT_FOUND indicates at least one of the locations specified in the request's origin, destination,
or waypoints could not be geocoded.
ZERO_RESULTS indicates no route could be found between the origin and destination.
MAX_WAYPOINTS_EXCEEDED indicates that too many DirectionsWaypoint fields were provided
in the DirectionsRequest. See the section below on limits for way points (#waypoint-limits).
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions10/32

MAX_ROUTE_LENGTH_EXCEEDED indicates the requested route is too long and cannot be
processed. This error occurs when more complex directions are returned. Try reducing the
number of waypoints, turns, or instructions.
INVALID_REQUEST indicates that the provided DirectionsRequest was invalid. The most
common causes of this error code are requests that are missing either an origin or
destination, or a transit request that includes waypoints.
OVER_QUERY_LIMIT indicates the webpage has sent too many requests within the allowed
time period.
REQUEST_DENIED indicates the webpage is not allowed to use the directions service.
UNKNOWN_ERROR indicates a directions request could not be processed due to a server error.
The request may succeed if you try again.
You should ensure that the directions query returned valid results by checking this value before
processing the result.
Displaying the DirectionsResult
The DirectionsResult contains the result of the directions query, which you may either handle
yourself, or pass to a DirectionsRenderer object, which can automatically handle displaying the
result on a map.
To display a DirectionsResult using a DirectionsRenderer, you need to do the following:
- Create a DirectionsRenderer object.
- Call setMap() on the renderer to bind it to the passed map.
- Call setDirections() on the renderer, passing it the DirectionsResult as noted above.
Because the renderer is an MVCObject, it will automatically detect any changes to its
properties and update the map when its associated directions have changed.
The following example calculates directions between two locations on Route 66, where the origin
and destination are set by the given "start" and "end" values in the dropdown lists. The
DirectionsRenderer handles display of the polyline between the indicated locations, and the
placement of markers at the origin, destination, and any waypoints, if applicable.
functioninitMap(){
vardirectionsService=newgoogle.maps.DirectionsService();
vardirectionsRenderer=newgoogle.maps.DirectionsRenderer();
varchicago=newgoogle.maps.LatLng(41.850033,-87.6500523);
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions11/32

In the HTML body:
varmapOptions={
zoom:7,
center:chicago
## }
varmap=newgoogle.maps.Map(document.getElementById('map'),mapOptions);
directionsRenderer.setMap(map);
## }
functioncalcRoute(){
varstart=document.getElementById('start').value;
varend=document.getElementById('end').value;
varrequest={
origin:start,
destination:end,
travelMode:'DRIVING'
## };
directionsService.route(request,function(result,status){
if(status=='OK'){
directionsRenderer.setDirections(result);
## }
## });
## }
## <div>
<strong>Start: </strong>
<select id="start" onchange="calcRoute();">
<option value="chicago, il">Chicago</option>
<option value="st louis, mo">St Louis</option>
<option value="joplin, mo">Joplin, MO</option>
<option value="oklahoma city, ok">Oklahoma City</option>
<option value="amarillo, tx">Amarillo</option>
<option value="gallup, nm">Gallup, NM</option>
<option value="flagstaff, az">Flagstaff, AZ</option>
<option value="winona, az">Winona</option>
<option value="kingman, az">Kingman</option>
<option value="barstow, ca">Barstow</option>
<option value="san bernardino, ca">San Bernardino</option>
<option value="los angeles, ca">Los Angeles</option>
## </select>
<strong>End: </strong>
<select id="end" onchange="calcRoute();">
<option value="chicago, il">Chicago</option>
<option value="st louis, mo">St Louis</option>
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions12/32

View example (/maps/documentation/javascript/examples/directions-simple)
The following example shows directions using different modes of travel between the Haight-
Ashbury to Ocean Beach in San Francisco, CA:
<option value="joplin, mo">Joplin, MO</option>
<option value="oklahoma city, ok">Oklahoma City</option>
<option value="amarillo, tx">Amarillo</option>
<option value="gallup, nm">Gallup, NM</option>
<option value="flagstaff, az">Flagstaff, AZ</option>
<option value="winona, az">Winona</option>
<option value="kingman, az">Kingman</option>
<option value="barstow, ca">Barstow</option>
<option value="san bernardino, ca">San Bernardino</option>
<option value="los angeles, ca">Los Angeles</option>
## </select>
## </div>
functioninitMap(){
vardirectionsService=newgoogle.maps.DirectionsService();
vardirectionsRenderer=newgoogle.maps.DirectionsRenderer();
varhaight=newgoogle.maps.LatLng(37.7699298,-122.4469157);
varoceanBeach=newgoogle.maps.LatLng(37.7683909618184,-122.51089453697205);
varmapOptions={
zoom:14,
center:haight
## }
varmap=newgoogle.maps.Map(document.getElementById('map'),mapOptions);
directionsRenderer.setMap(map);
## }
functioncalcRoute(){
varselectedMode=document.getElementById('mode').value;
varrequest={
origin:haight,
destination:oceanBeach,
// Note that JavaScript allows us to access the constant
// using square brackets and a string value as its
## // "property."
travelMode:google.maps.TravelMode[selectedMode]
## };
directionsService.route(request,function(response,status){
if(status=='OK'){
directionsRenderer.setDirections(response);
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions13/32

In the HTML body:
View example (/maps/documentation/javascript/examples/directions-travel-modes)
A DirectionsRenderer not only handles display of the polyline and any associated markers, but
also can handle the textual display of directions as a series of steps. To do so, call setPanel() on
your DirectionsRenderer, passing it the <div> in which to display this information. Doing so also
ensures that you display the appropriate copyright information, and any warnings which may be
associated with the result.
Textual directions will be provided using the browser's preferred language setting, or the language
specified when loading the API JavaScript using the language parameter. (For more information,
see Localization. (/maps/documentation/javascript/localization)) In the case of transit directions, the
time will be displayed in the time zone at that transit stop.
The following example is identical to that shown above, but includes a <div> panel in which to
display directions:
## }
## });
## }
## <div>
<strong>Mode of Travel: </strong>
<select id="mode" onchange="calcRoute();">
<option value="DRIVING">Driving</option>
<option value="WALKING">Walking</option>
<option value="BICYCLING">Bicycling</option>
<option value="TRANSIT">Transit</option>
## </select>
## </div>
functioninitMap(){
vardirectionsService=newgoogle.maps.DirectionsService();
vardirectionsRenderer=newgoogle.maps.DirectionsRenderer();
varchicago=newgoogle.maps.LatLng(41.850033,-87.6500523);
varmapOptions={
zoom:7,
center:chicago
## }
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions14/32

In the HTML body:
View example (/maps/documentation/javascript/examples/directions-panel)
The DirectionsResult Object
When sending a directions request to the DirectionsService, you receive a response consisting
of a status code, and a result, which is a DirectionsResult object. The DirectionsResult is an
object literal with the following fields:
geocoded_waypoints[] contains an array of DirectionsGeocodedWaypoint objects, each
one containing details about the geocoding of origin, destination and waypoints.
routes[] contains an array of DirectionsRoute objects. Each route indicates a way to get
from the origin to the destination provided in the DirectionsRequest. Generally, only one
route is returned for any given request, unless the request's provideRouteAlternatives field
is set to true, in which, multiple routes may be returned.
varmap=newgoogle.maps.Map(document.getElementById('map'),mapOptions);
directionsRenderer.setMap(map);
directionsRenderer.setPanel(document.getElementById('directionsPanel'));
## }
functioncalcRoute(){
varstart=document.getElementById('start').value;
varend=document.getElementById('end').value;
varrequest={
origin:start,
destination:end,
travelMode:'DRIVING'
## };
directionsService.route(request,function(response,status){
if(status=='OK'){
directionsRenderer.setDirections(response);
## }
## });
## }
<div id="map" style="float:left;width:70%;height:100%"></div>
<div id="directionsPanel" style="float:right;width:30%;height:100%"></div>
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions15/32

Note: The via_waypoint property is deprecated in alternative routes. Version 3.27 is the last version of the API
that adds extra via waypoints in alternative routes. For versions 3.28 and higher of the API, you can continue to
implement draggable directions using the Directions service by disabling the dragging of alternative routes. Only
the main route should be draggable. Users can drag the main route until it matches an alternative route.
## Directions Geocoded Waypoints
A DirectionsGeocodedWaypoint contains details about the geocoding of origin, destination and
waypoints.
The DirectionsGeocodedWaypoint is an object literal with the following fields:
geocoder_status indicates the status code resulting from the geocoding operation. This field
may contain the following values.
"OK" indicates that no errors occurred; the address was successfully parsed and at
least one geocode was returned.
"ZERO_RESULTS" indicates that the geocode was successful but returned no results.
This may occur if the geocoder was passed a non-existent address.
partial_match indicates that the geocoder did not return an exact match for the original
request, though it was able to match part of the requested address. You may wish to examine
the original request for misspellings and/or an incomplete address.
Partial matches most often occur for street addresses that do not exist within the locality you
pass in the request. Partial matches may also be returned when a request matches two or
more locations in the same locality. For example, "Hillpar St, Bristol, UK" will return a partial
match for both Henry Street and Henrietta Street. Note that if a request includes a misspelled
address component, the geocoding service may suggest an alternative address. Suggestions
triggered in this way will also be marked as a partial match.
place_idis a unique identifier of a place, which can be used with other Google APIs. For
example, you can use the place_id with the Google Places API
(/maps/documentation/javascript/places) library to get details of a local business, such as phone
number, opening hours, user reviews, and more. See the place ID overview
## (/maps/documentation/places/web-service/place-id).
types[] is an array indicating the type of the returned result. This array contains a set of zero
or more tags identifying the type of feature returned in the result. For example, a geocode of
"Chicago" returns "locality" which indicates that "Chicago" is a city, and also returns "political"
which indicates it is a political entity.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions16/32

## 
## Directions Routes
Note: The legacy DirectionsTrip object has been renamed DirectionsRoute. Note that a route now refers to
the entire start to end journey, rather than simply a leg of a parent trip.
A DirectionsRoute contains a single result from the specified origin and destination. This route
may consist of one or more legs (of type DirectionsLeg) depending on whether any waypoints
were specified. As well, the route also contains copyright and warning information which must be
displayed to the user in addition to the routing information.
The DirectionsRoute is an object literal with the following fields:
legs[] contains an array of DirectionsLeg objects, each of which contains information
about a leg of the route, from two locations within the given route. A separate leg will be
present for each waypoint or destination specified. (A route with no waypoints will contain
exactly one DirectionsLeg.) Each leg consists of a series of DirectionSteps.
waypoint_order contains an array indicating the order of any waypoints in the calculated
route. This array may contain an altered order if the DirectionsRequest was passed
optimizeWaypoints: true.
overview_path contains an array of LatLngs that represent an approximate (smoothed) path
of the resulting directions.
overview_polyline contains a single points object that holds an encoded polyline
(/maps/documentation/utilities/polylinealgorithm) representation of the route. This polyline is an
approximate (smoothed) path of the resulting directions.
bounds contains a LatLngBounds indicating the bounds of the polyline along this given route.
copyrights contains the copyrights text to be displayed for this route.
Note: If you do not use the provided DirectionsRenderer object, you must handle and display this
information yourself.
warnings[] contains an array of warnings to be displayed when showing these directions. If
you do not use the provided DirectionsRenderer object, you must handle and display these
warnings yourself.
fare contains the total fare (that is, the total ticket costs) on this route. This property is only
returned for transit requests and only for routes where fare information is available for all
transit legs. The information includes:
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions17/32

currency: An ISO 4217 currency code (https://en.wikipedia.org/wiki/ISO_4217) indicating
the currency that the amount is expressed in.
value: The total fare amount, in the currency specified above.
## Directions Legs
Note: The legacy DirectionsRoute object has been renamed DirectionsLeg.
A DirectionsLeg defines a single leg of a journey from the origin to the destination in the
calculated route. For routes that contain no waypoints, the route will consist of a single "leg," but
for routes that define one or more waypoints, the route will consist of one or more legs,
corresponding to the specific legs of the journey.
The DirectionsLeg is an object literal with the following fields:
steps[] contains an array of DirectionsStep objects denoting information about each
separate step of the leg of the journey.
distance indicates the total distance covered by this leg, as a Distance object of the
following form:
value indicates the distance in meters
text contains a string representation of the distance, which by default is displayed in
units as used at the origin. (For example, miles will be used for any origin within the
United States.) You may override this unit system by specifically setting a UnitSystem
in the original query. Note that regardless of what unit system you use, the
distance.value field always contains a value expressed in meters.
These fields may be undefined if the distance is unknown.
duration indicates the total duration of this leg, as a Duration object of the following form:
value indicates the duration in seconds.
text contains a string representation of the duration.
These fields may be undefined if the duration is unknown.
duration_in_traffic indicates the total duration of this leg, taking into account current
traffic conditions. The duration_in_traffic is returned only if all of the following are true:
The request does not include stopover waypoints. That is, it doesn't include waypoints
where stopover is true.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions18/32

The request is specifically for driving directions—the mode is set to driving.
The departureTime is included as part of the drivingOptions field in the request.
Traffic conditions are available for the requested route.
The duration_in_traffic contains the following fields:
value indicates the duration in seconds.
text contains a human-readable representation of the duration.
arrival_time contains the estimated time of arrival for this leg. This property is only
returned for transit directions. The result is returned as a Time object with three properties:
value the time specified as a JavaScript Date object.
text the time specified as a string. The time is displayed in the time zone of the transit
stop.
time_zone contains the time zone of this station. The value is the name of the time
zone as defined in the IANA Time Zone Database (http://www.iana.org/time-zones), e.g.
"America/New_York".
departure_time contains the estimated time of departure for this leg, specified as a Time
object. The departure_time is only available for transit directions.
start_location contains the LatLng of the origin of this leg. Because the Directions Web
Service calculates directions between locations by using the nearest transportation option
(usually a road) at the start and end points, start_location may be different than the
provided origin of this leg if, for example, a road is not near the origin.
end_location contains the LatLng of the destination of this leg. Because the
DirectionsService calculates directions between locations by using the nearest
transportation option (usually a road) at the start and end points, end_location may be
different than the provided destination of this leg if, for example, a road is not near the
destination.
start_address contains the human-readable address (typically a street address) of the start
of this leg.
This content is meant to be read as-is. Do not programmatically parse the formatted address.
end_address contains the human-readable address (typically a street address) of the end of
this leg.
This content is meant to be read as-is. Do not programmatically parse the formatted address.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions19/32

## Directions Steps
A DirectionsStep is the most atomic unit of a direction's route, containing a single step
describing a specific, single instruction on the journey. E.g. "Turn left at W. 4th St." The step not
only describes the instruction but also contains distance and duration information relating to how
this step relates to the following step. For example, a step denoted as "Merge onto I-80 West" may
contain a duration of "37 miles" and "40 minutes," indicating that the next step is 37 miles/40
minutes from this step.
When using the Directions service to search for transit directions, the steps array will include
additional Transit Specific Information (#TransitInformation) in the form of a transit object. If the
directions include multiple modes of transportation, detailed directions will be provided for walking
or driving steps in a steps[] array. For example, a walking step will include directions from the
start and end locations: "Walk to Innes Ave & Fitch St". That step will include detailed walking
directions for that route in the steps[] array, such as: "Head north-west", "Turn left onto Arelious
Walker", and "Turn left onto Innes Ave".
The DirectionsStep is an object literal with the following fields:
instructions contains instructions for this step within a text string.
distance contains the distance covered by this step until the next step, as a Distance object.
(See the description in DirectionsLeg above.) This field may be undefined if the distance is
unknown.
duration contains an estimate of the time required to perform the step, until the next step, as
a Duration object. (See the description in DirectionsLeg above.) This field may be
undefined if the duration is unknown.
start_location contains the geocoded LatLng of the starting point of this step.
end_location contains the LatLng of the ending point of this step.
polyline contains a single points object that holds an encoded polyline
(/maps/documentation/utilities/polylinealgorithm) representation of the step. This polyline is an
approximate (smoothed) path of the step.
steps[] a DirectionsStep object literal that contains detailed directions for walking or
driving steps in transit directions. Sub-steps are only available for transit directions.
travel_mode contains the TravelMode used in this step. Transit directions may include a
combination of walking and transit directions.
path contains an array of LatLngs describing the course of this step.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions20/32

transit contains transit specific information, such as the arrival and departure times, and
the name of the transit line.
## Transit Specific Information
Transit directions return additional information that is not relevant for other modes of
transportation. These additional properties are exposed through the TransitDetails object,
returned as a property of DirectionsStep. From the TransitDetails object you can access
additional information for the TransitStop, TransitLine, TransitAgency, and VehicleType
objects as described below.
## Transit Details
The TransitDetails object exposes the following properties:
arrival_stop contains a TransitStop
(/maps/documentation/javascript/3.exp/reference#TransitStop) object representing the arrival
station/stop with the following properties:
name the name of the transit station/stop. eg. "Union Square".
location the location of the transit station/stop, represented as a LatLng.
departure_stop contains a TransitStop object representing the departure station/stop.
arrival_time contains the arrival time, specified as a Time object with three properties:
value the time specified as a JavaScript Date object.
text the time specified as a string. The time is displayed in the time zone of the transit
stop.
time_zone contains the time zone of this station. The value is the name of the time
zone as defined in the IANA Time Zone Database (http://www.iana.org/time-zones), e.g.
"America/New_York".
departure_time contains the departure time, specified as a Time object.
headsign specifies the direction in which to travel on this line, as it is marked on the vehicle
or at the departure stop. This will often be the terminus station.
headway when available, this specifies the expected number of seconds between departures
from the same stop at this time. For example, with a headway value of 600, you would expect
a ten minute wait if you should miss your bus.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions21/32

## 
line contains a TransitLine object literal that contains information about the transit line
used in this step. The TransitLine provides the name and operator of the line, along with
other properties described in the TransitLine
(/maps/documentation/javascript/3.exp/reference#TransitLine) reference documentation.
num_stops contains the number of stops in this step. Includes the arrival stop, but not the
departure stop. For example, if your directions involve leaving from Stop A, passing through
stops B and C, and arriving at stop D, num_stops will return 3.
## Transit Line
The TransitLine object exposes the following properties:
name contains the full name of this transit line. eg. "7 Avenue Express" or "14th St Crosstown".
short_name contains the short name of this transit line. This will normally be a line number,
such as "2" or "M14".
agencies is an array containing a single TransitAgency object. The TransitAgency object
provides information about the operator of this line, including the following properties:
name contains the name of the transit agency.
phone contains the phone number of the transit agency.
url contains the URL for the transit agency.
Note: If you are rendering transit directions manually instead of using the DirectionsRenderer object, you
must display the names and URLs of the transit agencies servicing the trip results.
url contains a URL for this transit line as provided by the transit agency.
icon contains a URL for the icon associated with this line. Most cities will use generic icons
that vary by the type of vehicle. Some transit lines, such as the New York subway system,
have icons specific to that line.
color contains the color commonly used in signage for this transit. The color will be
specified as a hex string such as: #FF0033.
text_color contains the color of text commonly used for signage of this line. The color will
be specified as a hex string.
vehicle contains a Vehicle object that includes the following properties:
name contains the name of the vehicle on this line. eg. "Subway."
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions22/32

type contains the type of vehicle used on this line. See the Vehicle Type (#VehicleType)
documentation for a complete list of supported values.
icon contains a URL for the icon commonly associated with this vehicle type.
local_icon contains the URL for the icon associated with this vehicle type, based on
the local transport signage.
## Vehicle Type
The VehicleType object exposes the following properties:
ValueDefinition
VehicleType.RAILRail.
VehicleType.METRO_RAILLight rail transit.
VehicleType.SUBWAYUnderground light rail.
VehicleType.TRAMAbove ground light rail.
VehicleType.MONORAILMonorail.
VehicleType.HEAVY_RAILHeavy rail.
VehicleType.COMMUTER_TRAINCommuter rail.
VehicleType.HIGH_SPEED_TRAINHigh speed train.
VehicleType.BUSBus.
VehicleType.INTERCITY_BUSIntercity bus.
VehicleType.TROLLEYBUSTrolleybus.
VehicleType.SHARE_TAXIShare taxi is a kind of bus with the ability to drop off and pick up
passengers anywhere on its route.
VehicleType.FERRYFerry.
VehicleType.CABLE_CARA vehicle that operates on a cable, usually on the ground. Aerial cable cars
may be of the type VehicleType.GONDOLA_LIFT.
VehicleType.GONDOLA_LIFTAn aerial cable car.
VehicleType.FUNICULARA vehicle that is pulled up a steep incline by a cable. A Funicular typically
consists of two cars, with each car acting as a counterweight for the other.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions23/32

VehicleType.OTHERAll other vehicles will return this type.
Inspecting DirectionsResults
The DirectionsResults components — DirectionsRoute, DirectionsLeg, DirectionsStep and
TransitDetails — may be inspected and used when parsing any directions response.
Important: If you are rendering transit directions manually instead of using the DirectionsRenderer object, you
must display the names and URLs of the transit agencies servicing the trip results.
The following example plots walking directions to certain tourist attractions in New York City. We
inspect the route's DirectionsStep to add markers for each step, and attach information to an
InfoWindow with instructional text for that step.
Note: Since we are calculating walking directions, we also display any warnings to the user in a separate <div>
panel.
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions24/32

## +response.routes[0].warnings+""
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions25/32

In the HTML body:
View example (/maps/documentation/javascript/examples/directions-complex)
Using Waypoints in Routes
Caution: Requests using more than 10 waypoints, or waypoint optimization, are billed at a higher rate. Learn more
## <div>
<strong>Start: </strong>
<select id="start">
<option value="penn station, new york, ny">Penn Station</option>
<option value="grand central station, new york, ny">Grand Central Station</option>
<option value="625 8th Avenue New York NY 10018">Port Authority Bus Terminal</optio
<option value="staten island ferry terminal, new york, ny">Staten Island Ferry Term
<option value="101 E 125th Street, New York, NY">Harlem - 125th St Station</option>
## </select>
<strong>End: </strong>
<select id="end" onchange="calcRoute();">
<option value="260 Broadway New York NY 10007">City Hall</option>
<option value="W 49th St & 5th Ave, New York, NY 10020">Rockefeller Center</option>
<option value="moma, New York, NY">MOMA</option>
<option value="350 5th Ave, New York, NY, 10118">Empire State Building</option>
<option value="253 West 125th Street, New York, NY">Apollo Theatre</option>
<option value="1 Wall St, New York, NY">Wall St</option>
## </select>
## <div>
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions26/32

about how Google Maps Platform products are billed. (/maps/billing/understanding-cost-of-use)
As noted within the DirectionsRequest (#DirectionsRequests), you may also specify waypoints (of type
DirectionsWaypoint) when calculating routes using the Directions service for walking, bicycling
or driving directions. Waypoints are not available for transit directions. Waypoints allow you to
calculate routes through additional locations, in which case the returned route passes through the
given waypoints.
A waypoint consists of the following fields:
location (required) specifies the address of the waypoint.
stopover (optional) indicates whether this waypoint is a actual stop on the route (true) or
instead only a preference to route through the indicated location (false). Stopovers are true
by default.
Caution: Setting the stopover to false to avoid stopovers results in directions that are very strict in their
interpretation of the waypoint. This may result in severe detours on the route or ZERO_RESULTS in the response
status code if the Directions Service is unable to create directions through that point.
By default, the Directions service calculates a route through the provided waypoints in their given
order. Optionally, you may pass optimizeWaypoints: true within the DirectionsRequest to allow
the Directions service to optimize the provided route by rearranging the waypoints in a more
efficient order. (This optimization is an application of the traveling salesperson problem
(https://en.wikipedia.org/wiki/Travelling_salesman_problem).) Travel time is the primary factor which is
optimized, but other factors such as distance, number of turns and many more may be taken into
account when deciding which route is the most efficient. All waypoints must be stopovers for the
Directions service to optimize their route.
If you instruct the Directions service to optimize the order of its waypoints, their order will be
returned in the waypoint_order field within the DirectionsResult object.
The following example calculates cross-country routes across the United States using a variety of
start points, end points, and waypoints. (To select multiple waypoints, press Ctrl-Click when
selecting items within the list.) Note that we inspect the routes.start_address and
routes.end_address to provide us with the text for each route's start and end point.
TypeScript
## (#typescript)
JavaScript (#javascript)
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions27/32

functioninitMap():void{
constdirectionsService=newgoogle.maps.DirectionsService();
constdirectionsRenderer=newgoogle.maps.DirectionsRenderer();
constmap=newgoogle.maps.Map(
document.getElementById("map")asHTMLElement,
## {
zoom:6,
center:{lat:41.85,lng:-87.65},
## }
## );
directionsRenderer.setMap(map);
(document.getElementById("submit")asHTMLElement).addEventListener(
## "click",
## ()=>{
calculateAndDisplayRoute(directionsService,directionsRenderer);
## }
## );
## }
functioncalculateAndDisplayRoute(
directionsService:google.maps.DirectionsService,
directionsRenderer:google.maps.DirectionsRenderer
## ){
constwaypts:google.maps.DirectionsWaypoint[]=[];
constcheckboxArray=document.getElementById(
## "waypoints"
)asHTMLSelectElement;
for(leti=0;i < checkboxArray.length;i++){
if(checkboxArray.options[i].selected){
waypts.push({
location:(checkboxArray[i]asHTMLOptionElement).value,
stopover:true,
## });
## }
## }
directionsService
## .route({
origin:(document.getElementById("start")asHTMLInputElement).value,
destination:(document.getElementById("end")asHTMLInputElement).value,
waypoints:waypts,
optimizeWaypoints:true,
travelMode:google.maps.TravelMode.DRIVING,
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions28/32

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Limits and Restrictions for Waypoints
The following usage limits and restrictions apply:
The maximum number of waypoints allowed when using the Directions service in the Maps
JavaScript API is 25, plus the origin and destination. The limits are the same for the
Directions API (Legacy) web service (/maps/documentation/directions/usage-limits).
## })
## .then((response)=>{
directionsRenderer.setDirections(response);
constroute=response.routes[0];
constsummaryPanel=document.getElementById(
## "directions-panel"
)asHTMLElement;
summaryPanel.innerHTML="";
// For each route, display summary information.
for(leti=0;i < route.legs.length;i++){
constrouteSegment=i+1;
summaryPanel.innerHTML+=
"<b>Route Segment: "+routeSegment+"</b><br>";
summaryPanel.innerHTML+=route.legs[i].start_address+" to ";
summaryPanel.innerHTML+=route.legs[i].end_address+"<br>";
summaryPanel.innerHTML+=route.legs[i].distance!.text+"<br><br>";
## }
## })
.catch((e)=>window.alert("Directions request failed due to "+status));
## }
declareglobal{
interfaceWindow{
initMap:()=>void;
## }
## }
window.initMap=initMap;
/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/samples/directions-waypoints/index.ts#L8-L84)
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions29/32

For the Directions API (Legacy) web service (/maps/documentation/directions/usage-limits),
customers are allowed 25 waypoints, plus the origin, and destination.
Google Maps Platform Premium Plan customers are allowed 25 waypoints, plus the origin,
and destination.
Waypoints are not supported for transit directions.
## Draggable Directions
Users may modify cycling, walking or driving directions displayed using a DirectionsRenderer
dynamically if they are draggable, allowing a user to select and alter routes by clicking and dragging
the resulting paths on the map. You indicate whether a renderer's display allows draggable
directions by setting its draggable property to true. Transit directions cannot be made draggable.
When directions are draggable, a user may select any point on the path (or waypoint) of the
rendered result and move the indicated component to a new location. The DirectionsRenderer
will dynamically update to show the modified path. Upon release, a transitional waypoint will be
added to the map (indicated by a small white marker). Selecting and moving a path segment will
alter that leg of the route, while selecting and moving a waypoint marker (including start and end
points) will alter the legs of the route passing through that waypoint.
Because draggable directions are modified and rendered client-side, you may wish to monitor and
handle the directions_changed event on the DirectionsRenderer to be notified when the user
has modified the displayed directions.
The following code shows a trip from Perth on the west coast of Australia to Sydney on the east
coast. The code monitors the directions_changed event to update the total distance of all legs of
the journey.
TypeScript
## (#typescript)
JavaScript (#javascript)
functioninitMap():void{
constmap=newgoogle.maps.Map(
document.getElementById("map")asHTMLElement,
## {
zoom:4,
center:{lat:-24.345,lng:134.46},// Australia.
## }
## );
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions30/32

constdirectionsService=newgoogle.maps.DirectionsService();
constdirectionsRenderer=newgoogle.maps.DirectionsRenderer({
draggable:true,
map,
panel:document.getElementById("panel")asHTMLElement,
## });
directionsRenderer.addListener("directions_changed",()=>{
constdirections=directionsRenderer.getDirections();
if(directions){
computeTotalDistance(directions);
## }
## });
displayRoute(
"Perth, WA",
"Sydney, NSW",
directionsService,
directionsRenderer
## );
## }
functiondisplayRoute(
origin:string,
destination:string,
service:google.maps.DirectionsService,
display:google.maps.DirectionsRenderer
## ){
service
## .route({
origin:origin,
destination:destination,
waypoints:[
{location:"Adelaide, SA"},
{location:"Broken Hill, NSW"},
## ],
travelMode:google.maps.TravelMode.DRIVING,
avoidTolls:true,
## })
.then((result:google.maps.DirectionsResult)=>{
display.setDirections(result);
## })
## .catch((e)=>{
alert("Could not display directions due to: "+e);
## });
## }
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions31/32

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
View example (/maps/documentation/javascript/examples/directions-draggable)
## Try Sample
JSFiddle.net...
## Google Cloud Shell...
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
functioncomputeTotalDistance(result:google.maps.DirectionsResult){
lettotal=0;
constmyroute=result.routes[0];
if(!myroute){
return;
## }
for(leti=0;i < myroute.legs.length;i++){
total+=myroute.legs[i]!.distance!.value;
## }
total=total/1000;
(document.getElementById("total")asHTMLElement).innerHTML=total+" km";
## }
declareglobal{
interfaceWindow{
initMap:()=>void;
## }
## }
window.initMap=initMap;
s/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/samples/directions-draggable/index.ts#L8-L86)
2/6/26, 10:45 AMDirections Service  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/legacy/directions32/32