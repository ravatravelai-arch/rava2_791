

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
## Place Photos
## Page Summary
## 
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
Place photos lets you add high quality photographic content to your web pages. Access millions of
photos stored in the Places database, and get resizable images using Find Place, Nearby Search,
Text Search, Autocomplete, and Place Details.
## Woodland Park Zoo
92-acre zoo with nearly 300 species, a vintage carousel,
concerts & an indoor play space.
## Jacquelyn Jungling
2/6/26, 10:50 AMPlace Photos  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-photos1/5

## 
See the complete example source code
This rudimentary photo carousel displays photos for the specified place, including the required
author attributions (shown in the upper left corner of the photo).
TypeScript
## (#typescript)
JavaScript (#javascript)CSS (#css)HTML (#html)
asyncfunctioninit(){
const{Place}=awaitgoogle.maps.importLibrary('places')asgoogle.maps.
// Use a place ID to create a new Place instance.
constplace=newPlace({
id:'ChIJydSuSkkUkFQRsqhB-cEtYnw',// Woodland Park Zoo, Seattle WA
## });
// Call fetchFields, passing the desired data fields.
awaitplace.fetchFields({fields:['displayName','photos','editorialSumma
// Get the various HTML elements.
letheading=document.getElementById('heading')asHTMLElement;
letsummary=document.getElementById('summary')asHTMLElement;
letgallery=document.getElementById('gallery')asHTMLElement;
letexpandedImageDiv=document.getElementById('expanded-image')asHTMLEle
letattributionLabel;
// Show the display name and summary for the place.
heading.textContent=place.displayNameasstring;
summary.textContent=place.editorialSummaryasstring;
// Add photos to the gallery.
if(place.photos){
place.photos?.forEach((photo)=>{
constimg=document.createElement('img');
constexpandedImage=document.createElement('img');
img.src=photo.getURI({maxHeight:380});
img.addEventListener('click',(event)=>{
event.preventDefault();
expandedImage.src=img.src;
expandedImageDiv.innerHTML='';
expandedImageDiv.appendChild(expandedImage);
attributionLabel=createAttribution(photo.authorAttributions);
expandedImageDiv.appendChild(attributionLabel);
## });
gallery.appendChild(img);
## More
## 
2/6/26, 10:50 AMPlace Photos  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-photos2/5

Get photos
To get photos for a place, include the photos
(/maps/documentation/javascript/reference/place#Place.photos) field in your fetchFields()
(/maps/documentation/javascript/reference/place#Place.fetchFields) request parameters. The resulting
Place instance contains an array of up to 10 Photo
(/maps/documentation/javascript/reference/place#Photo) objects, from which you may access images
## 
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
## Try Sample
JSFiddle.net...
## Google Cloud Shell...
## });
## }
// Display the first photo.
constimg=document.createElement('img');
img.src=place.photos![0].getURI();
expandedImageDiv.appendChild(img);
attributionLabel=createAttribution(place.photos![0].authorAttributions);
expandedImageDiv.appendChild(attributionLabel);
// Helper function to create attribution DIV.
functioncreateAttribution(attribution){
attributionLabel=document.createElement("a");
attributionLabel.classList.add('attribution-label');
attributionLabel.textContent=attribution[0].displayName;
attributionLabel.href=attribution[0].uri;
attributionLabel.target='_blank;'
returnattributionLabel;
## }
## }
init();
samples/blob/2683f7366fb27829401945d2a7e27d77ed2df8e5/samples/place-photos/index.ts#L8-L67)
2/6/26, 10:50 AMPlace Photos  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-photos3/5

and their required attribution information. Call getURI()
(/maps/documentation/javascript/reference/place#Photo.getURI) to return the source photo URI, using
PhotoOptions (/maps/documentation/javascript/reference/places-service#PhotoOptions) to set the
maximum height and/or width of the image. If you specify a value for both maxHeight and a
maxWidth, the photo service will resize the image to the smaller of the two sizes, while maintaining
the original aspect ratio.
The following example shows making a Place Details request for photos, calling getURI() on a
photo instance to return the source URI for the image, then adding the first photo result to an img
element (attributions are omitted for clarity):
Author attributions
When you display a photo, you must also display the author attributions for the photo. Use the
AuthorAttribution (/maps/documentation/javascript/reference/place#AuthorAttribution) class to return
attributions. An attribution includes the author's name (displayName), a URI for their Google Maps
profile (uri), and a URI for the author's photo (photoURI). The following snippet shows returning
the displayName, uri, and photoURI for a place photo.
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
const{Place}=awaitgoogle.maps.importLibrary('places');
// Use a place ID to create a new Place instance.
constplace=newPlace({
id:'ChIJydSuSkkUkFQRsqhB-cEtYnw',// Woodland Park Zoo, Seattle WA
## });
// Call fetchFields, passing the desired data fields.
awaitplace.fetchFields({fields:['photos']});
// Add the first photo to an img element.
constphotoImg=document.getElementById('image-container');
photoImg.src=place.photos[0].getURI({maxHeight:400});
letname=place.photos[0].authorAttributions[0].displayName;
leturl=place.photos[0].authorAttributions[0].uri;
letauthorPhoto=place.photos[0].authorAttributions[0].photoURI;
2/6/26, 10:50 AMPlace Photos  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-photos4/5

(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 10:50 AMPlace Photos  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/place-photos5/5