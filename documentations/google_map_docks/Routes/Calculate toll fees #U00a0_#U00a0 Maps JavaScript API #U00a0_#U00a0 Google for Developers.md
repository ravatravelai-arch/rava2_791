

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Calculate toll fees
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
When you are computing a route or a route matrix, you might want to take into consideration any
toll fees on the route. For select cities, you can compute the estimated toll fee for a route in the
appropriate currency.
For the list of supported toll locations, see the reference for TollPass
(/maps/documentation/routes/reference/rest/v2/RouteModifiers#tollpass).
Note: Request that calculate toll fees are billed at a higher rate. Learn more about billing for Routes API.
## (/maps/documentation/javascript/usage-and-billing)
How tolls are calculated
The Routes API calculates the estimated toll fee, taking into consideration any toll price discounts
or passes available to the driver or vehicle, and the most convenient payment methods. If there is
no available toll price for a given route, the Routes API indicates the existence of a toll with an
unknown fee.
Note: The Routes API calculates tolls on a route differently than Google Maps:
The Routes API returns only the toll prices (pass or cash) that would actually be charged for the trip,
assuming your request accurately represents what types of passes each driver and/or vehicle has. If you
don't specify any toll passes, the API returns the cash prices, which is usually the highest toll.
2/6/26, 11:28 AMCalculate toll fees  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-tolls#example1/4

Google Maps typically returns the cheapest possible price for a vehicle. Users cannot specify which toll
passes they have; instead, to see cash tolls, users can disable the See toll pass prices option in Google
Maps, which is enabled by default.
To get accurate toll estimates, make sure you include the following information in your request:
The emission type of the vehicle used for the route (VehicleEmissionType
(/maps/documentation/javascript/reference/route#VehicleEmissionType)). If no emission type is
provided, the toll for a gasoline-fueled vehicle is returned.
All toll passes the vehicle and driver have using tollPasses
(/maps/documentation/javascript/reference/route#RouteModifiers.tollPasses). The API uses the toll
passes to determine accurate toll fees, and returns cash prices when toll passes in the
request are not local to the route.
Specify avoid tolls, if needed. If you want to avoid toll roads where possible, add avoidTolls
as a RouteModifier.
Calculate tolls using a toll pass
To calculate tolls using a toll pass, you specify any toll passes as part of the request. The API then
returns pass prices.
If you specify an invalid toll pass, the pass is ignored.
If specify multiple toll passes as an array, the API attempts to calculate the price for the route
for each pass.
Note: You can only specify a toll pass for the DRIVING and TWO_WHEELER travel modes.
The way toll passes behave can vary by region.
Rates may be lower with a toll pass: In some regions, a driver or vehicle with a toll pass pays a
different toll than those who don't have a pass. For example, if you have a Good To Go!
(https://en.wikipedia.org/wiki/Good_to_Go_(toll_collection_system)) toll pass in Seattle, WA, US, you
pay a lower toll than if you don't have a pass.
Some roads may require a toll pass: Some regions, such as Indonesia, have roads that require
a toll pass. If you don't specify a toll pass for a route where a toll pass is required, the API
does not return a toll price.
2/6/26, 11:28 AMCalculate toll fees  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-tolls#example2/4

Calculate toll fees for a route
To calculate toll fees for a route take the following steps:
Set the extraComputations property to TOLLS.
Specify the vehicle type and the toll pass type by using the routeModifiers property.
To calculate toll fees for an entire route, request travelAdvisory in the fields property of
the request; view the toll info for the entire route by reading
route.travelAdvisory.tollInfo.
To calculate toll fees for individual legs of a route, request legs in the fields property of the
request; view the toll info for each leg by reading
route.legs[i].travelAdvisory.tollInfo.
## Example
The following example request shows how to request toll fees for a route:
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
## Code Tutor
## 
constrequestWithTolls={
origin:'Kirkland, WA',
destination:'University of Washington',
travelMode:'DRIVING',
extraComputations:['TOLLS'],
routeModifiers:{
vehicleInfo:{
emissionType:'GASOLINE',
## },
tollPasses:['US_WA_GOOD_TO_GO'],
## },
fields:['path','legs','distanceMeters','durationMillis','travelAdvisory'],
## };
2/6/26, 11:28 AMCalculate toll fees  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-tolls#example3/4

Last updated 2026-02-02 UTC.
2/6/26, 11:28 AMCalculate toll fees  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-tolls#example4/4