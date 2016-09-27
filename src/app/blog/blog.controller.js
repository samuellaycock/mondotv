function BlogController($stateParams, $state, PostService, DecoratorService, MetadataService) {
    var vm = this;

    vm.blogPosts = [];
    vm.loading = false;

    PostService.allPostsByCategory('blog', 10, 'asc', 0).then(function(posts) {
      posts.map(function(post) {
        DecoratorService.decorateObject(post);
      });
      vm.loading = false;
      vm.allVideos = posts;
    });

    MetadataService.setMetadata({
        title: 'Blog',
        description: 'Your source for all news MondoTV.'
    });
}

angular
    .module('app')
    .controller('BlogController', BlogController);
