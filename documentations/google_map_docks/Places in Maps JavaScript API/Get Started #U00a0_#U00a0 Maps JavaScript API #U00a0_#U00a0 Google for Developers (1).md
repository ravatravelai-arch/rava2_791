

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
## Get Started
## Page Summary
## 
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
This page shows you how to get an API key, enable the required APIs, and load the Places Library,
so that you can work with the Place class.
Get an API key and enable the required APIs
Before using the Place class, you need to:
Create a Cloud project with a billing account.
Get an API key.
Enable the following APIs:
Maps JavaScript API
Places API
Places API (New) (required to use Text Search (New) and Place Autocomplete)
To learn more, see Set up your Google Cloud project (/maps/documentation/javascript/cloud-setup).
Get an API key (/maps/documentation/javascript/get-api-key)
2/6/26, 10:49 AMGet Started  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-get-started1/3

Enable Places API (New)
## (https://console.cloud.google.com/apis/library/places.googleapis.com)
Load the Places Library
To load the Places Library, first load the Maps JavaScript API, by adding the inline bootstrap loader
to your application code, as shown in the following snippet:
Next, use the await operator to call importLibrary() from within an async function, as shown
here:
Your function can also load libraries without declaring a variable for the needed classes:
Alternatively, you can load the libraries directly in HTML as shown here:
## <script>
(g=>{varh,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="_
key:"YOUR_API_KEY",
v:"weekly",
// Use the 'v' parameter to indicate the version (/maps/documentation/javascript/versions
// Add other bootstrap parameters (/maps/documentation/javascript/load-maps-js-api#required_
## });
## </script>
const{Place}=awaitgoogle.maps.importLibrary("places");
asyncfunctioninitMap(){
google.maps.importLibrary("places");
## ...
## }
initMap();
2/6/26, 10:49 AMGet Started  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-get-started2/3

For more information about loading libraries, see Load the Maps JavaScript API
## (/maps/documentation/javascript/load-maps-js-api).
Next steps
Search for places (/maps/documentation/javascript/place-search)
Get place details (/maps/documentation/javascript/place-details)
## Use Place Autocomplete (/maps/documentation/javascript/place-autocomplete-new)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## <script>
google.maps.importLibrary("places");
## </script>
2/6/26, 10:49 AMGet Started  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-get-started3/3