module DlhSoft.Controls {
    export module KanbanBoard {
        export interface Item {
            name?: string;
            group?: Group;
            state?: State;
            itemType?: ItemType;
            assignedResource?: AssignableResource;
            color?: string;
            backgroundColor?: string;
            isReadOnly?: boolean;
            isEditItemButtonHidden?: boolean;
            templateUrl?: string;
        }
        export interface Group extends Item {
            isCollapsed?: boolean;
            areNewItemButtonsHidden?: boolean;
            areEditItemButtonsHidden?: boolean;
        }
        export interface State {
            name: string;
            isReadOnly?: boolean;
            areNewItemButtonsHidden?: boolean;
            areEditItemButtonsHidden?: boolean;
            isCollapsedByDefaultForGroups?: boolean;
            templateUrl?: string;
        }
        export interface ItemType {
            color: string;
            backgroundColor: string;
            templateUrl?: string;
        }
        export interface AssignableResource {
            name?: string;
            imageUrl?: string;
        }
        export class Types {
            item: string;
            group: string;
        }
        export var types: Types = {
            item: 'item',
            group: 'group'
        };
        export var defaultGroup: Group = {};
        export var defaultStates: State[] = [
            { name: 'New' },
            { name: 'Active', areNewItemButtonsHidden: true },
            { name: 'Resolved', areNewItemButtonsHidden: true },
            { name: 'Closed', areNewItemButtonsHidden: true }];
        export class DefaultItemTypes {
            task: ItemType;
            bug: ItemType;
            story: ItemType;
            feature: ItemType;
            epic: ItemType;
        }
        export var defaultItemTypes: DefaultItemTypes = {
            task: { color: '#ffd800', backgroundColor: 'white' },
            bug: { color: '#ca3838', backgroundColor: '#fff8f4' },
            story: { color: '#0094ff', backgroundColor: 'white' },
            feature: { color: '#67157b', backgroundColor: 'white' },
            epic: { color: '#ff6a00', backgroundColor: 'white' }
        };
        export var defaultItemType: ItemType = defaultItemTypes.task;
        export var defaultGroupType: ItemType = defaultItemTypes.story;
        export function getItemsInGroupAndState(group: Group, state: State): Item[] {
            var itemsInGroupAndState: Item[] = [];
            for (var i = 0; i < this.items.length; i++) {
                var item: Item = this.items[i];
                if (item.group === group && item.state === state) {
                    itemsInGroupAndState.push(item);
                }
            }
            return itemsInGroupAndState;
        };
        export function getItemsInGroup(group: Group): Item[] {
            var itemsInGroup: Item[] = [];
            for (var i = 0; i < this.items.length; i++) {
                var item: Item = this.items[i];
                if (item.group === group) {
                    itemsInGroup.push(item);
                }
            }
            return itemsInGroup;
        }
        export function getItemsInState(state: State): Item[] {
            var itemsInState: Item[] = [];
            for (var i = 0; i < this.items.length; i++) {
                var item: Item = this.items[i];
                if (item.state === state) {
                    itemsInState.push(item);
                }
            }
            return itemsInState;
        }

