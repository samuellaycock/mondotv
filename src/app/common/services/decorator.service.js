/**
 * The DecoratorService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param config
 * @returns {{decorateObject: decorateObject}}
 * @constructor
 */
function DecoratorService(MediaService, TagService, VideoUrlService) {

  function checkMedia(object) {
    return MediaService.decorateObjectWithMedia(object);
  }

  function checkTags(object) {
    return TagService.decorateObjectWithTag(object);
  }

  function checkVideoUrl(object) {
    return VideoUrlService.decorateObjectWithVideoUrl(object);
  }

  function decorateObject(object) {
    var mediaCheck = checkMedia(object),
        tagCheck = checkTags(mediaCheck),
        videoUrlCheck = checkVideoUrl(tagCheck);

    return tagCheck;
  }

  return {
    decorateObject: decorateObject
  };
}

angular
    .module('app')
    .factory('DecoratorService', DecoratorService);
