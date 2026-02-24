

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Route demo
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
The Route demo lets you specify an origin and destination as a latitude/longitude coordinates pair
or as a place ID. To copy the latitude/longitude coordinates, find and click a location on the map,
and then paste the location into the form.
After you select Get route, the demo displays the response from the computeRoutes
(/maps/documentation/javascript/reference/route#Route.computeRoutes) method as a route on the map.
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo1/16

Input locations


## Travel Mode
## Driving
Departure Time (Your local time)
Choose your local time. The selected time will be converted to UTC format time.
If you set the departure time, the routing preference has to be either TRAFFIC_AWARE or
TRAFFIC_AWARE_OPTIMAL. TRAFFIC_AWARE_OPTIMAL calculates best routes by factoring in real-time road
conditions, including closures.
mm/dd/yyyy --:-- --
## Route Options
## Polyline Quality
## Traffic Awareness
## Traffic Aware Polyline
## Route Modifiers




Origin*Heading
StopoverSide of Road
Destination*Heading
StopoverSide of Road
Avoid tolls
Avoid highways
Avoid ferries
Avoid indoor
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo2/16

Reference routes


## Emission Type
## Fields
## Fields















## Gasoline
Get routes
## Alternative Routes
## Shorter Distance Routes
## Eco-friendly Routes
routeLabels
legs
distanceMeters
durationMillis
staticDurationMillis
path
polylineDetails
description
warnings
viewport
travelAdvisory
optimizedIntermediateWaypointIndices
localizedValues
routeToken
speedPaths
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo3/16

## 
See the complete example source code
The following demo lets you experiment with creating lots of different kinds of routes. Click the
map to copy the latitude/longitude coordinates of a location. Paste the coordinates into the form to
get directions.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
letmarkers:google.maps.marker.AdvancedMarkerElement[]=[];
letpolylines:google.maps.Polyline[]=[];
letwaypointInfoWindow:google.maps.InfoWindow|null=null;
interfacePlaceAutocompleteSelection{
predictionText:string|null;
location:google.maps.LatLng|null;
## }
## More
## 
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo4/16

constoriginAutocompleteSelection:PlaceAutocompleteSelection={
predictionText:null,
location:null,
## };
constdestinationAutocompleteSelection:PlaceAutocompleteSelection={
predictionText:null,
location:null,
## };
asyncfunctioninit(){
const[
{InfoWindow},
{AdvancedMarkerElement},
## //prettier-ignore
## //@ts-ignore
{PlaceAutocompleteElement},
## //prettier-ignore
## //@ts-ignore
{ComputeRoutesExtraComputation,ReferenceRoute,Route,RouteLabel},
]=awaitPromise.all([
google.maps.importLibrary('maps')asPromise<google.maps.MapsLibrary>,
google.maps.importLibrary(
## 'marker'
)asPromise<google.maps.MarkerLibrary>,
google.maps.importLibrary(
## 'places'
)asPromise<google.maps.PlacesLibrary>,
google.maps.importLibrary(
## 'routes'
)asPromise<google.maps.RoutesLibrary>,
## ]);
constmap=document.getElementById('map')asgoogle.maps.MapElement;
attachSubmitListener();
initializeLocationInputs();
attachMapClickListener();
attachTravelModeListener();
attachAlertWindowListener();
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo5/16

attachDepartureTimeListener();
functionattachSubmitListener(){
constcomputeRoutesForm=document.getElementById(
## 'compute-routes-form'
)asHTMLFormElement;
computeRoutesForm.addEventListener('submit',(event)=>{
event.preventDefault();
sendRequest(newFormData(computeRoutesForm));
## });
## }
asyncfunctionsendRequest(formData:FormData){
clearMap();
try{
const{routes}=awaitRoute.computeRoutes(
buildComputeRoutesJsRequest(formData)
## );
if(!routes){
console.log('No routes returned.');
return;
## }
console.log('Routes:');
routes.forEach((route)=>{
console.log(route.toJSON());
## });
awaitPromise.all(
routes.map((route)=>
drawRoute(
route,
!!route.routeLabels?.includes(RouteLabel.DEFAULT_ROUTE)
## )
## )
## );
## }catch(error:unknown){
console.error(error);
setErrorMessage((errorasError).message||'Unknown error.');
## }
## }
functionbuildComputeRoutesJsRequest(
formData:FormData
## //prettier-ignore
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo6/16

## //@ts-ignore
):google.maps.routes.ComputeRoutesRequest{
consttravelMode=
(formData.get('travel_mode')asstring)===''
## ?undefined
:(formData.get('travel_mode')asgoogle.maps.TravelMode);
## //prettier-ignore
## //@ts-ignore
constextraComputations:google.maps.routes.ComputeRoutesExtraComputati
## [];
## //prettier-ignore
## //@ts-ignore
constrequestedReferenceRoutes:google.maps.routes.ReferenceRoute[]=[
## //prettier-ignore
## //@ts-ignore
consttransitPreference:google.maps.routes.TransitPreference={};
constrequest={
origin:{
location:buildComputeRoutesLocation(
originAutocompleteSelection,
formData.get('origin_location'),
formData.get('heading_org'),
travelMode
## ),
vehicleStopover:formData.get('origin_stopover')==='on',
sideOfRoad:formData.get('origin_side_of_road')==='on',
## },
destination:{
location:buildComputeRoutesLocation(
destinationAutocompleteSelection,
formData.get('destination_location'),
formData.get('heading_dest'),
travelMode
## ),
vehicleStopover:formData.get('destination_stopover')==='on',
sideOfRoad:formData.get('destination_side_of_road')==='on',
## },
fields:Array.from(
document.querySelectorAll(
'ul#fields li input[type="checkbox"]:checked'
## ),
(input)=>(inputasHTMLInputElement).value
## ),
travelMode:travelModeasgoogle.maps.TravelMode,
routingPreference:
formData.get('routing_preference')===''
## ?undefined
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo7/16

:(formData.get(
## 'routing_preference'
## //prettier-ignore
## //@ts-ignore
)asgoogle.maps.routes.RoutingPreference),
polylineQuality:
formData.get('polyline_quality')===''
## ?undefined
:(formData.get(
## 'polyline_quality'
## //prettier-ignore
## //@ts-ignore
)asgoogle.maps.routes.PolylineQuality),
computeAlternativeRoutes:
formData.get('compute_alternative_routes')==='on',
routeModifiers:{
avoidTolls:formData.get('avoid_tolls')==='on',
avoidHighways:formData.get('avoid_highways')==='on',
avoidFerries:formData.get('avoid_ferries')==='on',
avoidIndoor:formData.get('avoid_indoor')==='on',
## },
departureTime:
(formData.get('departure_time')asstring)===''
## ?undefined
:newDate(formData.get('departure_time')asstring),
extraComputations,
requestedReferenceRoutes,
transitPreference,
## };
if(formData.get('traffic_aware_polyline')==='on'){
extraComputations.push(
ComputeRoutesExtraComputation.TRAFFIC_ON_POLYLINE
## );
## }
if(formData.get('shorter_distance')==='on'){
requestedReferenceRoutes.push(ReferenceRoute.SHORTER_DISTANCE);
## }
if(formData.get('eco_routes')==='on'){
requestedReferenceRoutes.push(ReferenceRoute.FUEL_EFFICIENT);
extraComputations.push(
ComputeRoutesExtraComputation.FUEL_CONSUMPTION
## );
## //prettier-ignore
## //@ts-ignore
(request.routeModifiersasgoogle.maps.routes.RouteModifiers).vehic
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo8/16

## {
emissionType:formData.get(
## 'emission_type'
## //prettier-ignore
## //@ts-ignore
)asgoogle.maps.routes.VehicleEmissionType,
## };
## }
if(travelMode===google.maps.TravelMode.TRANSIT){
constselectedTransitModes=document.querySelectorAll(
'ul#transitModes li input[type="checkbox"]:checked'
## );
transitPreference.allowedTransitModes=Array.from(
selectedTransitModes,
## (input)=>
(inputasHTMLInputElement).valueasgoogle.maps.TransitMod
## );
transitPreference.routingPreference=
formData.get('transit_preference')===''
## ?undefined
:(formData.get(
## 'transit_preference'
)asgoogle.maps.TransitRoutePreference);
## }
returnrequest;
## }
functionbuildComputeRoutesLocation(
autocompleteSelection:PlaceAutocompleteSelection,
locationInput?:FormDataEntryValue|null,
headingInput?:FormDataEntryValue|null,
travelModeInput?:FormDataEntryValue|null
## //prettier-ignore
## //@ts-ignore
):string|google.maps.routes.DirectionalLocationLiteral{
if(!locationInput){
thrownewError('Location is required.');
## }
constlatLngRegex=/^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
constlocation=locationInputasstring;
constheading=
headingInput && travelModeInput!=='TRANSIT'
?Number(headingInputasstring)
## :undefined;
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo9/16

if(
autocompleteSelection.predictionText===location&&
autocompleteSelection.location
## ){
// Use the lat/lng from the autocomplete selection if the current i
// matches the autocomplete prediction text
return{
lat:autocompleteSelection.location.lat(),
lng:autocompleteSelection.location.lng(),
altitude:0,
heading,
## };
}elseif(latLngRegex.test(location)){
// If the current input looks like a lat/lng, format it as a
// google.maps.routes.DirectionalLocationLiteral
return{
lat:Number(location.split(',')[0]),
lng:Number(location.split(',')[1]),
altitude:0,
heading,
## };
## }
// Otherwise return the input location string
returnlocation;
## }
functionsetErrorMessage(error:string){
constalertBox=document.getElementById('alert')asHTMLDivElement;
alertBox.querySelector('p')!.textContent=error;
alertBox.style.display='flex';
## }
asyncfunctiondrawRoute(
## //prettier-ignore
## //@ts-ignore
route:google.maps.routes.Route,
isPrimaryRoute:boolean
## ){
polylines=polylines.concat(
route.createPolylines({
polylineOptions:isPrimaryRoute
?{map:map.innerMap,zIndex:1}
## :{
map:map.innerMap,
strokeColor:'#669DF6',
strokeOpacity:0.5,
strokeWeight:8,
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo10/16

## },
colorScheme:map.innerMap.get('colorScheme'),
## })
## );
if(isPrimaryRoute){
markers=markers.concat(
awaitroute.createWaypointAdvancedMarkers({
map:map.innerMap,
zIndex:1,
## })
## );
if(route.viewport){
map.innerMap.fitBounds(route.viewport);
## }
## }
addRouteLabel(route,Math.floor(route.path!.length/2));
## }
## //prettier-ignore
## //@ts-ignore
functionaddRouteLabel(route:google.maps.routes.Route,index:number){
constrouteTag=document.createElement('div');
routeTag.className='route-tag';
if(route.routeLabels && route.routeLabels.length > 0){
constp=document.createElement('p');
route.routeLabels.forEach((label,i)=>{
if(label.includes(RouteLabel.FUEL_EFFICIENT)){
routeTag.classList.add('eco');
## }
if(label.includes(RouteLabel.DEFAULT_ROUTE_ALTERNATE)){
routeTag.classList.add('alternate');
## }
if(label.includes(RouteLabel.SHORTER_DISTANCE)){
routeTag.classList.add('shorter-distance');
## }
p.appendChild(document.createTextNode(label));
if(i < route.routeLabels!.length-1){
p.appendChild(document.createElement('br'));
## }
## });
routeTag.appendChild(p);
## }
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo11/16

constdetailsDiv=document.createElement('div');
detailsDiv.className='details';
if(route.localizedValues){
constdistanceP=document.createElement('p');
distanceP.textContent=`Distance: ${route.localizedValues.distance!}`;
detailsDiv.appendChild(distanceP);
constdurationP=document.createElement('p');
durationP.textContent=`Duration: ${route.localizedValues.duration}`!;
detailsDiv.appendChild(durationP);
## }
if(route.travelAdvisory?.fuelConsumptionMicroliters){
constfuelP=document.createElement('p');
fuelP.textContent=`Fuel consumption: ${(
route.travelAdvisory.fuelConsumptionMicroliters/1e6
).toFixed(2)} L`;
detailsDiv.appendChild(fuelP);
## }
routeTag.appendChild(detailsDiv);
constmarker=newAdvancedMarkerElement({
map:map.innerMap,
position:route.path![index],
content:routeTag,
zIndex:route.routeLabels?.includes(RouteLabel.DEFAULT_ROUTE)
## ?1
## :undefined,
## });
markers.push(marker);
## }
functionclearMap(){
markers.forEach((marker)=>{
marker.map=null;
## });
markers.length=0;
polylines.forEach((polyline)=>{
polyline.setMap(null);
## });
polylines.length=0;
## }
functionattachMapClickListener(){
if(!map||!map.innerMap){
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo12/16

return;
## }
letinfoWindowAlert=document.getElementById('infowindow-alert');
if(!infoWindowAlert){
infoWindowAlert=document.createElement('div');
infoWindowAlert.id=infoWindowAlert.className='infowindow-alert'
infoWindowAlert.textContent='Lat/Lng are copied to clipboard';
## }
constinfoWindow=newInfoWindow();
letcloseWindowTimeout:number;
map.innerMap.addListener(
## 'click',
async(mapsMouseEvent:google.maps.MapMouseEvent)=>{
if(!mapsMouseEvent.latLng){
return;
## }
infoWindow.close();
if(closeWindowTimeout){
clearTimeout(closeWindowTimeout);
## }
infoWindow.setContent(infoWindowAlert);
infoWindow.setPosition({
lat:mapsMouseEvent.latLng.lat(),
lng:mapsMouseEvent.latLng.lng(),
## });
awaitnavigator.clipboard.writeText(
`${mapsMouseEvent.latLng.lat()},${mapsMouseEvent.latLng.lng
## );
infoWindow.open(map.innerMap);
closeWindowTimeout=window.setTimeout(()=>{
infoWindow.close();
## },2000);
## }
## );
## }
functionattachTravelModeListener(){
consttravelMode=document.getElementById(
## 'travel-mode'
)asHTMLSelectElement;
constroutingPreference=document.getElementById(
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo13/16

## 'routing-preference'
)asHTMLSelectElement;
consttrafficAwarePolyline=document.getElementById(
## 'traffic-aware-polyline'
)asHTMLInputElement;
constecoRoutes=document.getElementById(
## 'eco-routes'
)asHTMLInputElement;
constemissionType=document.getElementById(
## 'emission-type'
)asHTMLSelectElement;
travelMode.addEventListener('change',()=>{
// Toggle the Routing Preference selection and Traffic Aware Polyli
// selection for WALKING, BICYCLING, and TRANSIT modes.
if(
travelMode.value==='WALKING'||
travelMode.value==='BICYCLING'||
travelMode.value==='TRANSIT'
## ){
routingPreference.disabled=true;
routingPreference.value='';
## }else{
routingPreference.disabled=false;
routingPreference.value=
routingPreference.value||'TRAFFIC_UNAWARE';
## }
toggleTrafficAwarePolyline();
// Toggle transit options for Transit mode
## (
document.getElementById('transit-options')asHTMLElement
).style.display=travelMode.value==='TRANSIT'?'flex':'none';
## });
routingPreference.addEventListener('change',()=>{
toggleTrafficAwarePolyline();
## });
ecoRoutes.addEventListener('change',()=>{
if(ecoRoutes.checked){
emissionType.disabled=false;
## }else{
emissionType.disabled=true;
## }
## });
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo14/16

functiontoggleTrafficAwarePolyline(){
if(
!routingPreference.value||
routingPreference.value==='TRAFFIC_UNAWARE'
## ){
trafficAwarePolyline.checked=false;
trafficAwarePolyline.disabled=true;
## }else{
trafficAwarePolyline.disabled=false;
## }
## }
## }
functionattachAlertWindowListener(){
constalertBox=document.getElementById('alert')asHTMLDivElement;
constcloseBtn=alertBox.querySelector('.close')asHTMLButtonElement;
closeBtn.addEventListener('click',()=>{
if(alertBox.style.display!=='none'){
alertBox.style.display='none';
## }
## });
## }
functioninitializeLocationInputs(){
constoriginAutocomplete=newPlaceAutocompleteElement({
name:'origin_location',
## });
constdestinationAutocomplete=newPlaceAutocompleteElement({
name:'destination_location',
## });
## [
[originAutocomplete,originAutocompleteSelection],
[destinationAutocomplete,destinationAutocompleteSelection],
].forEach(([autocomplete,autocompleteData])=>{
autocomplete.addEventListener(
## 'gmp-select',
## //prettier-ignore
## //@ts-ignore
async(event:google.maps.places.PlacePredictionSelectEvent)=>
autocompleteData.predictionText=event.placePrediction.text.text;
constplace=event.placePrediction.toPlace();
awaitplace.fetchFields({
fields:['location'],
## });
autocompleteData.location=place.location;
## }
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo15/16

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
## );
## });
document
.getElementById('origin-input')
?.appendChild(originAutocomplete);
document
.getElementById('destination-input')
?.appendChild(destinationAutocomplete);
## }
functionattachDepartureTimeListener(){
constdepartureTime=document.getElementById(
## 'departure-time'
)asHTMLInputElement;
constutcOutput=document.getElementById(
## 'utc-output'
)asHTMLParagraphElement;
departureTime.addEventListener('change',()=>{
utcOutput.textContent=`UTC time: ${newDate(
departureTime.value
).toUTCString()}`;
## });
## }
## }
window.addEventListener('load',init);
5323e7230973d44b60568147f527dab3a/dist/samples/routes-compute-routes/docs/index.ts#L7-L561)
2/6/26, 11:27 AMRoute demo  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/demo16/16