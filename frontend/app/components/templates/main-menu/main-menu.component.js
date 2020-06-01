todoApp.component("mainMenu", {
    templateUrl: 'app/components/templates/main-menu/main-menu.component.html',
    controller: ['$scope', '$location', 'GlobalConfiguration', 'AuthenticationService', function mainMenuController(scope, location, config, AuthenticationService) {
        scope.appName = config.appName;
        scope.userInfo = {
            'name': 'Alexsandro Rodrigues',
            'profile': 'Administrador'
        }

        scope.logout = function() {
            AuthenticationService.logout().then(
                function(success) {
                    location.path('/login');
                }
            );
        }

        scope.isAuthenticated = function() {
            return AuthenticationService.isAuthenticated();
        }
    }] 
});