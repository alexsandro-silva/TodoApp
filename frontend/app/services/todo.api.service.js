todoApp.factory('TodoApiService', [
    '$http',
    'GlobalConfiguration',
    function (http, GlobalConfiguration) {
        return TodoApiService = {
            salvarTodo: function (todo) {
                return http({
                    method: 'POST',
                    url: GlobalConfiguration.apiBaseUrl + '/todos',
                    data: $.param(todo),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
            },

            editarTodo: function (todo) {
                return http({
                    method: 'PUT',
                    url: GlobalConfiguration.apiBaseUrl + '/todos',
                    data: $.param(todo),
                    headers: { 'Content-Type': 'application/x-www-form-url-encoded' }
                });
            },

            finalizarTodo: function (id) {
                return http.delete(GlobalConfiguration.apiBaseUrl + '/todos/' + id, {}, {});
            },

            listarTodos: function () {
                return http.get(`${GlobalConfiguration.apiBaseUrl}/todos`);
            },
            
            listarTodosPorPerfil: function (perfil) {
                return http.get(`${GlobalConfiguration.apiBaseUrl}/todos?profile=${perfil}`);
            }
        };
    }
]);