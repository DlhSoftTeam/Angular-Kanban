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
                states: '='
            },
            controller: function () {
                if (!this.states)
                    this.states = DlhSoft.Controls.KanbanBoard.defaultStates;
                this.getItemsInGroupAndState = DlhSoft.Controls.KanbanBoard.getItemsInGroupAndState;
            },
            controllerAs: 'dskb',
            templateUrl: 'DlhSoft.Kanban.Angular.Components/kanban-board.html'
        }
    });
