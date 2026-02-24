

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Set intermediate waypoints
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Intermediate waypoints are locations in between the origin and destination that you want the route
to go through. An intermediate waypoint can be a stop or you can specify it as a location to pass
through. For an example of a waypoint for a stop, see Set a stop along a route
(/maps/documentation/javascript/routes/stop-over). For an example of a waypoint to pass-through, see
Set a point for a route to pass through (/maps/documentation/javascript/routes/pass-through).
Note: Intermediate waypoints are not supported in the RouteMatrix.computeRouteMatrix method.
Use the intermediates
(/maps/documentation/javascript/reference/route#ComputeRoutesRequest.intermediates) property of the
computeRoutes method to define up to a maximum of 25 intermediate waypoints.
Note: If you make requests using 11 or more intermediate waypoints (between 11 and 25), your requests are
billed at a higher rate. Learn more about billing for Routes API.
## (/maps/documentation/javascript/usage-and-billing)
For each intermediate waypoint in the request, a new leg is added to the route.
Example request
2/6/26, 11:29 AMSet intermediate waypoints  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/intermediate-waypoints1/2

The following example shows how to set an intermediate waypoint. The example uses the
intermediates (/maps/documentation/javascript/reference/route#ComputeRoutesRequest.intermediates)
property of the computeRoutes request to define an intermediate waypoint.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
intermediates:[{location:'San Mateo, CA'},{location:'Half Moon Bay, CA'}],
2/6/26, 11:29 AMSet intermediate waypoints  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/intermediate-waypoints2/2