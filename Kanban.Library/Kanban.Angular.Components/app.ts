/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>

var state1 = { name: 'New' }, state2 = { name: 'In progress', isNewItemButtonHidden: true }, state3 = { name: 'Done', isCollapsedByDefaultForGroups: true, isNewItemButtonHidden: true };
var states = [state1, state2, state3];
var resource1 = { name: 'Resource 1', imageUrl: 'Images/Resource1.png' }, resource2 = { name: 'Resource 2', imageUrl: 'Images/Resource2.png' };
var group1 = { name: 'Story 1', state: state2, assignedResource: resource1 }, group2 = { name: 'Story 2', state: state3, assignedResource: resource2 };
var groups = [group1, group2];
var items = [
    { name: 'Task 1', group: group1, state: state1, assignedResource: resource1 },
    { name: 'Task 2', group: group1, state: state2, assignedResource: resource1 },
    { name: 'Bug 1', group: group1, state: state2, assignedResource: resource1, type: DlhSoft.Controls.KanbanBoard.defaultTypes.bug },
    { name: 'Task 3', group: group1, state: state1, assignedResource: resource2 },
    { name: 'Task 4', group: group1, state: state1, assignedResource: resource1 },
    { name: 'Task 5', group: group2, state: state1, assignedResource: resource2 },
    { name: 'Task 6', group: group2, state: state2, assignedResource: resource2 },
    { name: 'Task 7', group: group2, state: state2, assignedResource: resource1 },
    { name: 'Task 8', group: group2, state: state3, assignedResource: resource2 }
];
var assignableResources = [resource1, resource2];

declare var angular;
angular.module('KanbanBoardSample', ['DlhSoft.Kanban.Angular.Components'])
    .controller('MainController', function ($scope) {
        $scope.states = states;
        $scope.groups = groups;
        $scope.items = items;
        $scope.assignableResources = assignableResources;
        $scope.initializeNewItem = (item) => { item.assignedResource = resource1; };
        $scope.deleteItem = (item) => { items.splice(items.indexOf(item), 1); };
        $scope.changeItemBackgroundColor = (item) => { item.backgroundColor = 'lightyellow'; };
    });
