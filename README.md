# Angular-Kanban
Kanban board component for AngularJS.
![Kanban board](http://DlhSoft.com/KanbanLibrary/Documentation/Screenshots/KanbanBoard.png)
* Product page: [DlhSoft.com/KanbanLibrary](http://DlhSoft.com/KanbanLibrary)

## Run demos
 * [Kanban board](http://DlhSoft.com/KanbanLibrary/Demo)
 * [Gantt Chart integration](http://DlhSoft.com/KanbanLibrary/Demo.GanttChartIntegration)

## Usage
```html
<ds-kanban-board items="items" groups="groups" states="states" assignable-resources="assignableResources"
                 on-adding-new-item="initializeNewItem(item)" on-editing-item="editItem(item)"
                 on-item-state-changed="onItemStateChanged(item, state)">
</ds-kanban-board>
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
## <code>ds-kanban-board</code> directive
* Available as: element, attribute (e.g. on <code>div</code>), or as comment directive.
* Transcludes content: to  title displayed in the header area of the board.
* Some accepted arguments:
  * <code>items</code> (required): array of items (such as tasks), defined using <code>Item</code> type, having these members:
    * <code>name</code>: string representing the item; may be overriden by the field defined by <code>itemNameField</code> or <code>groupNameField</code> arguments of the directive
    * <code>group</code>: reference to the group (from the <code>groups</code> array) indicating the vertical group area that the item should be displayed within (e.g. the story that the task belongs to)
    * <code>state</code>: reference to the state (from the <code>states</code> array) indicating the horizontal state area that the item should be displayed within (e.g. New, In progress, Done)
    * <code>itemType</code>: reference to the item type (from the <code>itemTypes</code> array) indicating the type of item (e.g. task, bug, story, feature)
    * <code>assignedResource</code>: reference to the resource (from the <code>assignableResources</code> array) indicating the resource that the item is assigned to (e.g. an employee that needs to perform work on a task)
    * <code>color</code>: string indicating a color of the item, overriding the color of the item type (displayed as a left header area for the item rectangle)
    * <code>backgroundColor</code>: string indicating the background color of the item, overriding the color of the item type
    * <code>isReadOnly</code>: Boolean value indicating whether or not this item should be read only 
  * <code>groups</code>: array of groups (such as stories), defined using <code>Group</code> type; if not set, group headers area is not displayed, and items are all assigned to a default group behind the scenes
  * <code>states</code>:  array of states, defined using <code>State</code> type; defaults to a built-in array containing these states: New, Active, Resolved, Closed.
  * <code>assignableResources</code>: Array of available resources for item assignments, defined using <code>AssignableResource</code> type; if not set, resource assignment area is not displayed for items, and for groups it is replaced by a count of child items
  * <code>isReadOnly</code>: Boolean value indicating whether or not the component (i.e. all items) should be read only
  * <code>onAddingNewItem(item)</code>: function called when a new item is created and added to a group and state
  * <code>onEditingItem(item)</code>, <code>onEditingGroup(group)</code>: functions called when the end user initiate editing for an item or a group
  * <code>onItemStateChanged(item, state, previousState)</code>, <code>onItemGroupChanged(item, group, previousGroup)</code>: functions called when the end user drags and drops an item to a different state and/or group area.

## Demo source code
<code>Kanban.Library/Kanban.Angular.Components</code>
* HTML:       <code>index.html</code>
* CSS:        <code>app.css</code>
* TypeScript: <code>app-angular.ts</code>
* JavaScript: <code>app-angular.js</code>

## Package installation
 * NuGet: 
   ```
   Install-Package DlhSoft.KanbanLibrary
   ```
 * Bower:
   ```
   bower install http://DlhSoft.com/Packages/DlhSoft.KanbanLibrary.zip
   ```
 * Node:
   ```
   npm install http://DlhSoft.com/Packages/DlhSoft.KanbanLibrary.tar
   ```

## Support
This product is provided for free and "as is", so it doesn't include any official support.
If needed, however, you may [purchase a DlhSoft product license with support](http://DlhSoft.com/KanbanLibrary/Purchase.aspx).
