function AboutController(PostService, MetadataService) {
    var vm = this;

    vm.post = {};

    PostService.webInfoPostByTag('who-we-are').then(function(post) {
        vm.post = post;

        MetadataService.setMetadata({
            title: page.title,
            description: page.excerpt
        });
    });

}

angular
    .module('app')
    .controller('AboutController', AboutController);
