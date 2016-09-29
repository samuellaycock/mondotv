function PostController($stateParams, $anchorScroll, $timeout, $location, PostService, DecoratorService, MetadataService) {
  var vm = this;

  vm.post = {};

  PostService.singlePostById($stateParams.id).then(function(post) {

    vm.post = DecoratorService.decorateObject(post);

    MetadataService.setMetadata({
      title: post.title,
      description: post.excerpt
    });
  });
}

angular
  .module('app')
  .controller('PostController', PostController);
