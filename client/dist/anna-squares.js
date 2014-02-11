/*! anna-squares - v0.1.7 - 2014-02-10
 * Copyright (c) 2014 Adam Joseph Cook <acook@alliedstrand.com>;
 * Licensed under MIT
 */
/*global
  angular:false
*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares', ['ngCookies', 'ui.router', 'asc.ui', 'placeholders.img', 'ui.sortable']);

angular.module('anna-squares')
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/');

      $stateProvider

        .state('home', {
          url: '/',
          templateUrl: 'home',
          controller: 'HomeCtrl'
        })

        .state('signin', {
          url: '/signin',
          templateUrl: 'signin',
          controller: 'SigninCtrl'
        })

        .state('register', {
          url: '/register',
          templateUrl: 'register',
          controller: 'RegisterCtrl'
        })

        .state('404', {
          url: '/404',
          templateUrl: '404'
        })

        .state('dashboard', {
          url: '/:username',
          templateUrl: 'dashboard',
          controller: 'DashboardCtrl'
        })

        .state('schedules', {
          abstract: true,
          url: '/:username/schedules',
          templateUrl: 'schedules/index',
          controller: 'ScheduleListCtrl'
        })

        .state('schedules.list', {
          url: '',
          templateUrl: 'schedules/list'
        })

        .state('schedules.new', {
          url: '/new',
          views: {
            '': {
              templateUrl: 'schedules/form',
              controller: 'ScheduleCreateCtrl'
            }
          }
        })

        .state('schedules.detail', {
          url: '/{scheduleid:[0-9]{1,8}}',
          views: {
            '': {
              templateUrl: 'schedules/detail',
              controller: 'ScheduleDetailCtrl'
            }
          }
        })

        .state('schedules.update', {
          url: '/{scheduleid:[0-9]{1,8}}/edit',
          views: {
            '': {
              templateUrl: 'schedules/form',
              controller: 'ScheduleUpdateCtrl'
            }
          }
        })

        .state('feedback', {
          url: '/:username/feedback',
          templateUrl: 'feedback',
          controller: 'FeedbackCtrl'
        });
    }
  ]);

angular.module('anna-squares')
  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,  $state,  $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }]);
/*
.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {

  var access = routingConfig.accessLevels;

  $routeProvider.when('/',
    {
      templateUrl:    'home',
      controller:     'HomeCtrl',
      access:         access.public
    });
  $routeProvider.when('/404',
    {
      templateUrl:    '404',
      access:         access.public
    });
  $routeProvider.when('/500',
    {
      templateUrl:    '500',
      access:         access.public
    });
  $routeProvider.when('/signin',
    {
      templateUrl:    'signin',
      controller:     'SigninCtrl',
      access:         access.anon
    });
  $routeProvider.when('/register',
    {
      templateUrl:    'register',
      controller:     'RegisterCtrl',
      access:         access.anon
    });
  $routeProvider.when('/:username',
    {
      templateUrl:    'dashboard',
      controller:     'DashboardCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/schedules',
    {
      templateUrl:    'schedules/list',
      controller:     'SchedulesListCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/schedules/new',
    {
      templateUrl:    'schedules/form',
      controller:     'SchedulesNewCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/schedules/:scheduleid',
    {
      templateUrl:    'schedules/detail',
      controller:     'SchedulesDetailCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/schedules/:scheduleid/edit',
    {
      templateUrl:    'schedules/form',
      controller:     'SchedulesEditCtrl',
      access:         access.user
    });
  $routeProvider.when('/:username/feedback',
    {
      templateUrl:    'feedback',
      controller:     'FeedbackCtrl',
      access:         access.user
    });
  $routeProvider.otherwise({redirectTo: '/404'});

  $locationProvider.html5Mode(true);

  $httpProvider.interceptors.push(function($q, $location) {
    return {
      'responseError': function(response) {
        if(response.status === 401 || response.status === 403) {
          $location.path('/signin');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  });

}])

.run(['$rootScope', '$routeParams', '$location', '$http', 'Auth',
      function ($rootScope, $routeParams, $location, $http, Auth) {

  $rootScope.$on('$routeChangeStart', function (event, next, current) {

    $rootScope.success = null;
    $rootScope.info = null;
    $rootScope.warning = null;
    $rootScope.danger = null;

    if (!Auth.authorize(next.access)) {
      if(Auth.isSignedIn()) $location.path('/' + Auth.user.username);
      else                  $location.path('/signin');
    }

  });

}]);*/

