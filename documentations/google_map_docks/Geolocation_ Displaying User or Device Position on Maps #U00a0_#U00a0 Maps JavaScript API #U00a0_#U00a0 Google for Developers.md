

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Geolocation: Displaying User or Device Position
on Maps
## Page Summary
## 
## Overview
This tutorial shows you how to display the geographic location of a device on a Google map, using
your browser's HTML5 Geolocation feature along with the Maps JavaScript API. The geographic
location will only display if the user has allowed location sharing.
When the user triggers the geolocation request, they will receive a prompt from the browser for
consent to access the device's location data. If the request fails, it could be because location
permissions were denied, or because the device couldn't determine its location. This feature is
available only in secure contexts (HTTPS), in some or all supporting browsers.
Below is a map that can identify the present location of the user's device.
2/6/26, 11:24 AMGeolocation: Displaying User or Device Position on Maps  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geolocation1/4

The sample below shows the entire code you need to create this map.
TypeScript
## (#typescript)
JavaScript (#javascript)
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
letmap:google.maps.Map,infoWindow:google.maps.InfoWindow;
functioninitMap():void{
map=newgoogle.maps.Map(document.getElementById("map")asHTMLElement,{
center:{lat:-34.397,lng:150.644},
zoom:6,
## });
infoWindow=newgoogle.maps.InfoWindow();
constlocationButton=document.createElement("button");
locationButton.textContent="Pan to Current Location";
locationButton.classList.add("custom-map-control-button");
map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
locationButton.addEventListener("click",()=>{
2/6/26, 11:24 AMGeolocation: Displaying User or Device Position on Maps  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geolocation2/4

// Try HTML5 geolocation.
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(
(position:GeolocationPosition)=>{
constpos={
lat:position.coords.latitude,
lng:position.coords.longitude,
## };
infoWindow.setPosition(pos);
infoWindow.setContent("Location found.");
infoWindow.open(map);
map.setCenter(pos);
## },
## ()=>{
handleLocationError(true,infoWindow,map.getCenter()!);
## }
## );
## }else{
// Browser doesn't support Geolocation
handleLocationError(false,infoWindow,map.getCenter()!);
## }
## });
## }
functionhandleLocationError(
browserHasGeolocation:boolean,
infoWindow:google.maps.InfoWindow,
pos:google.maps.LatLng
## ){
infoWindow.setPosition(pos);
infoWindow.setContent(
browserHasGeolocation
?"Error: The Geolocation service failed."
:"Error: Your browser doesn't support geolocation."
## );
infoWindow.open(map);
## }
declareglobal{
interfaceWindow{
initMap:()=>void;
## }
## }
window.initMap=initMap;
ples/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/samples/map-geolocation/index.ts#L8-L73)
2/6/26, 11:24 AMGeolocation: Displaying User or Device Position on Maps  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geolocation3/4

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
View example (/maps/documentation/javascript/examples/map-geolocation)
## Try Sample
JSFiddle.net...
## Google Cloud Shell...
What is Geolocation?
Geolocation refers to the identification of the geographic location of a computing device using a
variety of data collection mechanisms. Typically, most geolocation services use network routing
addresses or internal GPS chips to determine this location. Geolocation is a device-specific API.
This means that browsers or devices must support geolocation in order to use it through web
applications.
W3C Geolocation standard
Applications that want to perform geolocation must support the W3C Geolocation standard
(http://dev.w3.org/geo/api/spec-source.html). Notice that the sample code above determines the
device's location through the W3C navigator.geolocation API.
Sometimes websites use IP addresses to detect the location of a device, however this may only
provide a rough estimate of that location. W3C-standard APIs are the most fully-supported and
most accurate, so they should be prioritized over other geolocation methods.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:24 AMGeolocation: Displaying User or Device Position on Maps  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/geolocation4/4