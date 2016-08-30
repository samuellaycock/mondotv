function HomeController(PostService, MetadataService) {
    var vm = this;

    vm.allVideos = [];
    vm.featuredBlogs = [];
    vm.bulletins = [];

    PostService.allPostsByCategory('video', 500, 'ASC').then(function(posts) {
        vm.allVideos = posts;
    });

    PostService.featuredPostsByCategory('blog', 5, 'ASC').then(function(posts) {
        vm.featuredBlogs = posts;
    });

    PostService.allPostsByCategory('bulletin', 5, 'ASC').then(function(posts) {
        vm.bulletins = posts;
    });

    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
}

angular
    .module('app')
    .controller('HomeController', HomeController);
