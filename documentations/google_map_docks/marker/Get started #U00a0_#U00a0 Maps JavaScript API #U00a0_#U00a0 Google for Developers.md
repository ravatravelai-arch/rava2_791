

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Get started
## Page Summary
## 
Select platform:

## Android (/maps/documentation/android-sdk/advanced-markers/start)
iOS (/maps/documentation/ios-sdk/advanced-markers/overview)
JavaScript (/maps/documentation/javascript/advanced-markers/start)
Follow these steps to get set up with advanced markers.
Get an API key and enable the Maps JavaScript API
Before using advanced markers, you need a Cloud project with a billing account, and the Maps
JavaScript API enabled. To learn more, see Set up your Google Cloud project
## (/maps/documentation/javascript/cloud-setup).
Get an API key (/maps/documentation/javascript/get-api-key)
Create a map ID
To create a new map ID (/maps/documentation/get-map-id), follow the steps in Cloud customization
(/maps/documentation/javascript/maps-customization-overview). Set the Map type to JavaScript, and
select either the Vector or Raster option.
Important: For testing, you can skip the step of creating and configuring a map ID, by using mapId:
'DEMO_MAP_ID' in your app code.
2/6/26, 10:47 AMGet started  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/start1/3

Update your map initialization code
This requires the map ID you just created. It can be found on your Maps Management
## (https://console.cloud.google.com/google/maps-apis/studio/maps)
page.
- Load the Maps JavaScript API (/maps/documentation/javascript/load-maps-js-api).
- Load the advanced markers library from within an async function when needed:
- Provide a map ID when you instantiate the map using the mapId property. This can be a map
ID that you provide, or DEMO_MAP_ID.
const{AdvancedMarkerElement}=awaitgoogle.maps.importLibrary("marker")asg
constmap=new
google.maps.Map(document.getElementById('map'),{
center:{lat:-34.397,lng:150.644},
zoom:8,
2/6/26, 10:47 AMGet started  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/start2/3

Caution: The example maps for advanced markers use map IDs that are linked to a reduced-POI map style. If you
re-use example code, we recommend replacing these map IDs with DEMO_MAP_ID, or with your own map ID.
Check map capabilities (optional)
Advanced markers requires a map ID. If the map ID is missing, advanced markers cannot load. As a
troubleshooting step, you can add a mapcapabilities_changed listener to subscribe to map
capability changes. Using Map Capabilities is optional, and recommended only for testing and
troubleshooting purposes, or for runtime fallback purposes.
Next steps
Add a marker to a map (/maps/documentation/javascript/advanced-markers/add-marker)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
mapId:'YOUR_MAP_ID'
## });
// Optional: subscribe to map capability changes.
map.addListener('mapcapabilities_changed',()=>{
constmapCapabilities=map.getMapCapabilities();
if(!mapCapabilities.isAdvancedMarkersAvailable){
// Advanced markers are *not* available, add a fallback.
## }
## });
2/6/26, 10:47 AMGet started  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/start3/3