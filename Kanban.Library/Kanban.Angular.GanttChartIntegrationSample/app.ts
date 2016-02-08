declare var angular;

/// <reference path='./DlhSoft.Kanban.Angular.Components.ts'/>
/// <reference path='./Scripts/DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts'/>
import GanttChartView = DlhSoft.Controls.GanttChartView;
import TaskItem = GanttChartView.Item;
import PredecessorItem = GanttChartView.PredecessorItem;

angular.module('KanbanGanttChartIntegrationSample', ['DlhSoft.Kanban.Angular.Components', 'DlhSoft.ProjectData.GanttChart.Directives'])
    .controller('MainController', function ($scope) {
        // Prepare Gantt Chart data items.
        var ganttChartItems = <TaskItem[]>[
            { content: 'Story A' },
            { content: "Task 1", indentation: 1, start: new Date(2013, 8 - 1, 22, 08), finish: new Date(2013, 8 - 1, 23, 12), completedFinish: new Date(2013, 8 - 1, 23, 12), assignmentsContent: "Resource 1" },
            { content: "Task 2", indentation: 1, start: new Date(2013, 8 - 1, 23, 08), finish: new Date(2013, 8 - 1, 23, 16) },
            { content: 'Story B' },
            { content: "Task 3", indentation: 1, start: new Date(2013, 8 - 1, 26, 08), finish: new Date(2013, 8 - 1, 26, 16), completedFinish: new Date(2013, 8 - 1, 26, 12), assignmentsContent: "Resource 2" },
            { content: "Task 4", indentation: 1, start: new Date(2013, 8 - 1, 26, 08), finish: new Date(2013, 8 - 1, 27, 16), assignmentsContent: "Resource 1" },
            { content: "Task 5", indentation: 1, start: new Date(2013, 8 - 1, 27, 08), finish: new Date(2013, 8 - 1, 28, 16) }];
        $scope.ganttChartItems = ganttChartItems;
        // Prepare Gantt Chart configuration settings.
        var ganttChartSettings = <GanttChartView.Settings>{
            currentTime: new Date(2013, 8 - 1, 22), // Display the current time vertical line of the chart at the project start date.
            isReadOnly: true
        }
        $scope.ganttChartSettings = ganttChartSettings;

        // Prepare Kanban data items based on Gantt Chart items.
        var newState = { name: 'New' }, inProgressState = { name: 'In progress', isNewItemButtonHidden: true }, doneState = { name: 'Done', isCollapsedByDefaultForGroups: true, isNewItemButtonHidden: true };
        var states = [newState, inProgressState, doneState];
        $scope.states = states;
        var kanbanItems = [], stories = [], currentStory;
        for (var i = 0; i < ganttChartItems.length; i++) {
            var ganttChartItem = ganttChartItems[i];
            if (!ganttChartItem.indentation) {
                currentStory = { name: ganttChartItem.content, state: newState, ganttChartItem: ganttChartItem };
                stories.push(currentStory);
            }
            else {
                var state = ganttChartItem.completedFinish > ganttChartItem.start ? (ganttChartItem.completedFinish < ganttChartItem.finish ? inProgressState : doneState) : newState;
                var item = { name: ganttChartItem.content, group: currentStory, state: state, ganttChartItem: ganttChartItem };
                kanbanItems.push(item);
            }
        }
        $scope.stories = stories;
        $scope.kanbanItems = kanbanItems;
        $scope.canMoveKanbanItem = (item, state, group) => {
            return group === item.group;
        };
        $scope.onKanbanItemStateChanged = (item, state) => {
            var ganttChartItem = item.ganttChartItem;
            ganttChartItem.completedFinish = state == newState ? ganttChartItem.start : (state == doneState ? ganttChartItem.finish : new Date((ganttChartItem.start.valueOf() + ganttChartItem.finish.valueOf()) / 2));
        };
    });
