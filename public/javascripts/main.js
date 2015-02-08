
angular.module('bobjones', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 
    'ui.bootstrap',
    'ngAria',
    'ngMaterial'
  ])
  
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })

  .factory('EntryService', [function()
  {
    var o = {
      boards:[{
        name: 'First Board',
        description: 'sampling desc board',
        date:'',
        entries : [{
          title:'test', 
          description:'new desc', 
          upvotes:0, 
          date: '',
          comments:[{
            name:'bob',
            description:'test comment',
            upvotes:0,
            date:''
          }]
        }]
      }]
    };
    return o;
  }])

  .controller('MainCtrl', ['$scope','EntryService', '$modal', function($scope, EntryService, $modal) 
  {
    console.log('made it')
    $scope.boards = EntryService.boards;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.addBoard = function()
    {
      var board = $scope.board;
      $scope.board = '';
      console.log('Board: ', board);

      var new_date = new Date();
      var date = new_date.toISOString();

      EntryService.boards.push({
        name: board.name,
        description: board.description,
        date: date,
        entries: []
      });

    };

    var getdate = function()
    {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 

      today = mm+'/'+dd+'/'+yyyy;
      return today
    }

    $scope.increment = function(entry)
    {
      entry.upvotes += 1;
    };

      $scope.items = ['item1', 'item2', 'item3'];

    //pop up a modal
    $scope.open = function (index) {

      var modalInstance = $modal.open({
        templateUrl: '/views/myModalContent.html',
        controller: 'EntryCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return index;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

  }])


/*
* Pop up controller
*/
.controller('EntryCtrl', function ($scope, $modalInstance, items, EntryService) {

  var index = items;

  /*
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
    console.log('select: ', $scope.selected.item)
  };
  */
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  

  $scope.addEntry = function(entry)
      {
        console.log('entry ', entry)

        /*console.log('ent: ', EntryService.entries);
        console.log('id ', id, ' entry: ', entry);
        */
        var new_date = new Date();
        var date = new_date.toISOString();

        EntryService.boards[index].entries.push({
          title: entry.name,
          description: entry.description,
          upvotes: 0,
          date: date,
          comments: []
        });
      
        $modalInstance.close();

      };
})
/*
  .controller('EntryCtrl', ['$scope','EntryService', function($scope, EntryService)
  {
    $scope.showNewEntry = function(x)
    {
      $scope.addingEntry = x;
    };

      $scope.addEntry = function(id)
      {
        var entry = $scope.entry;
        $scope.entry = '';
        console.log('ent: ', EntryService.entries);
        console.log('id ', id, ' entry: ', entry);

        EntryService.boards[id].entries.push({
          title: entry.name,
          description: entry.description,
          upvotes: 0,
          comments: []
        });
      };

  }])
*/
  .controller('CommentCtrl', ['$scope','EntryService', function($scope, EntryService)
  {
    $scope.addingComment = false
    $scope.showNewComment = function(x)
    {
      $scope.addingComment = x;
    };

      $scope.addComment = function(is , id)
      {
        console.log('is ',is)
        var comment = $scope.comment;
        $scope.comment = '';
        console.log('ent: ', EntryService.boards);
        console.log('id ', id, ' comment: ', comment);

        var new_date = new Date();
        var date = new_date.toISOString();
        
        EntryService.boards[is].entries[id].comments.push({
          name: comment.name,
          description: comment.description,
          upvotes: 0,
          date:date
        });
        
      };

  }])

 ;

