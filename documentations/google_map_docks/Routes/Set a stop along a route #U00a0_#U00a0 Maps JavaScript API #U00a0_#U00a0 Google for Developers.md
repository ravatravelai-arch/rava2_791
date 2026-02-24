

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Set a stop along a route
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
To set a stop along a route, for example, for a pickup or dropoff, you designate a waypoint as a
stopover waypoint. To do this, use the vehicleStopover property of a waypoint. This setting
ensures that the calculated route doesn't begin or end on a road that is unsuitable for pickup and
drop-off, such as a highway or tunnel.
Note: Requests using vehicleStopover are billed at a higher rate. Learn more about billing for Routes API.
## (/maps/documentation/javascript/usage-and-billing)
Consider the situation where a surface road crosses over a road inside a tunnel. If you were to
specify a waypoint located where the two roads intersect (as seen on a map), then the resulting
route would begin or end on either the surface road or the tunnel. This result presents a problem
because you can't stop in tunnels to make pickups or drop-offs.
If you want to use the waypoint for a pickup or drop-off, then you can set the vehicleStopover
field to true to ensure that the resulting route begins or ends on a road that allows pickups and
drop-offs.
The following example request shows how to set a stopover waypoint:
2/6/26, 11:29 AMSet a stop along a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/stop-over1/2

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## Code Tutor
## 
vehicleStopover:true
2/6/26, 11:29 AMSet a stop along a route  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/stop-over2/2