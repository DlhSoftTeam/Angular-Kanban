/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import GanttChartItem = GanttChartView.Item;
import KanbanBoard = DlhSoft.Controls.KanbanBoard;
import KanbanItem = KanbanBoard.Item;
import KanbanGroup = KanbanBoard.Group;
import KanbanState = KanbanBoard.State;
interface Item extends GanttChartItem, KanbanItem
{ }
interface Story extends Item, KanbanGroup
{ }

declare var angular;
angular.module('KanbanGanttChartIntegrationSample', ['DlhSoft.Kanban.Angular.Components', 'DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', ($scope) => {
        // Internal functions.
        function updateItemState(item: Item): void {
            var updatedState = !item.completedFinish || item.completedFinish <= item.start ? newState : (item.completedFinish >= item.finish ? doneState : inProgressState);
            if (updatedState !== item.state)
                item.state = updatedState;
        };
        function updateCompletedFinish(item: Item): void {
            var updatedCompletedFinish = item.state === newState ? item.start : (item.state === doneState ? item.finish : new Date((item.start.valueOf() + item.finish.valueOf()) / 2));
            item.completedFinish = updatedCompletedFinish;
        }
        function refresh(): void {
            $scope.$apply();
        }
        // Prepare Gantt Chart data items and settings.
        var ganttChartItems = <Item[]>[
            { content: 'Story A' },
            { content: 'Task 1', indentation: 1, start: new Date(2016, 2 - 1, 11, 08), finish: new Date(2016, 2 - 1, 12, 12), completedFinish: new Date(2016, 2 - 1, 12, 12) },
            { content: 'Task 2', indentation: 1, start: new Date(2016, 2 - 1, 12, 08), finish: new Date(2016, 2 - 1, 12, 16) },
            { content: 'Story B' },
            { content: 'Task 3', indentation: 1, start: new Date(2016, 2 - 1, 15, 08), finish: new Date(2016, 2 - 1, 15, 16), completedFinish: new Date(2016, 2 - 1, 15, 12) },
            { content: 'Task 4', indentation: 1, start: new Date(2016, 2 - 1, 15, 08), finish: new Date(2016, 2 - 1, 16, 16) },
            { content: 'Task 5', indentation: 1, start: new Date(2016, 2 - 1, 16, 08), finish: new Date(2016, 2 - 1, 17, 16) },
            { content: 'Task 6', indentation: 1, start: new Date(2016, 2 - 1, 16, 08), finish: new Date(2016, 2 - 1, 19, 16) }];
        $scope.ganttChartItems = ganttChartItems;
        $scope.ganttChartSettings = <DlhSoft.Controls.GanttChartView.Settings>{
            selectionMode: 'None',
            currentTime: new Date(2016, 2 - 1, 12) // Display the current time vertical line of the chart at the project start date.
        };
        $scope.onGanttChartItemChanged = (item: Item, propertyName: string, isDirect: boolean, isFinal: boolean): void => {
            if (!isDirect || !isFinal) // Skip internal changes, and changes occurred during drag operations.
                return;
            switch (propertyName) {
                case 'completedFinish':
                    updateItemState(item); // Update state when completion percentage changes.
                    refresh();
                    break;
                case 'content':
                    refresh();
                    break;
            }
        };
        // Prepare Kanban data items based on Gantt Chart items.
        var newState: KanbanState = { name: 'New' }, inProgressState: KanbanState = { name: 'In progress', areNewItemButtonsHidden: true }, doneState: KanbanState = { name: 'Done', isCollapsedByDefaultForGroups: true, areNewItemButtonsHidden: true };
        var states: KanbanState[] = [newState, inProgressState, doneState];
        $scope.states = states;
        var kanbanItems: Item[] = [], stories: Story[] = [], story: Story;
        for (var i = 0; i < ganttChartItems.length; i++) {
            var ganttChartItem = ganttChartItems[i];
            if (!ganttChartItem.indentation) {
                story = ganttChartItem;
                story.state = newState;
                stories.push(story);
            }
            else {
                var item: Item = ganttChartItem;
                item.group = story; // Set the previously defined story as the parent of this item.
                updateItemState(item);
                kanbanItems.push(item);
            }
        }
        $scope.stories = stories;
        $scope.kanbanItems = kanbanItems;
        // In this sample application we only allow changing state for an item using a drag and drop operation, and not its parent story.
        $scope.canMoveKanbanItem = (item: KanbanItem, state: KanbanState, group: KanbanGroup): boolean => { return group === item.group; };
        // When state changes, update completion percent accordingly.
        $scope.onKanbanItemStateChanged = (item: Item, state: KanbanState): void => { updateCompletedFinish(item); };
    });
