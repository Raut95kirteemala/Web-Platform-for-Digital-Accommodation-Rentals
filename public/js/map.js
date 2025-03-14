mapboxgl.accessToken = mapToken;

const parsedCoordinates = JSON.parse(coordinates);

const map = new mapboxgl.Map({
  container: "map", //container ID
  //choose from mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12", //style URL
  center: parsedCoordinates, //starting position [lng,lat]
  zoom: 9, //starting zoom
});

console.log(parsedCoordinates);

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(parsedCoordinates) //Listing.geometry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      "<p>Exact location provided after booking</p>"
    )
  )
  .addTo(map);
