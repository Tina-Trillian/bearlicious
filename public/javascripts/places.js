const yelp = require('yelp-fusion');


// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'zp6urmQCYX9kpjwpgo3dAYru9hqDJ7j-6biVsxa7WzguaZ8Yj15fNZ5DXoD47t9_TTSp4Pox_8Bee23-d05Cei5ffNiIDLFhrVmQhr88ij5_JQVAMLkHTCghooOOW3Yx';


//This is just to check the api - to see if it is working
//will later be obsolete if we get input from the User
// const searchRequest = {
//   term:'coffee',
//   location: 'Berlin, germany'
// };

const client = yelp.client(apiKey);

//This gives us the first 5 results with the fiven search query
//the input will be a String the output an Object with name and an
//adress array - the user will then decide which restaurant it is
//it's wrapped inside a PROMISE wrapped in a FUNTION to export it into our script.js
//and to pass parameters into it
//We have to wait for the results to arrive, thats why it is a promise!
function getThreeResults(searchRequest) {
return new Promise(function(resolve, reject) {
client.search(searchRequest).then(response => {
  const results = []
  for (let i = 0; i < 3; i++) {
      if(response.jsonBody.businesses[i]) {
          results.push(response.jsonBody.businesses[i])
      }
  }

  const shortArr = results.map(el => {
    const {name,phone, image_url, id} = el;
    const {latitude, longitude} = el.coordinates;
    let address = el.location.display_address;
        address.pop();
    const tempObj = {
        id,
        name,
        phone,
        address,
        picPath: image_url,
        coordinates: [latitude, longitude],
    }
      return tempObj
  })
   resolve(shortArr);
})
})
}



//for tryout purposes we set a phone variable
//it will be passed from a button click on the "right" restaurant
// let phone = "+493040044289"


const getRightPlace = function (phone) {
return new Promise(function(resolve, reject) {
client.phoneSearch({phone: phone})
.then(response => {
    const place = response.jsonBody.businesses[0];
    const {name,phone, image_url} = place;
    const {latitude, longitude} = place.coordinates;
    const address = place.location.display_address
    address.pop();
    const placeObj = {
        name,
        phone,
        address,
        picPath: image_url,
        coordinates: [latitude, longitude],
    }
    resolve(placeObj);
  }).catch(e => {
    console.log(e);
  })
})
}


module.exports =  {
    getThreeResults,
    getRightPlace
}

exports.getThreeResults = getThreeResults();
exports.getRightPlace = getRightPlace();




