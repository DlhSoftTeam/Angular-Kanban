declare var angular;

angular.module('DlhSoft.Kanban.Angular.Components', [])
    .directive('dsKanbanBoard', function () {
        return {
            restrict: 'EAC',
            replace: true,
            scope: {
                items: '=',
                groups: '=',
                iterations: '=',
                states: '=',
                itemTypes: '=',
                templateUrl: '@'
            },
            template: '<ng-include src="templateUrl ? templateUrl : \'ds-templates/kanban-board.html\'"></ng-include>',
        }
    });