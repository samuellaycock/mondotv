function HomeController(PostService, MetadataService) {
    var vm = this;

    vm.featuredVideos = [];
    vm.featuredBlogs = [];
    vm.bulletins = [];

    PostService.featuredPostsByCategory('video').then(function(posts) {
        vm.featuredBlogs = posts;
    });

    PostService.featuredPostsByCategory('blog').then(function(posts) {
        vm.featuredBlogs = posts;
    });

    PostService.allPostsByCategory('bulletin').then(function(posts) {
        vm.featuredBlogs = posts;
    });

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
}

angular
    .module('app')
    .controller('HomeController', HomeController);
