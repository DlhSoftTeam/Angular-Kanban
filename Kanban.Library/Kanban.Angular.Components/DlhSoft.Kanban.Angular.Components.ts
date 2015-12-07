declare var angular;

angular.module('DlhSoft.Kanban.Angular.Components', [])
    .directive('dsKanbanBoard', function () {
        return {
            restrict: 'EAC',
            replace: true,
            transclude: true,
            scope: {
                items: '=',
                groups: '=',
                states: '='
            },
            controller: function ($scope) {
                var items = this.items = $scope.items;
                this.groups = $scope.groups;
                this.states = $scope.states ? $scope.states : [
                    { content: 'New' },
                    { content: 'Active' },
                    { content: 'Resolved' },
                    { content: 'Closed' }
                ];
                this.getItemsInGroupAndState = function (group, state) {
                    var itemsInGroupAndState = [];
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.group == group && item.state == state)
                            itemsInGroupAndState.push(item);
                    }
                    return itemsInGroupAndState;
                }
            },
            controllerAs: 'dskb',
            templateUrl: 'ds-components/kanban-board.html'
        }
    });