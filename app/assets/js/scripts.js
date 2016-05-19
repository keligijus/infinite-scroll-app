var infApp = infApp || {};

(function(){

infApp.settings = {
  api: {
    baseUrl: 'https://api.dribbble.com/v1',
    access_token: '3402bc128ab90bdc0d1ddab729be14c034154ba0fdca8bd1e0d8f230cac3d82c'
  }
};

}());
var infApp = infApp || {};

(function(){

  // creating a HTML template using a json object
  function prepTemplate(item) {
    var template = "";

    template += '<img src="' + item.images.normal + '" alt="' + item.title +'" style="max-widht:100%;">';

    return template;
  }

  function prepAllHtml(jsonObj) {

  }

  infApp.prepTemplate = prepTemplate;

}());
var infApp = infApp || {};

(function(){

  function getShots(options){
    var request = new XMLHttpRequest();

    var options = options || {};
    var endPoint = options.endPoint || '/shots/';
    var page = options.page || '1';
    var perPage = options.perPage || '10';

    var requestUrl = infApp.settings.api.baseUrl +
                      endPoint +
                      '?page=' +
                      page +
                      '&per_page=' +
                      perPage +
                      '&access_token=' +
                      infApp.settings.api.access_token;


    request.open('GET', requestUrl , true);

    request.onload = function() {
      var html = [];

      if (request.status >= 200 && request.status < 400) {
        infApp.shots = JSON.parse(request.responseText);

        console.debug(infApp.shots);

        infApp.shots.forEach(function(item){
          html.push(infApp.prepTemplate(item));
        });

        document.getElementById('shots-container').innerHTML += html;

        infApp.pageCount = (infApp.pageCount += 1) || 1;

        console.debug(infApp.pageCount);

      } else {
        console.error(request.responseText);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  };


  infApp.getShots = getShots;

}());
var infApp = infApp || {};

(function() {
  if (document.readyState != 'loading'){
    infApp.getShots();
    // console.log(infApp.shots);
  } else {
    document.addEventListener('DOMContentLoaded', infApp.getShots());
    // console.info(infApp.shots);
  }
}());


//# sourceMappingURL=scripts.js.map
