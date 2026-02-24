

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Load the Maps JavaScript API
## Page Summary
## 
This guide shows you how to load the Maps JavaScript API. There are three ways to do this:
Use dynamic library import (#dynamic-library-import)
Use the direct script loading tag (#use-legacy-tag)
Use the NPM js-api-loader package (#js-api-loader)
## Use Dynamic Library Import
Dynamic library import provides the capability to load libraries at runtime. This lets you request
needed libraries at the point when you need them, rather than all at once at load time. It also
protects your page from loading the Maps JavaScript API multiple times.
Load the Maps JavaScript API by adding the inline bootstrap loader to your application code, as
shown in the following snippet:
## Code Tutor
## 
## <script>
(g=>{varh,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="_
key:"YOUR_API_KEY",
v:"weekly",
// Use the 'v' parameter to indicate the version (/maps/documentation/javascript/versions
// Add other bootstrap parameters (/maps/documentation/javascript/load-maps-js-api#required_
## });
## </script>
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api1/10

You can also add the bootstrap loader code directly to your JavaScript code.
To load libraries at runtime, use the await operator to call importLibrary() from within an async
function. Declaring variables for the needed classes lets you skip using a qualified path (e.g.
google.maps.Map), as shown in the following code example:
Your function can also load libraries without declaring a variable for the needed classes, which is
especially useful if you added a map using the gmp-map element. Without the variable you must use
qualified paths, for example google.maps.Map:
## Code Tutor
## 
letmap;
asyncfunctioninitMap(){
const{Map}=(awaitgoogle.maps.importLibrary('maps'));
map=newMap(document.getElementById('map'),{
center:{lat:-34.397,lng:150.644},
zoom:8,
## });
## }
initMap();
mples/blob/529c0a2709195856d1392ad1ea44c0e79599493b/dist/samples/map-simple/docs/index.js#L9-L17)
letmap;
letcenter={lat:-34.397,lng:150.644};
asyncfunctioninitMap(){
awaitgoogle.maps.importLibrary("maps");
awaitgoogle.maps.importLibrary("marker");
map=newgoogle.maps.Map(document.getElementById("map"),{
center,
zoom:8,
mapId:"DEMO_MAP_ID",
## });
addMarker();
## }
asyncfunctionaddMarker(){
constmarker=newgoogle.maps.marker.AdvancedMarkerElement({
map,
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api2/10

Alternatively, you can load the libraries directly in HTML as shown here:
Learn how to migrate to the Dynamic Library Loading API (#migrate-to-dynamic).
Required parameters
key: Your API key (/maps/documentation/javascript/get-api-key). The Maps JavaScript API won't
load unless a valid API key is specified.
Optional parameters
v: The version (/maps/documentation/javascript/versions) of the Maps JavaScript API to load.
libraries: An array of additional Maps JavaScript API libraries
(/maps/documentation/javascript/libraries) to begin preloading. Specifying a fixed set of libraries
is not generally recommended, but is available for developers who want to finely tune the
caching behavior on their website. It is still important to call google.maps.importLibrary()
for each selected library prior to use.
language: The language (/maps/documentation/javascript/localization) to use. This affects the
names of controls, copyright notices, driving directions, and control labels, and the responses
to service requests. See the list of supported languages (/maps/faq#languagesupport).
## Code Tutor
## 
position:center,
## });
## }
initMap();
## Code Tutor
## 
## <script>
google.maps.importLibrary("maps");
google.maps.importLibrary("marker");
## </script>
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api3/10

region: The region (/maps/documentation/javascript/localization#Region) code to use. This alters
the API's behavior based on a given country or territory.
authReferrerPolicy: Maps JS customers can configure HTTP Referrer Restrictions in the
Cloud Console to limit which URLs are allowed to use a particular API Key. By default, these
restrictions can be configured to allow only certain paths to use an API Key. If any URL on the
same domain or origin may use the API Key, you can set authReferrerPolicy: "origin" to
limit the amount of data sent when authorizing requests from the Maps JavaScript API. When
this parameter is specified and HTTP Referrer Restrictions are enabled on Cloud Console,
Maps JavaScript API will only be able to load if there is an HTTP Referrer Restriction
(/maps/api-security-best-practices#restricting-api-keys) that matches the current website's
domain without a path specified.
mapIds: An array of map IDs. Causes the configuration for the specified map IDs to be
preloaded. Specifying map IDs here is not required for map IDs usage, but is available for
developers who want to finely tune network performance.
channel: See Usage tracking per channel
(https://developers.google.com/maps/reporting-and-monitoring/reporting#usage-tracking-per-channel).
internalUsageAttributionIds: An array of usage attribution IDs that help Google
understand which libraries and samples are helpful to developers, such as usage of a marker
clustering library. To opt out of sending the usage attribution ID, it is safe to delete this
property or set the value to an empty array ([]). Only unique values will be sent. See Google
Maps Platform solutions parameter (/maps/reporting-and-monitoring/reporting#usage-attribution)
for more information.
Note: The solutionChannel parameter is still valid but not recommended. Use internalUsageAttributionIds
instead.
Use the direct script loading tag
This section shows how to use the direct script loading tag. Because the direct script loads
libraries when the map loads, it can simplify maps created using a gmp-map element by removing
the need to explicitly request libraries at runtime. Since the direct script loading tag loads all
requested libraries at once when the script is loaded, performance may be impacted for some
applications. Only include the direct script loading tag once per page load.
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api4/10

Note: You can call importLibrary once the direct script loading tag has finished loading.
Add a script tag
To load the Maps JavaScript API inline in an HTML file, add a script tag as shown below.
Direct script loading URL Parameters
This section discusses all of the parameters you can specify in the query string of the script
loading URL when loading the Maps JavaScript API. Certain parameters are required while others
are optional. As is standard in URLs, all parameters are separated using the ampersand (&)
character.
The following example URL has placeholders for all possible parameters:
The URL in the following example script tag loads the Maps JavaScript API:
<script async
src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async&call
## </script>
https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY
## &loading=async
## &callback=
## &v=
## &libraries=""
## &language=""
## &region=""
## &auth_referrer_policy=""
## &map_ids=""
## &channel=""
## &solution_channel=""
## FUNCTION_NAME
## 
## VERSION
## 
## LIBRARIES
## 
## LANGUAGE
## 
## REGION
## 
## AUTH_REFERRER_POLICY
## 
## MAP_IDS
## 
## CHANNEL
## 
## SOLUTION_IDENTIFIER
## 
<script async
src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async&call
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api5/10

Required parameters (direct) {:.hide-from-toc}
The following parameters are required when loading the Maps JavaScript API.
key: Your API key (/maps/documentation/javascript/get-api-key). The Maps JavaScript API won't
load unless a valid API key is specified.
Optional parameters (direct) {:.hide-from-toc}
Use these parameters to request a specific version of the Maps JavaScript API, load additional
libraries, localize your map or specify the HTTP referrer check policy
loading: The code loading strategy that the Maps JavaScript API can use. Set to async to
indicate that the Maps JavaScript API has not been loaded synchronously and that no
JavaScript code is triggered by the script's load event. It is highly recommended to set this to
async whenever possible, for improved performance. (Use the callback parameter instead to
perform actions when the Maps JavaScript API is available.) Available starting with version
## 3.55.
callback: The name of a global function to be called once the Maps JavaScript API loads
completely.
v: The version (/maps/documentation/javascript/versions) of the Maps JavaScript API to use.
libraries: A comma-separated list of additional Maps JavaScript API libraries
(/maps/documentation/javascript/libraries) to load.
language: The language (/maps/documentation/javascript/localization) to use. This affects the
names of controls, copyright notices, driving directions, and control labels, as well as the
responses to service requests. See the list of supported languages
## (/maps/faq#languagesupport).
region: The region (/maps/documentation/javascript/localization#Region) code to use. This alters
the API's behavior based on a given country or territory.
auth_referrer_policy: Customers can configure HTTP Referrer Restrictions in the Cloud
Console to limit which URLs are allowed to use a particular API Key. By default, these
restrictions can be configured to allow only certain paths to use an API Key. If any URL on the
same domain or origin may use the API Key, you can set auth_referrer_policy=origin to
limit the amount of data sent when authorizing requests from the Maps JavaScript API. This
## </script>
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api6/10

is available starting in version 3.46. When this parameter is specified and HTTP Referrer
Restrictions are enabled on Cloud Console, Maps JavaScript API will only be able to load if
there is an HTTP Referrer Restriction (/maps/api-security-best-practices#restricting-api-keys) that
matches the current website's domain without a path specified.
map_ids: A comma-separated list of map IDs. Causes the configuration for the specified map
IDs to be preloaded. Specifying map IDs here is not required for map IDs usage, but is
available for developers who want to finely tune network performance.
channel: See Usage tracking per channel
(https://developers.google.com/maps/reporting-and-monitoring/reporting#usage-tracking-per-channel).
internal_usage_attribution_ids: A comma-separated list of usage attribution IDs that
help Google understand which libraries and samples are helpful to developers, such as usage
of a marker clustering library. To opt out of sending the usage attribution ID, it is safe to delete
this property or replace the value with an empty string. Only unique values will be sent. See
Google Maps Platform solutions parameter
(/maps/reporting-and-monitoring/reporting#usage-attribution) for more information.
Note: The solution_channel parameter is still valid but not recommended. Use
internal_usage_attribution_ids instead.
Use the NPM js-api-loader package
Tip: The v2.0.0 (https://www.npmjs.com/package/@googlemaps/js-api-loader) release is a major refactor that
replaces the old Loader class with an API consisting of two functions, setOptions() and importLibrary(). This
shift provides you with on-demand dynamic loading of individual Maps API libraries, deferring feature downloads
to improve initial page performance.
## The @googlemaps/js-api-loader
## (https://www.npmjs.com/package/@googlemaps/js-api-loader)
package is available, for loading using the NPM package manager. Install it using the following
command:
Import the package as shown here:
npminstall@googlemaps/js-api-loader
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api7/10

## 
The loader uses Promises to make libraries available. Load libraries using the importLibrary()
method. The following example shows using the loader to load a map:
Note: Read the guide (/maps/documentation/javascript/using-typescript) on using TypeScript and
## Google Maps.
import{setOptions,importLibrary}from"@googlemaps/js-api-loader"
TypeScript
## (#typescript)
JavaScript (#javascript)
// Import the needed libraries.
import{setOptions,importLibrary}from'@googlemaps/js-api-loader';
constAPI_KEY='AIzaSyA6myHzS10YXdcazAFalmXvDkrYCp5cLc8';
asyncfunctioninitMap():Promise<void>{
// Set loader options.
setOptions({
key:API_KEY,
v:'weekly',
## });
// Load the Maps library.
const{Map}=(awaitimportLibrary('maps'))asgoogle.maps.MapsLibrary;
// Set map options.
constmapOptions={
center:{lat:48.8566,lng:2.3522},
zoom:3,
## };
// Declare the map.
constmap=newMap(
document.getElementById('map')asHTMLElement,
mapOptions
## );
## }
initMap();
9c0a2709195856d1392ad1ea44c0e79599493b/dist/samples/js-api-loader-map/docs/index.ts#L8-L40)
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api8/10

See the complete example code.
(https://github.com/googlemaps-samples/js-api-samples/tree/main/samples/js-api-loader-map)
Migrate to the Dynamic Library Import API
This section covers the steps required to migrate your integration to use the Dynamic Library
Import API.
Migration steps
First, replace the direct script loading tag with the inline bootstrap loader tag.
## Before
## After
Next, update your application code:
Change your initMap() function to be asynchronous.
Call importLibrary() to load and access the libraries you need.
## Before
<script async
src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async&libr
## </script>
## <script>
(g=>{varh,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="_
key:"YOUR_API_KEY",
v:"weekly",
// Use the 'v' parameter to indicate the version (/maps/documentation/javascript/versions
// Add other bootstrap parameters (/maps/documentation/javascript/load-maps-js-api#required_
## });
## </script>
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api9/10

## After
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
letmap;
functioninitMap(){
map=newgoogle.maps.Map(document.getElementById("map"),{
center:{lat:-34.397,lng:150.644},
zoom:8,
## });
## }
window.initMap=initMap;
letmap;
// initMap is now async
asyncfunctioninitMap(){
// Request libraries when needed, not in the script tag.
const{Map}=awaitgoogle.maps.importLibrary("maps");
// Short namespaces can be used.
map=newMap(document.getElementById("map"),{
center:{lat:-34.397,lng:150.644},
zoom:8,
## });
## }
initMap();
2/6/26, 10:24 AMLoad the Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/load-maps-js-api10/10