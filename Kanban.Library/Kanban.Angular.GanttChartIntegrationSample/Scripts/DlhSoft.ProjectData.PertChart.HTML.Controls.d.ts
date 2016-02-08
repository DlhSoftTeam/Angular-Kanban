/* Assembly: DlhSoft.ProjectData.PertChart.HTML.Controls,
   Company: DlhSoft,
   Product: Project Data Modern Library,
   Version: 5.3.0.0,
   Copyright: Copyright © 2012-2014 DlhSoft,
   Title: Project Data PERT Chart HTML Controls,
   Description: Project Data PERT Chart related HTML client components */

/*
/// <reference path='./DlhSoft.ProjectData.PertChart.HTML.Controls.js'/>
*/

declare module DlhSoft.Controls.Pert {
    /** Represents a control that presents task event data items using a PERT Chart. */
    module PertChartView {
        /**
         * Initializes a PertChartView component instance.
         * @param element The HTMLElement that would host the user interface of the component.
         * @param items Task event data objects to be managed and presented by the component.
         * @param settings Configuration settings for the component behavior and appearance.
         */
        function initialize(element: HTMLElement, items: Item[], settings?: Settings, license?: String): Element;

        function getDefaultStyleDefinitionTemplate(controlElement: Element, settings: Settings): () => SVGDefsElement;
        function getDefaultTaskEventTemplate(items: Item[], controlElement: Element, settings: Settings): (item: Item) => SVGElement;
        function getDefaultItemTemplate(settings: Settings): (item: Item) => SVGElement;
        function getDefaultDependencyLineTemplate(items: Item[], settings: Settings): (item: Item, predecessorItem: PredecessorItem) => SVGElement;
        function getDefaultPredecessorItemTemplate(settings: Settings): (item: Item, predecessorItem: PredecessorItem) => SVGElement;

        /** Inside task event template functions, sets up task event drag and drop behavior for the non-null SVG element specified to be designed as thumb, considering the specified item and item positioning in the chart. */
        function initializeTaskEventDraggingThumbs(thumb: SVGElement, item: Item, itemLeft: number, itemTop: number): void;

        function defaultTimeSpanFormatter(timeSpan: number): string;

        /** Represents an HTML element that supplementary provides PertChartView component services. */
        interface Element extends HTMLElement {
            items: Item[];
            settings: Settings;

            /** Updates the user interface considering all external item and settings changes. */
            refresh(): void;

            refreshItems(): void; refreshItem(item: Item): void; refreshPredecessorItems(item: Item): void; refreshItemGraph(item: Item): void;

            scrollToItem(item: Item): void; scrollToLeft(): void; scrollToTop(): void; scrollToRight(): void; scrollToBottom(): void;

            /** Returns the actual width of the chart area. */
            getChartWidth(): number;
            /** Returns the actual height of the chart area. */
            getChartHeight(): number;

            getItemLeft(item: Item): number;
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

            isItemCritical(item: Item): boolean; getCriticalItems(): Item[];
            isDependencyCritical(predecessorItem: PredecessorItem): boolean; getCriticalDependencies(): PredecessorItem[];

            /** Updates the vertical position of start and finish nodes, assuming they are the first and the last items in the collection, to the first or between the first and second row in the view (when there is at least one item with two or more successors in the collection). */
            repositionEnds(): void;

            isInitializing: boolean; isInitialized: boolean;
        }

        /** Represents a task event data item and its PERT Chart representation. */
        interface Item {
            /** The object that is displayed to represent the task event item in the task event shape tool tips, usually the task event name. */
            content: any;

            /** The object that is displayed to represent the task event item in the task event shape, usually a short task event name or identifier. */
            displayedText: any;

            isShapeVisible?: boolean;

            displayRowIndex?: number; displayColumnIndex?: number;

            shapeClass?: string; shapeStyle?: string;
            taskEventTemplate? (item: Item): SVGElement;
            template? (item: Item): SVGElement;

            /** The predecessors collection defines predecessor items (objects) representing the tasks displayed in the PERT Chart view as dependency lines. */
            predecessors?: PredecessorItem[];
        }

        /** Represents a depdendency between two task event data items and its PERT Chart representation. */
        interface PredecessorItem {
            /** Task event item that precedes the owner of the predecessor item (the item that the current item depends of). */
            item: Item;

            effort?: number; isEffortVirtual?: boolean;

            dependencyLineClass?: string; dependencyLineStyle?: string; dependencyTextClass?: string; dependencyTextStyle?: string;
            template? (item: Item, predecessorItem: PredecessorItem): SVGElement;
        }

        /** Represents settings for a PertChartView component. */
        interface Settings {
            /** Name of the target to generically apply to the control; Standard, and Phone targets are supported; by default it is Standard. */
            target?: string;

            /** Name of the theme to generically apply to the control; Modern, ModernBordered, and Aero themes are supported; by default it is Modern. */
            theme?: string;

