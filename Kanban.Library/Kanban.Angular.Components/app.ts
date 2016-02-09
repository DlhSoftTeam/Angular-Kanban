/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>
import KanbanBoard = DlhSoft.Controls.KanbanBoard;
import KanbanItem = KanbanBoard.Item;
import KanbanGroup = KanbanBoard.Group;
import KanbanState = KanbanBoard.State;
import KanbanAssignableResource = KanbanBoard.AssignableResource;

// Prepare data.
var state1: KanbanState = { name: 'New' }, state2: KanbanState = { name: 'In progress', areNewItemButtonsHidden: true }, state3: KanbanState = { name: 'Done', isCollapsedByDefaultForGroups: true, areNewItemButtonsHidden: true };
var states: KanbanState[] = [state1, state2, state3];
var resource1: KanbanAssignableResource = { name: 'Resource 1', imageUrl: 'Images/Resource1.png' }, resource2: KanbanAssignableResource = { name: 'Resource 2', imageUrl: 'Images/Resource2.png' };
var assignableResources: KanbanAssignableResource[] = [resource1, resource2];
var group1: KanbanGroup = { name: 'Story 1', state: state2, assignedResource: resource1 }, group2: KanbanGroup = { name: 'Story 2', state: state3, assignedResource: resource2 };
var groups: KanbanGroup[] = [group1, group2];
var items: KanbanItem[] = [
    { name: 'Task 1', group: group1, state: state1, assignedResource: resource1 },
    { name: 'Task 2', group: group1, state: state2, assignedResource: resource1 },
    { name: 'Bug 1', group: group1, state: state2, assignedResource: resource1, itemType: KanbanBoard.defaultItemTypes.bug },
    { name: 'Task 3', group: group1, state: state1, assignedResource: resource2 },
    { name: 'Task 4', group: group1, state: state1, assignedResource: resource1 },
    { name: 'Task 5', group: group2, state: state1, assignedResource: resource2 },
    { name: 'Task 6', group: group2, state: state2, assignedResource: resource2 },
    { name: 'Task 7', group: group2, state: state2, assignedResource: resource1 },
    { name: 'Task 8', group: group2, state: state3, assignedResource: resource2 }
];
var nextIteration = { groups: [], items: [] };

declare var angular;
angular.module('KanbanBoardSample', ['DlhSoft.Kanban.Angular.Components'])
    .controller('MainController', ($scope) => {
        // Bind data to the user interface.
        $scope.states = states;
        $scope.groups = groups;
        $scope.items = items;
        $scope.assignableResources = assignableResources;

        // Initialize a newly created item before adding it to the user interface.
        $scope.initializeNewItem = (item: KanbanItem): void => {
            item.assignedResource = resource1;
            console.log('A new item was created.');
        };

        // Allow item deletion by clicking a button in the user interface.
        $scope.deleteItem = (item: KanbanItem): void => {
            items.splice(items.indexOf(item), 1);
            console.log('Item ' + item.name + ' was deleted.');
        };

        // Handle changes.
        $scope.onItemStateChanged = (item: KanbanItem, state: KanbanState): void => {
            console.log('State of ' + item.name + ' was changed to: ' + state.name);
        };
        $scope.onItemGroupChanged = (item: KanbanItem, group: KanbanGroup): void => {
            console.log('Group of ' + item.name + ' was changed to: ' + group.name);
        };

        // Move items to the next iteration.
        $scope.nextIteration = nextIteration;
        $scope.moveItemToNextIteration = (type: string, index: number): void => {
            if (type === DlhSoft.Controls.KanbanBoard.types.group) {
                // Move an entire group (story) and all its items.
                var group: KanbanGroup = groups[index];
                for (var i = 0; i < items.length; i++) {
                    var item: KanbanItem = items[i];
                    if (item.group === group) {
                        items.splice(i--, 1);
                        nextIteration.items.push(item);
                    }
                }
                groups.splice(index, 1);
                if (nextIteration.groups.indexOf(group) < 0)
                    nextIteration.groups.push(group);
                console.log('Group ' + group.name + ' and its items were moved to next iteration.');
            } else {
                // Move a single item, and copy the group (story) if needed.
                var item: KanbanItem = items[index];
                items.splice(index, 1);
                nextIteration.items.push(item);
                var group: KanbanGroup = item.group;
                if (nextIteration.groups.indexOf(group) < 0)
                    nextIteration.groups.push(group);
                console.log('Item ' + item.name + ' was moved to next iteration.');
            }
        };
    });
