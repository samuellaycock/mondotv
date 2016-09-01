function PostController($stateParams, $anchorScroll, $timeout, $location, PostService, MetadataService) {
    var vm = this,
        el = document.getElementsByTagName('form');

    vm.post = {};

    if(el) {
      el.className += el.className ? ' pure-form pure-form-aligned' : 'pure-form pure-form-aligned';
    }

    PostService.singlePostById($stateParams.id).then(function(post) {
        vm.post = post;

        MetadataService.setMetadata({
            title: post.title,
            description: post.excerpt
        });
    });
}

angular
    .module('app')
    .controller('PostController', PostController);
