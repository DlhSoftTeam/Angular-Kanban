module DlhSoft.Controls {
    export module KanbanBoard {
        export var defaultGroup = {};
        export var defaultStates = [
            { name: 'New' },
            { name: 'Active', isNewItemButtonHidden: true },
            { name: 'Resolved', isNewItemButtonHidden: true },
            { name: 'Closed', isNewItemButtonHidden: true }];
        export var defaultTypes = {
            task: { color: '#ffd800', backgroundColor: 'white' },
            bug: { color: '#ca3838', backgroundColor: '#fff0f0' },
            story: { color: '#0094ff', backgroundColor: 'white' },
            feature: { color: '#67157b', backgroundColor: 'white' },
            epic: { color: '#ff6a00', backgroundColor: 'white' }
        };
        export var defaultItemType = defaultTypes.task;
        export var defaultGroupType = defaultTypes.story;
        export function getItemsInGroupAndState(group, state) {
            var itemsInGroupAndState = [];
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (item.group === group && item.state === state) {
                    itemsInGroupAndState.push(item);
                }
            }
            if (typeof group.isCollapsed === 'undefined')
                group.isCollapsed = group.state ? group.state.isCollapsedByDefaultForGroups : false;
            return itemsInGroupAndState;
        };
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
                assignableResources: '=?',
                types: '=?',
                defaultItemType: '=?',
                defaultGroupType: '=?',
                groupStates: '=?',
                groupWidth: '=?',
                stateWidth: '=?',
                itemHeight: '=?',
                groupHeight: '=?',
                itemTemplateUrl: '=?',
                groupTemplateUrl: '=?',
                stateTemplateUrl: '=?',
                newItemButtonTemplateUrl: '=?',
                editItemButtonTemplateUrl: '=?',
                stateLabel: '=?',
                newItemButtonText: '=?',
                newItemButtonToolTip: '=?',
                editItemButtonText: '=?',
                editItemButtonToolTip: '=?',
                editGroupButtonText: '=?',
                editGroupButtonToolTip: '=?',
                newItemName: '=?',
                newItemResource: '=?',
                onAddingNewItem: '&?',
                onEditingItem: '&?',
                onEditingGroup: '&?'
            },
            controller: function($scope) {
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
                if (!this.types)
                    this.types = DlhSoft.Controls.KanbanBoard.defaultTypes;
                if (!this.defaultItemType)
                    this.defaultItemType = DlhSoft.Controls.KanbanBoard.defaultItemType;
                if (!this.defaultGroupType)
                    this.defaultGroupType = DlhSoft.Controls.KanbanBoard.defaultGroupType;
                this.getItemsInGroupAndState = DlhSoft.Controls.KanbanBoard.getItemsInGroupAndState;
                this.getMaxStateInGroup = function (group) {
                    var maxState = null, maxItemCount = 0;
                    for (var i = 0; i < this.states.length; i++) {
                        var state = this.states[i];
                        var itemCount = this.getItemsInGroupAndState(group, state).length;
                        if (itemCount > maxItemCount) {
                            maxState = state;
                            maxItemCount = itemCount;
                        }
                    }
                    return maxState;
                };
                if (!this.groupWidth)
                    this.groupWidth = '50%';
                if (!this.stateWidth)
                    this.stateWidth = '100%';
                if (!this.itemHeight)
                    this.itemHeight = 56;
                if (!this.groupHeight)
                    this.groupHeight = 86;
                if (!this.collapsedGroupHeight)
                    this.collapsedGroupHeight = 36;
                if (!this.itemTemplateUrl)
                    this.itemTemplateUrl = 'DlhSoft.Kanban.Angular.Components/kanban-item.html';
                if (!this.groupTemplateUrl)
                    this.groupTemplateUrl = 'DlhSoft.Kanban.Angular.Components/kanban-group.html';
                if (!this.stateTemplateUrl)
                    this.stateTemplateUrl = 'DlhSoft.Kanban.Angular.Components/kanban-state.html';
                if (!this.newItemButtonTemplateUrl)
                    this.newItemButtonTemplateUrl = 'DlhSoft.Kanban.Angular.Components/kanban-new-item-button.html';
                if (!this.editItemButtonTemplateUrl)
                    this.editItemButtonTemplateUrl = 'DlhSoft.Kanban.Angular.Components/kanban-edit-item-button.html';
                this.onItemDrop = function (itemType, index, group, state, targetIndex) {
                    if (itemType !== 'item')
                        return;
                    var item = this.items[index];
                    item.group = group;
                    item.state = state;
                    if (typeof targetIndex !== 'undefined') {
                        this.items.splice(index, 1);
                        this.items.splice(targetIndex, 0, item);
                    }
                };
                this.onGroupDrop = function (itemType, index, targetIndex) {
                    if (itemType !== 'group')
                        return;
                    var group = this.groups[index];
                    this.groups.splice(index, 1);
                    this.groups.splice(targetIndex, 0, group);
                };
                if (!this.stateLabel)
                    this.stateLabel = 'State';
                if (!this.editItemButtonText)
                    this.editItemButtonText = '…';
                if (!this.editGroupButtonText)
                    this.editGroupButtonText = this.editItemButtonText;
                if (!this.newItemButtonText)
                    this.newItemButtonText = '+';
                if (!this.newItemButtonToolTip)
                    this.newItemButtonToolTip = 'New item';
                if (!this.editItemButtonToolTip)
                    this.editItemButtonToolTip = 'Edit item';
                if (!this.editGroupButtonToolTip)
                    this.editGroupButtonToolTip = this.editItemButtonToolTip;
                if (!this.newItemName)
                    this.newItemName = 'New item';
                this.addNewItem = function (group, state) {
                    var item = { name: this.newItemName, group: group, state: state, assignedResource: this.newItemResource };
                    this.items.push(item);
                    if (this.onAddingNewItem != null)
                        this.onAddingNewItem({ item: item });
                };
            },
            controllerAs: 'dskb',
            templateUrl: 'DlhSoft.Kanban.Angular.Components/kanban-board.html'
        }
    })
    .directive('dsKanbanDraggableItem', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                dragItemType: '@?',
                dragIndex: '@',
                isDraggingParent: '@?'
            },
            link: function(scope, element) {
                var parentElement = scope.isDraggingParent ? element.parent()[0] : null;
                element = element[0];
                if (!parentElement)
                    parentElement = element;
                element.draggable = true;
                function onDragStart(event) {
                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text', (scope.dragItemType ? scope.dragItemType + ':' : '') + scope.dragIndex);
                    parentElement.originalOpacity = parentElement.style.opacity;
                    $timeout(() => { parentElement.style.opacity = (parentElement.originalOpacity ? parentElement.originalOpacity : 1) / 2; });
                }
                function onDragEnd() {
                    parentElement.style.opacity = parentElement.originalOpacity;
                    delete parentElement.originalOpacity;
                }
                element.addEventListener('dragstart', onDragStart);
                element.addEventListener('dragend', onDragEnd);
                scope.$on('$destroy', () => {
                    element.removeEventListener('dragstart', onDragStart);
                    element.removeEventListener('dragend', onDragEnd);
                });
            }
        };
    })
    .directive('dsKanbanItemDropZone', function() {
        return {
            restrict: 'EA',
            scope: {
                onDrop: '&'
            },
            link: function(scope, element) {
                element = element[0];
                function onDragOver(event) {
                    event.preventDefault();
                }
                function onDrop(event) {
                    var itemInfo = event.dataTransfer.getData('text');
                    var infoSeparatorIndex = itemInfo.indexOf(':');
                    var itemType = infoSeparatorIndex >= 0 ? itemInfo.substr(0, infoSeparatorIndex) : 'item';
                    var index = parseInt(infoSeparatorIndex >= 0 ? itemInfo.substr(infoSeparatorIndex + 1) : itemInfo);
                    scope.onDrop({ itemType: itemType, index: index });
                    scope.$apply();
                }
                element.addEventListener('dragover', onDragOver);
                element.addEventListener('drop', onDrop);
                scope.$on('$destroy', () => {
                    element.removeEventListener('drop', onDrop);
                    element.removeEventListener('dragover', onDragOver);
                });
            }
        };
    });
