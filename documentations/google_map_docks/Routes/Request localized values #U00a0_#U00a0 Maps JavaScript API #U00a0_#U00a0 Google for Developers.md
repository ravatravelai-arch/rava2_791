

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Request localized values
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Localized response values are an additional response field that provides localized text for returned
parameter values. Localized text is provided for trip duration, distance, and unit system (metric or
imperial). You request localized values using a field mask, and can either specify the language and
unit system or use the values inferred by the API. For details, see LocalizedValues
(/maps/documentation/javascript/reference/route#Route.localizedValues).
For example, if you specify a language code for German (de) and imperial units, you get a value for
distanceMeters of 49889.7, but also localized text providing that distance measurement in
German and imperial units, so "31 Meile."
Note: You get two values for the expected duration: duration uses the traffic model you specify, and
staticDuration does not take traffic into account. So, if your requested traffic model is TRAFFIC_UNAWARE these
times are identical.
To request localized values, take the following steps:
- Add the localizedValues field to the fields property of the ComputeRoutesRequest
(/maps/documentation/javascript/reference/route#ComputeRoutesRequest).
- Optionally, specify the language and unit system using the languageCode and units
properties of the ComputeRoutesRequest.
Here is an example of requesting localized values:
2/6/26, 11:28 AMRequest localized values  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/localized-values1/2

If you don't specify the language or unit system, the computeRoutes method infers the location and
distance units from the origin waypoint. So for a routing request in the US, the API infers en-US
language and IMPERIAL units.
To read localized values use route.localizedValues. For example:
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
constrequestWithLocalizedValues={
origin:'San Diego, CA',
destination:'Ensenada, MX',
travelMode:'DRIVING',
language:'es',
units:google.maps.UnitSystem.METRIC,
fields:['path','localizedValues','distanceMeters','durationMillis'],
## };
constlocalizedValues=route.localizedValues;
constdistance=localizedValues.distanceMeters;
constduration=localizedValues.duration;
constdurationStatic=localizedValues.staticDuration;
2/6/26, 11:28 AMRequest localized values  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/localized-values2/2