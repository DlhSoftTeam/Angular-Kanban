/* Assembly: DlhSoft.ProjectData.GanttChart.HTML.Controls,
   Company: DlhSoft,
   Product: Project Data Modern Library,
   Version: 5.3.5.0,
   Copyright: Copyright © 2012-2015 DlhSoft,
   Title: Project Data Gantt Chart HTML Controls,
   Description: Project Data Gantt Chart related HTML client components */

/*
/// <reference path='./DlhSoft.ProjectData.GanttChart.HTML.Controls.js'/>
*/

/// <reference path='./DlhSoft.ProjectData.PertChart.HTML.Controls.d.ts'/>

declare module DlhSoft.Controls {
    /** Represents a control that presents task data items using a Gantt Chart and an associated tree-grid. */
    module GanttChartView {
        /**
         * Initializes a GanttChartView component instance.
         * @param element The HTMLElement that would host the user interface of the component.
         * @param items Task data objects to be managed and presented by the component.
         * @param settings Configuration settings for the component behavior and appearance.
         */
        function initialize(element: HTMLElement, items: Item[], settings?: Settings, license?: String): Element;

        /** Returns an array of default definitions that you can further customize and use as value for the columns property of the control settings used at initialization time. */
        function getDefaultColumns(items: Item[], settings: Settings): Column[];

        function getDefaultCollapsedToggleButtonTemplate(controlElement: Element, settings: Settings): () => SVGElement;
        function getDefaultExpandedToggleButtonTemplate(controlElement: Element, settings: Settings): () => SVGElement;

        /** Returns an array of default definitions that you can further customize and use as value for the scales property of the control settings used at initialization time. */
        function getDefaultScales(settings: Settings): Scale[];

        function getDefaultStyleDefinitionTemplate(controlElement: Element, settings: Settings): () => SVGDefsElement;
        function getDefaultStandardTaskTemplate(items: Item[], controlElement: Element, settings: Settings): (item: Item) => SVGElement;
        function getDefaultSummaryTaskTemplate(items: Item[], controlElement: Element, settings: Settings): (item: Item) => SVGElement;
        function getDefaultMilestoneTaskTemplate(items: Item[], controlElement: Element, settings: Settings): (item: Item) => SVGElement;
        function getDefaultItemTemplate(settings: Settings): (item: Item) => SVGElement;
        function getDefaultAssignmentsTemplate(settings: Settings): (item: Item) => SVGElement;
        function getDefaultDependencyLineTemplate(items: Item[], settings: Settings): (item: Item, predecessorItem: PredecessorItem) => SVGElement;
        function getDefaultPredecessorItemTemplate(settings: Settings): (item: Item, predecessorItem: PredecessorItem) => SVGElement;

        /** Inside task template functions, sets up task drag and drop behavior for the non-null SVG elements specified to be designed as thumbs, considering the specified item and item positioning in the chart. */
        function initializeTaskDraggingThumbs(startThumb: SVGElement, startOnlyThumb: SVGElement, finishThumb: SVGElement, completedFinishThumb: SVGElement, item: Item, itemLeft: number, itemRight: number, itemCompletedRight: number): void;

        /** Inside task template functions, sets up dependency creation drag and drop behavior for the non-null SVG elements specified to be designed as thumbs inside its specified container group that would be used to supplementary present temporary dependency lines during drag and drop operations, considering the specified item and item positioning in the chart. */
        function initializeDependencyDraggingThumbs(thumb: SVGElement, startThumb: SVGElement, containerGroup: SVGGElement, item: Item, itemTop: number, itemRight: number, itemLeft: number): void;

        function getWorkingTime(dateTime: Date, settings: Settings, schedule?: Schedule): Date;
        function getEffort(start: Date, finish: Date, settings: Settings, schedule?: Schedule): number;
        function getFinish(start: Date, effort: number, settings: Settings, schedule?: Schedule): Date;
        function getStart(effort: Date, finish: number, settings: Settings, schedule?: Schedule): Date;
        function getCompletion(start: Date, completedFinish: Date, finish: Date, settings: Settings, schedule?: Schedule): number;
        function getCompletedFinish(start: Date, completion: number, finish: Date, settings: Settings, schedule?: Schedule): number;
        function getWeekStart(dateTime: Date, weekStartDay: number): Date;
        function getWeekFinish(dateTime: Date, weekStartDay: number): Date;

        function defaultDateTimeFormatter(date: Date): string;
        function defaultDateFormatter(date: Date): string;
        function defaultDateTimeParser(value: string): Date;

        function textColumnTemplateBase(document: HTMLDocument, valueGetter: () => any, isVisibleGetter?: () => boolean): HTMLElement;
        function textInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;
        function optionSelectColumnTemplateBase(document: HTMLDocument, width: number, optionCollectionGetter: () => any[], valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;
        function numberInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;
        function percentInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;
        function timeSpanInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, scale?: number, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;
        function dateTimeInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;

        function datePickerInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean, defaultTimeOfDay?: number, calendarSelectorLevels?: number, months?: string[], daysOfWeek?: string[], dateTimeFormatter?: (Date) => string, dateTimeParser?: (string) => Date): HTMLElement;
        function dateTimePickerInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean, defaultTimeOfDay?: number, calendarSelectorLevels?: number, months?: string[], daysOfWeek?: string[], dateTimeFormatter?: (Date) => string, dateTimeParser?: (string) => Date): HTMLElement;
        function multiSelectorComboBoxInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;

