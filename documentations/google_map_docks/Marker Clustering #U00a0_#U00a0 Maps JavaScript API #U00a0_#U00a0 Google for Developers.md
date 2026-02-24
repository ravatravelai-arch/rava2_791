

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
## Marker Clustering
## Page Summary
## 
Select platform:

## Android (/maps/documentation/android-sdk/utility/marker-clustering)
iOS (/maps/documentation/ios-sdk/utility/marker-clustering)
JavaScript (/maps/documentation/javascript/marker-clustering)
## Overview
This tutorial shows you how to use marker clusters to display a large number of markers on a map.
You can use the @googlemaps/markerclusterer
## (https://github.com/googlemaps/js-markerclusterer)
library in combination with the Maps JavaScript API to combine markers of close proximity into
clusters, and simplify the display of markers on the map.
To see how marker clustering works, view the map below.
2/6/26, 11:24 AMMarker Clustering  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/marker-clustering1/5

The number on a cluster indicates how many markers it contains. Notice that as you zoom into any
of the cluster locations, the number on the cluster decreases, and you begin to see the individual
markers on the map. Zooming out of the map consolidates the markers into clusters again.
The sample below shows the entire code you need to create this map.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
import{MarkerClusterer}from"@googlemaps/markerclusterer";
asyncfunctioninitMap(){
// Request needed libraries.
const{Map,InfoWindow}=awaitgoogle.maps.importLibrary("maps")asgoogle
const{AdvancedMarkerElement,PinElement}=awaitgoogle.maps.importLibrary
constmap=newgoogle.maps.Map(
document.getElementById("map")asHTMLElement,
## {
zoom:3,
center:{lat:-28.024,lng:140.887},
mapId:'DEMO_MAP_ID',
## }
## );
constinfoWindow=newgoogle.maps.InfoWindow({
2/6/26, 11:24 AMMarker Clustering  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/marker-clustering2/5

content:"",
disableAutoPan:true,
## });
// Create an array of alphabetical characters used to label the markers.
constlabels="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// Add some markers to the map.
constmarkers=locations.map((position,i)=>{
constlabel=labels[i%labels.length];
constpinGlyph=newgoogle.maps.marker.PinElement({
glyph:label,
glyphColor:"white",
## })
constmarker=newgoogle.maps.marker.AdvancedMarkerElement({
position,
content:pinGlyph.element,
## });
// markers can only be keyboard focusable when they have click listeners
// open info window when marker is clicked
marker.addListener("click",()=>{
infoWindow.setContent(position.lat+", "+position.lng);
infoWindow.open(map,marker);
## });
returnmarker;
## });
// Add a marker clusterer to manage the markers.
newMarkerClusterer({markers,map});
## }
constlocations=[
## {lat:-31.56391,lng:147.154312},
## {lat:-33.718234,lng:150.363181},
## {lat:-33.727111,lng:150.371124},
## {lat:-33.848588,lng:151.209834},
## {lat:-33.851702,lng:151.216968},
## {lat:-34.671264,lng:150.863657},
## {lat:-35.304724,lng:148.662905},
## {lat:-36.817685,lng:175.699196},
## {lat:-36.828611,lng:175.790222},
## {lat:-37.75,lng:145.116667},
## {lat:-37.759859,lng:145.128708},
## {lat:-37.765015,lng:145.133858},
## {lat:-37.770104,lng:145.143299},
## {lat:-37.7737,lng:145.145187},
## {lat:-37.774785,lng:145.137978},
2/6/26, 11:24 AMMarker Clustering  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/marker-clustering3/5

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
## Google Cloud Shell...
As a simple illustration, this tutorial adds a set of markers to the map using the locations array.
You can use other sources to get markers for your map. For more information, read the guide to
creating markers (/maps/documentation/javascript/markers).
Add a marker clusterer
Follow the steps below to add a marker clusterer:
- Add the marker clustering library to your page or application. The library is available on NPM
at @googlemaps/markerclusterer
## (https://www.npmjs.com/package/@googlemaps/markerclusterer)
and in the repository on GitHub
## (https://github.com/googlemaps/js-markerclusterer)
## .
Install the latest version of the @googlemaps/markerclusterer
## (https://www.npmjs.com/package/@googlemaps/markerclusterer)
library using NPM.
## {lat:-37.819616,lng:144.968119},
## {lat:-38.330766,lng:144.695692},
## {lat:-39.927193,lng:175.053218},
## {lat:-41.330162,lng:174.865694},
## {lat:-42.734358,lng:147.439506},
## {lat:-42.734358,lng:147.501315},
## {lat:-42.735258,lng:147.438},
## {lat:-43.999792,lng:170.463352},
## ];
initMap();
ples/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/samples/marker-clustering/index.ts#L7-L82)
## NPM
## (#npm)
CDN (#cdn)
2/6/26, 11:24 AMMarker Clustering  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/marker-clustering4/5

- Add a marker clusterer in your app.
The code below adds a marker clusterer to the map.
This sample passes the markers array to the MarkerClusterer.
- Customize the marker clusterer.
Customize the cluster icon
## (https://googlemaps.github.io/js-
markerclusterer/interfaces/MarkerClustererOptions.html#renderer)
through the renderer interface.
Modify the algorithm
## (https://googlemaps.github.io/js-
markerclusterer/interfaces/MarkerClustererOptions.html#algorithm)
for generating clusters.
Learn more
You can view more complex examples of marker clustering in the repository on GitHub
## (https://github.com/googlemaps/js-markerclusterer)
and read the reference documentation
## (https://googlemaps.github.io/js-markerclusterer/)
for the library.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## $npminstall@googlemaps/markerclusterer
## NPM
## (#npm)
CDN (#cdn)
import{MarkerClusterer}from"@googlemaps/markerclusterer";
constmarkerCluster=newMarkerClusterer({markers,map});
2/6/26, 11:24 AMMarker Clustering  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/marker-clustering5/5