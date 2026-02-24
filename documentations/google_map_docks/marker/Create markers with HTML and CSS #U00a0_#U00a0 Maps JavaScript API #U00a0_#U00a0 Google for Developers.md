

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Create markers with HTML and CSS
## Page Summary
## 
With advanced markers you can use custom HTML and CSS to create markers with high visual
impact, that can feature interactivity and animation. All AdvancedMarkerElement instances are
added to the DOM as HTML elements, which you can access via the element property, and
manipulate in the same way as any other DOM element. Because AdvancedMarkerElement is a
DOM element, you can directly apply CSS styles to the default marker, and create custom markers
completely from scratch using HTML and CSS.
Simple HTML marker
This example map shows creating a simple custom HTML marker:
## $2.5M
Map data ©2026 GoogleReport a map error
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers1/11

## 
View the source
The following example shows creating a new DIV element, assigning a CSS class and text content
to the DIV, then appending the DIV to the AdvancedMarkerElement:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
Interactive markers
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
asyncfunctioninitMap(){
// Request needed libraries.
const{Map}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement}=(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
constpriceTag=document.createElement('div');
priceTag.className='price-tag';
priceTag.textContent='$2.5M';
constmarker=newAdvancedMarkerElement({
position:{lat:37.42,lng:-122.1},
## });
marker.append(priceTag);
mapElement.append(marker);
## }
initMap();
230973d44b60568147f527dab3a/dist/samples/advanced-markers-html-simple/docs/index.ts#L8-L31)
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers2/11

This example shows creating a set of interactive markers that display fictional information when
clicked. Most of the functionality in this example is contained within the CSS.
View the source
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
asyncfunctioninitMap(){
// Request needed libraries.
const{Map}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement}=(awaitgoogle.maps.importLibrary(
## 'marker'
))asgoogle.maps.MarkerLibrary;
constcenter={lat:37.43238031167444,lng:-122.16795397128632};
constmap=newMap(document.getElementById('map')asHTMLElement,{
zoom:11,
center,
mapId:'4504f8b37365c3d0',
## });
for(constpropertyofproperties){
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers3/11

constadvancedMarkerElement=
newgoogle.maps.marker.AdvancedMarkerElement({
map,
content:buildContent(property),
position:property.position,
title:property.description,
## });
advancedMarkerElement.addListener('click',()=>{
toggleHighlight(advancedMarkerElement,property);
## });
## }
## }
functiontoggleHighlight(markerView,property){
if(markerView.content.classList.contains('highlight')){
markerView.content.classList.remove('highlight');
markerView.zIndex=null;
## }else{
markerView.content.classList.add('highlight');
markerView.zIndex=1;
## }
## }
functionbuildContent(property){
constcontent=document.createElement('div');
content.classList.add('property');
content.innerHTML=`
<div class="icon">
<i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${p
<span class="fa-sr-only">${property.type}</span>
## </div>
<div class="details">
<div class="price">${property.price}</div>
<div class="address">${property.address}</div>
<div class="features">
## <div>
<i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"><
<span class="fa-sr-only">bedroom</span>
## <span>${property.bed}</span>
## </div>
## <div>
<i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom
<span class="fa-sr-only">bathroom</span>
## <span>${property.bath}</span>
## </div>
## <div>
<i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"><
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers4/11

<span class="fa-sr-only">size</span>
<span>${property.size} ft<sup>2</sup></span>
## </div>
## </div>
## </div>
## `;
returncontent;
## }
constproperties=[
## {
address:'215 Emily St, MountainView, CA',
description:'Single family house with modern design',
price:'$ 3,889,000',
type:'home',
bed:5,
bath:4.5,
size:300,
position:{
lat:37.50024109655184,
lng:-122.28528451834352,
## },
## },
## {
address:'108 Squirrel Ln &#128063;, Menlo Park, CA',
description:'Townhouse with friendly neighbors',
price:'$ 3,050,000',
type:'building',
bed:4,
bath:3,
size:200,
position:{
lat:37.44440882321596,
lng:-122.2160620727,
## },
## },
## {
address:'100 Chris St, Portola Valley, CA',
description:'Spacious warehouse great for small business',
price:'$ 3,125,000',
type:'warehouse',
bed:4,
bath:4,
size:800,
position:{
lat:37.39561833718522,
lng:-122.21855116258479,
## },
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers5/11

## },
## {
address:'98 Aleh Ave, Palo Alto, CA',
description:'A lovely store on busy road',
price:'$ 4,225,000',
type:'store-alt',
bed:2,
bath:1,
size:210,
position:{
lat:37.423928529779644,
lng:-122.1087629822001,
## },
## },
## {
address:'2117 Su St, MountainView, CA',
description:'Single family house near golf club',
price:'$ 1,700,000',
type:'home',
bed:4,
bath:3,
size:200,
position:{
lat:37.40578635332598,
lng:-122.15043378466069,
## },
## },
## {
address:'197 Alicia Dr, Santa Clara, CA',
description:'Multifloor large warehouse',
price:'$ 5,000,000',
type:'warehouse',
bed:5,
bath:4,
size:700,
position:{
lat:37.36399747905774,
lng:-122.10465384268522,
## },
## },
## {
address:'700 Jose Ave, Sunnyvale, CA',
description:'3 storey townhouse with 2 car garage',
price:'$ 3,850,000',
type:'building',
bed:4,
bath:4,
size:600,
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers6/11

position:{
lat:37.38343706184458,
lng:-122.02340436985183,
## },
## },
## {
address:'868 Will Ct, Cupertino, CA',
description:'Single family house in great school zone',
price:'$ 2,500,000',
type:'home',
bed:3,
bath:2,
size:100,
position:{
lat:37.34576403052,
lng:-122.04455090047453,
## },
## },
## {
address:'655 Haylee St, Santa Clara, CA',
description:'2 storey store with large storage room',
price:'$ 2,500,000',
type:'store-alt',
bed:3,
bath:2,
size:450,
position:{
lat:37.362863347890716,
lng:-121.97802139023555,
## },
## },
## {
address:'2019 Natasha Dr, San Jose, CA',
description:'Single family house',
price:'$ 2,325,000',
type:'home',
bed:4,
bath:3.5,
size:500,
position:{
lat:37.41391636421949,
lng:-121.94592071575907,
## },
## },
## ];
initMap();
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers7/11

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
Animated markers
This example creates the traditional "bounce-drop" animation using CSS and advanced markers. In
the IntersectionObserver, it adds the drop CSS style. The IntersectionObserversees when
each marker enters the viewport, and adds the style. Then, the animationend event listener that the
createMarker() function added to each marker removes the style.
View the source
5323e7230973d44b60568147f527dab3a/dist/samples/advanced-markers-html/docs/index.ts#L8-L217)
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers8/11

## /**
- Returns a random lat lng position within the map bounds.
- @param {!google.maps.Map} map
- @return {!google.maps.LatLngLiteral}
## */
functiongetRandomPosition(map){
constbounds=map.getBounds();
constminLat=bounds.getSouthWest().lat();
constminLng=bounds.getSouthWest().lng();
constmaxLat=bounds.getNorthEast().lat();
constmaxLng=bounds.getNorthEast().lng();
constlatRange=maxLat-minLat;
// Note: longitude can span from a positive longitude in the west to a
// negative one in the east. e.g. 150lng (150E) <-> -30lng (30W) is a large
// span that covers the whole USA.
letlngRange=maxLng-minLng;
if(maxLng < minLng){
lngRange+=360;
## }
return{
lat:minLat+Math.random()*latRange,
lng:minLng+Math.random()*lngRange,
## };
## }
consttotal=100;
constintersectionObserver=newIntersectionObserver((entries)=>{
for(constentryofentries){
if(entry.isIntersecting){
entry.target.classList.add('drop');
intersectionObserver.unobserve(entry.target);
## }
## }
## });
asyncfunctioninitMap():Promise<void>{
// Request needed libraries.
const{Map}=(awaitgoogle.maps.importLibrary(
## 'maps'
))asgoogle.maps.MapsLibrary;
const{AdvancedMarkerElement,PinElement}=
(awaitgoogle.maps.importLibrary(
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers9/11

## 'marker'
))asgoogle.maps.MarkerLibrary;
constposition={lat:37.4242011827985,lng:-122.09242296450893};
constmap=newMap(document.getElementById('map')asHTMLElement,{
zoom:14,
center:position,
mapId:'4504f8b37365c3d0',
## });
// Create 100 markers to animate.
google.maps.event.addListenerOnce(map,'idle',()=>{
for(leti=0;i < 100;i++){
createMarker(map,AdvancedMarkerElement,PinElement);
## }
## });
// Add a button to reset the example.
constcontrolDiv=document.createElement('div');
constcontrolUI=document.createElement('button');
controlUI.classList.add('ui-button');
controlUI.innerText='Reset the example';
controlUI.addEventListener('click',()=>{
// Reset the example by reloading the map iframe.
refreshMap();
## });
controlDiv.appendChild(controlUI);
map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
## }
functioncreateMarker(map,AdvancedMarkerElement,PinElement){
constpinElement=newPinElement();
constcontent=pinElement.element;
constadvancedMarker=newAdvancedMarkerElement({
position:getRandomPosition(map),
map:map,
content:content,
## });
content.style.opacity='0';
content.addEventListener('animationend',(event)=>{
content.classList.remove('drop');
content.style.opacity='1';
## });
consttime=2+Math.random();// 2s delay for easy to see the animation
content.style.setProperty('--delay-time',time+'s');
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers10/11

## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
intersectionObserver.observe(content);
## }
functionrefreshMap(){
// Refresh the map.
constmapContainer=document.getElementById('mapContainer');
constmap=document.getElementById('map');
map!.remove();
constmapDiv=document.createElement('div');
mapDiv.id='map';
mapContainer!.appendChild(mapDiv);
initMap();
## }
initMap();
7230973d44b60568147f527dab3a/dist/samples/advanced-markers-animation/docs/index.ts#L8-L115)
2/6/26, 10:48 AMCreate markers with HTML and CSS  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers11/11