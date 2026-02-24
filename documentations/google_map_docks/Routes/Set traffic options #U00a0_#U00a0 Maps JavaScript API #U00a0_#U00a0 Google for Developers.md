

## 
Places UI Kit
## (/maps/documentation/javascript/places-ui-kit/overview)
: A ready-to-use library that
provides room for customization and low-code development. Try it out, and share your input on your UI Kit
experience.
(https://google.qualtrics.com/jfe/form/SV_7PoEL9XroZrnDNQ)
Set traffic options
## 
European Economic Area (EEA) developers
If your billing address is in the European Economic Area, effective on 8 July 2025, the Google Maps Platform EEA
Terms of Service
## (https://cloud.google.com/terms/maps-platform/eea)
will apply to your use of the Services.
Functionality varies by region. Learn more (/maps/comms/eea/faq).
The traffic preferences you select balance the accuracy of the route details with request
performance in one of two ways:
Traffic aware: Return the most accurate results possible (higher latency).
Traffic unaware: Return the results as quickly as possible (lowest latency).
When you make a request, weigh whether it is better to return the most accurate results possible, or
to return results as quickly as possible. The Routes library provides options that let you control the
quality of the response data versus the latency of the response.
Set the traffic level and traffic model
To specify the traffic level, set the routingPreference
(/maps/documentation/javascript/reference/route#RoutingPreference) on the ComputeRoutesRequest. The
following list shows the available routingPreference options:
TRAFFIC_UNAWARE (#traffic-unaware) (default): Returns results the most quickly, with
approximate routing details.
TRAFFIC_AWARE (#traffic-aware): Returns more accurate results using real-time traffic data, but
with higher latency.
TRAFFIC_AWARE_OPTIMAL (#traffic-aware-optimal): Returns the most accurate results possible
using real-time traffic data, but with the highest latency.
2/6/26, 11:28 AMSet traffic options  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/traffic-options1/6

## 
The TRAFFIC_MODEL (/maps/documentation/javascript/reference/directions#TrafficModel) property
represents assumptions to use when predicting duration in traffic ( TrafficModel.BEST_GUESS
(/maps/documentation/javascript/reference/directions#TrafficModel.BEST_GUESS) (default),
TrafficModel.OPTIMISTIC
(/maps/documentation/javascript/reference/directions#TrafficModel.OPTIMISTIC),
TrafficModel.PESSIMISTIC
(/maps/documentation/javascript/reference/directions#TrafficModel.PESSIMISTIC)).
How to select traffic-aware routing
To create a traffic-aware route request, take these steps:
- Set the travelMode property to DRIVING.
- Set the routingPreference property to one of the following:
## TRAFFIC_AWARE
## TRAFFIC_AWARE_OPTIMAL
NOTE: TRAFFIC_UNAWARE is the default setting.
- Set the trafficModel property to one of the following:
TrafficModel.BEST_GUESS
(/maps/documentation/javascript/reference/directions#TrafficModel.BEST_GUESS) (default)
TrafficModel.OPTIMISTIC
(/maps/documentation/javascript/reference/directions#TrafficModel.OPTIMISTIC)
TrafficModel.PESSIMISTIC
(/maps/documentation/javascript/reference/directions#TrafficModel.PESSIMISTIC)
Note: TrafficModel can only be specified for RoutingPreference TRAFFIC_AWARE_OPTIMAL.
- Set the extraComputations property to TRAFFIC_ON_POLYLINE.
- Request the path, speedPaths, and routeLabels fields.
The following example request shows how to request a traffic-aware route that shows traffic data
on the polyline:
2/6/26, 11:28 AMSet traffic options  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/traffic-options2/6

Traffic conditions
Traffic conditions characterize the rate of traffic flow:
Normal traffic: No congestion with traffic flowing at a normal speed.
Light to moderate traffic: Increasing congestion, with traffic flowing at a reduced speed.
Heavy traffic: Severe congestion, with heavily reduced traffic speed.
Traffic unaware
TRAFFIC_UNAWARE is the default setting. Use this routing preference when you want responses
returned the quickest, and approximate routing details are good enough.
TRAFFIC_UNAWARE routes are calculated without accounting for current traffic conditions. This
routing preference results in the fastest request response (lowest latency).
If you choose TRAFFIC_UNAWARE, the route and duration chosen are based on road network and
average time-independent traffic conditions, not current road conditions. Consequently, routes may
include roads that are temporarily closed. Results for a given request may vary over time due to
changes in the road network, updated average traffic conditions, and the distributed nature of the
service. Results may also vary between nearly-equivalent routes at any time or frequency.
Here are the responses you'll see:
duration: Contains the ETA for the route.
staticDuration: The ETA for the route considering only historical traffic information. For
TRAFFIC_UNAWARE, this contains the same value as duration.
// Define a traffic aware routes request with polylines.
constrequestWithTraffic={
origin:'200 King St San Francisco, CA 94107',
destination:'Pier 41, San Francisco, CA 94133',
travelMode:'DRIVING',
routingPreference:'TRAFFIC_AWARE_OPTIMAL',
trafficModel:'optimistic',
extraComputations:['TRAFFIC_ON_POLYLINE'],
fields:['speedPaths'],
## };
2/6/26, 11:28 AMSet traffic options  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/traffic-options3/6

Traffic aware
Use this routing preference when you want more accurate routing details than TRAFFIC_UNAWARE,
and yet you don't mind if responses are returned with a moderate increase in latency.
When you set the TRAFFIC_AWARE routing preference, the service calculates the route considering
current traffic conditions. As a result, the route and route details more accurately reflect real-world
conditions. Because this increase in data quality comes at the expense of response latency,
performance optimizations are applied to reduce much of the latency.
Here are the responses you'll see:
duration: The ETA considering real-time traffic information.
staticDuration: The ETA for the route considering only historical traffic information.
Traffic aware optimal
Use this routing preference when you want results of the highest quality without regard to how long
responses take. This routing preference has the longest delay in returning responses (highest
latency).
When you set the TRAFFIC_AWARE_OPTIMAL routing preference, the service calculates the route
considering current traffic conditions, but doesn't apply performance optimizations. In this mode,
the server performs a more exhaustive search of the road network to find the optimal route.
The TRAFFIC_AWARE_OPTIMAL routing preference is equivalent to the mode used by
maps.google.com (https://www.google.com/maps) and by the Google Maps mobile app.
When you use this option with computeRouteMatrix, the number of elements in a request (number
of origins × number of destinations) cannot exceed 25.
Here are the responses you'll see:
duration: The ETA for the route considering real-time traffic information.
staticDuration: The ETA for the route considering only historical traffic information.
Set departure time (optional)
Use this property only for traffic aware requests where the departure time needs to be in the future.
If you don't set the departureTime property, it defaults to the time that you make the request.
2/6/26, 11:28 AMSet traffic options  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/traffic-options4/6

Use the departureTime property along with the TRAFFIC_AWARE and TRAFFIC_AWARE_OPTIMAL
options when you want to adjust the way the service predicts traffic when choosing a route.
TRAFFIC_UNAWARE: Not recommended because the choice of route and duration are based on
the road network and average time-independent traffic conditions.
TRAFFIC_AWARE and TRAFFIC_AWARE_OPTIMAL: Recommended for departures happening in
the near future because these preferences take live traffic conditions into consideration. Live
traffic becomes more important and relevant the closer the departureTime is to now. The
farther ahead you set the departure time into the future, the more consideration is given to
historical traffic conditions in selecting routes.
Get a route token
Route tokens are a web-safe, base64-encoded representation of a route. Use a route token to share
a route with the Navigation SDK. The SDK uses this token to reconstruct the route and maintain the
original navigation intent, even during a reroute.
Take these steps to get a route token:
Set the travelMode to DRIVING.
Set the routingPreference to TRAFFIC_AWARE or TRAFFIC_AWARE_OPTIMAL.
Request the routeToken field.
The following example request shows how to request a route token:
Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License
(https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the Apache 2.0 License
// Define a traffic aware routes request with a route token.
constrequestWithRouteToken={
origin:'200 King St San Francisco, CA 94107',
destination:'Pier 41, San Francisco, CA 94133',
travelMode:'DRIVING',
routingPreference:'TRAFFIC_AWARE',
fields:['path','speedPaths','routeLabels','routeToken'],
## };
2/6/26, 11:28 AMSet traffic options  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/traffic-options5/6

(https://www.apache.org/licenses/LICENSE-2.0). For details, see the Google Developers Site Policies
(https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.
Last updated 2026-02-02 UTC.
2/6/26, 11:28 AMSet traffic options  |  Maps JavaScript API  |  Google for Developers
https://developers.google.com/maps/documentation/javascript/routes/traffic-options6/6