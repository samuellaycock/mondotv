function HomeController(PostService, TagService, DecoratorService, MetadataService) {
  var vm = this;

  vm.allTestimonials = [];
  vm.allVideos = [];
  vm.categories = [];
  vm.brands = [];
  vm.videoCount = 12;
  vm.videoCountRestore = 12;
  vm.moreVideos = true;
  vm.loading = true;

  vm.fetchMoreVideos = function() {
    vm.videoCount += 12;
    vm.videoCountRestore += 12;

    if (vm.videoCount > 40) {
      vm.moreVideos = false;
    }
  };

  vm.allVideoCount = function() {
    vm.videoCount = 50;
    vm.moreVideos = false;
  };

  vm.restoreVideoCount = function() {
    vm.videoCount = vm.videoCountRestore;

    if (vm.videoCount > 40) {
      vm.moreVideos = false;
    } else {
      vm.moreVideos = true;
    }
  };

  PostService.allPostsByCategory('testimonial', 99, 'date', 1).then(function(posts) {
    posts.map(function(post) {
      TagService.decorateObjectWithTag(post);
    });
    vm.allTestimonials = posts;
  });

  PostService.allPostsByCategory('video', 99, 'date', 1).then(function(posts) {
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
