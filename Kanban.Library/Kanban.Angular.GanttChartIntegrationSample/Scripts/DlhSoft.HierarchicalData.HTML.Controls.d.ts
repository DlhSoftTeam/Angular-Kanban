/* Assembly: DlhSoft.HierarchicalData.HTML.Controls,
   Company: DlhSoft,
   Product: Hierarchical Data Modern Library,
   Version: 5.3.5.3,
   Copyright: Copyright © 2012-2015 DlhSoft,
   Title: Hierarchical Data HTML Controls,
   Description: Hierarchical Data related HTML client components */

/*
/// <reference path='./DlhSoft.HierarchicalData.HTML.Controls.js'/>
*/

declare module DlhSoft.Controls {
    /** Represents a control that presents hierarchical data items using a tree-grid. */
    module TreeGrid {
        /**
         * Initializes a TreeGrid component instance.
         * @param element The HTMLElement that would host the user interface of the component.
         * @param items Node data objects to be managed and presented by the component.
         * @param settings Configuration settings for the component behavior and appearance.
         */
        function initialize(element: HTMLElement, items: Item[], settings?: Settings, license?: String): Element;

        /** Returns an array of default definitions that you can further customize and use as value for the columns property of the control settings used at initialization time. */
        function getDefaultColumns(items: Item[], settings: Settings): Column[];

        function getDefaultCollapsedToggleButtonTemplate(controlElement: Element, settings: Settings): () => SVGElement;
        function getDefaultExpandedToggleButtonTemplate(controlElement: Element, settings: Settings): () => SVGElement;

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

        /** Represents an HTML element that supplementary provides TreeGrid component services. */
        interface Element extends HTMLElement {
            items: Item[];
            settings: Settings;

            /** Updates the user interface considering all external item and settings changes. */
            refresh(): void;

            refreshGridItems(): void; refreshItems(): void; refreshGridItem(item: Item): void; refreshItem(item: Item): void; refreshItemPath(item: Item): void; refreshItemNeighbourhood(item: Item): void;

            insertItem(index: number, item: Item): void; addItem(item: Item): void; insertItems(index: number, items: Item[]): void; addItems(items: Item[]): void;
            removeItem(item: Item): void; removeItems(items: Item[]): void;
            moveRange(fromIndex: number, count: number, toIndex: number): void;
            moveItem(item: Item, toIndex: number): void;
            moveItemHierarchy(item: Item, toIndex: number): void;
            moveItemUp(item: Item): void; moveItemDown(item: Item): void;
            moveItemHierarchyUp(item: Item): void; moveItemHierarchyDown(item: Item): void;

            increaseItemIndentation(item: Item): void; decreaseItemIndentation(item: Item): void;

            setItemContent(item: Item, value: any): void;
            getItemIndexString(item: Item, zeroBased?: boolean): string;
            getCurrentItem(): Item;
            getSelectedItem(): Item; getSelectedItems(): Item[];
            selectItem(item: Item): void; unselectItem(item: Item): void;
            expandItem(item: Item): void; collapseItem(item: Item): void;
            scrollToItem(item: Item): void; scrollToBottom(): void;

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

            isInitializing: boolean; isInitialized: boolean;

            /** Copies the common settings of the current component instance to the specified target settings collection; a secondary component instance may be initialized using the output collection. */
            copyCommonSettings(targetSettings: Settings): void;
        }

        /** Represents a hierarchical data item and its tree-grid node representation. */
        interface Item {
            /** The object that is displayed to represent the node item in the grid, usually the node name. */
            content: any;

            /** The hierarchy is based on the indentation level values of the nodes, so that a node with a lower index in the collection and having a specific indentation level will become the node for the nodes with a higher index in the collection and having an increased indentation level. */
            indentation?: number;

            /** If a parent node is expanded its child nodes become visible. If a parent node is collapsed its child nodes become invisible. */
            isExpanded?: boolean;

            isReadOnly?: boolean;
            isHidden?: boolean;
            isSummaryEnabled?: boolean;

            "class"?: string; style?: string;

            isSelected?: boolean;

            /** The index of the item in the managed hierarchy. */
            index?: number;

            /** The summary item that includes this node considering indentation values, or null when there is no such parent summary item. */
            parent?: Item;

            /** Indicates whether the node is a summary item. */
            hasChildren?: boolean;

