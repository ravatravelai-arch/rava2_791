

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Optimize the order of stops on your route
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
By default, the Routes library computeRoutes method calculates a route through multiple stops,
called stopover waypoints, in the order that you provide them.
You can have the Routes API optimize the provided route by rearranging stops in a more efficient
order. Waypoint optimization optimizes for travel time but also considers other factors such as
distance and number of turns when deciding which route is the most efficient.
To optimize waypoints
- Make sure none of the waypoints in the route have via set to true.
- Make sure the routingPreference is not set to TRAFFIC_AWARE_OPTIMAL.
- Set optimizeWaypointOrder to true.
- Specify the optimizedIntermediateWaypointIndices field in the field mask.
Understand how waypoint order is optimized
Here's how the Routes API optimizes the order of waypoints in a route:
- Automatically indexes the waypoints based on the order you provide them in the request,
starting with 0.
2/6/26, 11:30 AMOptimize the order of stops on your route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/optimize-stops1/3

- Optimizes the order of the waypoints using the index numbers it assigned to the waypoints in
the request.
- Returns the optimized order of the waypoints in the response under
optimizedIntermediateWaypointIndices.
Example request
The following example shows how to request optimized waypoints in a route from Adelaide, South
Australia, to each of South Australia's main wine regions, and then returning to Adelaide.
Example response
The response includes optimizedIntermediateWaypointIndices.
constrequest={
origin:'Adelaide, SA',
destination:'Adelaide, SA',
intermediates:[
{location:"Barossa+Valley,SA"},
{location:"Clare,SA"},
{location:"Coonawarra,SA"},
{location:"McLaren+Vale,SA"},
## ],
travelMode:'DRIVING',
optimizeWaypointOrder:true,
fields:['path','optimizedIntermediateWaypointIndices'],
## };
## Response:
## [
## {
"optimizedIntermediateWaypointIndices":[
3,// McLaren+Vale, SA
2,// Coonawarra, SA
0,// Barossa+Valley, SA
1// Clare, SA
2/6/26, 11:30 AMOptimize the order of stops on your route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/optimize-stops2/3

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## ],
## ...
2/6/26, 11:30 AMOptimize the order of stops on your route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/optimize-stops3/3