function ProcessController(PostService, MetadataService) {
  var vm = this;

  vm.posts = [];

  PostService.webInfoPostByTag('process').then(function(posts) {
    vm.posts = posts;

    MetadataService.setMetadata({
      title: posts[0].title.rendered,
      description: posts[0].excerpt.rendered
    });
  });
}

angular
  .module('app')
  .controller('ProcessController', ProcessController);