/*global angular:false*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares')
  .controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.signout = function() {
      Auth.signout(function() {
        $location.path('/signin');
      }, function() {
        $rootScope.danger = 'Failed to sign out.';
      });
    };
  }]);

angular.module('anna-squares')
  .controller('SigninCtrl',
    ['$rootScope', '$scope', '$location', '$window', 'Auth',
      function($rootScope, $scope, $location, $window, Auth) {

      $scope.signin = function() {
        Auth.signin({
          username: $scope.username,
          password: $scope.password
        },
        function(res) {
          $location.path('/' + Auth.user.username);
        },
        function(err) {
          $rootScope.danger = 'Failed to sign in.';
        });
      };

      $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };
    }]);

angular.module('anna-squares')
  .controller('HomeCtrl',
    ['$rootScope', function($rootScope) {

    }]);

angular.module('anna-squares')
  .controller('RegisterCtrl',
    ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

      $scope.register = function() {
        Auth.register({
          username: $scope.username,
          email: $scope.email,
          password: $scope.password,
          passwordConfirmation: $scope.passwordConfirmation
        },
        function(message) {
          $location.path('/signin');
          $rootScope.success = message;
        },
        function(err) {
          $rootScope.danger = err;
        });
      };
    }]);

angular.module('anna-squares')
  .controller('DashboardCtrl',
    ['$rootScope', '$scope', '$location', 'Auth',
      function($rootScope, $scope, $location, Auth) {

      }]);

angular.module('anna-squares')
  .controller('ScheduleToolbarCtrl',
    ['$rootScope', '$scope', '$state', 'Auth',
      function($rootScope, $scope, $state, Auth) {

        $scope.newSchedule = function() {
          $state.transitionTo('schedules.new', {username: Auth.user.username});
        };

      }]);

angular.module('anna-squares')
  .controller('ScheduleListCtrl',
    ['$rootScope', '$scope', 'Auth', 'Schedule',
      function($rootScope, $scope, Auth, Schedule) {

        Schedule.getAll(
          function(scheduleMap) {
            $scope.scheduleMap = scheduleMap;
          },
          function(err) {
            $rootScope.danger = err;
          });

      }]);

angular.module('anna-squares')
  .controller('ScheduleDetailCtrl',
    ['$rootScope', '$scope', 'Auth',
      function($rootScope, $scope, Auth) {

        console.log('Detail Schedules!');

      }]);

angular.module('anna-squares')
  .controller('ScheduleCreateCtrl',
    ['$rootScope', '$scope', 'Auth',
      function($rootScope, $scope, Auth) {

        console.log('Create Schedules!');

      }]);

angular.module('anna-squares')
  .controller('ScheduleUpdateCtrl',
    ['$rootScope', '$scope', 'Auth',
      function($rootScope, $scope, Auth) {

        console.log('Update Schedules!');

      }]);

/*angular.module('anna-squares')
  .controller('SchedulesCtrl',
    ['$rootScope', '$scope', '$routeParams', '$location', 'Auth', '$timeout',
      function($rootScope, $scope, $routeParams, $location, Auth, $timeout) {

        var scheduleItems = $scope.scheduleItems = [];

        var d = moment();
        $scope.scheduleDate = d._d;
        $scope.startTime = d._d;

        $scope.toggleWeeks = function () {
          $scope.showWeeks = ! $scope.showWeeks;
        };

        $scope.openCalendar = function () {
          $timeout(function() {
            $scope.calendarOpened = true;
          });
        };

        $scope.datePickerOptions = {
          'year-format': "'yy'",
          'starting-day': 0
        };

        $scope.openTime = function () {
          $timeout(function() {
            $scope.timeOpened = true;
          });
        };

        $scope.timePickerOptions = {};

        $scope.sortableOptions = {
          stop: function(e, ui) {
            computeTimes();
          }
        };

        $scope.alerts = [];

        $scope.columnDefintions = [
          {
            name: 'isMust',
            displayName: 'Must',
            type: 'checkbox',
            isDisabled: false,
            doOnChange: '',
            classExpression: '',
            minNumber: '',
            maxNumber: ''
          },
          {
            name: 'hasDocs',
            displayName: 'Docs',
            type: 'checkbox',
            isDisabled: false,
            doOnChange: '',
            classExpression: '',
            minNumber: '',
            maxNumber: ''
          },
          // {
          //   name: 'hasPNDoc',
          //   displayName: 'PN',
          //   type: 'checkbox',
          //   isDisabled: false,
          //   minNumber: '',
          //   maxNumber: ''
          // },
          // {
          //   name: 'hasPCDoc',
          //   displayName: 'PC',
          //   type: 'checkbox',
          //   isDisabled: false,
          //   minNumber: '',
          //   maxNumber: ''
          // },
          // {
          //   name: 'hasDCDoc',
          //   displayName: 'DC',
          //   type: 'checkbox',
          //   isDisabled: false,
          //   minNumber: '',
          //   maxNumber: ''
          // },
          // {
          //   name: 'hasEVDoc',
          //   displayName: 'EV',
          //   type: 'checkbox',
          //   isDisabled: false,
          //   minNumber: '',
          //   maxNumber: ''
          // },
          {
            name: 'patient',
            displayName: 'Patient',
            type: 'text',
            isDisabled: false,
            doOnChange: '',
            classExpression: '',
            minNumber: '',
            maxNumber: ''
          },
          {
            name: 'plan',
            displayName: 'Plan',
            type: 'number',
            isDisabled: false,
            doOnChange: 'changePlan(rowDatum)',
            classExpression: "{'strong': rowDatum.data.isMust === true }",
            minNumber: '0',
            maxNumber: ''
          },
          {
            name: 'met',
            displayName: 'Met',
            type: 'number',
            isDisabled: false,
            doOnChange: 'changeMet(rowDatum)',
            classExpression: '',
            minNumber: '0',
            maxNumber: ''
          },
          {
            name: 'variance',
            displayName: 'Variance',
            type: 'number',
            isDisabled: true,
            doOnChange: '',
            classExpression: '',
            minNumber: '',
            maxNumber: ''
          },
          {
            name: 'startTime',
            displayName: 'Start Time',
            type: 'text',
            isDisabled: true,
            doOnChange: '',
            classExpression: '',
            minNumber: '',
            maxNumber: ''
          },
          {
            name: 'endTime',
            displayName: 'End Time',
            type: 'text',
            isDisabled: true,
            doOnChange: '',
            classExpression: '',
            minNumber: '',
            maxNumber: ''
          }
        ];

        $scope.rowData = [
          {
            id: 1,
            data: {
              plan: 0,
              met: 0,
              variance: 0
            }
          }
        ];

        $scope.addRow = function () {
          var i;
          var maxRowId;
          var nextRowId;
          maxRowId = $scope.rowData[0].id;
          for (i=0; i < $scope.rowData.length; i++) {
            if ($scope.rowData[i].id > maxRowId) {
              maxRowId = $scope.rowData[i].id;
            }
          }
          nextRowId = maxRowId + 1;
          $scope.rowData.push({id: nextRowId, data: {plan: 0, met: 0, variance: 0}});
          computeTimes();
        };

        $scope.removeRow = function (rowDatum) {
          var targetIndex;
          if ($scope.rowData.length === 1) {
            $scope.alerts.length = 0;
            $scope.alerts.push({type: 'danger', msg: 'This row cannot be removed because it is the last one.'});
            return;
          }
          targetIndex = $scope.rowData.indexOf(rowDatum);
          if (targetIndex > -1) {
            $scope.rowData.splice(targetIndex, 1);
          }
          computeTimes();
        };

        $scope.closeAlert = function (index) {
          $scope.alerts.splice(index, 1);
        };

        $scope.markRowMust = function (rowId) {
          console.log(rowId);
        };

        $scope.changeStartTime = function () {
          computeTimes();
        };

        $scope.changePlan = function (rowDatum) {
          rowDatum.data.met = rowDatum.data.plan;
          $scope.changeMet(rowDatum);
          computeTimes();
        };

        // $scope.changeVariance = function (rowDatum) {
        //   rowDatum.data.met = rowDatum.data.plan + rowDatum.data.variance;
        //   computeTimes();
        // };

        $scope.changeMet = function (rowDatum) {
          rowDatum.data.variance = rowDatum.data.met - rowDatum.data.plan;
          computeTimes();
        };

        var computeTimes = function() {
          var startTime = moment($scope.startTime);
          var endTime;
          var i;
          for (i=0; i < $scope.rowData.length; i++) {
            endTime = startTime.clone().add('minutes', $scope.rowData[i].data.met);
            $scope.rowData[i].data.startTime = startTime.format('LT');
            startTime = endTime.clone();
            $scope.rowData[i].data.endTime = endTime.format('LT');
          }
        };

        $scope.printScheduleItems = function () {

          console.log('printScheduleItems');

        };

        $scope.emailScheduleItems = function () {

          console.log('emailScheduleItems');

        };

        $scope.sendScheduleItems = function () {

          console.log('sendScheduleItems');

        };

        $scope.clearAllScheduleItems = function () {

          $scope.rowIds = [1];
          $scope.cellData = {};

        };

        // Controller initialization
        computeTimes();


      }]);*/

