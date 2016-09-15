function HomeController(PostService, TagService, DecoratorService, MetadataService) {
  var vm = this;

  vm.allFeatured = [];
  vm.allVideos = [];
  vm.categories = [];
  vm.brands = [];

  vm.videoCount = 0;
  vm.moreVideos = true;
  vm.loading = true;

  vm.fetchMoreVideos = function() {
    vm.loading = true;
    vm.videoCount += 10;

    if (vm.videoCount === 40) {
      vm.moreVideos = false;
    }

    PostService.allPostsByCategory('video', 10, 'asc', vm.videoCount).then(function(posts) {
      posts.map(function(post) {
        DecoratorService.decorateObject(post);
      });
      vm.loading = false;
      vm.allVideos.push.apply(vm.allVideos, posts);
    });
  };

  PostService.allFeaturedPosts(5, 'asc', 1).then(function(posts) {
    posts.map(function(post) {
      DecoratorService.decorateObject(post);
    });
    vm.allFeatured = posts;
  });

  PostService.allPostsByCategory('video', 10, 'asc', vm.videoCount).then(function(posts) {
    posts.map(function(post) {
      DecoratorService.decorateObject(post);
    });
    vm.loading = false;
    vm.allVideos = posts;
  });

  TagService.allTagsBySearchTerm('category-').then(function(tags) {
    vm.categories = tags;
  });

  // pass an empty object to use the defaults.
  MetadataService.setMetadata({});
}

angular
  .module('app')
  .controller('HomeController', HomeController);