            /** When this node is a summary item (i.e. hasChildren is set to true), returns an array of its child items. */
            children?: Item[];

            /** Indicates whether the node is visible within the hierarchy, i.e. it is not a descendent of a collapsed summary item. */
            isVisible?: boolean;

            /** Indicates whether the node is visible in the scrolling viewport of the control when virtualization is enabled. */
            isVirtuallyVisible?: boolean;
        }

        /** Represents settings for a TreeGrid component. */
        interface Settings {
            /** Name of the target to generically apply to the control; Standard, and Phone targets are supported; by default it is Standard. */
            target?: string;

            /** Name of the interaction mode to generically apply to the control; Standard, and TouchEnabled interaction modes are supported; by default it is Standard. */
            interaction?: string;

            /** Name of the theme to generically apply to the control; Modern, ModernBordered, and Aero themes are supported; by default it is Modern. */
            theme?: string;

            border?: string;
            containerClass?: string; containerStyle?: string;

            gridWidth?: string;
            splitterWidth?: number;

            isReadOnly?: boolean; isContentReadOnly?: boolean;

            headerBackground?: string; headerHeight?: number;
            itemHeight?: number;

            /** Collection of objects indicating the columns to be presented in the grid. */
            columns?: Column[];

            itemClass?: string; itemStyle?: string;
            standardItemClass?: string; summaryItemClass?: string; standardItemStyle?: string; summaryItemStyle?: string;

            selectedItemClass?: string; selectedItemStyle?: string;

            /** Indicates the selection behavior; support values are None (not allowed), Focus (single item selected triggered by focus), Single (single item selection using check box), Extended (multiple item selection using check boxes), and ExtendedFocus (multiple item selection using check boxes or triggered by focus); by default it is set to Focus. */
            selectionMode?: string;

            indentationLevelWidth?: number;

            cellClass?: string; cellStyle?: string;
            toggleButtonClass?: string; toggleButtonHoveringClass?: string; toggleButtonStyle?: string; toggleButtonHoveringStyle?: string;
            collapsedToggleButtonTemplate? (): HTMLElement; expandedToggleButtonTemplate? (): HTMLElement;

            visibilityFilter? (item: Item): boolean;

            allowUserToResizeColumns?: boolean;
            minColumnWidth?: number;
            maxColumnWidth?: number;

            alternativeItemClass?: string; alternativeItemStyle?: string;

            gridLines?: string; horizontalGridLines?: string; verticalGridLines?: string;

            /** Indicates whether the control will populate grid rows only when they need to be presented (such as only when scrolling the view to their positions); by default it is set to true for optimization purposes. */
            isVirtualizing?: boolean;

            /** Function called whenever the end user resizes a grid column, changing its width (column.width). */
            columnWidthChangeHandler? (column: Column, width: number): void;

            /** Function called whenever item properties change within the control, providing the changed item, relevant property name, and Boolean values indicating whether this change was directly triggered by the user, and whether this is the final change in a periodic operation such as a drag and drop action, specified as parameters; a custom function may be provided by the developer in order to receive notifications whenever data changes occur within the control, when using the default grid columns. */
            itemPropertyChangeHandler? (item: Item, propertyName: string, isDirect: boolean, isFinal: boolean): void;
            /** Function called whenever summary item expansion state changes within the control, providing the expanded or collapsed item, and a Boolean value indicating the updated expansion state, specified as parameters. */
            itemExpansionChangeHandler? (item: Item, isExpanded: boolean): void;
            /** Function called whenever item selection changes within the control, providing the selected or unselected item, a Boolean value indicating the updated selection state, and a Boolean value indicating whether this change was directly triggered by the user, specified as parameters. */
            itemSelectionChangeHandler? (item: Item, isSelected: boolean, isDirect: boolean): void;

            /** Function called whenever an item is moved in the managed list of the control, providing the item, source and target positions of the item, specified as parameters. */
            itemMoveHandler? (item: Item, fromIndex: number, toIndex: number): void;
        }

        /** Represents a grid column displayed by the TreeGrid component. */
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

        /** Represents export settings for a TreeGrid component. */
        interface ExportSettings {
            title?: string; preparingMessage?: string;
            columnIndexes?: number[];
            startRowIndex?: number; endRowIndex?: number;
            rotate?: boolean;
            autoClose?: boolean;
        }
    }
}
