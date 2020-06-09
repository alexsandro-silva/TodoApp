todoApp.controller("HomeController", [
    "$scope",
    "AuthenticationService",
    "GlobalConfiguration",
    "ToastService",
    "TodoApiService",
    function (
        scope,
        AuthenticationService,
        GlobalConfiguration,
        ToastService,
        TodoApiService
    ) {
        scope.profiles = GlobalConfiguration.perfil;
        scope.atividades = [];
        scope.activeTab = 0;

        scope.listarAtividadesPorPerfil = function (perfil) {
            scope.activeTab = perfil;

            if (perfil == 0) {
                listarAtividades();
            } else {
                TodoApiService.listarTodosPorPerfil(perfil).then(function (
                    success
                ) {
                    scope.atividades = success.data;
                });                    
            }
        };

        scope.$on('SearchByDate', (event, eventObj) => {
            alert(eventObj.date);
        });

        function listarAtividades() {
            TodoApiService.listarTodos().then(function (success) {
                scope.atividades = success.data;
            });
        }

        (function init() {
            listarAtividades();
        })();
    },
]);
