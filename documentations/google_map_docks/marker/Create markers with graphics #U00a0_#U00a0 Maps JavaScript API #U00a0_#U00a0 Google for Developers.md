

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Create markers with graphics
## Page Summary
## 
Use ctrl + scroll to zoom the map
Map data ©2026 GoogleReport a map error
## 
See the complete example source code
This example shows how to create advanced markers, replacing the default marker icon with
custom graphic images in various formats.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
asyncfunctioninitMap(){
// Request needed libraries.
const{Map}=(awaitgoogle.maps.importLibrary(
## More
## 
2/6/26, 10:47 AMCreate markers with graphics  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers1/8

## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement,PinElement}=
(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
const{Place}=(awaitgoogle.maps.importLibrary(
## 'places'
))asgoogle.maps.PlacesLibrary;
constmapElement=document.querySelector(
## 'gmp-map'
)asgoogle.maps.MapElement;
constparser=newDOMParser();
// A marker with a custom inline SVG.
constpinSvgString=
'<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox
constpinSvg=parser.parseFromString(
pinSvgString,
## 'image/svg+xml'
).documentElement;
constpinSvgMarker=newAdvancedMarkerElement({
position:{lat:37.42475,lng:-122.094},
title:'A marker using a custom SVG image.',
## //@ts-ignore
anchorLeft:'-50%',
anchorTop:'-50%',
## });
pinSvgMarker.append(pinSvg);
mapElement.append(pinSvgMarker);
// A marker with a with a URL pointing to a PNG.
constbeachFlagImg=document.createElement('img');
beachFlagImg.src=newURL('./public/beachflag.png',import.meta.url).href;
constbeachFlagMarker=newAdvancedMarkerElement({
position:{lat:37.434,lng:-122.082},
title:'A marker using a custom PNG Image',
## //@ts-ignore
anchorLeft:'0px',
anchorTop:'100%',
## });
beachFlagMarker.append(beachFlagImg);
mapElement.append(beachFlagMarker);
2/6/26, 10:47 AMCreate markers with graphics  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers2/8

// A marker with a custom SVG glyph.
constglyphImgSrc=newURL('./public/google_logo_g.svg',import.meta.url);
constglyphSvgPinElement=newPinElement({
## //@ts-ignore
glyphSrc:glyphImgSrc,
## });
constglyphSvgMarker=newAdvancedMarkerElement({
position:{lat:37.425,lng:-122.07},
title:'A marker using a custom SVG for the glyph.',
## });
glyphSvgMarker.append(glyphSvgPinElement);
mapElement.append(glyphSvgMarker);
// A marker customized using a place icon and color, name, and geometry.
constplace=newPlace({
id:'ChIJN5Nz71W3j4ARhx5bwpTQEGg',
## });
// Call fetchFields, passing the desired data fields.
awaitplace.fetchFields({
fields:[
## 'location',
'displayName',
'svgIconMaskURI',
'iconBackgroundColor',
## ],
## });
constpinElement=newPinElement({
background:place.iconBackgroundColor,
## //@ts-ignore
glyphSrc:newURL(String(place.svgIconMaskURI)),
## });
constplaceIconMarker=newAdvancedMarkerElement({
position:place.location,
title:place.displayName,
## });
placeIconMarker.append(pinElement);
mapElement.append(placeIconMarker);
## }
initMap();
e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-graphics/docs/index.ts#L8-L111)
2/6/26, 10:47 AMCreate markers with graphics  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers3/8

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
The Advanced markers API supports replacing the default marker icon with a custom graphic
image. You can also replace the glyph with an image file. This page shows you how to:
Use a custom graphic file (#custom-graphic-file)
Use an inline SVG (#inline-svg)
Use a graphic file as the glyph (#graphic-glyph)
Use a place icon image as the glyph (#place-icon-glyph)
Advanced markers supports all common image file types
(https://developer.mozilla.org/docs/Web/Media/Formats/Image_types#common_image_file_types)
, including
PNG, JPEG, GIF, SVG, and TIFF.
In order to add markers to a map, you must first load the marker library
(/maps/documentation/javascript/advanced-markers/add-marker#load_the_advanced_marker_library) which
provides the AdvancedMarkerElement and PinElement classes.
Use a custom graphic file
Create a marker using a custom image by appending an img element referencing a graphic file (for
example PNG), to theAdvancedMarkerElement:
TypeScript
## (#typescript)
JavaScript (#javascript)
// A marker with a with a URL pointing to a PNG.
constbeachFlagImg=document.createElement('img');
beachFlagImg.src=newURL('./public/beachflag.png',import.meta.url).href;
constbeachFlagMarker=newAdvancedMarkerElement({
position:{lat:37.434,lng:-122.082},
2/6/26, 10:47 AMCreate markers with graphics  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers4/8

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Use an inline SVG
Some scenarios may call for the use of an inline SVG. Create a marker using an inline SVG image by
appending an SVG XML element to the AdvancedMarkerElement:
## Code Tutor
## 
title:'A marker using a custom PNG Image',
## //@ts-ignore
anchorLeft:'0px',
anchorTop:'100%',
## });
beachFlagMarker.append(beachFlagImg);
mapElement.append(beachFlagMarker);
e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-graphics/docs/index.ts#L48-L60)
TypeScript
## (#typescript)
JavaScript (#javascript)
constparser=newDOMParser();
// A marker with a custom inline SVG.
constpinSvgString=
'<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0
constpinSvg=parser.parseFromString(
pinSvgString,
## 'image/svg+xml'
).documentElement;
constpinSvgMarker=newAdvancedMarkerElement({
position:{lat:37.42475,lng:-122.094},
title:'A marker using a custom SVG image.',
## //@ts-ignore
anchorLeft:'-50%',
anchorTop:'-50%',
## });
pinSvgMarker.append(pinSvg);
mapElement.append(pinSvgMarker);
2/6/26, 10:47 AMCreate markers with graphics  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers5/8

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Set the marker anchor position
When using a graphical marker, it may be necessary to adjust the position of the marker so that it
appears correctly on the map. This is useful when using a visual which has an anchor point that is
different than the typical bottom center point of the default marker. Set the marker anchor position
using the anchorLeft
(/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement.anchorLeft) and
anchorTop
(/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement.anchorTop) marker
options. Specify anchorLeft and anchorTop values using CSS length-percentage values
(https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage).
Use a graphic file as the glyph
Replace the default glyph by passing an img element referencing a graphic file resource, or an inline
SVG resource, to the PinElement.glyphSrc option:
e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-graphics/docs/index.ts#L26-L44)
TypeScript
## (#typescript)
JavaScript (#javascript)
// A marker with a custom SVG glyph.
constglyphImgSrc=newURL('./public/google_logo_g.svg',import.meta.url);
constglyphSvgPinElement=newPinElement({
## //@ts-ignore
glyphSrc:glyphImgSrc,
## });
constglyphSvgMarker=newAdvancedMarkerElement({
position:{lat:37.425,lng:-122.07},
title:'A marker using a custom SVG for the glyph.',
## });
glyphSvgMarker.append(glyphSvgPinElement);
mapElement.append(glyphSvgMarker);
2/6/26, 10:47 AMCreate markers with graphics  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers6/8

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Use a place icon as the glyph
With Place Details, you can request a place icon and background color
(/maps/documentation/javascript/place-icons), which you can apply to markers. Customize a marker
using place data by passing place.icon_background_color to the PinElement.background
option, and a URL using place.icon_mask_base_uri to PinElement.glyphSrc. Append the PNG
or SVG file type extension to the URI. Use place.geometry.location to place the marker in the
correct location. This example also displays the place.name in the marker title.
e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-graphics/docs/index.ts#L64-L77)
TypeScript
## (#typescript)
JavaScript (#javascript)
// A marker customized using a place icon and color, name, and geometry.
constplace=newPlace({
id:'ChIJN5Nz71W3j4ARhx5bwpTQEGg',
## });
// Call fetchFields, passing the desired data fields.
awaitplace.fetchFields({
fields:[
## 'location',
'displayName',
'svgIconMaskURI',
'iconBackgroundColor',
## ],
## });
constpinElement=newPinElement({
background:place.iconBackgroundColor,
## //@ts-ignore
glyphSrc:newURL(String(place.svgIconMaskURI)),
## });
constplaceIconMarker=newAdvancedMarkerElement({
position:place.location,
title:place.displayName,
2/6/26, 10:47 AMCreate markers with graphics  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers7/8

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
Next steps
Create markers with custom HTML (/maps/documentation/javascript/advanced-markers/html-markers)
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## });
placeIconMarker.append(pinElement);
mapElement.append(placeIconMarker);
7230973d44b60568147f527dab3a/dist/samples/advanced-markers-graphics/docs/index.ts#L81-L107)
2/6/26, 10:47 AMCreate markers with graphics  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers8/8