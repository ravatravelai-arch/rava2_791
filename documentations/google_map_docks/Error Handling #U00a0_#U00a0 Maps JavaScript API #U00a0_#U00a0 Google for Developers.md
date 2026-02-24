

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
## Error Handling
This page describes how to handle errors when using the Maps JavaScript API, and the Place
class.
The Google Maps JavaScript API uses the following classes for errors:
MapsNetworkError (/maps/documentation/javascript/reference/errors#MapsNetworkError)
represents a network error from a web service (can include RPCStatus
(/maps/documentation/javascript/reference/errors#RPCStatus) errors).
MapsRequestError (/maps/documentation/javascript/reference/errors#MapsRequestError)
represents a request error from a web service (i.e. the equivalent of a 4xx code in HTTP).
MapsServerError (/maps/documentation/javascript/reference/errors#MapsServerError) represents a
server-side error from a web service (i.e. the equivalent of a 5xx code in HTTP).
The MapsNetworkError, MapsRequestError, and MapsServerError classes belong to the maps
core library (/maps/documentation/javascript/reference/library-interfaces#CoreLibrary). Learn more about
libraries (/maps/documentation/javascript/libraries).
Note: Errors returned by the classes listed above comprise only one kind of possible error. It is possible to
encounter errors that are not represented by these classes, for example, client-side validation errors, errors
related to API keys or quota, and other unexpected errors.
Each of these classes contains the following properties:
code (/maps/documentation/javascript/reference/errors#MapsNetworkError.code)
endpoint (/maps/documentation/javascript/reference/errors#MapsNetworkError.endpoint)
The code property identifies the type of error; the endpoint property identifies the endpoint that
returned the error (for example PLACES_DETAILS). Since MapsNetworkError is a subclass of Error,
other properties including name and message are also available.
2/6/26, 11:12 AMError Handling  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/error-handling1/3

The following snippet shows the structure of a Maps error message:
The raw error includes everything in the error string; error.message includes the entire error string
excluding error.name.
The following snippet demonstrates error handling when using the Place class. This example uses
a try/catch block to handle each of the three error types. Similar code can be used to handle errors
for any Maps JavaScript API class.
## Code Tutor
## 
MapsRequestError:PLACES_GET_PLACE:INVALID_ARGUMENT:Errorfetchingfields:Thepr
## [error.name][error.endpoint][error.code]
## [error.message--->...]
asyncfunctiongetPlaceDetails(){
const{Place}=awaitgoogle.maps.importLibrary("places")asgoogle.maps.Places
const{MapsNetworkError,MapsRequestError,MapsServerError}=awaitgoogle.maps
// Use place ID to create a new Place instance.
constplace=newPlace({
id:'ChIJN5Nz71W3j4ARhx5bwpTQEGg****',// Pass a bad Place ID to trigger an e
## });
// Error handling for fetchFields.
try{
// Call fetchFields, passing the desired data fields.
awaitplace.fetchFields({fields:['displayName','formattedAddress','locati
## }catch(error:any){
if(error&&errorinstanceofgoogle.maps.MapsRequestError){
// HTTP 4xx request error.
console.error('fetchFields failed: MapsRequestError - check the request p
}elseif(error&&errorinstanceofgoogle.maps.MapsServerError){
// HTTP 5xx server-side error.
console.error('fetchFields failed: MapsServerError',error);
}elseif(error&&errorinstanceofgoogle.maps.MapsNetworkError){
// Network error.
console.error('fetchFields failed: MapsNetworkError',error);
## }else{
console.error('fetchFields failed: An unknown error occurred',error);
## }
2/6/26, 11:12 AMError Handling  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/error-handling2/3

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## Code Tutor
## 
## }
## // ...
## }
2/6/26, 11:12 AMError Handling  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/error-handling3/3