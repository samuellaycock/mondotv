/**
 * The MediaService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param config
 * @returns {{allMedia: allMedia, singleMediaById: singleMediaById, decorateObjectWithMedia: decorateObjectWithMedia}}
 * @constructor
 */
function MediaService(DataService) {

  // Search and return all media
  function allMedia() {
      return DataService.getData('media');
  }

  // Search and return single media object by ID
  function singleMediaById(id) {
      return DataService.getData('media/' + id);
  }

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
    allMedia: allMedia,
    singleMediaById: singleMediaById,
    decorateObjectWithMedia: decorateObjectWithMedia
  };
}

angular
  .module('app')
  .factory('MediaService', MediaService);
