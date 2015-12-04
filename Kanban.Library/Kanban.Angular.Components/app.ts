declare var angular;

/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>

angular.module("KanbanBoardSample", ["DlhSoft.Kanban.Angular.Components"])
    .controller("MainController", ["$scope", function ($scope) {
        var items = [
            { content: 'Task 1', itemType: 'Task', group: 'Story 1', iteration: 'Iteration 1', state: 'Closed' },
            { content: 'Task 2', itemType: 'Task', group: 'Story 1', iteration: 'Iteration 1', state: 'Resolved' },
            { content: 'Task 3', itemType: 'Task', group: 'Story 1', iteration: 'Iteration 2', state: 'Active' },
            { content: 'Bug 1', itemType: 'Bug', group: 'Story 1', iteration: 'Iteration 1', state: 'New' },
            { content: 'Task 4', itemType: 'Task', group: 'Story 2', iteration: 'Iteration 2', state: 'New' },
            { content: 'Task 5', itemType: 'Task', group: 'Story 2', iteration: 'Iteration 2', state: 'New' }
        ];
        $scope.items = items;
    }]);

window.onload = () => {
};