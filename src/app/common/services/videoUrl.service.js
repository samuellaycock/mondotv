/**
 * The VideoUrlService receives and processes the json response from WP-API and$
 *
 * @param $http
 * @param config
 * @returns {{decorateObjectWithVideoUrl: decorateObjectWithVideoUrl}}
 * @constructor
 */
function VideoUrlService() {

  function returnUrl(object) {
    var string = object.content.toString(),
        regex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s\"]{2,})/gi,
        result = string.match(regex),
        videoUrl = result[0];

    /*if (regex.exec(content)) {
      videoUrlArray = regex.exec(content);
      videoUrl = videoUrlArray[0];

      //return videoUrl;
    }*/
    return videoUrl;
  }

  function decorateObjectWithVideoUrl(object) {
    //if (object.type === 'video') {
      object.videoUrl = returnUrl(object);
    //}

    return object;
  }

  return {
    decorateObjectWithVideoUrl: decorateObjectWithVideoUrl
  };
}

angular
    .module('app')
    .factory('VideoUrlService', VideoUrlService);
