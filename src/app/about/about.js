function AboutController($stateParams, PostService, MetadataService) {
    var vm = this;

    vm.posts = [];

    PostService.webInfoPostByTag($stateParams.section).then(function(posts) {
        vm.posts = posts;

        MetadataService.setMetadata({
            title: posts[0].title,
            description: posts[0].excerpt
        });
    });

}

angular
    .module('app')
    .controller('AboutController', AboutController);
