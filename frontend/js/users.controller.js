angular.module('Recipes')
  .controller('UsersController', UsersController)

UsersController.$inject = ['$http', 'authService', '$state', "tokenService"]

function UsersController($http, authService, $state, token) {
  var self = this;
  self.authService = authService
  self.all = []
  self.getUser = getUser
  self.setUser = setUser
  self.updateUser = updateUser
  self.currentUser = {}
  self.deleteUser = deleteUser

  function getUser(user) {
    $http
    //calls api to get user info
      .get('/api/me')
    //once call is complete get user info
      .then(function(res) {
        self.currentUser = res.data.user
      })
  }
  getUser()

  function setUser(user) {
    self.currentUser = user
  }

  function updateUser(user) {
    $http
      .patch('/api/me', self.currentUser)
      .then(function(res) {
        getUser()
        console.log(res.data)
      })
      self.currentUser = {}
  }

  function deleteUser(user) {
    $http
      .delete('/api/me')
      .then(function(res) {
          getUser()
          //this destroy token doesn't work yet
          token.destroy();
          $state.go('root')
      })
  }

}