            border?: string;
            containerClass?: string; containerStyle?: string;

            /** Indicates whether the user can change the canvas positions of task event items in the control by drag and drop operations (by default it is set to true). */
            canUserRearrangeItems?: boolean;

            /** Indicates whether the task event item shapes are snapping to row and column based guidelines in the control during drag and drop based rearrange operations (by default it is set to true). */
            snapRearrangedItemsToGuidelines?: boolean;

            chartMargin?: number;
            itemWidth?: number; itemHeight?: number;

            /** The aspect ratio of the chart, indicating the rate between horizontal and vertical item layout positioning. */
            aspectRatio?: number;

            shapeWidth?: number; shapeHeight?: number;
            dependencyTextBlockWidth?: number;

            styleDefinitionTemplate? (): SVGDefsElement;
            shapeClass?: string; shapeStyle?: string; dependencyTextClass?: string; dependencyTextStyle?: string;
            temporaryThumbClass?: string; temporaryThumbStyle?: string;
            dependencyLineClass?: string; dependencyLineStyle?: string;

            taskEventTemplate? (item: Item): SVGElement;
            extraTaskEventTemplate? (item: Item): SVGElement;

            isTaskEventToolTipVisible?: boolean;
            itemTemplate? (item: Item): SVGElement;

            dependencyLineTemplate? (item: Item, predecessorItem: PredecessorItem): SVGElement;

            isDependencyToolTipVisible?: boolean;
            predecessorItemTemplate? (item: Item, predecessorItem: PredecessorItem): SVGElement;

            /** Converts time span values to text values whenever needed within the control; the function may be provided by the developer for further customization and/or localization purposes. */
            timeSpanFormatter? (timeSpan: number): string;

            /** Function called whenever item properties change within the control, providing the changed item, relevant property name, and Boolean values indicating whether this change was directly triggered by the user, and whether this is the final change in a periodic operation such as a drag and drop action, specified as parameters; a custom function may be provided by the developer in order to receive notifications whenever data changes occur within the control. */
            itemPropertyChangeHandler? (item: Item, propertyName: string, isDirect: boolean, isFinal: boolean): void;
        }

        /** Represents export settings for a PertChartView component. */
        interface ExportSettings {
            title?: string; preparingMessage?: string;
            rotate?: boolean;
            autoClose?: boolean;
        }
    }

    /** Represents a control that presents task data items using a Network Diagram. */
    module NetworkDiagramView {
        /**
         * Initializes a NetworkDiagramView component instance.
         * @param element The HTMLElement that would host the user interface of the component.
         * @param items Task data objects to be managed and presented by the component.
         * @param settings Configuration settings for the component behavior and appearance.
         */
        function initialize(element: HTMLElement, items: Item[], settings?: Settings, license?: String): Element;

        function getDefaultStyleDefinitionTemplate(controlElement: Element, settings: Settings): () => SVGDefsElement;
        function getDefaultTaskTemplate(items: Item[], controlElement: Element, settings: Settings): (item: Item) => SVGElement;
        function getDefaultItemTemplate(settings: Settings): (item: Item) => SVGElement;
        function getDefaultDependencyLineTemplate(items: Item[], settings: Settings): (item: Item, predecessorItem: PredecessorItem) => SVGElement;
        function getDefaultPredecessorItemTemplate(settings: Settings): (item: Item, predecessorItem: PredecessorItem) => SVGElement;

        /** Inside task template functions, sets up task drag and drop behavior for the non-null SVG element specified to be designed as thumb, considering the specified item and item positioning in the diagram. */
        function initializeTaskDraggingThumbs(thumb: SVGElement, item: Item, itemLeft: number, itemTop: number): void;

        function defaultDateTimeFormatter(date: Date): string;
        function defaultTimeSpanFormatter(timeSpan: number): string;

        /** Prepares the specified date values to be used for component method input, considering that after initialization the component uses UTC date and time values internally; this method may also be called using a component instance object. */
        function getInputDate(date: Date): Date;
        /** Prepares the specified date values to be used for component method result or field output, considering that after initialization the component uses UTC date and time values internally; this method may also be called using a component instance object. */
        function getOutputDate(date: Date): Date;

        /** Represents an HTML element that supplementary provides NetworkDiagramView component services. */
        interface Element extends HTMLElement {
            items: Item[];
            settings: Settings;

            /** Updates the user interface considering all external item and settings changes. */
            refresh(): void;

            refreshItems(): void; refreshItem(item: Item): void; refreshPredecessorItems(item: Item): void; refreshItemGraph(item: Item): void;

            scrollToItem(item: Item): void; scrollToLeft(): void; scrollToTop(): void; scrollToRight(): void; scrollToBottom(): void;

            /** Returns the actual width of the diagram area. */
            getChartWidth(): number;
            /** Returns the actual height of the diagram area. */
            getChartHeight(): number;

