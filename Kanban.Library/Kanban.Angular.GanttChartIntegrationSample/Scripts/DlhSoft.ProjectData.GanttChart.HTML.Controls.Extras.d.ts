/// <reference path="DlhSoft.ProjectData.GanttChart.HTML.Controls.d.ts" />
declare module DlhSoft.Controls.GanttChartView.ProjectSerializer {
    function initialize(control: GanttChartView.Element, settings?: Settings): Service;
    class Service {
        public control: GanttChartView.Element;
        public settings: Settings;
        constructor(control: GanttChartView.Element, settings?: Settings);
        private static secondDuration;
        private static minuteDuration;
        private static hourDuration;
        private static dayDuration;
        private static weekDuration;
        public loadXml(xml: string): void;
        public importXml(input: any): void;
        private static parseXmlToTimeSpan(value);
        private static parseXmlToDateTime(value);
        private static indexOfKey(dictionary, key);
        static projectXmlTemplate: string;
        static scheduleWeekDayXmlTemplate: string;
        static scheduleDayWorkingTimesXmlTemplate: string;
        static taskXmlTemplate: string;
        static predecessorXmlTemplate: string;
        static resourceXmlTemplate: string;
        static assignmentXmlTemplate: string;
        public getXml(): string;
        private getXmlInternal(compact?);
        private saveProjectInfo(template, values);
        private saveGanttChartItem(item, template, values);
        private savePredecessorItem(item, predecessorItem, template, values);
        private saveResourceInfo(resource, template, values);
        private saveAssignmentInfo(item, resource, allocationUnits, template, values);
        private static applyStringTemplateValues(template, values);
        private static convertDateToXml(dateTime);
        private static convertDayTimeToXml(dayTime);
        private static convertTimeSpanToXml(timeSpan);
        public exportXml(output?: any): any;
        static initializeSettings(settings: Settings): void;
    }
    interface Settings {
        assignableResources?: string[];
        projectInfoLoadingHandler? (e: ElementLoadingEventArgs): void;
        ganttChartItemLoadingHandler? (e: GanttChartItemLoadingEventArgs): void;
        assignmentInfoLoadingHandler? (e: AssignmentInfoLoadingEventArgs): void;
        predecessorItemLoadingHandler? (e: PredecessorItemLoadingEventArgs): void;
        assignableResourceInfoLoadingHandler? (e: AssignableResourceInfoLoadingEventArgs): void;
        projectInfoSavingHandler? (e: ElementSavingEventArgs): void;
        ganttChartItemSavingHandler? (e: GanttChartItemSavingEventArgs): void;
        predecessorItemSavingHandler? (e: PredecessorItemSavingEventArgs): void;
        resourceInfoSavingHandler? (e: ResourceInfoSavingEventArgs): void;
        assignmentInfoSavingHandler? (e: AssignmentInfoSavingEventArgs): void;
        compact?: boolean;
        spaceSeparated?: boolean;
    }
    interface ElementLoadingEventArgs {
        sourceElement: GanttChartView.Element;
    }
    interface GanttChartItemLoadingEventArgs extends ElementLoadingEventArgs {
        ganttChartItem: GanttChartView.Item;
    }
    interface AssignmentInfoLoadingEventArgs extends GanttChartItemLoadingEventArgs {
        resource: string;
        allocationUnits: number;
    }
    interface PredecessorItemLoadingEventArgs extends GanttChartItemLoadingEventArgs {
        predecessorItem: GanttChartView.PredecessorItem;
    }
    interface AssignableResourceInfoLoadingEventArgs extends ElementLoadingEventArgs {
        resource: string;
    }
    interface ElementSavingEventArgs {
        outputXml: string;
    }
    interface GanttChartItemSavingEventArgs extends ElementSavingEventArgs {
        ganttChartItem: GanttChartView.Item;
    }
    interface PredecessorItemSavingEventArgs extends GanttChartItemSavingEventArgs {
        predecessorItem: GanttChartView.PredecessorItem;
    }
    interface ResourceInfoSavingEventArgs extends ElementSavingEventArgs {
        resource: string;
    }
    interface AssignmentInfoSavingEventArgs extends GanttChartItemSavingEventArgs {
        resource: string;
        allocationUnits: number;
    }
}
