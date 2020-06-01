todoApp.controller("LoginController", [
  "$scope",
  "$location",
  "AuthenticationService",
  "ToastService",
  function (scope, location, AuthenticationService, ToastService) {
    scope.login = function(usuario) {
        AuthenticationService.login(usuario.login, usuario.senha).then(function (success) {
            location.path('/');
        }, function (error) {
            console.log('ocorreu erro: ' + error);
            ToastService.show({ type: 'erro', message: error });
        });
    };
  }
]);
