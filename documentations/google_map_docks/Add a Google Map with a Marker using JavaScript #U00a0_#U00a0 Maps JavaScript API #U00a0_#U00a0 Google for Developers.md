

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Add a Google Map with a Marker using Java
## Script
## Page Summary
## 
## Introduction
This tutorial shows you how to add a Google map with a marker to a web page, using HTML, CSS,
and JavaScript. It also shows you how to set map options, and how to use control slotting to add a
label to the map.
Below is the map you'll create using this tutorial. The marker is positioned at Uluru
(https://en.wikipedia.org/wiki/Uluru) (also known as Ayers Rock) in the Uluru-Kata Tjuta National Park.
## My Google Maps Demo
Map data ©2026 Google
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map1/12

Getting started
There are three steps to creating a Google map with a marker on your web page:
- Get an API key (#key)
- Create an HTML page (#page)
- Add a map with a marker (#map)
You need a web browser. Choose a well-known one like Google Chrome (recommended), Firefox,
Safari, or Edge, based on your platform from the list of supported browsers
## (/maps/documentation/javascript/browsersupport).
Step 1: Get an API key
This section explains how to authenticate your app to the Maps JavaScript API using your own API
key.
Follow these steps to get an API key:
- Go to the Google Cloud console
## (https://console.cloud.google.com/project/_/google/maps-apis/overview)
## .
- Create or select a project.
- Click Continue to enable the API and any related services.
- On the Credentials page, get an API key (and set the API key restrictions). Note: If you have an
existing unrestricted API key, or a key with browser restrictions, you may use that key.
- To prevent quota theft and secure your API key, see Using API Keys
## (https://cloud.google.com/docs/authentication/api-keys).
- Enable billing. See Usage and Billing (/maps/documentation/javascript/usage-and-billing) for more
information.
- Once you've got an API key, add it to the following snippet by clicking "YOUR_API_KEY". Copy
and paste the bootloader script tag to use on your own web page.
## <script>
(g=>{varh,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary"
key:"YOUR_API_KEY",
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map2/12

Step 2: Create an HTML page
Here's the code for a basic HTML web page:
This is a very basic HTML page which uses a gmp-map element
(/maps/documentation/javascript/reference/map#MapElement) to display a map on the page. The map
will be blank since we haven't added any JavaScript code yet.
v:"weekly",
// Use the 'v' parameter to indicate the version (/maps/documentation/javascript/ve
// Add other bootstrap parameters (/maps/documentation/javascript/load-maps-js-api#req
## });
## </script>
<!DOCTYPE html>
## <!--
## @license
Copyright 2025 Google LLC. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
## -->
## <html>
## <head>
<title>Add a Map</title>
<link rel="stylesheet" type="text/css" href="./style.css" />
<script type="module" src="./index.js"></script>
<!-- prettier-ignore -->
<script>(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLib
({key: "YOUR_API_KEY", v: "weekly"});</script>
## </head>
## <body>
<!-- The map, centered at Uluru, Australia. -->
<gmp-map center="-25.344,131.031" zoom="4" map-id="DEMO_MAP_ID">
## </gmp-map>
## </body>
## </html>
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map3/12

Understand the code
At this stage in the example, we have:
Declared the application as HTML5 using the !DOCTYPE html declaration.
Loaded the Maps JavaScript API using the bootstrap loader.
Created a gmp-map element to hold the map.
Declare your application as HTML5
We recommend that you declare a true DOCTYPE within your web application. Within the examples
here, we've declared our applications as HTML5 using the HTML5 DOCTYPE as shown below:
Most current browsers will render content that is declared with this DOCTYPE in "standards mode"
which means that your application should be more cross-browser compliant. The DOCTYPE is also
designed to degrade gracefully; browsers that don't understand it will ignore it, and use "quirks
mode" to display their content.
Note that some CSS that works within quirks mode is not valid in standards mode. Specifically, all
percentage-based sizes must inherit from parent block elements, and if any of those ancestors fail
to specify a size, they are assumed to be sized at 0 x 0 pixels. For that reason, we include the
following style declaration:
Load the Maps JavaScript API
<!DOCTYPE html>
## <style>
gmp-map {
height: 100%;
## }
html, body {
height: 100%;
margin: 0;
padding: 0;
## }
## </style>
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map4/12

The bootstrap loader prepares the Maps JavaScript API for loading (no libraries are loaded until
importLibrary() is called).
See Step 3: Get an API key (#key) for instructions on getting your own API key.
At this stage of the tutorial a blank window appears, showing only the unformatted label text. This
is because we haven't added any JavaScript code yet.
Create a gmp-map element
For the map to display on a web page, we must reserve a spot for it. Commonly, we do this by
creating a gmp-map element and obtaining a reference to this element in the browser's document
object model (DOM). You can also use a div element to do this (learn more
(/maps/documentation/javascript/add-google-map#div-element)), but it's recommended to use the gmp-
map element.
The code below defines the gmp-map element, and sets the center, zoom, and map-id parameters.
The center and zoom options are always required. In the above code, the center property tells the
API where to center the map, and the zoom property specifies the zoom level for the map. Zoom: 0 is
the lowest zoom, and displays the entire Earth. Set the zoom value higher to zoom in to the Earth at
higher resolutions.
Zoom levels
## <script>
(g=>{varh,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="_
key:"YOUR_API_KEY",
v:"weekly",
// Use the 'v' parameter to indicate the version (/maps/documentation/javascript/versions
// Add other bootstrap parameters (/maps/documentation/javascript/load-maps-js-api#required_
## });
## </script>
<gmp-mapcenter="-25.344,131.031"zoom="4"map-id="DEMO_MAP_ID">
## </gmp-map>
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map5/12

Offering a map of the entire Earth as a single image would either require an immense map, or a
small map with very low resolution. As a result, map images within Google Maps and the Maps
JavaScript API are broken up into map "tiles" and "zoom levels." At low zoom levels, a small set of
map tiles covers a wide area; at higher zoom levels, the tiles are of higher resolution and cover a
smaller area. The following list shows the approximate level of detail you can expect to see at each
zoom level:
## 1: World
5: Landmass or continent
## 10: City
## 15: Streets
## 20: Buildings
The following three images reflect the same location of Tokyo at zoom levels 0, 7 and 18.
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map6/12

The code below describes the CSS that sets the size of the gmp-map element.
In the above code, the style element sets the size of the gmp-map. Set the width and height to
greater than 0px for the map to be visible. In this case, the gmp-map is set to a height of 400 pixels,
and width of 100% to display across the width of the web page. It's recommended to always
explicitly set the height and width styles.
Note: For raster maps, the limit for the maximum dimension is 6144 x 6144 pixels.
Control slotting
You can use control slotting to add HTML form controls to your map. A slot
(/maps/documentation/javascript/reference/map#MapElement-Slots) is a predefined position on the map;
use the slot attribute to set the needed position for an element, and nest elements within the gmp-
map element. The following snippet shows adding an HTML label to the upper-left corner of the
map.
/* Set the size of the gmp-map element that contains the map */
gmp-map{
height:400px;/* The height is 400 pixels */
width:100%;/* The width is the width of the web page */
## }
<!-- The map, centered at Uluru, Australia. -->
<gmp-map center="-25.344,131.031" zoom="4" map-id="DEMO_MAP_ID">
<div id="controls" slot="control-inline-start-block-start">
<h3>My Google Maps Demo</h3>
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map7/12

Step 3: Add JavaScript code
This section shows you how to load the Maps JavaScript API into a web page, and how to write
your own JavaScript that uses the API to add a map with a marker on it.
## </div>
## </gmp-map>
TypeScript
## (#typescript)
JavaScript (#javascript)
asyncfunctioninitMap():Promise<void>{
//  Request the needed libraries.
const[{Map},{AdvancedMarkerElement}]=awaitPromise.all([
google.maps.importLibrary('maps')asPromise<google.maps.MapsLibrary>,
google.maps.importLibrary(
## 'marker'
)asPromise<google.maps.MarkerLibrary>,
## ]);
// Get the gmp-map element.
constmapElement=document.querySelector(
## 'gmp-map'
)asgoogle.maps.MapElement;
// Get the inner map.
constinnerMap=mapElement.innerMap;
// Set map options.
innerMap.setOptions({
mapTypeControl:false,
## });
// Add a marker positioned at the map center (Uluru).
constmarker=newAdvancedMarkerElement({
map:innerMap,
position:mapElement.center,
title:'Uluru/Ayers Rock',
## });
## }
initMap();
s/blob/529c0a2709195856d1392ad1ea44c0e79599493b/dist/samples/add-map/docs/index.ts#L8-L44)
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map8/12

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
The above code does the following things when initMap() is called:
Loads the maps and marker libraries.
Gets the map element from the DOM.
Sets additional map options (/maps/documentation/javascript/reference#MapOptions) on the inner
map.
Adds a marker to the map.
Get the map object and set options
The innerMap represents an instance of the Map class
(/maps/documentation/javascript/reference/map#Map). To set map options, get the innerMap
(/maps/documentation/javascript/reference/map#MapElement.innerMap) instance from the map element
and call setOptions (/maps/documentation/javascript/reference/map#Map.setOptions). The following
snippet shows getting the innerMap instance from the DOM, then calling setOptions:
Wait for the map to load
When using the gmp-map element, the map loads asynchronously. This can result in a race
condition if other requests are made at initialization time (for example geolocation or a Place
// Get the gmp-map element.
constmapElement=document.querySelector(
## "gmp-map"
)asgoogle.maps.MapElement;
// Get the inner map.
constinnerMap=mapElement.innerMap;
// Set map options.
innerMap.setOptions({
mapTypeControl:false,
## });
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map9/12

details request). To ensure that your code only runs after the map is fully loaded, use an
addListenerOnce idle event handler in your initialization function, as shown here:
Doing this ensures that your code is only run after the map has loaded; the handler is only triggered
once during the app's lifecycle.
Complete example code
See the complete example code here:
// Do things once the map has loaded.
google.maps.event.addListenerOnce(innerMap,'idle',()=>{
// Run this code only after the map has loaded.
console.log("The map is now ready!");
## });
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
asyncfunctioninitMap():Promise<void>{
//  Request the needed libraries.
const[{Map},{AdvancedMarkerElement}]=awaitPromise.all([
google.maps.importLibrary('maps')asPromise<google.maps.MapsLibrary>,
google.maps.importLibrary(
## 'marker'
)asPromise<google.maps.MarkerLibrary>,
## ]);
// Get the gmp-map element.
constmapElement=document.querySelector(
## 'gmp-map'
)asgoogle.maps.MapElement;
// Get the inner map.
constinnerMap=mapElement.innerMap;
// Set map options.
innerMap.setOptions({
mapTypeControl:false,
## });
// Add a marker positioned at the map center (Uluru).
constmarker=newAdvancedMarkerElement({
map:innerMap,
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map10/12

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
Learn more about markers:
Make a marker accessible (/maps/documentation/javascript/advanced-markers/accessible-markers)
Markers with graphical icons (/maps/documentation/javascript/advanced-markers/graphic-markers)
Marker animations
## (/maps/documentation/javascript/advanced-markers/html-markers#animated_markers)
Tips and troubleshooting
Learn more about getting latitude/longitude coordinates, or converting an address into
geographical coordinates. (#get_latLng)
You can tweak options like style and properties to customize the map. For more information
on customizing maps, read the guides to styling (/maps/documentation/javascript/styling), and
drawing on the map (/maps/documentation/javascript/overlays).
Use the Developer Tools Console in your web browser to test and run your code, read error
reports and solve problems with your code.
Use the following keyboard shortcuts to open the console in Chrome:
Command+Option+J (on Mac), or Control+Shift+J (on Windows).
Follow the steps below to get the latitude and longitude coordinates for a location on Google
## Maps.
position:mapElement.center,
title:'Uluru/Ayers Rock',
## });
## }
initMap();
s/blob/529c0a2709195856d1392ad1ea44c0e79599493b/dist/samples/add-map/docs/index.ts#L8-L44)
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map11/12

- Open Google Maps in a browser.
- Right-click the exact location on the map for which you require coordinates.
- Select the latitude and longitude coordinates from the menu.
You can convert an address into latitude and longitude coordinates using the Geocoding
service. The developer guides provide detailed information on getting started with the
Geocoding service (/maps/documentation/javascript/geocoding#GetStarted).
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:23 AMAdd a Google Map with a Marker using JavaScript  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/adding-a-google-map12/12