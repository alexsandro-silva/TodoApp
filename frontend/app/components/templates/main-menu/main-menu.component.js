todoApp.component("mainMenu", {
  templateUrl: "app/components/templates/main-menu/main-menu.component.html",
  controller: [
    "$scope",
    "$location",
    "GlobalConfiguration",
    "AuthenticationService",
    function mainMenuController(
      scope,
      location,
      config,
      AuthenticationService
    ) {
      scope.isAuthenticated = false;
      scope.appName = config.appName;
      scope.userInfo = { };

      scope.logout = function () {
        AuthenticationService.logout().then(function (success) {
          location.path("/login");
        });
      };

      //scope.isAuthenticated = function () {
      //  return AuthenticationService.isAuthenticated();
      //};

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
