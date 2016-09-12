/**
 * The TagService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param config
 * @returns {{allTags: allTags, singleTagById: singleTagById, decorateObjectWithTag: decorateObjectWithTag}}
 * @constructor
 */
function TagService(DataService) {

    // Search and return all media
    function allTags() {
        return DataService.getData('tags');
    }

    // Search and return single media object by ID
    function singleTagById(id) {
        return DataService.getData('tags/' + id);
    }

    function decorateObjectWithTag(object) {
      if (object.tags) {
        var tagArray = [];

        for (var i = 0, len = object.tags.length; i < len; i++) {
          var item = object.tags[i];
          if (item > 0) {
            var tagId = item;

            singleTagById(tagId).then(function(tagData) {
              tagArray.push(tagData.name);
            });
          }
        }
        object.tags = tagArray;
      }
      return object;
    }

    return {
        allTags: allTags,
        singleTagById: singleTagById,
        decorateObjectWithTag: decorateObjectWithTag
    };
}

angular
    .module('app')
    .factory('TagService', TagService);
