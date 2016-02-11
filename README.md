# Angular-Kanban
Kanban board component for AngularJS.
## Usage
```html
<ds-kanban-board items="items" groups="groups" states="states" assignable-resources="assignableResources"
                 on-adding-new-item="initializeNewItem(item)" on-editing-item="editItem(item)"
                 on-item-state-changed="onItemStateChanged(item, state)">
<ds-kanban-board>
```
```typescript
var state1: KanbanState = { name: 'New' }, 
    state2: KanbanState = { name: 'In progress', areNewItemButtonsHidden: true }, 
    state3: KanbanState = { name: 'Done', isCollapsedByDefaultForGroups: true, areNewItemButtonsHidden: true };
var states: KanbanState[] = [state1, state2, state3];
var resource1: KanbanAssignableResource = { name: 'Resource 1', imageUrl: 'Images/Resource1.png' }, 
    resource2: KanbanAssignableResource = { name: 'Resource 2', imageUrl: 'Images/Resource2.png' };
var assignableResources: KanbanAssignableResource[] = [resource1, resource2];
var group1: KanbanGroup = { name: 'Story 1', state: state2, assignedResource: resource1 },
    group2: KanbanGroup = { name: 'Story 2', state: state3, assignedResource: resource2 };
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
$scope.states = states;
$scope.groups = groups;
$scope.items = items;
$scope.assignableResources = assignableResources;
$scope.initializeNewItem = (item: KanbanItem): void => {
    item.assignedResource = resource1;
    console.log('A new item was created.');
};
$scope.editItem = (item: KanbanItem): void => {
    console.log('Editing item ' + item.name);
};
$scope.onItemStateChanged = (item: KanbanItem, state: KanbanState): void => {
    console.log('State of ' + item.name + ' was changed to: ' + state.name);
};
```
## Sample application
<code>Kanban.Library/Kanban.Angular.Components</code>
* HTML:       <code>index.html</code>
* CSS:        <code>app.css</code>
* TypeScript: <code>app-angular.ts</code>
* JavaScript: <code>app-angular.js</code>
