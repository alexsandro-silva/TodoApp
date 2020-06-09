todoApp.component("mainMenu", {
  templateUrl: "app/components/templates/main-menu/main-menu.component.html",
  controller: [
    "$scope",
    "$rootScope",
    "$location",
    "GlobalConfiguration",
    "AuthenticationService",
    function mainMenuController(
      scope,
      rootScope,
      location,
      config,
      AuthenticationService
    ) {
      scope.isAuthenticated = false;
      scope.appName = config.appName;
      scope.userInfo = { };
      //scope.date = '';

      scope.logout = function () {
        AuthenticationService.logout().then(function (success) {
          location.path("/login");
        });
      };

      scope.searchByDate = function(date) {
        if (!date) {
          alert('Informe uma data para pesquisa');
          return;
        }
        rootScope.$broadcast('SearchByDate', {date: date});
      }

      scope.$on('AuthChanged', function(event, eventObj){
        if (eventObj.authenticated === true) {
          scope.isAuthenticated = true;
          scope.userInfo = eventObj.userInfo;
        } else {
          scope.isAuthenticated = false;
        }
      });

      (function init() {
        scope.isAuthenticated = AuthenticationService.isAuthenticated();
        scope.userInfo = AuthenticationService.getUserInfo();
      })();
    },
  ],
});