angular.module('anna-squares')
  .controller('FeedbackCtrl',
    ['$rootScope', '$scope', '$location', 'Auth',
      function($rootScope, $scope, $location, Auth) {

      }]);
/*global angular:false*/
/*jshint unused: vars */
'use strict';

angular.module('anna-squares')
  .directive('accessLevel', ['Auth', function(Auth) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var prevDisp = element.css('display')
            , userRole
            , accessLevel;

        $scope.user = Auth.user;
        $scope.$watch('user', function(user) {
          if(user.role)
            userRole = user.role;
          updateCSS();
        }, true);

        attrs.$observe('accessLevel', function(al) {
          if(al) accessLevel = $scope.$eval(al);
          updateCSS();
        });

        function updateCSS() {
          if(userRole && accessLevel) {
            if(!Auth.authorize(accessLevel, userRole))
              element.css('display', 'none');
            else
              element.css('display', prevDisp);
          }
        }
      }
    };
  }]);

// TODO: The 'matchField' directive needs tests!
angular.module('anna-squares').directive('matchField', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var otherInput = elem.inheritedData('$formController')[attrs.matchField];

      ctrl.$parsers.push(function(value) {
        if(value === otherInput.$viewValue) {
          ctrl.$setValidity('match', true);
          return value;
        }
        ctrl.$setValidity('match', false);
      });

      otherInput.$parsers.push(function(value) {
        ctrl.$setValidity('match', value === ctrl.$viewValue);
        return value;
      });
    }
  };
});


