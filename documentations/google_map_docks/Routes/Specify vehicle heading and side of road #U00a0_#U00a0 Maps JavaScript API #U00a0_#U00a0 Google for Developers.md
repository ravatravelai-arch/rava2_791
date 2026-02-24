

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Specify vehicle heading and side of road
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Waypoints may include location modifiers to change how routes are calculated, including settings
for heading and sideOfRoad.
Note: heading and sideOfRoad are mutually exclusive properties. You cannot use them together for the same
location.
Caution: Requests using heading and sideOfRoad are billed at a higher rate. Learn more about billing for Routes
API. (/maps/documentation/javascript/usage-and-billing)
Specify the vehicle heading
To define a waypoint, specify the geographic location using latitude/longitude coordinates. You can
also specify the direction you want the vehicle to head when it arrives at each waypoint. Use this
feature to ensure that the vehicle arrives on the same side of the road as the consumer waiting to
be picked up. When a heading is not specified, the vehicle can arrive on the wrong side of the road.
Heading values are numbers that align with the compass directions, and therefore range from zero
to 359. For example, a value of 0 indicates a heading direction of due North.
Note: You can set heading only when using either the DRIVING or TWO_WHEELER travel modes, AND when
2/6/26, 11:29 AMSpecify vehicle heading and side of road  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/location-modifiers1/3

specifying the location by using a latitude and longitude pair.
Specify a the side of road preference
A location defined by a latitude and longitude pair can correspond to a specific side of a road.
However, to support route optimization, a route can still set a stopover to be on the opposite side of
the road from the specified location.
Waypoints support the sideOfRoad property, which indicates that the waypoint location has a
preference for the vehicle to stop at the same side of road as specified by the location.
Specify that the route uses the preferred side of the road by setting the sideOfRoad property to
true. The route then passes through the location so that the vehicle can stop at the side of road
that the location is biased towards.
Note: You can set sideOfRoad only when using either the DRIVING or TWO_WHEELER travel modes, AND when
specifying the location by using a latitude and longitude pair.
The following example shows how to set sideOfRoad for a waypoint:
heading:330
2/6/26, 11:29 AMSpecify vehicle heading and side of road  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/location-modifiers2/3

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
sideOfRoad:true
2/6/26, 11:29 AMSpecify vehicle heading and side of road  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/location-modifiers3/3