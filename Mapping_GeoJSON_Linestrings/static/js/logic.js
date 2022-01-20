// Add console.log to check to see if code is working.
console.log("working");

// Add GeoJSON data for SFO
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing GeoJSON data.
// Using the pointToLayer function to add functionality to the marker
// L.geoJson(sanFranAirport, {
//     // Turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng).bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//     }
//   }).addTo(map);

// Using the onEachFeature function
// L.geoJson(data, {
//     onEachFeature: function(feature, layer) {
//		 console.log(layer);
//       layer.bindPopup();
//      }
// });

// Create the tile layer that will be the background of the map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Light: light,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [44.0, -80.0],
	zoom: 2,
	layers: [dark]
});

// Pass map layers into layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let torontoData = "https://raw.githubusercontent.com/peterg7/Mapping_Earthquakes_GISH/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
	color: "#ffffa1", // yellow
	weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  	L.geoJson(data, {
	  	onEachFeature: function(feature, layer) {
				layer.bindPopup("<h2>Airline code: " + feature.properties.airline_id + "</h2> <hr> <h3>Destination: " + feature.properties.dst + "</h3>");
		},
		style: myStyle
	}).addTo(map);
});