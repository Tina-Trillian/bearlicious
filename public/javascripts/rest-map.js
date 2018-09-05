function initMap() {
  const resLocation = document.querySelectorAll("#each-res-location");
  const resLocationArr = [];
  resLocation.forEach(function (item) {
    resLocationArr.push(item.innerHTML.split(","))
  })
  const locationData = {
    lat: parseFloat(resLocationArr[0][0]),
    lng: parseFloat(resLocationArr[0][1]),
  }
  console.log("locationData: ", locationData);


  const restMap = new google.maps.Map(
    document.getElementById('restaurant-map'), { zoom: 15, center: locationData }
  );
  const marker = new google.maps.Marker({ position: locationData, map: restMap });
  marker.setMap(restMap);
  console.log(marker);
}

initMap();

