

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Available vehicle types for routes
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
You can get a route suited to different types of vehicles. If you don't specify a vehicle type, the
Routes API uses the default of a gasoline powered car.
You set the mode of transportation using the travelMode parameter, with choices of transit,
driving, two-wheeled vehicles, walking, or bicycling.
Note: Walking, bicycling, and two-wheel routes are in beta and might sometimes be missing clear sidewalks,
pedestrian paths, or bicycling paths. You must display this warning to the user for all walking, bicycling, and two-
wheel routes that you display in your app.
Vehicle type
## Travel Mode
## Enum
## Description
BicycleBICYCLINGCompute a route for bicycles and other human-
powered travel. For motorized two-wheeled
vehicles, see Two-wheeled.
## Drive
## (/maps/documentation/javascript/routes/get-a-
route)
DRIVINGCompute a driving route. Drive is the default if
you don't specify a vehicle type.
Two-wheeled vehicle
## (/maps/documentation/javascript/routes/route-
two-wheel)
## TWO_
## WHEELER
Two-wheeler refers to two-wheeled motorized
vehicles (for example, motorcycles). The two-
wheeler travel mode differs from the bicycle
travel mode, which is a human-powered travel
mode.
2/6/26, 11:29 AMAvailable vehicle types for routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/vehicle-types1/2

Vehicle type
## Travel Mode
## Enum
## Description
## Transit
## (/maps/documentation/javascript/routes/route-
transit)
TRANSITGet a transit route for navigation instructions
using the public transportation options
available in the region. Transit options may
include buses, subways, and trains, among
others. A transit route also usually includes
instructions on walking to, from, and between
transit stations.
WalkWALKINGCompute a walking route.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:29 AMAvailable vehicle types for routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/vehicle-types2/2