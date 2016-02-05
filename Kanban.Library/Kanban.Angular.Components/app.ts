/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>

// Prepare data.
var state1 = { name: 'New' }, state2 = { name: 'In progress', isNewItemButtonHidden: true }, state3 = { name: 'Done', isCollapsedByDefaultForGroups: true, isNewItemButtonHidden: true };
var states = [state1, state2, state3];
var resource1 = { name: 'Resource 1', imageUrl: 'Images/Resource1.png' }, resource2 = { name: 'Resource 2', imageUrl: 'Images/Resource2.png' };
var group1 = { name: 'Story 1', state: state2, assignedResource: resource1 }, group2 = { name: 'Story 2', state: state3, assignedResource: resource2 };
var groups = [group1, group2];
var items = [
    { name: 'Task 1', group: group1, state: state1, assignedResource: resource1 },
    { name: 'Task 2', group: group1, state: state2, assignedResource: resource1 },
    { name: 'Bug 1', group: group1, state: state2, assignedResource: resource1, type: DlhSoft.Controls.KanbanBoard.defaultTypes.bug },
    { name: 'Task 3', group: group1, state: state1, assignedResource: resource2 },
    { name: 'Task 4', group: group1, state: state1, assignedResource: resource1 },
    { name: 'Task 5', group: group2, state: state1, assignedResource: resource2 },
    { name: 'Task 6', group: group2, state: state2, assignedResource: resource2 },
    { name: 'Task 7', group: group2, state: state2, assignedResource: resource1 },
    { name: 'Task 8', group: group2, state: state3, assignedResource: resource2 }
];
var assignableResources = [resource1, resource2];
var nextIteration = { groups: [], items: [] };

declare var angular;
angular.module('KanbanBoardSample', ['DlhSoft.Kanban.Angular.Components'])
    .controller('MainController', function ($scope) {
        // Bind data to the user interface.
        $scope.states = states;
        $scope.groups = groups;
        $scope.items = items;
        $scope.assignableResources = assignableResources;

        // Initialize a newly created item before adding it to the user interface.
        $scope.initializeNewItem = (item) => {
            item.assignedResource = resource1;
        };

        // Allow item deletion by clicking a button in the user interface.
        $scope.deleteItem = (item) => {
            items.splice(items.indexOf(item), 1);
        };

        // Move items to the next iteration.
        $scope.nextIteration = nextIteration;
        $scope.moveItemToNextIteration = (itemType, index) => {
            if (itemType === 'group') {
                // Move an entire group (story) and all its items.
                var group = groups[index];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.group === group) {
                        items.splice(i--, 1);
                        nextIteration.items.push(item);
                    }
                }
                groups.splice(index, 1);
                if (nextIteration.groups.indexOf(group) < 0)
                    nextIteration.groups.push(group);
            } else {
                // Move a single item, and copy the group (story) if needed.
                var item = items[index];
                items.splice(index, 1);
                nextIteration.items.push(item);
                var group = item.group;
                if (nextIteration.groups.indexOf(group) < 0)
                    nextIteration.groups.push(group);
            }
        };
    });
