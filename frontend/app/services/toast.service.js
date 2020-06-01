todoApp.factory('ToastService', function() {
    return ToastService = {
        show: function(options) {
            var _class = 'show ' + options.type;
            var _inner = '';
            if (options.type === 'erro') {
                _inner = "<i class='fa fa-exclamation-triangle'></i> " + options.message;
            } else {
                _inner = "<i class='fa fa-info-circle'></i> " + options.message;
            }
            var toast = angular.element(document.querySelector('#toast'));
            toast.html(_inner);
            toast.addClass(_class);
            setTimeout(function(){ toast.removeClass(_class); }, 3000);
        }
    }
});