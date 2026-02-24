

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Waypoint types and options
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
A waypoint is a location along a route, including the beginning (origin) and end (destination)
locations for a route, and the origins and destinations for a route matrix.
You have several options on how to specify the location for waypoints
(/maps/documentation/javascript/routes/get-a-route#specify-locations-for-a-route). In addition to setting
the beginning and end locations, you can also add intermediate waypoints that you want the route
to go through, and have a couple of options for waypoint behavior:
Waypoint optionDescription
Specify waypoint locations
## (/maps/documentation/javascript/routes/get-a-route#specify-
locations-for-a-route)
Specify the beginning and end of, and points
along, the route.
Set intermediate waypoints
## (/maps/documentation/javascript/routes/intermediate-
waypoints)
Set intermediate waypoints to specify
locations in between the origin and destination
that you want the route to go through. An
intermediate waypoint can be a stopover or
pass-through waypoint (see sections below).
Set a stop along a route
## (/maps/documentation/javascript/routes/stop-over)
Specify an intermediate waypoint is a stop
along the route, such as for a pickup or
dropoff.
Set a point for a route to pass through
## (/maps/documentation/javascript/routes/pass-through)
Specify an intermediate waypoint that you
want the route to pass through.
2/6/26, 11:29 AMWaypoint types and options  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/waypoint-types1/2

Waypoint optionDescription
Specify vehicle heading for a waypoint
## (/maps/documentation/javascript/routes/location-
modifiers#heading)
Specify the heading of the vehicle when it
arrives. Cannot use with side of road.
Specify side of road for a waypoint
## (/maps/documentation/javascript/routes/location-
modifiers#side-of-road)
Specify the side of road you prefer the vehicle
arrives on. Cannot use with heading.
Optimize the order of stops on a route
## (/maps/documentation/javascript/routes/optimize-stops)
Specify the direction you want the vehicle to
head when it arrives at each waypoint.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:29 AMWaypoint types and options  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/waypoint-types2/2