

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Basic marker customization
## Page Summary
## 
Select platform:

## Android (/maps/documentation/android-sdk/advanced-markers/add-marker)
iOS (/maps/documentation/ios-sdk/advanced-markers/customization)
JavaScript (/maps/documentation/javascript/advanced-markers/basic-customization)
## T
Map data ©2026 GoogleReport a map error
## 
See the complete example source code
This example shows how to customize markers in the following ways: add title text, scale the
marker, change the background color, change the border color, change the glyph color, hide the
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization1/10

glyph.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
constparser=newDOMParser();
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
asyncfunctioninitMap(){
// Request needed libraries.
const{Map}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement,PinElement}=
(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
// Each PinElement is paired with a marker to demonstrate setting each para
// Default marker with title text (no PinElement).
constmarkerWithText=newAdvancedMarkerElement({
position:{lat:37.419,lng:-122.03},
title:'Title text for the marker at lat: 37.419, lng: -122.03',
## });
mapElement.append(markerWithText);
// Adjust the scale.
constpinScaled=newPinElement({
scale:1.5,
## });
constmarkerScaled=newAdvancedMarkerElement({
position:{lat:37.419,lng:-122.02},
## });
markerScaled.append(pinScaled);
mapElement.append(markerScaled);
// Change the background color.
constpinBackground=newPinElement({
background:'#FBBC04',
## });
constmarkerBackground=newAdvancedMarkerElement({
position:{lat:37.419,lng:-122.01},
## });
markerBackground.append(pinBackground);
mapElement.append(markerBackground);
## More
## 
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization2/10

// Change the border color.
constpinBorder=newPinElement({
borderColor:'#137333',
## });
constmarkerBorder=newAdvancedMarkerElement({
position:{lat:37.415,lng:-122.035},
## });
markerBorder.append(pinBorder);
mapElement.append(markerBorder);
// Change the glyph color.
constpinGlyph=newPinElement({
glyphColor:'white',
## });
constmarkerGlyph=newAdvancedMarkerElement({
position:{lat:37.415,lng:-122.025},
## });
markerGlyph.append(pinGlyph);
mapElement.append(markerGlyph);
constpinTextGlyph=newPinElement({
## //@ts-ignore
glyphText:'T',
glyphColor:'white',
## });
constmarkerGlyphText=newAdvancedMarkerElement({
position:{lat:37.415,lng:-122.015},
## });
markerGlyphText.append(pinTextGlyph);
mapElement.append(markerGlyphText);
// Hide the glyph.
constpinNoGlyph=newPinElement({
## //@ts-ignore
glyphText:'',
## });
constmarkerNoGlyph=newAdvancedMarkerElement({
position:{lat:37.415,lng:-122.005},
## });
markerNoGlyph.append(pinNoGlyph);
mapElement.append(markerNoGlyph);
## }
initMap();
230973d44b60568147f527dab3a/dist/samples/advanced-markers-basic-style/docs/index.ts#L8-L107)
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization3/10

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
This page shows you how to customize markers in the following ways:
Add title text (#add-title-text)
Scale the marker (#scale-the-marker)
Change the background color (#change-the-background-color)
Change the border color (#change-the-border-color)
Change the glyph color (#change-the-glyph-color)
Use text in a glyph (#glyph-with-text)
Hide the glyph (#hide-the-glyph)
Figure 1: The parts of an Advanced Marker.
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization4/10

Advanced markers uses two classes to define markers: the AdvancedMarkerElement class
provides the basic parameters (position, title, and map), and the PinElement class contains
options for further customization.
In order to add markers to a map, you must first load the marker library
(/maps/documentation/javascript/advanced-markers/add-marker#load_the_advanced_marker_library) which
provides the AdvancedMarkerElement
(/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement) and PinElement
(/maps/documentation/javascript/reference/advanced-markers#PinElement) classes.
The following snippet shows code to create a new PinElement, then apply it to a marker.
In maps created using custom HTML elements, the basic parameters for a marker are declared
using the gmp-advanced-marker HTML element; any customization that uses the PinElement
class must be applied programmatically. To do this, your code must retrieve the gmp-advanced-
marker elements from the HTML page. The following snippet shows code to query for a collection
of gmp-advanced-marker elements, then iterate through the results to apply customization that
was declared in the PinElement.
// Create a pin element.
constmyPin=newPinElement({
scale:1.5,
## });
// Create a marker.
constmyMarker=newAdvancedMarkerElement({
position:{lat:37.4239163,lng:-122.0947209},
## });
// Append the pin to the marker.
myMarker.append(myPin);
// Append the marker to the map.
mapElement.append(myMarker);
// Return an array of markers.
constadvancedMarkers=[...document.querySelectorAll('gmp-advanced-marker')];
// Loop through the markers
for(leti=0;i < advancedMarkers.length;i++){
constpin=newPinElement({
scale:2.0,
## });
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization5/10

Add title text
Title text appears when the cursor hovers over a marker. Title text is readable by screen readers.
To add title text programmatically, use the AdvancedMarkerElement.title option:
To add title text to a marker created using custom HTML elements, use the title attribute:
Scale the marker
marker.append(pin);
## }
// Default marker with title text (no PinElement).
constmarkerWithText=newAdvancedMarkerElement({
position:{lat:37.419,lng:-122.03},
title:'Title text for the marker at lat: 37.419, lng: -122.03',
## });
mapElement.append(markerWithText);
5323e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-basic-style/docs/index.js#L16-L21)
## <gmp-map
center="43.4142989,-124.2301242"
zoom="4"
map-id="DEMO_MAP_ID"
style="height: 400px"
## >
## <gmp-advanced-marker
position="37.4220656,-122.0840897"
title="Mountain View, CA"
## ></gmp-advanced-marker>
## <gmp-advanced-marker
position="47.648994,-122.3503845"
title="Seattle, WA"
## ></gmp-advanced-marker>
## </gmp-map>
7366fb27829401945d2a7e27d77ed2df8e5/dist/samples/web-components-markers/docs/index.html#L17-L31)
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization6/10

## 
## 
To scale a marker, use the scale option.
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Change the background color
Use the PinElement.background option to change the background color of a marker:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
TypeScript
## (#typescript)
JavaScript (#javascript)
// Adjust the scale.
constpinScaled=newPinElement({
scale:1.5,
## });
constmarkerScaled=newAdvancedMarkerElement({
position:{lat:37.419,lng:-122.02},
## });
markerScaled.append(pinScaled);
mapElement.append(markerScaled);
230973d44b60568147f527dab3a/dist/samples/advanced-markers-basic-style/docs/index.ts#L33-L41)
TypeScript
## (#typescript)
JavaScript (#javascript)
// Change the background color.
constpinBackground=newPinElement({
background:'#FBBC04',
## });
constmarkerBackground=newAdvancedMarkerElement({
position:{lat:37.419,lng:-122.01},
## });
markerBackground.append(pinBackground);
mapElement.append(markerBackground);
230973d44b60568147f527dab3a/dist/samples/advanced-markers-basic-style/docs/index.ts#L45-L53)
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization7/10

## 
Change the border color
Use the PinElement.borderColor option to change the border color of a marker:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Change the glyph color
Use the PinElement.glyphColor option to change the glyph color of a marker:
TypeScript
## (#typescript)
JavaScript (#javascript)
// Change the border color.
constpinBorder=newPinElement({
borderColor:'#137333',
## });
constmarkerBorder=newAdvancedMarkerElement({
position:{lat:37.415,lng:-122.035},
## });
markerBorder.append(pinBorder);
mapElement.append(markerBorder);
230973d44b60568147f527dab3a/dist/samples/advanced-markers-basic-style/docs/index.ts#L57-L65)
TypeScript
## (#typescript)
JavaScript (#javascript)
// Change the glyph color.
constpinGlyph=newPinElement({
glyphColor:'white',
## });
constmarkerGlyph=newAdvancedMarkerElement({
position:{lat:37.415,lng:-122.025},
## });
markerGlyph.append(pinGlyph);
mapElement.append(markerGlyph);
230973d44b60568147f527dab3a/dist/samples/advanced-markers-basic-style/docs/index.ts#L69-L77)
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization8/10

## 
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Use text in a glyph
Use the PinElement.glyphText option to replace the default glyph with a text character. The text
glyph of the PinElement scales with the PinElement and its default color matches the default
glyphColor of the PinElement.
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Hide the glyph
Set the PinElement.glyphText option to an empty string to hide a marker's glyph:
TypeScript
## (#typescript)
JavaScript (#javascript)
constpinTextGlyph=newPinElement({
## //@ts-ignore
glyphText:'T',
glyphColor:'white',
## });
constmarkerGlyphText=newAdvancedMarkerElement({
position:{lat:37.415,lng:-122.015},
## });
markerGlyphText.append(pinTextGlyph);
mapElement.append(markerGlyphText);
230973d44b60568147f527dab3a/dist/samples/advanced-markers-basic-style/docs/index.ts#L81-L90)
TypeScript
## (#typescript)
JavaScript (#javascript)
// Hide the glyph.
constpinNoGlyph=newPinElement({
## //@ts-ignore
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization9/10

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Alternatively, set PinElement.glyphColor to the same value as PinElement.background. This has
the effect of visually hiding the glyph.
Next steps:
Create markers with graphics (/maps/documentation/javascript/advanced-markers/graphic-markers)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
glyphText:'',
## });
constmarkerNoGlyph=newAdvancedMarkerElement({
position:{lat:37.415,lng:-122.005},
## });
markerNoGlyph.append(pinNoGlyph);
mapElement.append(markerNoGlyph);
30973d44b60568147f527dab3a/dist/samples/advanced-markers-basic-style/docs/index.ts#L94-L103)
2/6/26, 10:47 AMBasic marker customization  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/basic-customization10/10