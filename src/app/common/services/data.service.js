/**
 * The DataService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param config
 * @returns {{getData: getData}}
 * @constructor
 */
function DataService($http, $sce, config) {

  // Retrieve data via API URL
  function getData(url) {
    return $http
      .get(config.API_URL + url, { cache: true })
      .then(function(response) {
        if (response.data instanceof Array) {
            var items = response.data.map(function(item) {
              return decorateResult(item);
            });
            return items;
          } else {
            return decorateResult(response.data);
          }
        });
  }

  /**
   * Decorate a post to make it play nice with AngularJS
   * @param result
   * @returns {*}
   */
  function decorateResult(result) {
    if (result.hasOwnProperty('excerpt') && result.hasOwnProperty('date') && result.hasOwnProperty('content')) {
      result.excerpt = $sce.trustAsHtml(result.excerpt.rendered);
      result.date = Date.parse(result.date);
      result.content = $sce.trustAsHtml(result.content.rendered);
    }
    return result;
  }

  return {
    getData: getData
  };
}

angular
  .module('app')
  .factory('DataService', DataService);
