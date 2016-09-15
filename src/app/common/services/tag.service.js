/**
 * The TagService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param config
 * @returns {{allTags: allTags, allTagsBySearchTerm: allTagsBySearchTerm, singleTagById: singleTagById, decorateObjectWithTag: decorateObjectWithTag}}
 * @constructor
 */
function TagService(DataService) {

    // Search and return all tags
    function allTags() {
        return DataService.getData('tags');
    }

    // Search and return all tags by search term
    function allTagsBySearchTerm(searchTerm) {
      return DataService.getData('tags?search=' + searchTerm);
    }

    // Search and return single tag object by ID
    function singleTagById(id) {
        return DataService.getData('tags/' + id);
    }

    function decorateObjectWithTag(object) {
      function pushToTagArray(data) {
        tagArray.push(data.slug);
      }

      if (object.tags) {
        var tagArray = [];

        for (var i = 0, len = object.tags.length; i < len; i++) {
          var item = object.tags[i];
          if (item > 0) {
            var tagId = item;

            singleTagById(tagId).then(pushToTagArray(tagData));
          }
        }
        object.tags = tagArray;
      }
      return object;
    }

    return {
        allTags: allTags,
        allTagsBySearchTerm: allTagsBySearchTerm,
        singleTagById: singleTagById,
        decorateObjectWithTag: decorateObjectWithTag
    };
}

angular
    .module('app')
    .factory('TagService', TagService);
