

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Work with polylines
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
The computeRoutes method returns the route represented by a polyline as part of the response.
You can request two types of polylines:
Basic polyline (default), represents a route but without traffic information embedded in the
polyline. Requests that return a basic polyline are billed at the Routes Basic rate. Learn more
about billing for Routes API. (/maps/documentation/javascript/usage-and-billing)
Traffic-aware polyline, contains information about the traffic conditions along the route.
Traffic conditions are expressed in terms of speed categories (NORMAL, SLOW, TRAFFIC_JAM)
applicable on a given interval of the polyline. Requests for traffic-aware polylines are billed at
the Routes Preferred rate. Learn more about billing for Routes API.
## (/maps/documentation/javascript/usage-and-billing)
Multimodal polyline, contains transit details as well as traffic information. Requests for
multimodal polylines are billed at the Routes Preferred rate. Learn more about billing for
Routes API. (/maps/documentation/javascript/usage-and-billing)
Basic polyline (default)
A polyline is represented by a Polyline (/maps/documentation/javascript/reference/polygon#Polyline)
object; a path is an array of LatLngAltitude coordinates. To return a basic polyline, call the
computeRoutes method with the fields property set to path, then call the createPolylines
method on the route instance to get a Polyline object.
2/6/26, 11:27 AMWork with polylines  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-polylines1/3

The following example shows how to request a basic polyline:
Traffic-aware polyline
To request a traffic-aware polyline, add the following properties to your request:
- Set the travelMode property to DRIVING.
- Set the routingPreference property to TRAFFIC_AWARE.
- Set the extraComputations property to TRAFFIC_ON_POLYLINE.
- Specify thepath, speedPaths, and routeLabels fields.
The following example shows how to request a traffic-aware polyline:
Display polylines on a map
fields:['path'],// Request path field to get a polyline.
travelMode:'DRIVING',
routingPreference:'TRAFFIC_AWARE',
extraComputations:['TRAFFIC_ON_POLYLINE'],
fields:['speedPaths'],
2/6/26, 11:27 AMWork with polylines  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-polylines2/3

To display polylines on a map, call createPolylines on the route object, then use the setMap
(/maps/documentation/javascript/reference/polygon#Polyline.setMap) method to set the polyline's map to
the map object. The map object is used to display the polyline on the map.
The following example shows how to show a polyline on a map:
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
// Call createPolylines to create polylines for the first route.
mapPolylines=routes[0].createPolylines();
// Add polylines to the map.
mapPolylines.forEach((polyline)=>polyline.setMap(map));
2/6/26, 11:27 AMWork with polylines  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-polylines3/3