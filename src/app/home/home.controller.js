function HomeController(PostService, TagService, DecoratorService, MetadataService) {
  var vm = this;

  vm.allFeatured = [];
  vm.allVideos = [];
  vm.categories = [];
  vm.brands = [];
  vm.videoCount = 12;
  vm.moreVideos = true;
  vm.loading = true;

  vm.fetchMoreVideos = function() {
    vm.videoCount += 12;

    if (vm.videoCount > 40) {
      vm.moreVideos = false;
    }
  };

  PostService.allFeaturedPosts(5, 'asc', 1).then(function(posts) {
    posts.map(function(post) {
      DecoratorService.decorateObject(post);
    });
    vm.allFeatured = posts;
  });

  PostService.allPostsByCategory('video', 99, 'asc', 0).then(function(posts) {
    posts.map(function(post) {
      DecoratorService.decorateObject(post);
    });
    vm.loading = false;
    vm.allVideos = posts;
  });

  TagService.allTagsBySearchTerm('category-').then(function(tags) {
    vm.categories = tags;
  });

  TagService.allTagsBySearchTerm('brand-').then(function(tags) {
    vm.brands = tags;
  });

  // pass an empty object to use the defaults.
  MetadataService.setMetadata({});
}

angular
  .module('app')
  .controller('HomeController', HomeController);
