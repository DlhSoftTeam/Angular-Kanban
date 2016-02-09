var DlhSoft;
(function (DlhSoft) {
    var Controls;
    (function (Controls) {
        var KanbanBoard;
        (function (KanbanBoard) {
            var Types = (function () {
                function Types() {
                }
                return Types;
            })();
            KanbanBoard.Types = Types;
            KanbanBoard.types = {
                item: 'item',
                group: 'group'
            };
            KanbanBoard.defaultGroup = {};
            KanbanBoard.defaultStates = [
                { name: 'New' },
                { name: 'Active', areNewItemButtonsHidden: true },
                { name: 'Resolved', areNewItemButtonsHidden: true },
                { name: 'Closed', areNewItemButtonsHidden: true }];
            var DefaultItemTypes = (function () {
                function DefaultItemTypes() {
                }
                return DefaultItemTypes;
            })();
            KanbanBoard.DefaultItemTypes = DefaultItemTypes;
            KanbanBoard.defaultItemTypes = {
                task: { color: '#ffd800', backgroundColor: 'white' },
                bug: { color: '#ca3838', backgroundColor: '#fff0f0' },
                story: { color: '#0094ff', backgroundColor: 'white' },
                feature: { color: '#67157b', backgroundColor: 'white' },
                epic: { color: '#ff6a00', backgroundColor: 'white' }
            };
            KanbanBoard.defaultItemType = KanbanBoard.defaultItemTypes.task;
            KanbanBoard.defaultGroupType = KanbanBoard.defaultItemTypes.story;
            function getItemsInGroupAndState(group, state) {
                var itemsInGroupAndState = [];
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.group === group && item.state === state) {
                        itemsInGroupAndState.push(item);
                    }
                }
                return itemsInGroupAndState;
            }
            KanbanBoard.getItemsInGroupAndState = getItemsInGroupAndState;
            ;
            function getItemsInGroup(group) {
                var itemsInGroup = [];
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.group === group) {
                        itemsInGroup.push(item);
                    }
                }
                return itemsInGroup;
            }
            KanbanBoard.getItemsInGroup = getItemsInGroup;
            function getItemsInState(state) {
                var itemsInState = [];
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    if (item.state === state) {
                        itemsInState.push(item);
                    }
                }
                return itemsInState;
            }
            KanbanBoard.getItemsInState = getItemsInState;
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
                        var _this = this;
                        if (!this.groups) {
                            for (var i = 0; i < this.items.length; i++) {
                                var item = this.items[i];
                                item.group = KanbanBoard.defaultGroup;
                            }
                            this.groups = [KanbanBoard.defaultGroup];
                            this.hideGroups = true;
                        }
                        if (!this.states) {
                            for (var i = 0; i < this.items.length; i++) {
                                var item = this.items[i];
                                item.state = KanbanBoard.defaultStates[0];
                            }
                            this.states = KanbanBoard.defaultStates;
                        }
                        if (!this.groupStates)
                            this.groupStates = this.states;
                        for (var i = 0; i < this.items.length; i++) {
                            var item = this.items[i];
                            if (!item.group || this.groups.indexOf(item.group) < 0)
                                item.group = this.groups[0];
                            if (!item.state || this.states.indexOf(item.state) < 0)
                                item.state = this.states[0];
                        }
                        for (var i = 0; i < this.groups.length; i++) {
                            var group = this.groups[i];
                            if (!group.state || this.groupStates.indexOf(group.state) < 0)
                                group.state = this.states[0];
                            if (group.isCollapsed === undefined)
                                group.isCollapsed = group.state ? group.state.isCollapsedByDefaultForGroups : false;
                        }
                        if (!this.itemType)
                            this.itemType = KanbanBoard.types.item;
                        if (!this.groupType)
                            this.groupType = KanbanBoard.types.group;
                        if (!this.itemNameField)
                            this.itemNameField = 'name';
                        if (!this.groupNameField)
                            this.groupNameField = this.itemNameField;
                        if (!this.itemTypes)
                            this.itemTypes = KanbanBoard.defaultItemTypes;
                        if (!this.defaultItemType)
                            this.defaultItemType = KanbanBoard.defaultItemType;
                        if (!this.defaultGroupType)
                            this.defaultGroupType = KanbanBoard.defaultGroupType;
                        this.getItemsInGroupAndState = getItemsInGroupAndState;
                        this.getItemsInGroup = getItemsInGroup;
                        this.getItemsInState = getItemsInState;
                        this.getMaxStateInGroup = function (group) {
                            var maxState = null, maxItemCount = 0;
                            for (var i = 0; i < _this.states.length; i++) {
                                var state = _this.states[i];
                                var itemCount = _this.getItemsInGroupAndState(group, state).length;
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
                        var setItemState = function (item, state) {
                            var previousState = item.state;
                            item.state = state;
                            if (_this.onItemStateChanged)
                                _this.onItemStateChanged({ item: item, state: state, previousState: previousState });
                        };
                        var setItemGroup = function (item, group) {
                            var previousGroup = item.group;
                            item.group = group;
                            if (_this.onItemGroupChanged)
                                _this.onItemGroupChanged({ item: item, group: group, previousGroup: previousGroup });
                        };
                        this.canDropItem = function (type, index, group, state, targetIndex) {
                            if (type !== KanbanBoard.types.item || targetIndex === index)
                                return false;
                            var item = _this.items[index];
                            if (_this.canMoveItem)
                                return _this.canMoveItem({ item: item, index: targetIndex, previousIndex: index, group: group, previouGroup: item.group, state: state, previousState: item.state });
                            return true;
                        };
                        this.onItemDrop = function (type, index, group, state, targetIndex) {
                            if (type !== KanbanBoard.types.item || targetIndex === index)
                                return;
                            var item = this.items[index];
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
                        this.canDropGroup = function (type, index, targetIndex) {
                            if (type !== KanbanBoard.types.group || targetIndex === index)
                                return false;
                            var group = _this.groups[index];
                            if (_this.canMoveGroup)
                                return _this.canMoveGroup({ group: group, index: targetIndex, previousIndex: index });
                            return true;
                        };
                        this.onGroupDrop = function (type, index, targetIndex) {
                            if (type !== KanbanBoard.types.group || targetIndex === index)
                                return;
                            var group = _this.groups[index];
                            _this.groups.splice(index, 1);
                            _this.groups.splice(targetIndex, 0, group);
                            if (_this.onGroupIndexChanged)
                                _this.onGroupIndexChanged({ group: group, index: targetIndex, previousIndex: index });
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
                        this.addNewItem = function (group, state) {
                            var item = { name: _this.newItemName, group: group, state: state, assignedResource: _this.newItemResource };
                            _this.items.push(item);
                            if (_this.onAddingNewItem != null)
                                _this.onAddingNewItem({ item: item });
                        };
                    },
                    controllerAs: 'dskb',
                    templateUrl: 'DlhSoft.Kanban.Angular.Components.Templates/kanban-board.html'
                };
            })
                .directive('dsKanbanDraggableItem', function ($timeout) {
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
                            $timeout(function () { parentElement.style.opacity = (parentElement.originalOpacity ? parentElement.originalOpacity : 1) / 2; });
                        }
                        function onDragEnd() {
                            parentElement.style.opacity = parentElement.originalOpacity;
                            delete parentElement.originalOpacity;
                        }
                        element.addEventListener('dragstart', onDragStart);
                        element.addEventListener('dragend', onDragEnd);
                        scope.$on('$destroy', function () {
                            element.removeEventListener('dragstart', onDragStart);
                            element.removeEventListener('dragend', onDragEnd);
                        });
                    }
                };
            })
                .directive('dsKanbanItemDropZone', function () {
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
                            var type = infoSeparatorIndex >= 0 ? itemInfo.substr(0, infoSeparatorIndex) : KanbanBoard.types.item;
                            var index = parseInt(infoSeparatorIndex >= 0 ? itemInfo.substr(infoSeparatorIndex + 1) : itemInfo);
                            if (!scope.canDrop || scope.canDrop({ type: type, index: index })) {
                                scope.onDrop({ type: type, index: index });
                                scope.$apply();
                            }
                            event.preventDefault();
                        }
                        element.addEventListener('dragover', onDragOver);
                        element.addEventListener('drop', onDrop);
                        scope.$on('$destroy', function () {
                            element.removeEventListener('drop', onDrop);
                            element.removeEventListener('dragover', onDragOver);
                        });
                    }
                };
            });
        })(KanbanBoard = Controls.KanbanBoard || (Controls.KanbanBoard = {}));
    })(Controls = DlhSoft.Controls || (DlhSoft.Controls = {}));
})(DlhSoft || (DlhSoft = {}));
//# sourceMappingURL=DlhSoft.Kanban.Angular.Components.js.map