            getItemLeft(item: Item): number;
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

            isItemCritical(item: Item): boolean; getCriticalItems(): Item[];
            isDependencyCritical(predecessorItem: PredecessorItem): boolean; getCriticalDependencies(): PredecessorItem[];

            /** Updates the vertical position of start and finish nodes, assuming they are the first and the last items in the collection, to the first or between the first and second row in the view (when there is at least one item with two or more successors in the collection). */
            repositionEnds(): void;

            isInitializing: boolean; isInitialized: boolean;
        }

        /** Represents a task data item and its Network Diagram representation. */
        interface Item {
            /** The object that is displayed to represent the task item in the task shape tool tips, usually the full task name and path. */
            content: any;

            /** The object that is displayed to represent the task item in the task shape, usually a short task name or identifier. */
            displayedText: any;

            effort: number; earlyStart: Date; earlyfinish: Date; lateState: Date; lateFinish: Date;

            /** A milestone task is displayed in the Network Diagram view using a supplemental task shape template. */
            isMilestone?: boolean;

            slack: number;

            isRelativeToTimezone?: boolean;

            isShapeVisible?: boolean;

            displayRowIndex?: number; displayColumnIndex?: number;

            shapeClass?: string; milestoneClass?: string; shapeStyle?: string; milestoneStyle?: string;
            taskTemplate? (item: Item): SVGElement;
            template? (item: Item): SVGElement;

            /** The predecessors collection defines predecessor items (objects) referring the task items that the current item depends of, and having the relations displayed in the Network Diagram view as dependency lines. */
            predecessors?: PredecessorItem[];
        }

        /** Represents a depdendency between two task data items and its Network Diagram representation. */
        interface PredecessorItem {
            /** Task item that precedes the owner of the predecessor item (the item that the current item depends of). */
            item: Item;

            dependencyLineClass?: string; dependencyLineStyle?: string;
            template? (item: Item, predecessorItem: PredecessorItem): SVGElement;
        }

        /** Represents settings for a NetworkDiagramView component. */
        interface Settings {
            /** Name of the target to generically apply to the control; Standard, and Phone targets are supported; by default it is Standard. */
            target?: string;

            /** Name of the theme to generically apply to the control; Modern, ModernBordered, and Aero themes are supported; by default it is Modern. */
            theme?: string;

            border?: string;
            containerClass?: string; containerStyle?: string;

            /** Indicates whether the user can change the canvas positions of task items in the control by drag and drop operations (by default it is set to true). */
            canUserRearrangeItems?: boolean;

            /** Indicates whether the task item shapes are snapping to row and column based guidelines in the control during drag and drop based rearrange operations (by default it is set to true). */
            snapRearrangedItemsToGuidelines?: boolean;

            diagramMargin?: number; 
            itemWidth?: number; itemHeight?: number;

            /** The aspect ratio of the diagram, indicating the rate between horizontal and vertical item layout positioning. */
            aspectRatio?: number;

            shapeWidth?: number; shapeHeight?: number;
            minDependencyLineLength?: number;

            styleDefinitionTemplate? (): SVGDefsElement;
            shapeClass?: string; milestoneClass?: string; shapeStyle?: string; milestoneStyle?: string;
            temporaryThumbClass?: string; temporaryThumbStyle?: string;
            dependencyLineClass?: string; dependencyLineStyle?: string;

            taskTemplate? (item: Item): SVGElement;
            extraTaskTemplate? (item: Item): SVGElement;

            isTaskToolTipVisible?: boolean;
            itemTemplate? (item: Item): SVGElement;

            dependencyLineTemplate? (item: Item, predecessorItem: PredecessorItem): SVGElement;

            isDependencyToolTipVisible?: boolean;
            predecessorItemTemplate? (item: Item, predecessorItem: PredecessorItem): SVGElement;

            /** Converts date and time values to text values whenever needed within the control; the function may be provided by the developer for further customization and/or localization purposes. */
            dateTimeFormatter? (dateTime: Date): string;
            
            /** Converts time span values to text values whenever needed within the control; the function may be provided by the developer for further customization and/or localization purposes. */
            timeSpanFormatter? (timeSpan: number): string;

            /** Function called whenever item properties change within the control, providing the changed item, relevant property name, and Boolean values indicating whether this change was directly triggered by the user, and whether this is the final change in a periodic operation such as a drag and drop action, specified as parameters; a custom function may be provided by the developer in order to receive notifications whenever data changes occur within the control. */
            itemPropertyChangeHandler? (item: Item, propertyName: string, isDirect: boolean, isFinal: boolean): void;
        }

        /** Represents export settings for a NetworkDiagramView component. */
        interface ExportSettings {
            title?: string; preparingMessage?: string;
            rotate?: boolean;
            autoClose?: boolean;
        }
    }
}
