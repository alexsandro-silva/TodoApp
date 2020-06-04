todoApp.controller('HomeController', [
    '$scope', 
    'AuthenticationService', 
    'GlobalConfiguration', 
    'ToastService',
    'TodoApiService',
    function(scope, AuthenticationService, GlobalConfiguration, ToastService, TodoApiService) {
        scope.listPerfil = GlobalConfiguration.perfil;
        scope.todos = [];

        function listarTodos () {
            TodoApiService.listarTodos().then(function (success) {
                scope.todos = success.data;
            });
        }

        (function init() {
            listarTodos();
        })();
    }
]);