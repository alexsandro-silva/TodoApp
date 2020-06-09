const todoApp = angular.module("todoApp", [
  "mdo-angular-cryptography",
  "ngRoute",
]);

todoApp.config(function ($cryptoProvider, $routeProvider) {
  $cryptoProvider.setCryptographyKey("123456");

  $routeProvider
    .when("/", {
      templateUrl: "app/views/home/home.view.html",
      controller: "HomeController",
      resolve: {
        authentication: [
          "$q",
          "AuthenticationService",
          function ($q, AuthenticationService) {
            var userInfo = AuthenticationService.getUserInfo();
            if (userInfo) {
              return $q.when(userInfo);
            } else {
              console.log("usuário não está logado");
              return $q.reject({ authenticated: false });
            }
          },
        ],
      },
    })
    .when("/login", {
      templateUrl: "app/views/login/login.view.html",
      controller: "LoginController",
    })
    .otherwise({
      redirectTo: "/",
    });
});

todoApp.value("GlobalConfiguration", {
  apiBaseUrl: "http://localhost:3001/api",
  perfil: [
    {
      'idPerfil': 0,
      'descPerfil': "Administrador"
    }, 
    {
      'idPerfil': 1,
      'descPerfil': "Operador"
    }
  ],
  appName: "TodoApp",
});

//listener para as rotas
todoApp.run([
  "$rootScope",
  "$location",
  "AuthenticationService",
  function (rootScope, location, AuthenticationService) {
    rootScope.$on("$routeChangeError", function (
      event,
      current,
      previous,
      eventObj
    ) {
      if (eventObj.authenticated === false) {
        location.path("/login");
      } else if (eventObj.authenticated === true) {
        location.path("/");
      }
    });
  },
]);