/*global
  angular:false,
  routingConfig:false,
  _:false
*/
'use strict';

angular.module('anna-squares')
  .factory('Auth', function($http, $cookieStore){

    var accessLevels  = routingConfig.accessLevels
        , userRoles   = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
      _.extend(currentUser, user);
    }

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined) {
          role = currentUser.role;
        }

        return accessLevel.bitMask & role.bitMask;
      },
      isSignedIn: function(user) {
        if(user === undefined)
          user = currentUser;
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      checkUsername: function(username) {
        if (username === currentUser.username) return true;
      },
      register: function(user, success, error) {
        $http
          .post('/users', user)
          .success(function(res) {
            success(res);
          })
          .error(error);
      },
      signin: function(user, success, error) {
        $http
          .post('/signin', user)
          .success(function(user){
            changeUser(user);
            success(user);
          })
          .error(error);
      },
      signout: function(success, error) {
        $http
          .post('/signout')
          .success(function(){
            changeUser({
              username: '',
              role: userRoles.public
            });
            success();
          })
          .error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  });

angular.module('anna-squares')
  .factory('requestCommunicationChannel', ['$rootScope', function ($rootScope) {

    var _EDIT_DATA_ = '_EDIT_DATA_';
    var _DATA_UPDATED_ = '_DATA_UPDATED_';

    // Publish edit data notification
    var editData = function (item) {
      $rootScope.$broadcast(_EDIT_DATA_, {item: item});
    };

    // Subscribe to edit data notification
    var onEditData = function($scope, handler) {
      $scope.$on(_EDIT_DATA_, function(event, args) {
        handler(args.item);
      });
    };

    // Publish data changed notification
    var dataUpdated = function () {
      $rootScope.$broadcast(_DATA_UPDATED_);
    };

    // Subscribe to data changed notification
    var onDataUpdated = function ($scope, handler) {
      $scope.$on(_DATA_UPDATED_, function (event) {
        handler();
      });
    };

    return {
      editData      : editData,
      onEditData    : onEditData,
      dataUpdated   : dataUpdated,
      onDataUpdated : onDataUpdated
    };
  }]);

