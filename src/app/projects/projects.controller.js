function ProjectController($stateParams, PostService, MetadataService) {
  var vm = this;

  vm.projects = [];

  PostService.allPostsByCategory('video', 50, 'asc', 0).then(function(posts) {
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
