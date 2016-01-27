module DlhSoft.Controls {
    export module KanbanBoard {
        export var defaultGroup = {};
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
                if (item.group == group && item.state == state) {
                    itemsInGroupAndState.push(item);
                }
            }
            if (typeof group.isCollapsed === 'undefined')
                group.isCollapsed = group.state ? group.state.isCollapsedByDefaultForGroups : false;
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
                groups: '=?',
                states: '=?',
                groupStates: '=?',
                itemHeight: '=?',
                groupHeight: '=?',
                itemTemplateUrl: '=?'
            },
            controller: function ($scope) {
                if (!this.groups) {
                    for (var i = 0; i < this.items.length; i++)
                        this.items[i].group = DlhSoft.Controls.KanbanBoard.defaultGroup;
                    this.groups = [DlhSoft.Controls.KanbanBoard.defaultGroup];
                    this.hideGroups = true;
                }
                if (!this.states)
                    this.states = DlhSoft.Controls.KanbanBoard.defaultStates;
                if (!this.groupStates)
                    this.groupStates = this.states;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (!item.group || this.groups.indexOf(item.group) < 0)
                        item.group = this.groups[0];
                    if (!item.state || this.states.indexOf(item.state) < 0)
                        item.state = this.states[0];
                }
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
                    this.itemHeight = 52;
                if (!this.groupHeight)
                    this.groupHeight = 76;
                if (!this.collapsedGroupHeight)
                    this.collapsedGroupHeight = 30;
                if (!this.itemTemplateUrl)
                    this.itemTemplateUrl = 'DlhSoft.Kanban.Angular.Components/kanban-item.html';
                if (!this.groupTemplateUrl)
                    this.groupTemplateUrl = 'DlhSoft.Kanban.Angular.Components/kanban-group.html';
                this.onItemDrop = function (data, group, state, targetItemIndex) {
                    var itemIndex = parseInt(data);
                    var item = this.items[itemIndex];
                    item.group = group;
                    item.state = state;
                    if (typeof targetItemIndex !== 'undefined') {
                        this.items.splice(itemIndex, 1);
                        this.items.splice(targetItemIndex, 0, item);
                    }
                    $scope.$apply();
                };
            },
            controllerAs: 'dskb',
            templateUrl: 'DlhSoft.Kanban.Angular.Components/kanban-board.html'
        }
    })
    .directive('dsKanbanDraggableItem', function () {
        return {
            restrict: 'A',
            scope: {
                dragData: '@'
            },
            link: function (scope, element, attrs) {
                element = element[0];
                element.draggable = true;
                element.addEventListener('dragstart', function (e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', scope.dragData);
                    e.stopPropagation();
                    element.originalOpacity = element.style.opacity;
                    element.style.opacity = 0.35;
                });
                element.addEventListener('dragend', function (e) {
                    element.style.opacity = element.originalOpacity;
                    delete element.originalOpacity;
                });
            }
        };
    })
    .directive('dsKanbanDropZone', function () {
        return {
            restrict: 'A',
            scope: {
                dropHandler: '&'
            },
            link: function (scope, element, attrs) {
                element = element[0];
                element.addEventListener('dragover', onDragOver);
                element.addEventListener('drop', onDrop);
                scope.$on('$destroy', function () {
                    element.removeEventListener('drop', onDrop);
                    element.removeEventListener('dragover', onDragOver);
                });
                function onDragOver(event) {
                    if (Array.prototype.slice.call(event.dataTransfer.types).indexOf('text/plain') < 0)
                        return true;
                    event.dataTransfer.dropEffect = 'move';
                    event.preventDefault();
                }
                function onDrop(event) {
                    var data = event.dataTransfer.getData('text/plain');
                    scope.dropHandler({ data: data });
                    event.preventDefault();
                }
            }
        };
    });
