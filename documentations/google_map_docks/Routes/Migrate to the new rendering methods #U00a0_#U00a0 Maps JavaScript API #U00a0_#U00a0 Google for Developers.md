

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Migrate to the new rendering methods
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
This guide shows you how to migrate to the new rendering methods for the Route class. In the
Directions service (Legacy), the rendering methods were part of the DirectionsRenderer class.
The Route class provides two new rendering methods: createPolylines and
createWaypointAdvancedMarkers.
Legacy DirectionsRenderer
In the Directions service (Legacy), the rendering methods were part of the DirectionsRenderer
class. The DirectionsRenderer class handles display of the polyline, any associated markers, as
well as the textual display of steps; it has the following methods:
setDirections() - Renders the provided directions response.
setMap() - Sets the map on which to render the directions response.
setPanel() - Displays the directions as a series of textual steps in a panel.
The following example shows how to use the DirectionsRenderer class to render directions on a
map.
2/6/26, 11:30 AMMigrate to the new rendering methods  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-migrate-rendering1/5

Route class
The Route class provides the following new rendering methods, which replace the legacy
DirectionsRenderer class methods:
createPolylines
createWaypointAdvancedMarkers
The Route class has no equivalent to the setPanel() method in the legacy DirectionsRenderer
class. To display the textual steps, you must manually create the HTML elements and insert them
into the DOM. The following example shows how to render directions on a map using the Route
class, and manually create the HTML elements to display the textual steps.
// Set the map on the directions renderer.
directionsRenderer.setMap(map);
// Set the panel to display the directions as a series of textual steps.
directionsRenderer.setPanel(document.getElementById('directionsPanel'));
// Render the polyline and markers on the map.
directionsRenderer.setDirections(response);
2/6/26, 11:30 AMMigrate to the new rendering methods  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-migrate-rendering2/5

// Use createPolylines to create polylines for the route.
mapPolylines=routes[0].createPolylines();
// Add polylines to the map.
mapPolylines.forEach((polyline)=>polyline.setMap(map));
// Add markers to start and end points.
constmarkers=awaitroutes[0].createWaypointAdvancedMarkers({map});
// Render navigation instructions.
constdirectionsPanel=document.getElementById("directions-panel");
if(!routes||routes.length===0){
if(directionsPanel){
directionsPanel.textContent="No routes available.";
2/6/26, 11:30 AMMigrate to the new rendering methods  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-migrate-rendering3/5

## }
## }
constroute=routes[0];
if(!route.legs||route.legs.length===0){
if(directionsPanel){
directionsPanel.textContent="The route has no legs.";
## }
return;
## }
constfragment=document.createDocumentFragment();
route.legs.forEach((leg,index)=>{
constlegContainer=document.createElement("div");
legContainer.className="directions-leg";
legContainer.setAttribute("aria-label",`Leg ${index+1}`);
## // Leg Title
constlegTitleElement=document.createElement("h3");
legTitleElement.textContent=`Leg ${index+1} of ${route.legs.length}`;
legContainer.appendChild(legTitleElement);
if(leg.steps&&leg.steps.length>0){
// Add steps to an ordered list
conststepsList=document.createElement("ol");
stepsList.className="directions-steps";
leg.steps.forEach((step,stepIndex)=>{
conststepItem=document.createElement("li");
stepItem.className="direction-step";
stepItem.setAttribute("aria-label",`Step ${stepIndex+1}`);
## // Maneuver
if(step.maneuver){
constmaneuverNode=document.createElement("p");
maneuverNode.textContent=step.maneuver;
maneuverNode.className="maneuver";
stepItem.appendChild(maneuverNode);
## }
// Distance and Duration
if(step.localizedValues){
constdistanceNode=document.createElement("p");
distanceNode.textContent=`${step.localizedValues.distance} (${step.locali
distanceNode.className="distance";
stepItem.appendChild(distanceNode);
## }
2/6/26, 11:30 AMMigrate to the new rendering methods  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-migrate-rendering4/5

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## // Instructions
if(step.instructions){
constinstructionsNode=document.createElement("p");
instructionsNode.textContent=step.instructions;
instructionsNode.className="instruction";
stepItem.appendChild(instructionsNode);
## }
stepsList.appendChild(stepItem);
## });
legContainer.appendChild(stepsList);
## }
fragment.appendChild(legContainer);
directionsPanel?.appendChild(fragment);
## });
2/6/26, 11:30 AMMigrate to the new rendering methods  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/routes-migrate-rendering5/5