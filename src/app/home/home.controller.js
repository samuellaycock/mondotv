function HomeController(PostService, TagService, DecoratorService, MetadataService) {
  var vm = this;

  vm.allFeatured = [];
  vm.allVideos = [];
  vm.categories = [];
  vm.brands = [];
  vm.videoCount = 0;
  vm.moreVideos = true;
  vm.loading = true;

  vm.randomColour = function() {
    var colourArray = [
        'hover-orange',
        'hover-dark-orange',
        'hover-yellow',
        'hover-cyan',
        'hover-blue',
        'hover-dark-blue'
      ],
      index = Math.floor(Math.random()*6);

      return colourArray[index];
  };

  vm.fetchMoreVideos = function() {
    vm.loading = true;
    vm.videoCount += 12;

    if (vm.videoCount > 40) {
      vm.moreVideos = false;
    }

    PostService.allPostsByCategory('video', 12, 'asc', vm.videoCount).then(function(posts) {
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

  PostService.allPostsByCategory('video', 12, 'asc', vm.videoCount).then(function(posts) {
    posts.map(function(post) {
      DecoratorService.decorateObject(post);
    });
    vm.loading = false;
    vm.allVideos = posts;
  });

  TagService.allTagsBySearchTerm('category-').then(function(tags) {
    tags.map(function(tag) {
      var colour = vm.randomColour();
      tag.colour = colour;
    });
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
