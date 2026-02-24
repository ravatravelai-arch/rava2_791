

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
## Place Reviews
## Page Summary
## 
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Place reviews lets you access millions of high-quality reviews and ratings from the Places
database, and display them on your web pages.
## Faneuil Hall Marketplace
Boston, MA 02109, USA
Rating: 4 stars
Faneuil Hall Marketplace is an absolute must-see when visiting Boston. The combination of rich
history, lively atmosphere, and diverse food and shopping options makes it a unique experience.
You can enjoy everything from local eats to well-known brands while taking in the historic
buildings and talented street performers. It’s a great place to walk around, soak up the energy of
the city, and truly feel connected to Boston’s past and present. Whether visiting during the day or
evening, it’s always vibrant and worth the stop.
## Humberto Lameda
Map data ©2026 GoogleReport a map error
## 
See the complete example source code
2/6/26, 10:50 AMPlace Reviews  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-reviews1/6

This example retrieves place details including the first place review, and displays the information in
an info window.
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
letinnerMap;
letinfoWindow;
constmapElement=document.querySelector('gmp-map')asgoogle.maps.MapElement;
asyncfunctioninitMap(){
// Import the needed libraries.
const[{InfoWindow},{AdvancedMarkerElement},{Place}]=
awaitPromise.all([
google.maps.importLibrary(
## 'maps'
)asPromise<google.maps.MapsLibrary>,
google.maps.importLibrary(
## 'marker'
)asPromise<google.maps.MarkerLibrary>,
google.maps.importLibrary(
## 'places'
)asPromise<google.maps.PlacesLibrary>,
## ]);
innerMap=mapElement.innerMap;
// Create a new Place instance.
constplace=newPlace({
id:'ChIJpyiwa4Zw44kRBQSGWKv4wgA',// Faneuil Hall Marketplace, Boston,
## });
// Call fetchFields, passing 'reviews' and other needed fields.
awaitplace.fetchFields({
fields:['displayName','formattedAddress','location','reviews'],
## });
// Create an HTML container.
constcontent=document.createElement('div');
consttitle=document.createElement('div');
constrating=document.createElement('div');
constaddress=document.createElement('div');
constreview=document.createElement('div');
constauthorLink=document.createElement('a');
// If there are any reviews display the first one.
## More
## 
2/6/26, 10:50 AMPlace Reviews  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-reviews2/6

if(place.reviews && place.reviews.length > 0){
// Get info for the first review.
constreviewRating=place.reviews[0].rating;
constreviewText=place.reviews[0].text;
constauthorName=place.reviews[0].authorAttribution!.displayName;
constauthorUri=place.reviews[0].authorAttribution!.uri;
// Safely populate the HTML.
title.textContent=place.displayName||'';
address.textContent=place.formattedAddress||'';
rating.textContent=`Rating: ${reviewRating} stars`;
review.textContent=reviewText||'';
authorLink.textContent=authorName;
authorLink.href=authorUri||'';
authorLink.target='_blank';
content.appendChild(title);
content.appendChild(address);
content.appendChild(rating);
content.appendChild(review);
content.appendChild(authorLink);
## }else{
content.textContent=
`No reviews were found for ${place.displayName}.`;
## }
// Create an infowindow to display the review.
infoWindow=newInfoWindow({
content,
ariaLabel:place.displayName,
## });
// Add a marker.
constmarker=newAdvancedMarkerElement({
map:innerMap,
position:place.location,
title:place.displayName,
## });
innerMap.setCenter(place.location);
// Show the info window.
infoWindow.open({
anchor:marker,
map:innerMap,
## });
## }
2/6/26, 10:50 AMPlace Reviews  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-reviews3/6

Get reviews for a place
To get review data for a place, include the reviews field in your fetchFields() request
parameters. The resulting Place instance contains an array of Review objects, from which you may
access the needed review information.
The following example shows making a Place Details request for reviews.
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
initMap();
b/42a24a15323e7230973d44b60568147f527dab3a/dist/samples/place-reviews/docs/index.ts#L8-L98)
// Create a new Place instance.
constplace=newPlace({
id:'ChIJpyiwa4Zw44kRBQSGWKv4wgA',// Faneuil Hall Marketplace, Boston, MA
## });
// Call fetchFields, passing 'reviews' and other needed fields.
awaitplace.fetchFields({
fields:['displayName','formattedAddress','location','reviews'],
## });
// Create an HTML container.
constcontent=document.createElement('div');
consttitle=document.createElement('div');
constrating=document.createElement('div');
constaddress=document.createElement('div');
constreview=document.createElement('div');
constauthorLink=document.createElement('a');
// If there are any reviews display the first one.
if(place.reviews && place.reviews.length > 0){
// Get info for the first review.
constreviewRating=place.reviews[0].rating;
constreviewText=place.reviews[0].text;
2/6/26, 10:50 AMPlace Reviews  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-reviews4/6

The Review (/maps/documentation/javascript/reference/place#Review) instance contains the following:
An AuthorAttribution
The rating given by the user.
The publishTime (Date), and relativePublishTimeDescription (review time relative to the
current time for example "a month ago").
The review text.
The textLanguageCode indicating the language in which the review is written.
To get the overall rating for the place, use the Place.rating property (you must request the rating
field in your fetchFields() request parameters).
## Code Tutor
## 
constauthorName=place.reviews[0].authorAttribution.displayName;
constauthorUri=place.reviews[0].authorAttribution.uri;
// Safely populate the HTML.
title.textContent=place.displayName||'';
address.textContent=place.formattedAddress||'';
rating.textContent=`Rating: ${reviewRating} stars`;
review.textContent=reviewText||'';
authorLink.textContent=authorName;
authorLink.href=authorUri||'';
authorLink.target='_blank';
content.appendChild(title);
content.appendChild(address);
content.appendChild(rating);
content.appendChild(review);
content.appendChild(authorLink);
## }
else{
content.textContent=
`No reviews were found for ${place.displayName}.`;
## }
// Create an infowindow to display the review.
infoWindow=newInfoWindow({
content,
ariaLabel:place.displayName,
## });
es/blob/42a24a15323e7230973d44b60568147f527dab3a/dist/samples/place-reviews/docs/index.js#L20-L64)
2/6/26, 10:50 AMPlace Reviews  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-reviews5/6

Author attributions
When you display a review, you must also display the author attributions for the review. Use the
AuthorAttribution (/maps/documentation/javascript/reference/place#AuthorAttribution) class to return
attributions. An attribution includes the author's name (displayName), a URI for their Google Maps
profile (uri), and a URI for the author's photo (photoURI). The following snippet shows returning
the displayName, uri, and photoURI for an attribution.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
letauthorName=place.reviews[0].authorAttribution!.displayName;
letauthorUri=place.reviews[0].authorAttribution!.uri;
letauthorPhoto=place.reviews[0].authorAttribution!.photoURI;
2/6/26, 10:50 AMPlace Reviews  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-reviews6/6