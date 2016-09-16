/**
 * The VideoUrlService receives and processes the json response from WP-API and parses for video URLs.
 *
 * @param $http
 * @param config
 * @returns {{decorateObjectWithVideoUrl: decorateObjectWithVideoUrl}}
 * @constructor
 */
function VideoUrlService() {

  function returnUrl(object) {
    var content = object.content.rendered,
        videoUrl = content.match("(?:^|[\\W])((ht|f)tp(s?):\\/\\/|www\\.)" + "(([\\w\\-]+\\.){1,}?([\\w\\-.~]+\\/?)*" + "[\\p{Alnum}.,%_=?&#\\-+()\\[\\]\\*$~@!:/{};']*)");

    return videoUrl;
  }

  function decorateObjectWithVideoUrl(object) {
    if (object.type === 'video') {
      var videoUrl = returnUrl(object);

      object.videoUrl = videoUrl;
    }
    return object;
  }

  return {
    decorateObjectWithVideoUrl: decorateObjectWithVideoUrl
  };
}

angular
    .module('app')
    .factory('VideoUrlService', VideoUrlService);
