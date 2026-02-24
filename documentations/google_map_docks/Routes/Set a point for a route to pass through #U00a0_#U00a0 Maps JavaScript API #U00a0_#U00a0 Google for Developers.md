

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Set a point for a route to pass through
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
By default, intermediate waypoints are used for stopping for pickups and dropoffs, but you can also
specify that an intermediate waypoint is meant just to pass through.
A route that contains an origin waypoint, a pass-through intermediate waypoint, and a destination
waypoint contains just one route leg that connects the origin and the destination, while passing
through the intermediate (called a via) waypoint.
Configure an intermediate waypoint to be a pass-through waypoint by setting the via property of
the waypoint to true using the Waypoint (/maps/documentation/javascript/reference/route#Waypoint)
interface.
The via property is most effective when creating routes in response to the user dragging the
waypoints on the map. Doing so allows the user to see how the final route may look in real-time
and helps ensure that waypoints are placed in locations that are accessible to the Routes library.
Caution: Using the via field to avoid stopovers results in routes that are strict in their interpretation of the
waypoint. This interpretation may result in severe detours on the route or ZERO_RESULTS in the response status
code if the Maps JavaScript API is unable to create a route through that point.
Example request
The following example request demonstrates how to mark an intermediate waypoint as a pass-
through waypoint.
2/6/26, 11:29 AMSet a point for a route to pass through  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/pass-through1/3

Access place IDs for intermediate waypoints
If you specify the location of an origin, destination, or intermediate waypoint as an address string or
as a Plus code, the Routes library attempts to find the most relevant location which has a
corresponding place ID. The geocodingResults.intermediates array in the results contains the
place ID corresponding to the location of the waypoints, along with additional data about the
location.
Note: If a waypoint is specified as a place ID or as latitude/longitude coordinates, it is omitted from the place ID
lookup results.
Example geocoding results response
via:true
## {
## "origin":{
"geocoderStatus":"OK",
## "types":[
## "premise",
## "street_address"
## ],
"partialMatch":false,
"placeId":"ChIJb5NgcTa3j4ARrfF4Oc_f6q8",
"intermediateWaypointRequestIndex":null
2/6/26, 11:29 AMSet a point for a route to pass through  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/pass-through2/3

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## },
## "destination":{
"geocoderStatus":"OK",
## "types":[
## "premise",
## "street_address"
## ],
"partialMatch":false,
"placeId":"ChIJAbIPLl2HhYARQ0SSdDFxU-s",
"intermediateWaypointRequestIndex":null
## },
## "intermediates":[
## {
"geocoderStatus":"OK",
## "types":[
## "locality",
## "political"
## ],
"partialMatch":false,
"placeId":"ChIJC8sZCqULj4ARVJvnNcic_V4",
"intermediateWaypointRequestIndex":0
## }
## ]
## }
2/6/26, 11:29 AMSet a point for a route to pass through  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/pass-through3/3