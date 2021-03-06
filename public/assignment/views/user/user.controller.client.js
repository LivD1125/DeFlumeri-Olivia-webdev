(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        //event handlers
        vm.login = login;

        function login(user) {
            if (!user || !user.username || !user.password) {
                vm.error = "Username and Password Required";
                return;
            }
            UserService
                .login(user)
                .success(
                    function(response) {
                        $rootScope.currentUser = user;
                        $location.url("/user/");
                    })
                .error(
                    function(response) {
                        vm.error = "Username or Password Incorrect";
                    }
                );

        }
    }
    function ProfileController($routeParams, $location, $rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        vm.userId = $rootScope.currentUser._id;

        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function(user){
                vm.user = user;
            });
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                        vm.message = "Logout Successful";
                    });
        }

            function updateUser(newUser) {
                UserService
                    .updateUser(vm.userId, newUser)
                    .success(function(user) {
                        if(user) {
                            vm.message = "User Successfully Updated";
                        } else {
                            vm.error = "error updating user";
                        }
                });
            }
        function deleteUser() {
            UserService
                .deleteUser(vm.userId)
                .success(function(user) {
                    if (user) {
                        vm.message = "User Successfully Deleted";
                    } else {
                        vm.error = "Unable to Delete User";
                    }
            });
        }
    }
    function RegisterController($location, $rootScope, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function register(user, validatepassword) {
            if (!user ||
                !user.username ||
                !user.password ||
                !validatepassword ||
                user.password !== validatepassword) {
                vm.error = "Username, Password required. Validation must match";
                return;
            }
            UserService
                .register(user)
                .then(
                    function (response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/");
                    });
        }

    }
})();