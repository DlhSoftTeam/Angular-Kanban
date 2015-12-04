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
                itemTypes: '='
            },
            link: function (scope, element, attrs) {
                scope.getTemplateUrl = function () {
                    return attrs.templateUrl ? attrs.templateUrl : 'dlhsoft-kanban-board.html';
                }
            },
            template: '<ng-include src="getTemplateUrl()"></ng-include>',
        }
    });