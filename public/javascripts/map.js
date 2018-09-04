// starting google map on index page
// with user's position // 



function startMap() {

  const berlin = {
    lat: 52.519459,
    lng: 13.401106
  };

  const map = new google.maps.Map(
    document.getElementById('index-googlemap'),
    {
      zoom: 15,
      center: berlin
    }
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(user_location);
    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation')
  }

  // show locations of the restaurants of the category the user selected.



  const sampleRes = {
    name: "Sushi Restaurants",
    location: {
      coordinates: [52.508402, 13.374900],
    }
  };

  const sampleRes2 = {
    name: "Pizza Restaurants",
    location: {
      coordinates: [52.509034, 13.375079],
    }
  };


  // creating markers for restaurants
  const sampleResMarker = new google.maps.Marker({
    position: {
      lat: sampleRes.location.coordinates[0],
      lng: sampleRes.location.coordinates[1]
    },
    map: map,
    title: "hello"
  })

  const sampleResMarker2 = new google.maps.Marker({
    position: {
      lat: sampleRes2.location.coordinates[0],
      lng: sampleRes2.location.coordinates[1]
    },
    map: map,
    title: sampleRes2.name
  })

  // content text on the infoWindows
  const sampleResText = '<a href="/restaurant/">' + sampleRes.name +
    '</a>';

  const sampleRes2Text = '<a href="/restaurant/">' + sampleRes2.name +
    '</a>';

  const infowindow = new google.maps.InfoWindow({
    content: sampleResText
  });

  const infowindow2 = new google.maps.InfoWindow({
    content: sampleRes2Text
  });

  sampleResMarker.addListener('click', function () {
    infowindow.open(map, sampleResMarker);
  });

  sampleResMarker2.addListener('click', function () {
    infowindow2.open(map, sampleResMarker2);
  });

  sampleResMarker.setMap(map);
  sampleResMarker2.setMap(map);

}

startMap();
