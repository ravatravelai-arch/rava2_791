

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Migrate to the Route Matrix class
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
The RouteMatrix class replaces the Distance Matrix Service, Maps JavaScript API (Legacy)
(/maps/documentation/javascript/legacy/distancematrix). This page explains the differences between
the legacy Distance Matrix service and the new JavaScript library, and provides some code for
comparison.
Distance Matrix API (Legacy) versus Route Matrix class
The following table compares the request parameters for the legacy Distance Matrix API
(/maps/documentation/javascript/reference/next/distance-matrix) and the RouteMatrix
(/maps/documentation/javascript/reference/route-matrix) class.
Distance Matrix Service (Legacy)
## (/maps/documentation/javascript/legacy/distancematrix)
RouteMatrix
## (/maps/documentation/jav
matrix)
## Required Parameters
origins (/maps/documentation/javascript/legacy/distancematrix)origins
## (/maps/documentation/jav
matrix#ComputeRouteMatr
destinations (/maps/documentation/javascript/legacy/distancematrix)destinations
## (/maps/documentation/jav
matrix#ComputeRouteMatr
2/6/26, 11:30 AMMigrate to the Route Matrix class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/route-matrix-js-migration1/4

Distance Matrix Service (Legacy)
## (/maps/documentation/javascript/legacy/distancematrix)
RouteMatrix
## (/maps/documentation/jav
matrix)
## Optional Parameters
travelMode (/maps/documentation/javascript/legacy/distancematrix)travelMode
## (/maps/documentation/jav
matrix#ComputeRouteMatr
transitOptions (/maps/documentation/javascript/legacy/distancematrix)transitPreference
## (/maps/documentation/jav
matrix#ComputeRouteMatr
arrivalTime (/maps/documentation/javascript/legacy/distancematrix)arrivalTime
## (/maps/documentation/jav
matrix#ComputeRouteMatr
drivingOptions
## (/maps/documentation/javascript/legacy/distancematrix#driving_options)
departureTime
## (/maps/documentation/jav
matrix#ComputeRouteMatr
, trafficModel
## (/maps/documentation/jav
matrix#ComputeRouteMatr
unitSystem
## (/maps/documentation/javascript/legacy/distancematrix#distance_matrix_requests)
units
## (/maps/documentation/jav
matrix#ComputeRouteMatr
avoidHighways
## (/maps/documentation/javascript/legacy/distancematrix#driving_options),
avoidTolls
## (/maps/documentation/javascript/legacy/distancematrix#driving_options)
RouteModifiers
## (/maps/documentation/jav
matrix#RouteModifiers)
Code comparison
This section compares two similar pieces of code to illustrate the differences between the legacy
Distance Matrix API and the new RouteMatrix class. The code snippets show the code required on
each respective API to make a directions request, and view the results.
Directions API (Legacy)
The following code makes a distance matrix request using the legacy Distance Matrix API.
2/6/26, 11:30 AMMigrate to the Route Matrix class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/route-matrix-js-migration2/4

Route Matrix class
The following code makes a distance matrix request using the new Route Matrix class:
// Define the request.
constrequest={
origins:[{lat:55.93,lng:-3.118},'Greenwich, England'],
destinations:['Stockholm, Sweden',{lat:50.087,lng:14.421}],
travelMode:'DRIVING',
drivingOptions:{
departureTime:newDate(Date.now()),
trafficModel:'optimistic'
## }
## };
// Make the request.
service.getDistanceMatrix(request).then((response)=>{
// Display the response.
document.getElementById("response").textContent=JSON.stringify(
response,
null,
## 2,
## );
## });
// Define the request.
constrequest={
origins:[{lat:55.93,lng:-3.118},'Greenwich, England'],
destinations:['Stockholm, Sweden',{lat:50.087,lng:14.421}],
travelMode:'DRIVING',
departureTime:newDate(),
trafficModel:'optimistic'
## };
// Make the request.
constresponse=awaitRouteMatrix.computeRouteMatrix(request);
// Display the response.
document.getElementById("response").setValue(JSON.stringify(response,null,2,));
2/6/26, 11:30 AMMigrate to the Route Matrix class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/route-matrix-js-migration3/4

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:30 AMMigrate to the Route Matrix class  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/route-matrix-js-migration4/4