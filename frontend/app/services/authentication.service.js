todoApp.factory('AuthenticationService', function($rootScope, $http, $q, $window, $crypto, GlobalConfiguration) {
    let userInfo;

    (function init() {
        if ($window.sessionStorage['userInfo']) {
            userInfo = JSON.parse($window.sessionStorage['userInfo']);
        }
    })();

    return authenticationService = {
        login: function(login, senha) {
            var deferred = $q.defer();
            $http.get(`${GlobalConfiguration.apiBaseUrl}/users?login=${login}`)
                .then(function(success) {
                    if (Array.isArray(success.data) && success.data.length) {
                        console.log(success.data[0].password);
                        var user = success.data[0];
                        var passwd = $crypto.decrypt(user.password);
                        if (senha === passwd) {
                            userInfo = {
                                id: user.id,
                                login: user.login,
                                name: user.name,
                                profile: GlobalConfiguration.perfil[user.profile]
                            };
                            $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
                            $rootScope.$broadcast('AuthChanged', {authenticated: true, 'userInfo': userInfo});
                            deferred.resolve(userInfo);
                        } else {
                            deferred.reject('Usuário ou senha inválidos!');
                        }    
                    } else {
                        deferred.reject('Ocorreu um erro na autenticação!');
                    }
                }, function(error) {
                    console.log(error);
                    deferred.reject(error);
                });
            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();
            userInfo = null;
            $window.sessionStorage.removeItem('userInfo');
            $rootScope.$broadcast('AuthChanged', {authenticated: false});
            deferred.resolve();
            return deferred.promise;
        },
        isAuthenticated: function() {
            var userInfo = $window.sessionStorage['userInfo'];
            return userInfo ? true : false;
        },
        getUserInfo: function() {
            return userInfo;
        }
    };
});