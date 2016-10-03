/**
 * The PostService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPostsByCategory: allPostsByCategory, allPostsByTag: allPostsByTag, allPostsByCategoryAndTag: allPostsByCategoryAndTag, allPostsBySearchTerm: allPostsBySearchTerm, allFeaturedPosts: allFeaturedPosts, featuredPostsByCategory: featuredPostsByCategory, webInfoPostByTag: webInfoPostByTag, singlePostById: singlePostById}}
 * @constructor
 */
function PostService(DataService) {

  // Search and return all posts by category
  function allPostsByCategory(category, amount, order, offset) {
    return DataService.getData('posts?filter[category_name]=' + category + '&page=' + offset + '&per_page=' + amount + '&orderby=' + order);
  }

  // Search and return from all posts by tag
  function allPostsByTag(tag, amount, order, offset) {
    return DataService.getData('posts?filter[tag]=' + tag + '&page=' + offset + '&per_page=' + amount + '&orderby=' + order);
  }

  // Search and return from all posts by category and tag
  function allPostsByCategoryAndTag(category, tag, amount, order, offset) {
    return DataService.getData('posts?filter[category_name]=' + category + '&filter[tag]=' + tag + '&page=' + offset + '&per_page=' + amount + '&orderby=' + order);
  }

  // Search and return all posts by search term
  function allPostsBySearchTerm(searchTerm, amount, order, offset) {
    return DataService.getData('posts?search=' + searchTerm + '&page=' + offset + '&per_page=' + amount + '&orderby=' + order);
  }

  function allFeaturedPosts(amount, order, offset) {
    return DataService.getData('posts?filter[category_name]=featured&page=' + offset + '&per_page=' + amount + '&orderby=' + order);
  }

  // Search and return all featured posts by category
  function featuredPostsByCategory(category, amount, order, offset) {
    return DataService.getData('posts?filter[category_name]=' + category + '%2Bfeatured&page=' + offset + '&per_page=' + amount + '&orderby=' + order);
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
