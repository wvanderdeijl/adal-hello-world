import * as angular from 'angular';

// trigger loading of additional angular libs by browserify
import 'angular-route';

// okay@wilfredvanderdeijl.onmicrosoft.com with password   Qabu3960Zupa8695
// notokay@wilfredvanderdeijl.onmicrosoft.com with password    Zupa8695Qabu3960

angular.module('adal-hello-world', ['ngRoute', 'AdalAngular'])
    .run(($rootScope: ng.IRootScopeService) => {
        $rootScope.$on('adal:notAuthorized', (event: any, rejection: any, forResource: any) => {
            console.log('rootScope not authorized', event, rejection, forResource);
            debugger;
        });
        $rootScope.$on('adal:loginFailure', (event: any, rejection: any, forResource: any) => {
            console.log('rootScope loginFailure', event, rejection, forResource);
            debugger;
        });
        $rootScope.$on('adal:loginSuccess', (event: any, rejection: any, forResource: any) => {
            console.log('rootScope loginSuccess', event, rejection, forResource);
            debugger;
        });
    })
    .config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        $locationProvider.html5Mode(true).hashPrefix('$');
        $routeProvider
            .when('/protected', <any>{
                template: 'THIS IS THE PROTECTED PAGE',
                controller: RouteController,
                requireADLogin: true
            })
            .when('/realerror', {
                template: 'THIS IS ERROR PAGE',
                controller: RouteController
            })
            .otherwise('/protected');
    })
    .config((adalAuthenticationServiceProvider: adal.AdalAuthenticationServiceProvider, $httpProvider: ng.IHttpProvider) => {
        window['Logging'] = {
            level: 3,
            log: (message: string) => { console.log('main', message); }
        };
        const adalConfig: adal.Config = {
            clientId: '3c2fd875-af86-471b-b4eb-e33cb5b9ea18',
            tenant: 'wilfredvanderdeijl.onmicrosoft.com',
            redirectUri: `${window.location.origin}/adal.html`,
            extraQueryParameter: `domain_hint=${encodeURIComponent('wilfredvanderdeijl.onmicrosoft.com')}`,
        };
        adalAuthenticationServiceProvider.init(adalConfig, $httpProvider);
    })
    ;

class RouteController {
    constructor($scope: ng.IScope) {
        console.log('CREATING RouteController');
        $scope.$on('adal:notAuthorized', (event: any, rejection: any, forResource: any) => {
            console.log('RouteController.scope not authorized', event, rejection, forResource);
            debugger;
        });
        $scope.$on('adal:loginFailure', (event: any, rejection: any, forResource: any) => {
            console.log('RouteController.scope loginFailure', event, rejection, forResource);
            debugger;
        });
        $scope.$on('adal:loginSuccess', (event: any, rejection: any, forResource: any) => {
            console.log('RouteController.scope loginSuccess', event, rejection, forResource);
            debugger;
        });
    }
}
