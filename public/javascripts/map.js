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


  // creating array of each restaurant data with the name and the location
  const array = [];
  const locArray = [];
  const resName = document.querySelectorAll("#res-name")
  const location = document.querySelectorAll("#res-location")

  resName.forEach(function (item) {
    array.push([{ name: item.innerHTML }])
  })

  location.forEach(function (item) {
    locArray.push(item.innerHTML.split(","))
  })

  for (let i = 0; i < locArray.length; i++) {
    array[i].push({
      lat: parseFloat(locArray[i][0]),
      lng: parseFloat(locArray[i][1]),
    })
  }

  // console.log("array: ", array)

  /// creating array of objects for google.map.Marker
  const markArr = [];
  for (let i = 0; i < array.length; i++) {
    markArr.push({
      position: {
        lat: array[i][1].lat,
        lng: array[i][1].lng,
      },
      map: map,
      title: array[i][0].name
    })
  }

  // console.log("markArr: ", markArr);

  markArr.forEach(function (item) {
    const marker = new google.maps.Marker(item);
    marker.setMap(map);
    const infoWindow = new google.maps.InfoWindow({
      content: '<a href="/restaurant/">' + item.title +
        '</a>'
    });
    marker.addListener('click', function () {
      infoWindow.open(map, marker)
    })
  })

}

startMap();


//// code for sample markers

  // creating markers for restaurants ( sample )
  // const sampleResMarker = new google.maps.Marker({
  //   position: {
  //     lat: sampleRes.location.coordinates[0],
  //     lng: sampleRes.location.coordinates[1]
  //   },
  //   map: map,
  //   title: "hello"
  // })

  // console.log("sampleResMarker: ", sampleResMarker);

  // const sampleResMarker2 = new google.maps.Marker({
  //   position: {
  //     lat: sampleRes2.location.coordinates[0],
  //     lng: sampleRes2.location.coordinates[1]
  //   },
  //   map: map,
  //   title: sampleRes2.name
  // })

  // sampleResMarker.setMap(map);
  // sampleResMarker2.setMap(map);


    // for (let i = 0; i < markArr; i++) {
  //   new google.maps.Marker(markArr[i]).setMap(map);
  // }
  // new google.maps.Marker(markArr[0]).setMap(map);
  // new google.maps.Marker(markArr[1]).setMap(map);
  // new google.maps.Marker(markArr[2]).setMap(map);


    // this is working prototype (first iteration)
  // markArr.forEach(function (item) {
  //   new google.maps.Marker(item).setMap(map);
  //   new google.maps.Marker(item).addListener('click', function () {
  //     console.log("marker was clicked")
  //   })
  // })


  // const infowindow = new google.maps.InfoWindow({
  //   content: '<a href="/restaurant/">' + sampleRes.name +
  //     '</a>'
  // });

  // const infowindow2 = new google.maps.InfoWindow({
  //   content: '<a href="/restaurant/">' + sampleRes2.name +
  //     '</a>'
  // });

  // sampleResMarker.addListener('click', function () {
  //   infowindow.open(map, sampleResMarker);
  // });

  // sampleResMarker2.addListener('click', function () {
  //   infowindow2.open(map, sampleResMarker2);
  // });


  // show locations of the restaurants of the category the user selected.

  // const sampleRes = {
  //   name: "Sushi Restaurants",
  //   location: {
  //     coordinates: [52.508402, 13.374900],
  //   }
  // };

  // const sampleRes2 = {
  //   name: "Pizza Restaurants",
  //   location: {
  //     coordinates: [52.509034, 13.375079],
  //   }
  // };