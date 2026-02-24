

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Map color scheme
## Page Summary
## 
For maps of type roadmap and terrain, you can set the map color scheme (dark, light, or current
system setting) by using google.maps.colorScheme. The colorScheme option can only be set
when the map is initialized; setting this option after the map is created will have no effect.
The following image shows the light mode and dark mode color schemes for the roadmap
type.
By default, the map uses light mode. When creating the map, import ColorScheme and specify the
map color scheme (LIGHT, DARK, or FOLLOW_SYSTEM) in map options, as shown here.
## Roadmap
## (#roadmap)
## Terrain (#terrain)
const{ColorScheme}=awaitgoogle.maps.importLibrary("core")
2/6/26, 11:24 AMMap color scheme  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/mapcolorscheme1/2

If you reset the options after the map is instantiated, colorScheme has no effect.
To create custom light styles and dark styles for your roadmap map types, use cloud-based maps
styling (/maps/documentation/javascript/cloud-customization).
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
## Code Tutor
## 
constmapOptions={
center:{lat:-34.397,lng:150.644},
zoom:8,
colorScheme:ColorScheme.DARK,
## }
map=newgoogle.maps.Map(document.getElementById('map_canvas'),mapOptions);
2/6/26, 11:24 AMMap color scheme  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/mapcolorscheme2/2