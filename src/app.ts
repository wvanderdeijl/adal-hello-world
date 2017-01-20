import * as angular from 'angular';

// trigger loading of additional angular libs by browserify
import 'angular-route';

// okay@wilfredvanderdeijl.onmicrosoft.com with password   Qabu3960Zupa8695
// notokay@wilfredvanderdeijl.onmicrosoft.com with password    Zupa8695Qabu3960

angular.module('adal-hello-world', ['ngRoute', 'AdalAngular'])
    .config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        $locationProvider.html5Mode(true).hashPrefix('$');
        $routeProvider
            .when('/protected', <any>{
                template: 'THIS IS THE PROTECTED PAGE',
                controller: RouteController,
                requireADLogin: true
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
    constructor($scope:ng.IScope) {
        console.log('CREATING RouteController');
        $scope.$on('adal:notAuthorized', (event: any, rejection: any, forResource: any) => {
            debugger;
            console.log('XXXXXXXXXXXXX not authorized', event, rejection, forResource);
        });
        $scope.$on('adal:loginFailure', (event: any, rejection: any, forResource: any) => {
            debugger;
            console.log('XXXXXXXXXXXXX loginFailure', event, rejection, forResource);
        });
        $scope.$on('adal:loginSuccess', (event: any, rejection: any, forResource: any) => {
            debugger;
            console.log('XXXXXXXXXXXXX loginSuccess', event, rejection, forResource);
        });
    }
}
