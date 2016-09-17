/**
 * The VideoUrlService receives and processes the json response from WP-API and parses for video URLs.
 *
 * @param $http
 * @param config
 * @returns {{decorateObjectWithVideoUrl: decorateObjectWithVideoUrl}}
 * @constructor
 */
function VideoUrlService(MediaService, TagService) {

  function decorateObjectWithMedia(object) {
    if (object.featured_media > 0) {
      var imageId = object.featured_media;

      singleMediaById(imageId).then(function(imageData) {
        object.featured_media = imageData.media_details;
      });
    }
    return object;
  }

  return {
    decorateObjectWithVideoUrl: decorateObjectWithVideoUrl
  };
}
