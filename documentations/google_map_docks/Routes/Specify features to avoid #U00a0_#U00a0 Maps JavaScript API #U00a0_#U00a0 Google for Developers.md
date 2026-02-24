

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Specify features to avoid
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Specify which route features you prefer to avoid, such as avoiding tolls or highways, by adding
route modifiers to a request. The API then attempts to provide a route that does not require those
features.
You specify which route features you prefer to avoid, such as avoiding tolls or highways, by adding
route modifiers to a request. The API then attempts to provide a route that does not require those
features.
Use the routeModifiers property in a request, of type RouteModifiers
(/maps/documentation/javascript/reference/route#RouteModifiers). You can specify avoidTolls,
avoidHighways, avoidFerries, and avoidIndoor.
Specifying a route modifier does not necessarily eliminate routes that include the restricted feature.
The API uses the modifier to bias the result to more favorable routes. There can be a few reasons
why requesting an avoidance option doesn't change your route. For example, the only route from
the origin to the destination makes it impossible to avoid a highway or ferry. Or, the alternate route
actually lengthens travel time significantly.
## Example
The following example demonstrates how to set a route modifier to avoid tolls in a computeRoutes
(/maps/documentation/javascript/reference/route#Routes.computeRoutes) request.
2/6/26, 11:28 AMSpecify features to avoid  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-avoid-features1/2

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
constrequestWithAvoid={
origin:'Kirkland, WA',
destination:'University of Washington',
travelMode:'DRIVING',
routeModifiers:{
avoidTolls:true,
## },
fields:['path'],
## };
2/6/26, 11:28 AMSpecify features to avoid  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-avoid-features2/2