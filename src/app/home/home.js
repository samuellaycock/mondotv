function HomeController(PostService, MediaService, MetadataService) {
  var vm = this;

  vm.allFeatured = [];
  vm.allVideos = [];
  vm.videoCount = 0;
  vm.moreVideos = true;

  vm.fetchMoreVideos = function() {
    vm.videoCount += 10;

    if (vm.videoCount === 40) {
      vm.moreVideos = false;
    }

    PostService.allPostsByCategory('video', 10, 'asc', vm.videoCount).then(function(posts) {
      posts.map(function(post) {
        MediaService.decorateObjectWithMedia(post);
      });
      vm.allVideos.push.apply(vm.allVideos, posts);
    });
  };

  PostService.allFeaturedPosts(5, 'asc', 1).then(function(posts) {
    posts.map(function(post) {
      MediaService.decorateObjectWithMedia(post);
    });
    vm.allFeatured = posts;
  });

  PostService.allPostsByCategory('video', 10, 'asc', vm.videoCount).then(function(posts) {
    posts.map(function(post) {
      MediaService.decorateObjectWithMedia(post);
    });
    vm.allVideos = posts;
  });

  // pass an empty object to use the defaults.
  MetadataService.setMetadata({});
}

angular
  .module('app')
  .controller('HomeController', HomeController);
