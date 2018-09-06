window.fbAsyncInit = function () {
  FB.init({
    appId: '244565082916525',
    cookie: true,
    xfbml: true,
    version: 'v3.1'
  });

  FB.AppEvents.logPageView();

};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// checking FB login status for the user
FB.getLoginStatus(function (response) {
  statusChangeCallback(response);
  console.log("FB check-in: ", response);
});