function HomeController(PostService, MetadataService) {
    var vm = this;

    vm.allVideos = [];
    vm.allFeatured = [];
    vm.bulletins = [];

    PostService.allPostsByCategory('video', 10, 'ASC').then(function(posts) {
        vm.allVideos = posts;
    });

    PostService.allFeaturedPosts(5, 'ASC').then(function(posts) {
        vm.allFeatured = posts;
    });

    PostService.allPostsByCategoryAndTag('bulletin', 'active', 5, 'ASC').then(function(posts) {
        vm.bulletins = posts;
    });

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
}

angular
    .module('app')
    .controller('HomeController', HomeController);
