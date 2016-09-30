function SingleClientController($stateParams, PostService, DecoratorService, MetadataService) {
  var vm = this;

  vm.projects = [];
  vm.client = $stateParams.name;

  PostService.allPostsByCategoryAndTag('video', 'brand-' + $stateParams.name, 99, 'asc', 0).then(function(posts) {
    posts.map(function(post) {
      DecoratorService.decorateObject(post);
    });
    vm.projects = posts;

    MetadataService.setMetadata({
      title: $stateParams.name,
      description: 'A list of our projects for' + $stateParams.name
    });
  });
}

angular
  .module('app')
  .controller('SingleClientController', SingleClientController);