        declare var angular;
        angular.module('DlhSoft.Kanban.Angular.Components', [])
            .directive('dsKanbanBoard', () => {
                return {
                    restrict: 'EAC',
                    replace: true,
                    transclude: true,
                    bindToController: {
                        items: '=',
                        groups: '=?',
                        states: '=?',
                        assignableResources: '=?',
                        itemTypes: '=?',
                        itemType: '=?',
                        groupType: '=?',
                        itemNameField: '=?',
                        groupNameField: '=?',
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
                        isGroupItemsCountVisible: '=?',
                        itemsLabel: '=?',
                        noItemsLabel: '=?',
                        stateLabel: '=?',
                        isReadOnly: '=?',
                        areItemsReadOnly: '=?',
                        areGroupsReadOnly: '=?',
                        areNewItemButtonsHidden: '=?',
                        areEditItemButtonsHidden: '=?',
                        areEditGroupButtonsHidden: '=?',
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
                        onEditingGroup: '&?',
                        canMoveItem: '&?',
                        canMoveGroup: '&?',
                        onItemStateChanged: '&?',
                        onItemGroupChanged: '&?',
                        onItemIndexChanged: '&?',
                        onGroupIndexChanged: '&?'
                    },
                    controller: function ($scope) {
                        // Force early binding to controller.
                        for (var field in $scope) {
                            if (this[field] === undefined && $scope[field] !== undefined)
                                this[field] = $scope[field];
                        }
                        if (!this.groups) {
                            for (var i = 0; i < this.items.length; i++) {
                                var item: Item = this.items[i];
                                item.group = defaultGroup;
                            }
                            this.groups = [defaultGroup];
                            this.hideGroups = true;
                        }
                        if (!this.states) {
                            for (var i = 0; i < this.items.length; i++) {
                                var item: Item = this.items[i];
                                item.state = defaultStates[0];
                            }
                            this.states = defaultStates;
                        }
                        if (!this.groupStates)
                            this.groupStates = this.states;
                        for (var i = 0; i < this.items.length; i++) {
                            var item: Item = this.items[i];
                            if (!item.group || this.groups.indexOf(item.group) < 0)
                                item.group = this.groups[0];
                            if (!item.state || this.states.indexOf(item.state) < 0)
                                item.state = this.states[0];
                        }
                        for (var i = 0; i < this.groups.length; i++) {
                            var group: Group = this.groups[i];
                            if (!group.state || this.groupStates.indexOf(group.state) < 0)
                                group.state = this.states[0];
                            if (group.isCollapsed === undefined)
                                group.isCollapsed = group.state ? group.state.isCollapsedByDefaultForGroups : false;
                        }
                        if (!this.itemType)
                            this.itemType = types.item;
                        if (!this.groupType)
                            this.groupType = types.group;
                        if (!this.itemNameField)
                            this.itemNameField = 'name';
                        if (!this.groupNameField)
                            this.groupNameField = this.itemNameField;
                        if (!this.itemTypes)
                            this.itemTypes = defaultItemTypes;
                        if (!this.defaultItemType)
                            this.defaultItemType = defaultItemType;
                        if (!this.defaultGroupType)
                            this.defaultGroupType = defaultGroupType;
                        this.getItemsInGroupAndState = getItemsInGroupAndState;
                        this.getItemsInGroup = getItemsInGroup;
                        this.getItemsInState = getItemsInState;
                        this.getMaxStateInGroup = (group: Group): State => {
                            var maxState: State = null, maxItemCount = 0;
                            for (var i = 0; i < this.states.length; i++) {
                                var state: State = this.states[i];
                                var itemCount = this.getItemsInGroupAndState(group, state).length;
                                if (itemCount > maxItemCount) {
                                    maxState = state;
                                    maxItemCount = itemCount;
                                }
                            }
                            return maxState;
                        };
                        if (!this.groupWidth)
                            this.groupWidth = '15%';
                        if (!this.stateWidth)
                            this.stateWidth = ((!this.hideGroups ? 85 : 100) / this.states.length) + '%';
                        if (!this.itemHeight)
                            this.itemHeight = 56;
                        if (!this.groupHeight)
                            this.groupHeight = 86;
                        if (!this.collapsedGroupHeight)
                            this.collapsedGroupHeight = 36;
                        if (!this.itemTemplateUrl)
                            this.itemTemplateUrl = 'DlhSoft.Kanban.Angular.Components.Templates/kanban-item.html';
                        if (!this.groupTemplateUrl)
                            this.groupTemplateUrl = 'DlhSoft.Kanban.Angular.Components.Templates/kanban-group.html';
                        if (!this.stateTemplateUrl)
                            this.stateTemplateUrl = 'DlhSoft.Kanban.Angular.Components.Templates/kanban-state.html';
                        var setItemState = (item: Item, state: State) => {
                            var previousState: State = item.state;
                            item.state = state;
                            if (this.onItemStateChanged)
                                this.onItemStateChanged({ item: item, state: state, previousState: previousState });
                        };
                        var setItemGroup = (item: Item, group: Group) => {
                            var previousGroup: Group = item.group;
                            item.group = group;
                            if (this.onItemGroupChanged)
                                this.onItemGroupChanged({ item: item, group: group, previousGroup: previousGroup });
                        };
                        this.canDropItem = (type: string, index: number, group: Group, state: State, targetIndex: number): boolean => {
                            if (type !== types.item || targetIndex === index)
                                return false;
                            var item: Item = this.items[index];
                            if (this.canMoveItem)
                                return this.canMoveItem({ item: item, index: targetIndex, previousIndex: index, group: group, previouGroup: item.group, state: state, previousState: item.state });
                            return true;
                        };
                        this.onItemDrop = function (type: string, index: number, group: Group, state: State, targetIndex: number): void {
                            if (type !== types.item || targetIndex === index)
                                return;
                            var item: Item = this.items[index];
                            if (group != item.group)
                                setItemGroup(item, group);
                            if (state != item.state)
                                setItemState(item, state);
                            if (targetIndex !== undefined) {
                                this.items.splice(index, 1);
                                this.items.splice(targetIndex, 0, item);
                                if (this.onItemIndexChanged)
                                    this.onItemIndexChanged({ item: item, index: targetIndex, previousIndex: index });
                            }
                        };
                        this.canDropGroup = (type: string, index: number, targetIndex: number): boolean => {
                            if (type !== types.group || targetIndex === index)
                                return false;
                            var group: Group = this.groups[index];
                            if (this.canMoveGroup)
                                return this.canMoveGroup({ group: group, index: targetIndex, previousIndex: index });
                            return true;
                        };
                        this.onGroupDrop = (type: string, index: number, targetIndex: number): void => {
                            if (type !== types.group || targetIndex === index)
                                return;
                            var group: Group = this.groups[index];
                            this.groups.splice(index, 1);
                            this.groups.splice(targetIndex, 0, group);
                            if (this.onGroupIndexChanged)
                                this.onGroupIndexChanged({ group: group, index: targetIndex, previousIndex: index });
                        };
                        if (!this.itemsLabel)
                            this.itemsLabel = 'items';
                        if (!this.noItemsLabel)
                            this.noItemsLabel = 'No items';
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
                        this.addNewItem = (group: Group, state: State): void => {
                            var item: Item = { name: this.newItemName, group: group, state: state, assignedResource: this.newItemResource };
                            this.items.push(item);
                            if (this.onAddingNewItem != null)
                                this.onAddingNewItem({ item: item });
                        };
                    },
                    controllerAs: 'dskb',
                    templateUrl: 'DlhSoft.Kanban.Angular.Components.Templates/kanban-board.html'
                }
            })
            .directive('dsKanbanDraggableItem', ($timeout) => {
                return {
                    restrict: 'A',
                    scope: {
                        dragType: '=?',
                        dragIndex: '=',
                        isDraggingParent: '@?'
                    },
                    link: function (scope, element) {
                        var parentElement = scope.isDraggingParent ? element.parent()[0] : null;
                        element = element[0];
                        if (!parentElement)
                            parentElement = element;
                        element.draggable = true;
                        function onDragStart(event) {
                            event.dataTransfer.effectAllowed = 'move';
                            event.dataTransfer.setData('text', (scope.dragType ? scope.dragType + ':' : '') + scope.dragIndex);
                            parentElement.originalOpacity = parentElement.style.opacity;
                            $timeout((): void => { parentElement.style.opacity = (parentElement.originalOpacity ? parentElement.originalOpacity : 1) / 2; });
                        }
                        function onDragEnd() {
                            parentElement.style.opacity = parentElement.originalOpacity;
                            delete parentElement.originalOpacity;
                        }
                        element.addEventListener('dragstart', onDragStart);
                        element.addEventListener('dragend', onDragEnd);
                        scope.$on('$destroy', (): void => {
                            element.removeEventListener('dragstart', onDragStart);
                            element.removeEventListener('dragend', onDragEnd);
                        });
                    }
                };
            })
            .directive('dsKanbanItemDropZone', () => {
                return {
                    restrict: 'EA',
                    scope: {
                        onDrop: '&',
                        canDrop: '&?'
                    },
                    link: function (scope, element) {
                        element = element[0];
                        function onDragOver(event) {
                            event.preventDefault();
                        }
                        function onDrop(event) {
                            var itemInfo = event.dataTransfer.getData('text');
                            var infoSeparatorIndex = itemInfo.indexOf(':');
                            var type = infoSeparatorIndex >= 0 ? itemInfo.substr(0, infoSeparatorIndex) : types.item;
                            var index = parseInt(infoSeparatorIndex >= 0 ? itemInfo.substr(infoSeparatorIndex + 1) : itemInfo);
                            if (!scope.canDrop || scope.canDrop({ type: type, index: index })) {
                                scope.onDrop({ type: type, index: index });
                                scope.$apply();
                            }
                            event.preventDefault();
                        }
                        element.addEventListener('dragover', onDragOver);
                        element.addEventListener('drop', onDrop);
                        scope.$on('$destroy', (): void => {
                            element.removeEventListener('drop', onDrop);
                            element.removeEventListener('dragover', onDragOver);
                        });
                    }
                };
            });
    }
}
