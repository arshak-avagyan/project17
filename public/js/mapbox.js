/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken = "pk.eyJ1IjoiYWF2YWd5YW4iLCJhIjoiY2xiMHQ4Yjh5MDE3aDNvcGNqazJvZzk4cSJ9.xTh1g5qcB87HKFJLQD6ZLw";
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/aavagyan/clb0yyx12009f14lg1nuldxmd', // style URL
    scrollZoom: false,
    //   center: [-118.243683, 34.052235], // starting position [lng, lat]
    //   zoom: 9, // starting zoom
    //   interactive: false, // enable/disable intaraction
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Extend the map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
