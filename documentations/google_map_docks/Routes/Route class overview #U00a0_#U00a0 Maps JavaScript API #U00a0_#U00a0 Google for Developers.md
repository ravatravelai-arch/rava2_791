

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Route class overview
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
## (/maps/documentation/javascript/routes/demo)
## Introduction
The Route class provides the computeRoutes
method for returning the ideal route between two
locations. Provide directions with real-time traffic
for transit, biking, driving, 2-wheel motorized
vehicles, or walking between multiple locations.
Need Route Matrixes? If you are interested in a route matrix, see Route Matrix class overview
## (/maps/documentation/javascript/routes/route-matrix-class-overview).
Migrating? If you are migrating from the Directions Service (Legacy) to the Route class, see Migrate
to the Route class (/maps/documentation/javascript/routes/routes-js-migration).
Why use the Route class?
With the Route class, with a wide range of route details you can route your vehicles or packages
according to your preferences while optimizing for cost and quality.
2/6/26, 11:27 AMRoute class overview  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/route-class-overview1/3

What can you do with the Route class?
The computeRoutes method returns the ideal route between two locations. With the Routes library,
you can do the following things:
Get directions for different ways to travel:
Modes of transportation: transit, driving, two-wheel vehicles, walking, or bicycling.
A series of waypoints that you can optimize for the most efficient order in which to
travel to them.
Use multiple ways to specify origins, destinations, and waypoints:
Text strings. For example: "Chicago, IL", "Darwin, NT, Australia", "1800 Amphitheatre
Parkway, Mountain View, CA 94043", or "CWF6+FWX Mountain View, California"
Place instances
Latitude and longitude coordinates, optionally with vehicle heading
Fine-tune your route options based on your needs and goals:
Select fuel or energy-efficient routes for your vehicle's engine type: Diesel, Electric,
## Hybrid, Gas.
Set fine-grained options for traffic calculation, letting you make quality versus latency
trade off decisions.
Set vehicle heading (direction of travel) and side-of-road information for waypoints to
increase ETA accuracy.
Specify pass-through versus terminal locations and safe stopover locations.
Request toll information, along with route distance and ETA.
Control your latency and quality by requesting only the data you need using a field mask,
which helps you avoid unnecessary processing time and higher request billing rates.
Next steps
Try the demo (/maps/documentation/javascript/routes/demo)
Get started (/maps/documentation/javascript/routes/start)
Get a route (/maps/documentation/routes/get-a-route)
2/6/26, 11:27 AMRoute class overview  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/route-class-overview2/3

Reference documentation (/maps/documentation/javascript/reference/route)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:27 AMRoute class overview  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/route-class-overview3/3