        function getIconColumnTemplate(imageSource: string, imageClass: string, imageStyle: string, isMovingEnabled?: boolean, isMovingToEnabledGetter?: (index: number, hoveringItem: Item) => boolean, movingTargetHoveringClass?: string, movingTargetHoveringStyle?: string, disabledMovingTargetHoveringClass?: string, disabledMovingTargetHoveringStyle?: string): (item: Item) => HTMLElement;
        function getIconColumnTemplate(imageSourceGetter: (item: Item) => string, imageClass: string, imageStyle: string, isMovingEnabled?: boolean, isMovingToEnabledGetter?: (index: number, hoveringItem: Item) => boolean, movingTargetHoveringClass?: string, movingTargetHoveringStyle?: string, disabledMovingTargetHoveringClass?: string, disabledMovingTargetHoveringStyle?: string): (item: Item) => HTMLElement;
        function getIconColumnTemplate(imageSource: string, imageClass: string, imageStyle: string, isMovingEnabledGetter: (item: Item) => boolean, isMovingToEnabledGetter?: (index: number, hoveringItem: Item) => boolean, movingTargetHoveringClass?: string, movingTargetHoveringStyle?: string, disabledMovingTargetHoveringClass?: string, disabledMovingTargetHoveringStyle?: string): (item: Item) => HTMLElement;
        function getIconColumnTemplate(imageSourceGetter: (item: Item) => string, imageClass: string, imageStyle: string, isMovingEnabledGetter: (item: Item) => boolean, isMovingToEnabledGetter?: (index: number, hoveringItem: Item) => boolean, movingTargetHoveringClass?: string, movingTargetHoveringStyle?: string, disabledMovingTargetHoveringClass?: string, disabledMovingTargetHoveringStyle?: string): (item: Item) => HTMLElement;
        function getIndexColumnTemplate(zeroBased?: boolean): (item: Item) => HTMLElement;
        function getWbsColumnTemplate(zeroBased?: boolean): (item: Item) => HTMLElement;
        function getEffortColumnTemplate(inputWidth: number, scale?: number, isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getTotalEffortColumnTemplate(inputWidth: number, scale?: number, isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getDurationColumnTemplate(inputWidth: number, scale?: number, isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getCompletedEffortColumnTemplate(inputWidth: number, scale?: number, isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getTotalCompletedEffortColumnTemplate(inputWidth: number, scale?: number, isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getCompletionColumnTemplate(inputWidth: number, isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getPredecessorsColumnTemplate(inputWidth: number, isInputDisabled?: boolean, zeroBased?: boolean): (item: Item) => HTMLElement;
        function getAssignmentSelectorColumnTemplate(selectWidth: number, assignableResourcesCollection: any[], isInputDisabled?: boolean, useMultiSelectorComboBox?: boolean): (item: Item) => HTMLElement;
        function getAssignmentSelectorColumnTemplate(selectWidth: number, assignableResourcesCollectionGetter: (item: Item) => any[], isInputDisabled?: boolean, useMultiSelectorComboBox?: boolean): (item: Item) => HTMLElement;
        function getCostColumnTemplate(inputWidth: number, isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getBaselineStartColumnTemplate(inputWidth: number, useDatePicker?: boolean, useTimePicker?: boolean, defaultTimeOfDay?: number, calendarSelectorLevels?: number, months?: string[], daysOfWeek?: string[], isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getBaselineFinishColumnTemplate(inputWidth: number, useDatePicker?: boolean, useTimePicker?: boolean, defaultTimeOfDay?: number, calendarSelectorLevels?: number, months?: string[], daysOfWeek?: string[], isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getMinStartColumnTemplate(inputWidth: number, useDatePicker?: boolean, useTimePicker?: boolean, defaultTimeOfDay?: number, calendarSelectorLevels?: number, months?: string[], daysOfWeek?: string[], isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getMaxStartColumnTemplate(inputWidth: number, useDatePicker?: boolean, useTimePicker?: boolean, defaultTimeOfDay?: number, calendarSelectorLevels?: number, months?: string[], daysOfWeek?: string[], isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getMinFinishColumnTemplate(inputWidth: number, useDatePicker?: boolean, useTimePicker?: boolean, defaultTimeOfDay?: number, calendarSelectorLevels?: number, months?: string[], daysOfWeek?: string[], isInputDisabled?: boolean): (item: Item) => HTMLElement;
        function getMaxFinishColumnTemplate(inputWidth: number, useDatePicker?: boolean, useTimePicker?: boolean, defaultTimeOfDay?: number, calendarSelectorLevels?: number, months?: string[], daysOfWeek?: string[], isInputDisabled?: boolean): (item: Item) => HTMLElement;

        /** Prepares the specified date values to be used for component method input, considering that after initialization the component uses UTC date and time values internally; this method may also be called using a component instance object. */
        function getInputDate(date: Date): Date;
        /** Prepares the specified date values to be used for component method result or field output, considering that after initialization the component uses UTC date and time values internally; this method may also be called using a component instance object. */
        function getOutputDate(date: Date): Date;

        /** Represents an HTML element that supplementary provides GanttChartView component services. */
        interface Element extends HTMLElement {
            items: Item[];
            settings: Settings;

            /** Updates the user interface considering all external item and settings changes. */
            refresh(): void;

            refreshGridItems(): void; refreshChartItems(): void; refreshItems(): void; refreshGridItem(item: Item): void; refreshChartItem(item: Item): void; refreshItem(item: Item): void; refreshPredecessorItems(item: Item): void; refreshItemGraph(item: Item): void; refreshItemPath(item: Item): void; refreshItemNeighbourhood(item: Item): void;
            refreshCurrentTime(): void; setCurrentTime(currentTime: Date): void; updateCurrentTime(): void; 

            insertItem(index: number, item: Item): void; addItem(item: Item): void; insertItems(index: number, items: Item[]): void; addItems(items: Item[]): void;
            removeItem(item: Item): void; removeItems(items: Item[]): void;
            moveRange(fromIndex: number, count: number, toIndex: number): void;
            moveItem(item: Item, toIndex: number): void;
            moveItemHierarchy(item: Item, toIndex: number): void;
            moveItemUp(item: Item): void; moveItemDown(item: Item): void;
            moveItemHierarchyUp(item: Item): void; moveItemHierarchyDown(item: Item): void;

            increaseItemIndentation(item: Item): void; decreaseItemIndentation(item: Item): void;

            setItemContent(item: Item, value: any): void;
            setItemStart(item: Item, value: Date): void; setItemFinish(item: Item, value: Date): void;
            setItemIsMilestone(item: Item, value: boolean): void;
            getItemEffort(item: Item): number; setItemEffort(item: Item, value: number): void; getItemCompletedEffort(item: Item): number; setItemCompletedEffort(item: Item, value: number): void;
            getItemTotalEffort(item: Item): number; getItemTotalCompletedEffort(item: Item): number;
            getItemDuration(item: Item): number; setItemDuration(item: Item, value: number): void;
            getItemCompletion(item: Item): number; setItemCompletion(item: Item, value: number): void;
            isItemCompleted(item: Item): boolean; setItemAsCompleted(item: Item): void;
            hasItemStarted(item: Item): boolean; setItemAsNotStarted(item: Item): void; isItemOnSchedule(item: Item): boolean;
            setItemAssignmentsContent(item: Item, value: any): void;
            getItemIndexString(item: Item, zeroBased?: boolean): string;
            getItemPredecessorsString(item: Item, zeroBased?: boolean): string; setItemPredecessorsString(item: Item, value: string, zeroBased?: boolean): void;
            getCurrentItem(): Item;
            getSelectedItem(): Item; getSelectedItems(): Item[];
            selectItem(item: Item): void; unselectItem(item: Item): void;
            expandItem(item: Item): void; collapseItem(item: Item): void;
            scrollToItem(item: Item): void; scrollToBottom(): void; scrollToDateTime(dateTime: Date): void;
            increaseTimelinePage(timeAmount: number): void; decreaseTimelinePage(timeAmount: number): void;
            setHourWidth(hourWidth: number): void;
            setSplitterPosition(gridWidth: number, chartWidth: number);

            /** Returns the X coordinate of a specific date and time in the chart area. */
            getChartPosition(dateTime: Date): number;
            /** Returns the actual width of the chart area. */
            getChartWidth(): number;

            /** Returns the date and time of a specific X coordinate in the chart area. */
            getDateTime(chartPosition: number): Date;

            /** Returns the next available working time in the schedule based on the specified date and time. */
            getWorkingTime(dateTime: Date): Date;

            getStartWorkingTime(dateTime: Date): Date; getFinishWorkingTime(dateTime: Date): Date;

            /** Returns the actual working effort (in milliseconds) required to complete a task that starts and finishes on the specified date and times. */
            getEffort(start: Date, finish: Date): number;

            /** Returns the actual finish date and time of a task that starts on the specified date and time and completes after the specified working effort (in milliseconds). */
            getFinish(start: Date, effort: number): Date;

            /** Returns the actual start date and time of a task that has completed after the specified working effort (in milliseconds) and finishes on the specified date and time. */
            getStart(effort: number, finish: Date): Date;

            /** Returns the completion rate (between 0 and 1) of a task that is scheduled between the specified start and finish date and times and has been completed up to the specified completed finish date and time. */
            getCompletion(start: Date, completedFinish: Date, finish: Date): number;

            /** Returns the completed finish date and time of a task that is scheduled between the specified start and finish date and times and has the specified completion rate (between 0 and 1). */
            getCompletedFinish(start: Date, completion: number, finish: Date): Date;

            getItemsHeight(): number;
            getItemTop(item: Item): number;

            /** Calls itemPropertyChangeHandler function specified within the settings collection using the specified item, property name, and Boolean indicators for direct user actions and completed actions as arguments. */
            onItemPropertyChanged(item: Item, propertyName: string, isDirect: boolean, isFinal: boolean): void;

            /** Exports the content to the specified output document. */
            exportContent(exportSettings: ExportSettings, output: HTMLDocument): void;
            /** Exports the content to the document of the specified output window. */
            exportContent(exportSettings: ExportSettings, output: Window): void;
            /** Exports the content to the specified target or using a temporary document and window. */
            exportContent(exportSettings?: ExportSettings, output?: string): void;
            /** Prints the content using a temporary document and window. */
            print(exportSettings?: ExportSettings): void;

            getRootItems(): Item[]; getLeafItems(): Item[];
            getProjectStart(): Date; getProjectFinish(): Date;
            getProjectEffort(): number; getProjectCompletedEffort(): number;
            getProjectTotalEffort(): number; getProjectTotalCompletedEffort(): number;
            getProjectCompletion(): number;

            isItemCritical(item: Item): boolean; getCriticalItems(): Item[];

            ensureDependencyConstraints(): void;

            /** Sets up baseline start and baseline finish properties of standard and milestone task items based on their actual start and finish values; used as preparation for rescheduling the remaining work effort of a task item. */
            setupBaseline(): void;

            rescheduleItemToStart(item: Item, start: Date): void;
            rescheduleItemToFinish(item: Item, finish: Date): void;

            /** Creates and inserts a partial copy of the specified task item considering its remaining work effort into the managed hierarchy, and updates the finish date and time of the original task item to its completion point. */
            splitRemainingWork(item: Item): void;

            /** Optimizes schedule times of all managed items in order to optimize the project finish date without leveling resources, respecting dependency constraints. */
            optimizeWork(dependenciesOnly?: boolean, includeStartedTasks?: boolean, start?: Date): void;

            /** Levels the assigned allocation units assuming that all or the specified tasks within the control are fixed duration and effort driven; requires that assignmentsContent property of the task items is of type string, formatted as a list of resource names separated by commas, optionally having associated allocation percents declared between square brackets (e.g.: "John, Mary [50%], Diane [12.5%]"). */
            levelAllocations(items?: Item[]): void;

            /** Levels the assigned resources from all standard tasks within the control in order to avoid over allocation, by updating task timing values accordingly; requires that assignmentsContent property of the task items is of type string, formatted as a list of resource names separated by commas, optionally having associated allocation percents declared between square brackets (e.g.: "John, Mary [50%], Diane [12.5%]"); includeStartedTasks parameter indicates whether or not to consider already started tasks (i.e. having completion > 0), and start parameter specifies the date and time to consider for resource leveling algorithm. */
            levelResources(includeStartedTasks?: boolean, start?: Date): void;

            getItemSuccessors(item: Item): Item[];
            getItemSuccessorPredecessorItems(item: Item): PredecessorItem[];
            getItemAllocationUnits(item: Item): number;
            getItemAssignments(item: Item): { key: any; value: number; }[];

            /** Determines the list of the assignments of a specific task item, as strings indicating the assigned resource names. */
            getItemAssignedResources(item: Item): any[];

            getResourceAssignments(resourceName: any): { key: Item; value: number; }[];

            /** Determines the list of the assignments of a specific resource, as objects indicating the assigned task items. */
            getResourceAssignedItems(resourceName: any): Item[];

            /** Determines the list of all assigned resources within the current project, as strings indicating their names. */
            getAssignedResources(): any[];

            /** Returns a list of Schedule Chart items for the current project, optionally considering the minimum set of assignable resources specified as parameter; the Schedule Chart items may be displayed using a separate ScheduleChartView component instance. */
            getScheduleChartItems(assignableResources?: any[]): ScheduleChartView.Item[];

            getItemAssignmentsCost(item: Item): number; getItemExtraCost(item: Item): number;
            getItemCost(item: Item): number; setItemCost(item: Item, value: number): void;
            getResourceCost(resourceName: string): number;
            getProjectCost(): number;

            getAllocations(resourceName: any): { key: { start: Date; finish: Date }; value: number }[];

            /** Returns a list of Load Chart items for the current project, optionally considering the set of resources specified as parameter; the Schedule Chart items may be displayed using a separate LoadChartView component instance. */
            getLoadChartItems(resources?: any[]): LoadChartView.Item[];

            /** Returns a list of Load Chart items for the current project, considering the resource specified as parameter; the Schedule Chart items may be displayed using a separate LoadChartView component instance. */
            getLoadChartItems(resource: any): LoadChartView.Item[];

            /** Returns a list of filtered read only Gantt Chart items for the current project, considering the set of resources specified as parameter; the read only Gantt Chart items may be displayed using a separate GanttChartView component instance. */
            getFilteredGanttChartItems(resources: any[]): Item[];

            /** Returns a list of filtered read only Gantt Chart items for the current project, considering the resource specified as parameter; the read only Gantt Chart items may be displayed using a separate GanttChartView component instance. */
            getFilteredGanttChartItems(resource: any): Item[];

            /** Returns a list of PERT Chart items for the current project, optionally considering the maximum indentation, and start, finish, and link content and suffixes values specified as parameters; the PERT Chart items may be displayed using a separate PertChartView component instance. */
            getPertChartItems(maxIndentation?: number, startContent?: string, finishContent?: string, linkContent?: string, completedContentSuffix?: string, startingContentSuffix?: string): Pert.PertChartView.Item[];

            /** Returns a list of Network Diagram items for the current project, optionally considering the maximum indentation, and start and finish content values specified as parameters; the Network Diagram items may be displayed using a separate NetworkDiagramView component instance. */
            getNetworkDiagramItems(maxIndentation?: number, startContent?: string, finishContent?: string): Pert.NetworkDiagramView.Item[];

            isInitializing: boolean; isInitialized: boolean;

            /** Copies the common settings of the current component instance to the specified target settings collection; a secondary component instance may be initialized using the output collection. */
            copyCommonSettings(targetSettings: Settings): void;
        }

        /** Represents a task data item and its Gantt Chart representation. */
        interface Item {
            /** The object that is displayed to represent the task item in the grid and in task bar tool tips, usually the task name. */
            content: any;

            /** The hierarchy is based on the indentation level values of the tasks, so that a task with a lower index in the collection and having a specific indentation level will become the parent task for the tasks with a higher index in the collection and having an increased indentation level. */
            indentation?: number;

            /** If a parent task is expanded its child tasks become visible. If a parent task is collapsed its child tasks become invisible. */
            isExpanded?: boolean;

            start: Date; finish?: Date; completedFinish?: Date;

            /** A milestone task is displayed in the Gantt Chart view using a different task bar template. */
            isMilestone?: boolean;

            /** Optionally defines specific working week and day intervals and special nonworking days to consider for scheduling purposes. */
            schedule?: Schedule;

            baselineStart?: Date; baselineFinish?: Date;
            minStart?: Date; maxStart?: Date; minFinish?: Date; maxFinish?: Date;
            isRelativeToTimezone?: boolean;

            /** The assignments content to be displayed in the Gantt Chart view next to the associated task bar, but it is not used internally for computing/updating task finish date and time (generating duration) based on any updated assignments. */
            assignmentsContent?: any;

            isReadOnly?: boolean;
            isHidden?: boolean;
            isBarVisible?: boolean;
            isBarReadOnly?: boolean;
            isSummaryEnabled?: boolean;
            isParentSummarizationEnabled?: boolean;

            displayRowIndex?: number;

            /** Optional array of parts to be represented for this group item in the chart area. */
            parts?: Item[];

            "class"?: string; style?: string;
            barClass?: string; standardBarClass?: string; completedStandardBarClass?: string; summaryBarClass?: string; milestoneBarClass?: string; baselineBarClass?: string; barStyle?: string; standardBarStyle?: string; completedStandardBarStyle?: string; summaryBarStyle?: string; milestoneBarStyle?: string; baselineBarStyle?: string;
            taskTemplate? (item: Item): SVGElement;
            template? (item: Item): SVGElement;

            isSelected?: boolean;

            /** The predecessors collection defines predecessor items referring the task items that the current item depends of, and having the relations displayed in the Gantt Chart view as dependency lines, but it is not used internally for computing/updating task start and finish date and times (generating work time intervals) based on its defined dependencies. */
            predecessors?: PredecessorItem[];

            executionCost?: number;

            /** The index of the item in the managed hierarchy. */
            index?: number;

            /** The summary item that includes this task considering indentation values, or null when there is no such parent summary item. */
            parent?: Item;

            /** Indicates whether the task is a summary item. */
            hasChildren?: boolean;

            /** When this task is a summary item (i.e. hasChildren is set to true), returns an array of its child items. */
            children?: Item[];

            /** Indicates whether the task is visible within the hierarchy, i.e. it is not a descendent of a collapsed summary item. */
            isVisible?: boolean;

            /** Indicates whether the task is visible in the scrolling viewport of the control when virtualization is enabled. */
            isVirtuallyVisible?: boolean;
        }

        /** Represents a depdendency between two task data items and its Gantt Chart representation. */
        interface PredecessorItem {
            /** Task item that precedes the owner of the predecessor item (the item that the current item depends of). */
            item: Item;

            /** Indicates the type of the dependency; supported values are: FinishStart (default value), StartStart, FinishFinish, or StartFinish. */
            dependencyType?: string;

            /** Indicates an optional lag of the dependency (in milliseconds). */
            lag?: number;

            dependencyLineClass?: string; dependencyLineStyle?: string;
            template? (item: Item, predecessorItem: PredecessorItem): SVGElement;
        }

        /** Represents an object that defines working week and day intervals and special nonworking days either for an entire Gantt Chart or specific tasks. */
        interface Schedule {
            /** The start day of the working week interval, used when computing task effort values and when dragging and dropping task bars; by default it is set to Monday (1); previous days of the week are considered nonworking time and by default they are highlighted in the chart area. */
            workingWeekStart?: number;
            /** The finish day of the working week interval, used when computing task effort values and when dragging and dropping task bars; by default it is set to Friday (5); next days of the week are considered nonworking time and by default they are highlighted in the chart area. */
            workingWeekFinish?: number;

            /** The start time of the visible day interval, in milliseconds passed since midnight; by default it is set to 8 AM; the start of the working time interval of the day is also defined using the same value. */
            visibleDayStart?: number;
            /** The finish time of the visible day interval, in milliseconds passed since midnight; by default it is set to 4 PM; the finish of the working time interval of the day is also defined using the same value. */
            visibleDayFinish?: number;

            /** Optional collection of special nonworking days, such as holidays. */
            specialNonworkingDays?: Date[];
        }

        /** Represents settings for a GanttChartView component. */
        interface Settings {
            /** Name of the target to generically apply to the control; Standard, and Phone targets are supported; by default it is Standard. */
            target?: string;

            /** Name of the interaction mode to generically apply to the control; Standard, and TouchEnabled interaction modes are supported; by default it is Standard. */
            interaction?: string;

            /** Name of the theme to generically apply to the control; Modern, ModernBordered, and Aero themes are supported; by default it is Modern. */
            theme?: string;

            border?: string;
            containerClass?: string; containerStyle?: string;

            isGridVisible?: boolean; gridWidth?: string; chartWidth?: string;
            isSplitterEnabled?: boolean; splitterWidth?: number; splitterBackground?: string;
            minGridWidth?: number; minChartWidth?: number;

            isReadOnly?: boolean; isGridReadOnly?: boolean; isChartReadOnly?: boolean; isContentReadOnly?: boolean; isAssignmentsContentReadOnly?: boolean; isTaskStartReadOnly?: boolean; isTaskEffortReadOnly?: boolean; isTaskCompletionReadOnly?: boolean; areTaskPredecessorsReadOnly?: boolean;

            /** Indicates whether effort is preserved for tasks when end users change their start value from the default <em>Start</em> column in the grid; by default it is set to false. */
            isTaskEffortPreservedWhenStartChangesInGrid?: boolean;

            headerBackground?: string; headerHeight?: number;
            itemHeight?: number;

            /** Collection of objects indicating the columns to be presented in the grid. */
            columns?: Column[];

            itemClass?: string; itemStyle?: string;
            standardItemClass?: string; summaryItemClass?: string; milestoneItemClass?: string; standardItemStyle?: string; summaryItemStyle?: string; milestoneItemStyle?: string;

            selectedItemClass?: string; selectedItemStyle?: string;

            /** Indicates the selection behavior; support values are None (not allowed), Focus (single item selected triggered by focus), Single (single item selection using check box), Extended (multiple item selection using check boxes), and ExtendedFocus (multiple item selection using check boxes or triggered by focus); by default it is set to Focus. */
            selectionMode?: string;

            indentationLevelWidth?: number;

            cellClass?: string; cellStyle?: string;
            toggleButtonClass?: string; toggleButtonHoveringClass?: string; toggleButtonStyle?: string; toggleButtonHoveringStyle?: string;
            collapsedToggleButtonTemplate? (): HTMLElement; expandedToggleButtonTemplate? (): HTMLElement;

            /** Date and time to scroll to within the chart view. */
            displayedTime?: Date;

            /** Date and time to highlight (using a vertical bar) within the chart view. */
            currentTime?: Date;

            /** Start date and time of the scrollable chart area. */
            timelineStart?: Date;

            /** Start date and time of the scrollable chart area. */
            timelineFinish?: Date;

            isRelativeToTimezone?: boolean;

            /** Collection of objects indicating the scales to be presented in the chart. */
            scales?: Scale[];

            /** Time interval length (in milliseconds) to be used to dynamically round date and time during drag and drop update operations; by default it is set to quarter-hour (15 minutes). */
            updateScale?: number;

            /** Indicates the zoom level to be used for the chart area, and represents the actual number of pixels each hour in the timeline gets available; to zoom in, increase this value; to zoom out, decrease it; by default it is set to 2.5. */
            hourWidth?: number;

            /** The start day of the visible week interval; by default it is set to Sunday (0). */
            visibleWeekStart?: number;
            /** The finish day of the visible week interval; by default it is set to Saturday (6). */
            visibleWeekFinish?: number;

            /** The start day of the working week interval, used when computing task effort values and when dragging and dropping task bars; by default it is set to Monday (1); previous days of the week are considered nonworking time and by default they are highlighted in the chart area. */
            workingWeekStart?: number;
            /** The finish day of the working week interval, used when computing task effort values and when dragging and dropping task bars; by default it is set to Friday (5); next days of the week are considered nonworking time and by default they are highlighted in the chart area. */
            workingWeekFinish?: number;

            /** The start time of the visible day interval, in milliseconds passed since midnight; by default it is set to 8 AM; the start of the working time interval of the day is also defined using the same value. */
            visibleDayStart?: number;
            /** The finish time of the visible day interval, in milliseconds passed since midnight; by default it is set to 4 PM; the finish of the working time interval of the day is also defined using the same value. */
            visibleDayFinish?: number;

            /** Optional collection of special nonworking days, such as holidays. */
            specialNonworkingDays?: Date[];

            /** Allows initializing working week and day intervals and special nonworking days to consider for scheduling purposes using an alternative definition object. */
            schedule?: Schedule;

            barMargin?: number; barHeight?: number; barCornerRadius?: number;
            completedBarMargin?: number; completedBarHeight?: number; completedBarCornerRadius?: number;

            styleDefinitionTemplate? (): SVGDefsElement;
            standardBarClass?: string; summaryBarClass?: string; milestoneBarClass?: string; standardBarStyle?: string; summaryBarStyle?: string; milestoneBarStyle?: string;
            standardCompletedBarClass?: string; standardCompletedBarStyle?: string;
            collapsedSummaryLineClass?: string; collapsedSummaryLineStyle?: string;
            dependencyPointerClass?: string; dependencyPointerStyle?: string;
            dependencyLineClass?: string; dependencyLineStyle?: string;
            temporaryDependencyLineClass?: string; temporaryDependencyLineStyle?: string;
            assignmentsClass?: string; assignmentsStyle?: string;
            standardTaskTemplate? (item: Item): SVGElement; summaryTaskTemplate? (item: Item): SVGElement; milestoneTaskTemplate? (item: Item): SVGElement;
            extraTaskTemplate? (item: Item): SVGElement;

            isTaskToolTipVisible?: boolean;
            itemTemplate? (item: Item): SVGElement;

            areTaskAssignmentsVisible?: boolean;
            assignmentsTemplate? (item: Item): SVGElement;

            isTaskCompletedEffortVisible?: boolean;

            areTaskDependenciesVisible?: boolean;
            allowCreatingStartDependencies?: boolean; allowCreatingToFinishDependencies?: boolean;
            dependencyLineTemplate? (item: Item, predecessorItem: PredecessorItem): SVGElement;

            isDependencyToolTipVisible?: boolean;
            predecessorItemTemplate? (item: Item, predecessorItem: PredecessorItem): SVGElement;

            areToolTipsSimplified?: boolean;

            isDraggingTaskStartEndsEnabled?: boolean;

            visibilityFilter? (item: Item): boolean;

            /** Determines whether dependency constraints are enabled in the chart, providing auto-scheduling features for dependent tasks; by default is it set to false for optimization purposes. */
            areTaskDependencyConstraintsEnabled?: boolean;

            /** Determines whether dependency constraints are automatically ensured even while dragging task bars in the control (or only when the operation completes), when areTaskDependencyConstraintsEnabled property is set to true; by default it is set to false. */
            areTaskDependencyConstraintsEnabledWhileDragging?: boolean;

            /** Determines whether dependency constraints are disabled when the predecessor item is created using drag and drop operations in the chart, when areTaskDependencyConstraintsEnabled is set to false; by default it is set to false. */
            areTaskDependencyConstraintsDisabledWhenDropping?: boolean;

            areDependencyConstraintsAppliedOnStartedTasks?: boolean;
            areDependencyConstraintsAppliedOnMilestones?: boolean;

            isBaselineVisible?: boolean;

            allowUserToResizeColumns?: boolean;
            minColumnWidth?: number;
            maxColumnWidth?: number;

            isGridRowClickTimeScrollingEnabled?: boolean;

            isMouseWheelZoomEnabled?: boolean;
            isMouseWheelZoomEnabledMinHourWidth?: number;
            isMouseWheelZoomEnabledMaxHourWidth?: number;

            /** The collection of resource names available for task assignments */
            assignableResources?: string[];
            autoAppendAssignableResources?: boolean;

            /** Quantity values to consider when leveling resources, indicating maximum amounts of materials available for use at the same time. */
            resourceQuantities?: { key: string; value: number }[];
            maxLoadChartDisplayedResourceQuantity?: number;

            taskInitiationCost?: number;
            defaultResourceUsageCost?: number;
            specificResourceUsageCosts?: { key: string; value: number }[];
            defaultResourceHourCost?: number;
            specificResourceHourCosts?: { key: string; value: number }[];

            alternativeItemClass?: string; alternativeChartItemClass?: string; alternativeItemStyle?: string; alternativeChartItemStyle?: string;

            gridLines?: string; horizontalGridLines?: string; verticalGridLines?: string; horizontalChartLines?: string;

            /** Indicates whether the control will create task bars only when they need to be presented (such as only when scrolling the view to their positions); by default it is set to true for optimization purposes. */
            isVirtualizing?: boolean;

            /** The input type to use for the default start and finish cell value editors in the grid; "text" by default. */
            dateTimePickerType?: string;

            /** Indicates whether to use date picker controls for start and finish date cells in the grid when date time picker type is set to "text" and the required data control library is available. */
            useDatePicker?: boolean;

            /** Indicates the number of calendar selector levels that may be displayed on date picker controls; supported values: 1: months, 2: + years, 3: + decades. */
            calendarSelectorLevels?: number;

            /** Indicates whether to use time picker besides date picker controls (when useDatePicker is set to true) for start and finish date cells when the required data control library is available. */
            useTimePicker?: boolean;

            /** Indicates whether to use multi-selector combo box controls for assignment cells in the grid when the required data control library is available. */
            useResourceSelector?: boolean;

            /** Indicates whether to use tool tip controls for updating task start, finish, completion, dependencies, and/or assignments in the chart using drag and drop operations when the required data control library is available. */
            useUpdatingToolTips?: boolean;

            /** Names of the months to use at presentation time. */
            months?: string[];
            /** Names of the days of the week to use at presentation time. */
            daysOfWeek?: string[];

            /** Day of the week to consider as week start; by default it is set to Sunday (0); to set it to Monday use one (1). */
            weekStartDay?: number;

            /** Converts date values to text values whenever needed within the control; the function may be provided by the developer for further customization and/or localization purposes. */
            dateFormatter? (date: Date): string;
            /** Converts date and time values to text values whenever needed within the control; the function may be provided by the developer for further customization and/or localization purposes. */
            dateTimeFormatter? (dateTime: Date): string;
            /** Converts text values to date and time values whenever needed within the control; the function may be provided by the developer for further customization and/or localization purposes. */
            dateParser? (text: string): Date;

            /** Function called whenever the end user scrolls the chart area horizontally, changing the left most displayed time (settings.displayedTime). */
            displayedTimeChangeHandler? (displayedTime: Date): void;
            /** Function called whenever the end user performs mouse wheel zooming on the chart area, changing the zoom level (settings.hourWidth). */
            hourWidthChangeHandler? (hourWidth: number): void;
            /** Function called whenever the end user resizes the grid and chart areas horizontally, changing the splitter position (settings.gridWidth and settings.chartWidth). */
            splitterPositionChangeHandler? (gridWidth: number, chartWidth: number): void;
            /** Function called whenever the end user resizes a grid column, changing its width (column.width). */
            columnWidthChangeHandler? (column: Column, width: number): void;

            /** Function called whenever item properties change within the control, providing the changed item, relevant property name, and Boolean values indicating whether this change was directly triggered by the user, and whether this is the final change in a periodic operation such as a drag and drop action, specified as parameters; a custom function may be provided by the developer in order to receive notifications whenever data changes occur within the control, when using the default grid columns and task template functions. */
            itemPropertyChangeHandler? (item: Item, propertyName: string, isDirect: boolean, isFinal: boolean): void;
            /** Function called whenever summary item expansion state changes within the control, providing the expanded or collapsed item, and a Boolean value indicating the updated expansion state, specified as parameters. */
            itemExpansionChangeHandler? (item: Item, isExpanded: boolean): void;
            /** Function called whenever item selection changes within the control, providing the selected or unselected item, a Boolean value indicating the updated selection state, and a Boolean value indicating whether this change was directly triggered by the user, specified as parameters. */
            itemSelectionChangeHandler? (item: Item, isSelected: boolean, isDirect: boolean): void;

            /** Function called whenever an item is moved in the managed list of the control, providing the item, source and target positions of the item, specified as parameters. */
            itemMoveHandler? (item: Item, fromIndex: number, toIndex: number): void;

            itemContextMenuHandler? (e: Event): void;
            predecessorItemContextMenuHandler? (e: Event): void;
        }

        /** Represents a grid column displayed by the GanttChartView component. */
        interface Column {
            isTreeView?: boolean;

            header: any;
            width: number; minWidth?: number; maxWidth?: number;

            isReadOnly?: boolean; allowUserToResize?: boolean;
            isSelection?: boolean;

            headerClass?: string; headerStyle?: string;
            cellClass?: string; cellStyle?: string;

            /** Function that returns the output (document node) to be presented within the grid cell of this column in the standard view, for a specific item received as parameter. */
            cellTemplate(item: Item): HTMLElement;

            exportCellTemplate? (item: Item): HTMLElement;
        }

        /** Represents a chart scale displayed by the GanttChartView component. */
        interface Scale {
            /** Type of the scale; supported values are: Years, Months, Weeks, Days, Hours, NonworkingTime (highlighting weekends), CurrentTime (current time vertical bar), FutureTime (current time vertical bar with future highlighting support), and Custom (the developer needs to also set the intervals collection in this case, using time interval objects defined by start and finish properties). */
            scaleType: string;

            isHeaderVisible?: boolean; headerHeight?: number;

            /** Format to use for scale header texts; supported values are: DateTime, Date, Hour, DayOfWeek, DayOfWeekAbbreviation, Day, Month, MonthAbbreviation, Year, MonthYear, Localized, and Custom (the developer needs to also set the headerText property of each interval object within the intervals collection of the scale object in this case), or a function that converts a Date parameter to a presentation string. */
            headerTextFormat?: any;

            headerClass?: string; headerStyle?: string;

            isHighlightingVisible?: boolean;
            highlightingClass?: string; highlightingStyle?: string;

            isSeparatorVisible?: boolean;
            separatorClass?: string; separatorStyle?: string;
        }

        /** Represents export settings for a GanttChartView component. */
        interface ExportSettings {
            title?: string; preparingMessage?: string;
            isGridVisible?: boolean;
            columnIndexes?: number[];
            timelineStart?: Date; timelineFinish?: Date;
            hourWidth?: number;
            startRowIndex?: number; endRowIndex?: number;
            rotate?: boolean;
            autoClose?: boolean;
        }
    }

    /** Represents a control that presents resource and assigned task data items using a Schedule Chart and an associated grid. */
    module ScheduleChartView {
        /**
         * Initializes a ScheduleChartView component instance.
         * @param element The HTMLElement that would host the user interface of the component.
         * @param items resource data objects to be managed and presented by the component.
         * @param settings Configuration settings for the component behavior and appearance.
         */
        function initialize(element: HTMLElement, items: Item[], settings?: Settings, license?: String): Element;

        /** Returns an array of default definitions that you can further customize and use as value for the columns property of the control settings used at initialization time. */
        function getDefaultColumns(items: Item[], settings: Settings): GanttChartView.Column[];

        /** Returns an array of default definitions that you can further customize and use as value for the scales property of the control settings used at initialization time. */
        function getDefaultScales(settings: Settings): GanttChartView.Scale[];

        function getDefaultStyleDefinitionTemplate(controlElement: Element, settings: Settings): () => SVGDefsElement;
        function getDefaultStandardTaskTemplate(items: GanttChartView.Item[], controlElement: Element, settings: Settings): (item: GanttChartView.Item) => SVGElement;
        function getDefaultMilestoneTaskTemplate(items: GanttChartView.Item[], controlElement: Element, settings: Settings): (item: GanttChartView.Item) => SVGElement;
        function getDefaultItemTemplate(settings: Settings): (item: GanttChartView.Item) => SVGElement;
        function getDefaultAssignmentsTemplate(settings: Settings): (item: GanttChartView.Item) => SVGElement;
        
        /** Inside task template functions, sets up task drag and drop behavior for the non-null SVG elements specified to be designed as thumbs, considering the specified item and item positioning in the chart. */
        function initializeTaskDraggingThumbs(startThumb: SVGElement, startOnlyThumb: SVGElement, finishThumb: SVGElement, completedFinishThumb: SVGElement, item: GanttChartView.Item, itemLeft: number, itemRight: number, itemCompletedRight: number): void;

        /** Inside task template functions, sets up assignment update drag and drop behavior for the non-null SVG element specified to be designed as a thumb inside its specified container group that would be used to supplementary present temporary assignment target rectangles during drag and drop operations, considering the specified item and item positioning in the chart. */
        function initializeAssignmentDraggingThumb(thumb: SVGElement, containerGroup: SVGGElement, item: GanttChartView.Item, itemTop: number, itemRight: number): void;

        function getWorkingTime(dateTime: Date, settings: Settings): Date;
        function getEffort(start: Date, finish: Date, settings: Settings): number;
        function getFinish(start: Date, effort: number, settings: Settings): Date;
        function getStart(effort: Date, finish: number, settings: Settings): Date;
        function getCompletion(start: Date, completedFinish: Date, finish: Date, settings: Settings): number;
        function getCompletedFinish(start: Date, completion: number, finish: Date, settings: Settings): number;

        function textColumnTemplateBase(document: HTMLDocument, valueGetter: () => any, isVisibleGetter?: () => boolean): HTMLElement;
        function textInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;

        /** Prepares the specified date values to be used for component method input, considering that after initialization the component uses UTC date and time values internally; this method may also be called using a component instance object. */
        function getInputDate(date: Date): Date;
        /** Prepares the specified date values to be used for component method result or field output, considering that after initialization the component uses UTC date and time values internally; this method may also be called using a component instance object. */
        function getOutputDate(date: Date): Date;

        /** Represents an HTML element that supplementary provides ScheduleChartView component services. */
        interface Element extends GanttChartView.Element {
            scheduleChartItems: Item[];
            settings: Settings;

            refreshScheduleChartItem(item: Item): void;

            insertScheduleChartItem(index: number, item: Item): void; addScheduleChartItem(item: Item): void; insertScheduleChartItems(index: number, items: Item[]): void; addScheduleChartItems(items: Item[]): void;
            removeScheduleChartItem(item: Item): void; removeScheduleChartItems(items: Item[]): void;
            moveScheduleChartRange(fromIndex: number, count: number, toIndex: number): void;
            moveScheduleChartItem(item: Item, toIndex: number);
            moveScheduleChartItemUp(item: Item): void; moveScheduleChartItemDown(item: Item): void;

            setItemContent(item: Item, value: any): void;

            getCurrentItem(): Item;
            getSelectedItem(): Item; getSelectedItems(): Item[];
            selectItem(item: Item): void; unselectItem(item: Item): void;

            scrollToItem(item: Item): void;

            getItemTop(item: Item): number;

            /** Calls itemPropertyChangeHandler function specified within the settings collection using the specified item, property name, and Boolean indicators for direct user actions and completed actions as arguments. */
            onItemPropertyChanged(item: Item, propertyName: string, isDirect: boolean, isFinal: boolean): void;

            isScheduleChartInitializing: boolean; isScheduleChartInitialized: boolean;
        }

        /** Represents a resource data item and its Schedule Chart representation. */
        interface Item extends GanttChartView.Item {
            /** The object that is displayed to represent the resource item in the grid, usually the resource name. */
            content: any;

            /** Task data items assigned to the current resource. */
            ganttChartItems: GanttChartView.Item[];

            /** The index of the item in the Schedule Chart item collection. */
            scheduleChartIndex?: number;
        }

        /** Represents settings for a ScheduleChartView component. */
        interface Settings extends GanttChartView.Settings {
            assignmentThumbClass?: string; assignmentThumbStyle?: string;
            temporaryAssignmentThumbClass?: string; temporaryAssignmentThumbStyle?: string;

            assignmentThumbTemplate? (item: GanttChartView.Item): SVGElement;
        }
    }

    /** Represents a control that presents resource and allocation data items using a Load Chart and an associated grid. */
    module LoadChartView {
        /**
         * Initializes a LoadChartView component instance.
         * @param element The HTMLElement that would host the user interface of the component.
         * @param items resource data objects to be managed and presented by the component.
         * @param settings Configuration settings for the component behavior and appearance.
         */
        function initialize(element: HTMLElement, items: Item[], settings?: Settings, license?: String): Element;

        /** Returns an array of default definitions that you can further customize and use as value for the columns property of the control settings used at initialization time. */
        function getDefaultColumns(items: Item[], settings: Settings): GanttChartView.Column[];

        /** Returns an array of default definitions that you can further customize and use as value for the scales property of the control settings used at initialization time. */
        function getDefaultScales(settings: Settings): GanttChartView.Scale[];

        function getDefaultAllocationTemplate(items: GanttChartView.Item[], controlElement: Element, settings: Settings): (item: AllocationItem) => SVGElement;

        function getWorkingTime(dateTime: Date, settings: Settings): Date;

        function textColumnTemplateBase(document: HTMLDocument, valueGetter: () => any, isVisibleGetter?: () => boolean): HTMLElement;
        function textInputColumnTemplateBase(document: HTMLDocument, width: number, valueGetter: () => any, valueSetter: (value: any) => void, isEnabledGetter?: () => boolean, isVisibleGetter?: () => boolean, isBoldGetter?: () => boolean): HTMLElement;

        /** Prepares the specified date values to be used for component method input, considering that after initialization the component uses UTC date and time values internally; this method may also be called using a component instance object. */
        function getInputDate(date: Date): Date;
        /** Prepares the specified date values to be used for component method result or field output, considering that after initialization the component uses UTC date and time values internally; this method may also be called using a component instance object. */
        function getOutputDate(date: Date): Date;

        /** Represents an HTML element that supplementary provides LoadChartView component services. */
        interface Element extends ScheduleChartView.Element {
            loadChartItems: Item[];
            settings: Settings;

            refreshLoadChartItem(item: Item): void;

            insertLoadChartItem(index: number, item: Item): void; addLoadChartItem(item: Item): void; insertLoadChartItems(index: number, items: Item[]): void; addLoadChartItems(items: Item[]): void;
            removeLoadChartItem(item: Item): void; removeLoadChartItems(items: Item[]): void;
            moveLoadChartRange(fromIndex: number, count: number, toIndex: number): void;
            moveLoadChartItem(item: Item, toIndex: number);
            moveLoadChartItemUp(item: Item): void; moveLoadChartItemDown(item: Item): void;

            setItemContent(item: Item, value: any): void;

            getCurrentItem(): Item;
            getSelectedItem(): Item; getSelectedItems(): Item[];
            selectItem(item: Item): void; unselectItem(item: Item): void;

            scrollToItem(item: Item): void;

            getItemTop(item: Item): number;

            /** Calls itemPropertyChangeHandler function specified within the settings collection using the specified item, property name, and Boolean indicators for direct user actions and completed actions as arguments. */
            onItemPropertyChanged(item: Item, propertyName: string, isDirect: boolean, isFinal: boolean): void;

            isLoadChartInitializing: boolean; isLoadChartInitialized: boolean;
        }

        /** Represents a resource data item and its Load Chart representation. */
        interface Item extends ScheduleChartView.Item {
            /** Allocation data items assigned to the current resource. */
            ganttChartItems: AllocationItem[];

            /** The index of the item in the Load Chart item collection. */
            loadChartIndex?: number;
        }

        interface AllocationItem extends GanttChartView.Item {
            finish: Date;

            /** Indicates the capacity used from the assigned resource item during the time interval represented by the current allocation item. */
            units: number;
        }

        /** Represents settings for a LoadChartView component. */
        interface Settings extends ScheduleChartView.Settings {
            /** The maximum allocation units that are to be displayed as a full height bar in in the chart. */
            maxDisplayedUnits?: number;

            normalAllocationBarClass?: string; underAllocationBarClass?: string; overAllocationBarClass?: string; normalAllocationBarStyle?: string; underAllocationBarStyle?: string; overAllocationBarStyle?: string;
            allocationTemplate? (item: AllocationItem): SVGElement;
        }
    }
}
