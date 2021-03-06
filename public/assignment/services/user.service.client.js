(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "login": login,
            "logout": logout,
            "loggedin": loggedin,
            "register": register
        };
        return api;

        function login(user) {
            return $http.post("/api/login", user);
        }

        function loggedin(user) {
            return $http.get("/api/loggedin", user);
        }
        function logout(user) {
            return $http.post("/api/logout");
        }
        function register(user) {
            return $http.post("/api/register", user);
        }
        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function createUser(user) {
           return $http.post("/api/user", user);
        }
        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

    }
})();