/*! anna-squares - v0.1.1 - 29-12-2013 */
"use strict";var annaSquaresApp=angular.module("annaSquaresApp",["ngRoute","ngResource","ngRoute","ui.route","asc.ui","placeholders.img","ui.sortable"]);annaSquaresApp.config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"../../views_build/homepage/index.html",controller:"homepageController"}).when("/schedules",{templateUrl:"../../views_build/schedules/index.html",controller:"schedulesController"}).when("/signin",{templateUrl:"../../views_build/user/signin.html",controller:"signinController"}).when("/signout",{templateUrl:"../../views_build/user/signout.html",controller:"signoutController"}).when("/tasks",{templateUrl:"../../views_build/tasks/index.html",controller:"tasksController"}).otherwise({redirectTo:"/"})}]),annaSquaresApp.config(["$locationProvider",function($locationProvider){$locationProvider.hashPrefix("!")}]);