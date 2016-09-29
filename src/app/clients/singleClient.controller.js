function SingleClientController($stateParams, PostService, DecoratorService, MetadataService) {
  var vm = this;

  vm.posts = [];

  PostService.allPostsByTag('brand-' + $stateParams.id).then(function(post) {
    posts.map(function(post) {
      DecoratorService.decorateObject(post);
    });

    vm.posts = posts;
  });
}

angular
  .module('app')
  .controller('SingleClientController', SingleClientController);
