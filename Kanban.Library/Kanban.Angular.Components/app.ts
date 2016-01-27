/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>

var state1 = { name: 'New', isNewItemButtonShown: true }, state2 = { name: 'In progress' }, state3 = { name: 'Done', isCollapsedByDefaultForGroups: true };
var states = [state1, state2, state3];
var group1 = { name: 'Story 1', state: state2, assignment: 'Resource 1' }, group2 = { name: 'Story 2', state: state3, assignment: 'Resource 2' };
var groups = [group1, group2];
var items = [
    { name: 'Task 1', group: group1, state: state1, assignment: 'Resource 1' },
    { name: 'Task 2', group: group1, state: state2, assignment: 'Resource 1' },
    { name: 'Task 3', group: group1, state: state1, assignment: 'Resource 2' },
    { name: 'Task 4', group: group1, state: state1, assignment: 'Resource 1' },
    { name: 'Task 5', group: group2, state: state1, assignment: 'Resource 2' },
    { name: 'Task 6', group: group2, state: state2 },
    { name: 'Task 7', group: group2, state: state2 },
    { name: 'Task 8', group: group2, state: state3 }
];

declare var angular;
angular.module('KanbanBoardSample', ['DlhSoft.Kanban.Angular.Components'])
    .controller('MainController', ['$scope', function ($scope) {
        $scope.states = states;
        $scope.groups = groups;
        $scope.items = items;
    }]);