// Define the data service for application toolbars
angular.module('anna-squares')
  .factory('toolbarService', ['requestCommunicationChannel', function (requestCommunicationChannel) {
    var items = [
      {'_id': { '$oid': '50ae677361d118e3646d7d6c'},
        'name': 'New Schedule...',
        'icon': 'fa fa-plus',
        'action': '#',
        'show': true
      },
      {'_id': { '$oid': '50ae677361d118e3646d7d6d'},
        'name': 'Edit Schedule',
        'icon': 'fa fa-edit',
        'action': '#',
        'show': true
      }
    ];

    // Sends notification that data has been updated
    var saveItem = function(item) {
      requestCommunicationChannel.dataUpdated();
    };

    // Removes the item from the array and sends a notification that data has been updated
    var deleteItem = function(item) {
      for(var i = 0; i < items.length; i++) {
        if(items[i]._id.$oid === item._id.$oid) {
          items.splice(i, 1);
          requestCommunicationChannel.dataUpdated();
          return;
        }
      }
    };

    // Removes the all items from the array and sends a notification that data has been updated
    var deleteItems = function() {
      items.length = 0;
      requestCommunicationChannel.dataUpdated();
      return;
    };

    // Internal function to generate a random number GUID generation
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };

    // Generates a GUID for adding items to array
    var guid = function () {
      return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0,3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
    };

    // Function to add a item to the array and sends a notification that data has been updated
    var addItem = function(item) {
      items.id.$oid = guid();
      items.push(item);
      requestCommunicationChannel.dataUpdated();
    };

    // Returns the array of items
    var getItems = function() {
      return items;
    };

    // Returns a specific item with the given ID
    var getItem = function(id) {
      for(var i = 0; i < items.length; i++) {
        if(items[i]._id.$oid === id) {
          return items[i];
        }
      }
    };

    return {
      getItems    : getItems,
      getItem     : getItem,
      saveItem    : saveItem,
      deleteItems : deleteItems,
      deleteItem  : deleteItem,
      addItem     : addItem
    };
  }]);


angular.module('anna-squares')
    .factory('Schedule', function($http){

      return {
        getAll: function(success, error) {
          $http
              .get('/schedules')
              .success(success)
              .error(error);
        },
        postNew: function(schedule, success, error) {
          $http
              .post('/schedule/new', schedule)
              .success(function(schedule){
                success(schedule);
              })
              .error(error);
        }
      };
    });