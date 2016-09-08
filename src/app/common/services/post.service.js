/**
 * The PostService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPostsByCategory: allPostsByCategory, allPostsByTag: allPostsByTag, allPostsByCategoryAndTag: allPostsByCategoryAndTag, allPostsBySearchTerm: allPostsBySearchTerm, allFeaturedPosts: allFeaturedPosts, featuredPostsByCategory: featuredPostsByCategory, webInfoPostByTag: webInfoPostByTag, singlePostById: singlePostById}}
 * @constructor
 */
function PostService(_, DataService) {

  // Search and return all posts by category
  function allPostsByCategory(category, amount, order, offset) {
    return DataService.getData('posts?filter[category_name]=' + category + '&filter[posts_per_page]=' + amount + '&filter[offset]=' + offset + '&filter[order]=' + order);
  }

  // Search and return from all posts by tag
  function allPostsByTag(tag, amount, order, offset) {
    return DataService.getData('posts?filter[tag]=' + tag + '&filter[posts_per_page]=' + amount + '&filter[offset]=' + offset + '&filter[order]=' + order);
  }

  // Search and return from all posts by category and tag
  function allPostsByCategoryAndTag(category, tag, amount, order, offset) {
    return DataService.getData('posts?filter[category_name]=' + category + '&filter[tag]=' + tag + '&filter[posts_per_page]=' + amount + '&filter[offset]=' + offset + '&filter[order]=' + order);
  }

  // Search and return all posts by search term
  function allPostsBySearchTerm(searchTerm, amount, order, offset) {
    return DataService.getData('posts?filter[s]=' + searchTerm + '&filter[posts_per_page]=' + amount + '&filter[offset]=' + offset + '&filter[order]=' + order);
  }

  function allFeaturedPosts(amount, order, offset) {
    return DataService.getData('posts?filter[category_name]=featured&filter[posts_per_page]=' + amount + '&filter[order]=' + order);
  }

  // Search and return all featured posts by category
  function featuredPostsByCategory(category, amount, order, offset) {
    return DataService.getData('posts?filter[category_name]=' + category + '%2Bfeatured&filter[posts_per_page]=' + amount + '&filter[offset]=' + offset + '&filter[order]=' + order);
  }

  // Search and return single post by ID
  function singlePostById(id) {
    return DataService.getData('posts/' + id);
  }

  // Search and return Web Information post by tag
  function webInfoPostByTag(tag) {
    return DataService.getData('posts?filter[category_name]=web-info&filter[tag]=' + tag);
  }

  return {
    allPostsByCategory: allPostsByCategory,
    allPostsByTag: allPostsByTag,
    allPostsByCategoryAndTag: allPostsByCategoryAndTag,
    allPostsBySearchTerm: allPostsBySearchTerm,
    allFeaturedPosts: allFeaturedPosts,
    featuredPostsByCategory: featuredPostsByCategory,
    webInfoPostByTag: webInfoPostByTag,
    singlePostById: singlePostById
  };
}

angular
  .module('app')
  .factory('PostService', PostService);
