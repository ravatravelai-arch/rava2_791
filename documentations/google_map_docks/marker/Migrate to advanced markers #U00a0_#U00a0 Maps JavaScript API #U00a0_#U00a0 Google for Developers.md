

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Migrate to advanced markers
## Page Summary
## 
As of February 21st, 2024 (v3.56), google.maps.Marker is deprecated. We encourage you to
transition to the new google.maps.marker.AdvancedMarkerElement class. Advanced markers
provide substantial improvements over the legacy google.maps.Marker class. Learn more about
this deprecation (/maps/deprecations#googlemapsmarker_in_the_deprecated_as_of_february_2023)
To update a legacy marker to be an advanced marker, take the following steps:
- Add code to import the marker library (see steps below).
- Change google.maps.Marker to google.maps.marker.AdvancedMarkerElement; if your
import statement declares AdvancedMarker, you can omit the qualified path.
- Add a map ID to your map initialization code. For example mapId: 'DEMO_MAP_ID' for testing
purposes if you don't have a map ID already.
Add the Advanced Marker library
The method you use for loading libraries depends on how your web page loads the Maps
JavaScript API.
If your web page uses dynamic library import
(/maps/documentation/javascript/load-maps-js-api#dynamic-library-import), add the markers library
and import AdvancedMarkerElement (and optionally PinElement) at runtime, as shown here.
const{AdvancedMarkerElement,PinElement}=awaitgoogle.maps.importLibrary("m
2/6/26, 10:48 AMMigrate to advanced markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/migration1/4

If your web page uses the legacy direct script loading tag
(/maps/documentation/javascript/load-maps-js-api#use-legacy-tag), add libraries=marker to the
loading script, as shown in the following snippet.
Note: When the legacy script loading tag is used libraries are imported at initialization time; therefore there is no
need to call importLibrary().
Learn more about loading the Maps JavaScript API (/maps/documentation/javascript/load-maps-js-api)
## Examples
The following code examples show code for adding a legacy marker, followed by the code for the
same example using advanced markers:
Before migration
## <script
src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEYcallback=initMapv
defer
## ></script>
// The location of Uluru
constposition={lat:-25.344,lng:131.031};
constmap=newgoogle.maps.Map(document.getElementById("map"),{
zoom:4,
center:position,
## });
// The marker, positioned at Uluru
constmarker=newgoogle.maps.Marker({
map:map,
position:position,
title:'Uluru',
## });
2/6/26, 10:48 AMMigrate to advanced markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/migration2/4

After migration
Explore advanced marker features
Advanced markers can be customized in ways that were not possible before. Now you can adjust
the size (scale) of markers, and change the colors of the background, border, and glyph. Custom
graphic images are simpler to work with, and it is now possible to compose custom markers using
HTML and CSS. Learn more about everything you can do with advanced markers:
Add a marker to a map (/maps/documentation/javascript/advanced-markers/add-marker).
Basic marker customization
## (/maps/documentation/javascript/advanced-markers/basic-customization)
Create markers with graphics (/maps/documentation/javascript/advanced-markers/graphic-markers)
Create markers with HTML and CSS
## (/maps/documentation/javascript/advanced-markers/html-markers)
Control collision behavior, altitude, and visibility
## (/maps/documentation/javascript/advanced-markers/collision-behavior)
// Import the needed libraries.
// Not required if the legacy direct script loading tag is in use.
const{Map}=await.google.maps.importLibrary("maps");
const{AdvancedMarkerElement}=awaitgoogle.maps.importLibrary("marker");
// The location of Uluru
constposition={lat:-25.344,lng:131.031};
constmap=newMap(document.getElementById("map"),{
zoom:4,
center:position,
mapId:"DEMO_MAP_ID",// Map ID is required for advanced markers.
## });
// The advanced marker, positioned at Uluru
constmarker=newAdvancedMarkerElement({
map,
position:position,
title:'Uluru/Ayers Rock',
## });
2/6/26, 10:48 AMMigrate to advanced markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/migration3/4

Make markers clickable and accessible
## (/maps/documentation/javascript/advanced-markers/accessible-markers)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 10:48 AMMigrate to advanced markers  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/migration4/4