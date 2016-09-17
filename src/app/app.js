angular.module('app', ['ui.router', 'ngAnimate', 'angularUtils.directives.dirPagination', 'slick', 'sticky', 'wu.masonry']);

/**
 *
 * @param $stateProvider
 * @param $locationProvider
 * @param $urlRouterProvider
 * @ngInject
 */
function routesConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      views: {
        'main': {
          templateUrl: 'home/home.view.html',
          controller: 'HomeController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'tv',
        strapline: 'We make web based branded video content. Tech focused, doctor approved. Check it out.'
      }
    })
    .state('process', {
      url: "/process",
      views: {
        'main': {
          templateUrl: 'other/other.view.html',
          controller: 'OtherController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'process',
        strapline: 'We make web based branded video content. Tech focused, doctor approved. Check it out.'
      }
    })
    .state('projects', {
      url: "/projects",
      views: {
        'main': {
          templateUrl: 'projects/projects.view.html',
          controller: 'ProjectController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'projects',
        strapline: 'We make web based branded video content. Tech focused, doctor approved. Check it out.'
      }
    })
    .state('clients', {
      url: "/clients",
      views: {
        'main': {
          templateUrl: 'clients/clients.view.html',
          controller: 'ClientController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'clients',
        strapline: 'We make web based branded video content. Tech focused, doctor approved. Check it out.'
      }
    })
    .state('blog', {
      url: "/blog",
      views: {
        'main': {
          templateUrl: 'blog/blog.view.html',
          controller: 'BlogController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'blog',
        strapline: 'We make web based branded video content. Tech focused, doctor approved. Check it out.'
      }
    })
    .state('post', {
      url: '/blog/:id/:title',
      views: {
        'main': {
          templateUrl: 'blog/post.view.html',
          controller: 'PostController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'blog',
        strapline: 'We make web based branded video content. Tech focused, doctor approved. Check it out.'
      }
    })
    .state('postsBySearch', {
      url: "/search/:searchTerm",
      views: {
        'main': {
          templateUrl: 'blog/blog.view.html',
          controller: 'BlogController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'stuff',
        strapline: 'We make web based branded video content. Tech focused, doctor approved. Check it out.'
      }
    })
    .state('terms', {
      url: "terms/:type",
      views: {
        'main': {
          templateUrl: 'terms/terms.view.html',
          controller: 'TermsController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'terms',
        strapline: 'We make web based branded video content. Tech focused, doctor approved. Check it out.'
      }
    })
    .state('contact', {
      url: "/contact",
      views: {
        'main': {
          templateUrl: 'other/other.view.html',
          controller: 'OtherController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: 'hookup',
        strapline: 'Curious Cats.<br/\><br\/>According to the internet \“experts\”, more than 3 boxes on any e-form will cause 80\% of you to opt out. Ours has more than that because we\’re Curious Cats. Let\’S show those \“experts\” who\’s boss!'
      }
    })
    .state('404', {
      views: {
        'main': {
          templateUrl: 'other/other.view.html',
          controller: 'OtherController',
          controllerAs: 'vm'
        }
      },
      data: {
        state: '404',
        strapline: 'Oops! Looks like you\'ve taken a wrong turn. <a href="/">Click here</a> to get back on track.'
      }
    });

  $locationProvider.html5Mode(true).hashPrefix('!');

  $urlRouterProvider.rule(function ($injector, $location) {
    var slashHashRegex,
      matches,
      path = $location.url();

    // check to see if the path already has a slash where it should be
    if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
      return path.substring(0, path.length - 1);
    }

    // if there is a trailing slash *and* there is a hash, remove the last slash so the route will correctly fire
    slashHashRegex = /\/(#[^\/]*)$/;
    matches = path.match(slashHashRegex);
    if (1 < matches.length) {
      return path.replace(matches[0], matches[1]);
    }
  })
  .otherwise(function($injector, $location){
    var state = $injector.get('$state');
    state.go('404');
    return $location.path();
  });
}

var config = {
  // global constant config values live here
  ROOT_URL: '%%ROOT_URL%%',
  API_URL: '%%API_URL%%'
};

function AppController($rootScope, $window, $location, $timeout, $stateParams, MetadataService, PostService) {
  var vm = this;

  vm.bulletins = [];
  vm.recentBlogs = [];
  vm.about = {};

  PostService.allPostsByCategoryAndTag('bulletin', 'active', 5, 'asc', 0).then(function(posts) {
    vm.bulletins = posts;
  });

  PostService.allPostsByCategory('blog', 5, 'asc', 0).then(function(posts) {
    vm.recentBlogs = posts;
  });

  PostService.webInfoPostByTag('about').then(function(post) {
    vm.about = post;
  });

  $rootScope.$on('$stateChangeSuccess', function(e, toState) {
    if(toState.name == 'other') {
      vm.activeSection = $stateParams.section;
    } else {
      vm.activeSection = toState.name;
    }
  });

  $rootScope.$watchCollection( function() {
      return MetadataService.getMetadata();
  }, function (meta) {
    if (typeof meta.title !== 'undefined') {
        $rootScope.meta = meta;
      $timeout(function () {
        // push event to google analytics. This is done in a $timeout
        // so the current $digest loop has a chance to actually update the
        // HTML with the correct page title etc. Check for localhost to prevent
        // dev sessions from being recorded in analytics.
        if ($location.host() !== 'localhost') {
          $window.ga('send', 'pageview', {page: $location.path()});
        }
      });
    }
  });
}

angular
  .module('app')
  .config(routesConfig)
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }])
  .constant('config', config)
  .controller('AppController', AppController);
