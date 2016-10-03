function ProjectController($stateParams, PostService, TagService, DecoratorService, MetadataService) {
  var vm = this;

  vm.projects = [];

  PostService.allPostsByCategory('video', 99, 'date', 1).then(function(posts) {
    posts.map(function(post) {
      DecoratorService.decorateObject(post);
    });
    vm.projects = posts;

    MetadataService.setMetadata({
      title: 'Projects',
      description: 'A list of our projects'
    });
  });
}

angular
  .module('app')
  .controller('ProjectController', ProjectController);
