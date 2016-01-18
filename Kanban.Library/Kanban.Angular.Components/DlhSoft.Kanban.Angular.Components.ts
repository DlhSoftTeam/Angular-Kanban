module DlhSoft.Controls {
    export module KanbanBoard {
        export var defaultStates = [
            { content: 'New' },
            { content: 'Active' },
            { content: 'Resolved' },
            { content: 'Closed' }
        ];
        export function getItemsInGroupAndState(group, state) {
            var itemsInGroupAndState = [];
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (item.group == group && item.state == state)
                    itemsInGroupAndState.push(item);
            }
            return itemsInGroupAndState;
        }
    }
}

declare var angular;
angular.module('DlhSoft.Kanban.Angular.Components', [])
    .directive('dsKanbanBoard', function () {
        return {
            restrict: 'EAC',
            replace: true,
            transclude: true,
            bindToController: {
                items: '=',
                groups: '=',
                states: '=',
                groupStates: '=',
                itemHeight: '=',
                groupHeight: '='
            },
            controller: function () {
                if (!this.states)
                    this.states = DlhSoft.Controls.KanbanBoard.defaultStates;
                if (!this.groupStates)
                    this.groupStates = this.states;
                this.getItemsInGroupAndState = DlhSoft.Controls.KanbanBoard.getItemsInGroupAndState;
                this.getMaxItemCountInGroup = function (group) {
                    var maxItemCount = 0;
                    for (var i = 0; i < this.states.length; i++) {
                        var state = this.states[i];
                        var itemCount = this.getItemsInGroupAndState(group, state).length;
                        if (itemCount > maxItemCount)
                            maxItemCount = itemCount;
                    }
                    return maxItemCount;
                };
                if (!this.itemHeight)
                    this.itemHeight = 32;
                if (!this.groupHeight)
                    this.groupHeight = this.itemHeight;
            },
            controllerAs: 'dskb',
            templateUrl: 'DlhSoft.Kanban.Angular.Components/kanban-board.html'
        }
    });
