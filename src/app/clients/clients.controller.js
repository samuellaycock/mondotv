function ClientController($stateParams, PostService, TagService, MetadataService) {
  var vm = this;

  vm.clients = [];

  PostService.allPostsByCategory('client', 99, 'date', 1).then(function(posts) {
    posts.map(function(post) {
      TagService.decorateObjectWithTag(post);
    });
    vm.clients = posts;

    MetadataService.setMetadata({
      title: 'Clients',
      description: 'Check out the cool people we work with.'
    });
  });
}

angular
  .module('app')
  .controller('ClientController', ClientController);
