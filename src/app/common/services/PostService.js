/**
 * The PostService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{allPostsByCategory: allPostsByCategory, allPostsByTag: allPostsByTag, allPostsByCategoryAndTag: allPostsByCategoryAndTag, allPostsBySearchTerm: allPostsBySearchTerm, allFeaturedPosts: allFeaturedPosts, featuredPostsByCategory: featuredPostsByCategory, webInfoPostByTag: webInfoPostByTag, singlePostById: singlePostById}}
 * @constructor
 */
function PostService($http, $sce, config) {

    // Search and return all posts by category
    function allPostsByCategory(category, amount, order) {
        return getData('posts?filter[category_name]=' + category + '&filter[posts_per_page]=' + amount + '&filter[order]=' + order);
    }

    // Search and return from all posts by tag
    function allPostsByTag(tag, amount, order) {
        return getData('posts?filter[tag]=' + tag + '&filter[posts_per_page]=' + amount + '&filter[order]=' + order);
    }

    // Search and return from all posts by category and tag
    function allPostsByCategoryAndTag(category, tag, amount, order) {
        return getData('posts?filter[category_name]=' + category + '&filter[tag]=' + tag + '&filter[posts_per_page]=' + amount + '&filter[order]=' + order);
    }

    // Search and return all posts by search term
    function allPostsBySearchTerm(searchTerm) {
        return getData('posts?filter[s]=' + searchTerm);
    }

    function allFeaturedPosts(amount, order) {
        return getData('posts?filter[category_name]=featured&filter[posts_per_page]=' + amount + '&filter[order]=' + order);
    }

    // Search and return all featured posts by category
    function featuredPostsByCategory(category, amount, order) {
        return getData('posts?filter[category_name]=' + category + '%2Bfeatured&filter[posts_per_page]=' + amount + '&filter[order]=' + order);
    }

    // Search and return Web Information post by tag
    function webInfoPostByTag(tag) {
        return getData('posts?filter[category_name]=web-info&filter[tag]=' + tag);
    }

    // Search and return single post by ID
    function singlePostById(id) {
        return getData('posts/' + id);
    }

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
        result.excerpt = $sce.trustAsHtml(result.excerpt);
        result.date = Date.parse(result.date);
        result.content = $sce.trustAsHtml(result.content);
        return result;
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
