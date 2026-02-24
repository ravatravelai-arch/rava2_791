

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Markers overview
## Page Summary
## 
Select platform:

## Android (/maps/documentation/android-sdk/advanced-markers/overview)
iOS (/maps/documentation/ios-sdk/advanced-markers/overview)
JavaScript (/maps/documentation/javascript/advanced-markers/overview)
Use markers to display single locations on a map. This guide shows you how to use advanced
markers. With advanced markers you can create and customize highly performant markers, and
make accessible markers that respond to DOM click events and keyboard input. For even deeper
customization, advanced markers supports the use of custom HTML and CSS, including the ability
to create completely custom markers. For 3D applications you can control the altitude at which a
marker appears. Advanced markers are supported on both raster and vector maps (though some
features are not available on raster maps). A map ID is required to use Advanced Markers (the
DEMO_MAP_ID can be used).
Tip: If your map uses legacy markers (/maps/documentation/javascript/markers), consider migrating to
advanced markers (/maps/documentation/javascript/advanced-markers/migration).
Get started with advanced markers (/maps/documentation/javascript/advanced-markers/start)
Customize color, scale, and icon image
Customize the default marker's background, glyph, and border color, and adjust marker size.
2/6/26, 10:46 AMMarkers overview  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/overview1/4

Replace the default marker icon with a custom SVG or PNG image.
Create custom HTML markers
Use custom HTML and CSS to create visually distinctive interactive markers, and create
animations.
2/6/26, 10:46 AMMarkers overview  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/overview2/4

Make markers respond to click and keyboard events
Make a marker respond to clicks and keyboard events by adding a click event listener.
Set marker altitude and collision behavior
## Code Tutor
## 
functioninitMap(){
constmap=newgoogle.maps.Map(document.getElementById('map'),{
center:{lat:37.4239163,lng:-122.0947209},
zoom:17,
mapId:'DEMO_MAP_ID',
## });
constmarker=newgoogle.maps.marker.AdvancedMarkerElement({
map,
position:{lat:37.4239163,lng:-122.0947209},
## });
marker.addListener('click',({domEvent,latLng})=>{
const{target}=domEvent;
// Handle the click event.
## // ...
## });
## }
2/6/26, 10:46 AMMarkers overview  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/overview3/4

Set the altitude for a marker to make it appear correctly with 3D map elements, and specify how a
marker should behave when it collides with another marker or map label. Marker altitude is only
supported on vector maps.
Next step
Get started with advanced markers  (/maps/documentation/javascript/advanced-markers/start)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 10:46 AMMarkers overview  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/overview4/4