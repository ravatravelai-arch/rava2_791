

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Get started with Routes
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Follow these steps to get set up with Routes Library, Maps JavaScript API
Get an API key and enable the Maps JavaScript API
Before using the Routes Library, Maps JavaScript API, you need a Cloud project with a billing
account, and both the Maps JavaScript API and Routes API enabled. To learn more, see Set up your
Google Cloud project (/maps/documentation/javascript/cloud-setup).
Get an API key (/maps/documentation/javascript/get-api-key)
Enable the Maps JavaScript API
## (https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)
Enable the Routes API
## (https://console.cloud.google.com/apis/library/routes.googleapis.com)
Update your map initialization code
- Load the Maps JavaScript API (/maps/documentation/javascript/load-maps-js-api).
- Load the Routes library from within an async function when needed:
2/6/26, 11:26 AMGet started with Routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/start1/2

Next steps
Route class overview (/maps/documentation/javascript/routes/route-class-overview)
Migrate to the new Route class (/maps/documentation/javascript/routes/routes-js-migration)
Route Matrix class overview (/maps/documentation/javascript/routes/route-matrix-class-overview)
Migrate to the new Route Matrix class
## (/maps/documentation/javascript/routes/route-matrix-js-migration)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
const{Route,RouteMatrix}=awaitgoogle.maps.importLibrary('routes');
2/6/26, 11:26 AMGet started with Routes  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/start2/2