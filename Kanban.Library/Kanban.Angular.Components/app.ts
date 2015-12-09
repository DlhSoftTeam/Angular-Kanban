/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>

var state1 = { content: 'New' }, state2 = { content: 'In progress' }, state3 = { content: 'Done' };
var states = [state1, state2, state3];
var group1 = { content: 'Story 1' }, group2 = { content: 'Story 2' };
var groups = [group1, group2];
var items = [
    { content: 'Task 1', group: group1, state: state1 },
    { content: 'Task 2', group: group1, state: state2 },
    { content: 'Task 3', group: group1, state: state1 },
    { content: 'Task 4', group: group2, state: state1 },
    { content: 'Task 5', group: group2, state: state2 },
    { content: 'Task 6', group: group2, state: state2 },
    { content: 'Task 7', group: group2, state: state3 }
];

declare var angular;
angular.module("KanbanBoardSample", ["DlhSoft.Kanban.Angular.Components"])
    .controller("MainController", ["$scope", function ($scope) {
        $scope.states = states;
        $scope.groups = groups;
        $scope.items = items;
    }]);
