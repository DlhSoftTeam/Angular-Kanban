/// <reference path="DlhSoft.HierarchicalData.HTML.Controls.d.ts" />
declare module DlhSoft.Controls {
    module ContentControl {
        function initialize(element: HTMLElement, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IContentContainer {
            public host: HTMLElement;
            public settings: Settings;
            constructor(host: HTMLElement, settings?: Settings, license?: String);
            public isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            static getContent(host: HTMLElement): HTMLElement;
            public refresh(): void;
            public content: any;
            public setContent(content: any): void;
            public contentContainer: HTMLElement;
        }
        interface Settings {
            theme?: string;
            containerStyle?: string;
            containerClass?: string;
            content?: any;
            contentTemplate? (document: HTMLDocument, content: any): HTMLElement;
        }
    }
    module ItemsControl {
        function initialize(element: HTMLElement, items?: any[], settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IItemsContainer {
            public host: HTMLElement;
            public settings: Settings;
            constructor(host: HTMLElement, items?: any[], settings?: Settings, license?: String);
            public isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            static getItems(host: HTMLElement): HTMLElement[];
            public refresh(): void;
            public items: any[];
            public setItems(items: any[]): void;
            public itemContainers: HTMLElement[];
        }
        interface Settings {
            theme?: string;
            itemContainerStyle?: string;
            itemContainerClass?: string;
            items?: any[];
            itemTemplate? (document: HTMLDocument, item: any): HTMLElement;
        }
    }
    module Button {
        function initialize(element: HTMLElement, clickHandler?: () => void, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IContentContainer, IHoverable, IPressable, IClickable, ISupportsDisabling {
            public host: HTMLElement;
            public clickHandler: () => void;
            public settings: Settings;
            constructor(host: HTMLElement, clickHandler?: () => void, settings?: Settings, license?: String);
            public isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            public refresh(): void;
            public content: any;
            public setContent(content: any): void;
            public isEnabled: boolean;
            public enable(): void;
            public disable(): void;
            public isHovering: boolean;
            public isPressed: boolean;
            public contentControlHost: HTMLElement;
            public contentControl: ContentControl.Element;
            private inputHost;
            public inputElement: HTMLInputElement;
            public contentControlSettings: ContentControl.Settings;
            public contentContainer: HTMLElement;
            public hoverableContainer: HTMLElement;
            public pressableContainer: HTMLElement;
        }
        interface Settings extends ContentControl.Settings {
            inputName?: string;
            inputType?: string;
            isEnabled?: boolean;
            disabledStyle?: string;
            disabledClass?: string;
            hoveringStyle?: string;
            hoveringClass?: string;
            pressedStyle?: string;
            pressedClass?: string;
            contentStyle?: string;
            contentClass?: string;
            hoveringHandler? (target: IHoverable): void;
            unhoveringHandler? (target: IHoverable): void;
            pressedHandler? (target: IPressable): void;
            unpressedHandler? (target: IPressable): void;
        }
    }
    module ToggleButton {
        function initialize(element: HTMLElement, toggleHandler?: (isPressed: boolean) => void, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element extends Button.Element implements IControlElement, IContentContainer, IHoverable, IPressable, IClickable {
            public toggleHandler: (isPressed: boolean) => void;
            constructor(host: HTMLElement, toggleHandler?: (isPressed: boolean) => void, settings?: Settings, license?: String);
            public isInitialized: boolean;
        }
        interface Settings extends Button.Settings {
        }
    }
    module TextBox {
        function initialize(element: HTMLElement, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, ITextEditor, ISupportsDisabling {
            public host: HTMLElement;
            public settings: Settings;
            constructor(host: HTMLElement, settings?: Settings, license?: String);
            public isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            public refresh(): void;
            public value: string;
            public getValue(): string;
            public setValue(value: string): void;
            public isEnabled: boolean;
            public enable(): void;
            public disable(): void;
            private inputHost;
            public inputElement: HTMLInputElement;
        }
        interface Settings {
            theme?: string;
            isEnabled?: boolean;
            isReadOnly?: boolean;
            value?: string;
            inputName?: string;
            inputType?: string;
            inputStyle?: string;
            inputClass?: string;
            raiseChangeOnBlur?: boolean;
            clickHandler? (): void;
            changeHandler? (value: string): void;
        }
    }
    module CalendarSelector {
        function initialize(element: HTMLElement, selectedTime?: number, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, INumberEditor {
            public host: HTMLElement;
            public selectedTime: number;
            public settings: Settings;
            constructor(host: HTMLElement, selectedTime?: number, settings?: Settings, license?: String);
            public isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            public refresh(): void;
            public getValue(): number;
            public setValue(value: number): void;
            public setDisplayedValue(value: number): void;
        }
        interface Settings {
            theme?: string;
            headerProvider? (document: HTMLDocument, displayedTime: number): Node;
            containerStyle?: string;
            containerClass?: string;
            headerStyle?: string;
            headerClass?: string;
            timeStyle?: string;
            timeClass?: string;
            selectedTimeStyle?: string;
            selectedTimeClass?: string;
            timeFormatter? (value: number): string;
            displayedTime?: number;
            rows?: number;
            columns?: number;
            invertMatrix?: boolean;
            minValue?: number;
            scrollingHeight?: string;
            displayedTimeChangeHandler? (displayedTime: number): void;
            selectedTimeChangeHandler? (selectedTime: number): void;
        }
    }
    module Calendar {
        function initialize(element: HTMLElement, selectedDate?: Date, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IDateEditor, IMultipleDateEditor, IDateRangeEditor, IMultipleDateRangeEditor {
            public host: HTMLElement;
            public selectedDate: Date;
            public settings: Settings;
            constructor(host: HTMLElement, selectedDate?: Date, settings?: Settings, license?: String);
            public isInitialized: boolean;
            private static secondDuration;
            private static minuteDuration;
            private static hourDuration;
            private static dayDuration;
            private static weekDuration;
            private static initialSundayDateTimeValue;
            static initializeSettings(settings: Settings): void;
            public refresh(): void;
            private draggingFromDate;
            private draggingToDate;
            public getValue(): Date;
            public setValue(value: Date): void;
            public setDisplayedValue(value: Date): void;
            public getValues(): Date[];
            public setValues(values: Date[]): void;
            public getValueRange(): DateInterval;
            public setValueRange(valueRange: DateInterval): void;
            public getValueRanges(): DateInterval[];
            public setValueRanges(valueRanges: DateInterval[]): void;
            public isValueSelected(date: Date): boolean;
            public invertValueSelection(date: Date): void;
            public selectedDates: Date[];
            public selectedDateRange: DateInterval;
            public selectedDateRanges: DateInterval[];
            private static getDate(dateTime);
            private static getPreviousWeekStart(dateTime);
            private static addDay(date);
            private static subtractDay(date);
            private static addTimeOfDay(date, timeOfDay);
            private static getFirstDayOfMonth(dateTime);
        }
        interface Settings {
            theme?: string;
            isReadOnly?: boolean;
            displayedDate?: Date;
            isTodayLinkVisible?: boolean;
            defaultTimeOfDay?: number;
            calendarSelectorLevels?: number;
            calendarSelectorPopupStyle?: string;
            calendarSelectorPopupClass?: string;
            containerStyle?: string;
            containerClass?: string;
            monthYearHeaderStyle?: string;
            monthYearHeaderClass?: string;
            dayOfWeekHeaderStyle?: string;
            dayOfWeekHeaderClass?: string;
            dayStyle?: string;
            dayClass?: string;
            otherMonthDayStyle?: string;
            otherMonthDayClass?: string;
            selectedDayStyle?: string;
            selectedDayClass?: string;
            todayLinkStyle?: string;
            todayLinkClass?: string;
            months?: string[];
            daysOfWeek?: string[];
            todayString?: string;
            forceSetOnClick?: boolean;
            displayedDateChangeHandler? (displayedDate: Date): void;
            selectedDateChangeHandler? (selectedDate: Date): void;
            monthRows?: number;
            monthColumns?: number;
            monthCellSpacing?: string;
            monthCellStyle?: string;
            monthCellClass?: string;
            applyMonthStyleForSingleCell?: boolean;
            applyNextMonthButtonToLastColumn?: boolean;
            applyNextMonthButtonToLastRow?: boolean;
            highlightingStyleSelector?: (Date: any, boolean: any) => string;
            highlightingClassSelector?: (Date: any, boolean: any) => string;
            disabledDayStyle?: string;
            disabledDayClass?: string;
            disabledDateSelector?: (Date: any) => boolean;
            allowMultipleSelection?: boolean;
            allowRangeSelection?: boolean;
            selectionChangedHandler? (): void;
            minValue?: Date;
        }
    }
    module DatePicker {
        function initialize(element: HTMLElement, value?: Date, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IDateEditor, IDropDown {
            public host: HTMLElement;
            public value: Date;
            public settings: Settings;
            constructor(host: HTMLElement, value?: Date, settings?: Settings, license?: String);
            public isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            public refresh(): void;
            private recordClick();
            private isDuringRecordedClick();
            public getValue(): Date;
            public setValue(value: Date): void;
            public setDisplayedValue(value: Date): void;
            public refreshValue(): void;
            private resetValue(value?);
            public openDropDown(): void;
            public closeDropDown(): void;
            private toggleDropDown();
            private inputHost;
            public inputElement: HTMLInputElement;
            public dropDownButtonElement: HTMLElement;
            public popupElement: HTMLElement;
            public calendarHost: HTMLElement;
            public calendar: Calendar.Element;
            public isOpen: boolean;
        }
        interface Settings extends Calendar.Settings {
            dateTimeFormatter? (value: Date): string;
            dateTimeParser? (value: string): Date;
            isNullValueAccepted?: boolean;
            openDropDownOnInputClick?: boolean;
            isDropDownButtonVisible?: boolean;
            dropDownButtonDefinition?: string;
            inputStyle?: string;
            inputClass?: string;
            popupStyle?: string;
            popupClass?: string;
            valueChangeHandler? (value: Date): void;
            dropDownOpenedHandler? (): void;
            dropDownClosedHandler? (): void;
        }
    }
    module CalendarDay {
        class Element implements IControlElement, INumberEditor {
            public host: HTMLElement;
            public selectedTime: number;
            public header: string;
            public settings: Settings;
            constructor(host: HTMLElement, selectedTime?: number, header?: string, settings?: Settings, license?: String);
            public isInitialized: boolean;
            private static secondDuration;
            private static minuteDuration;
            private static hourDuration;
            private static dayDuration;
            static initializeSettings(settings: Settings): void;
            public refresh(): void;
            public getValue(): number;
            public setValue(value: number): void;
            private static getTime(time, hourDivisions);
        }
        interface Settings {
            theme?: string;
            header?: string;
            isHeaderVisible?: boolean;
            isReadOnly?: boolean;
            isNowLinkVisible?: boolean;
            containerStyle?: string;
            containerClass?: string;
            headerStyle?: string;
            headerClass?: string;
            timeStyle?: string;
            timeClass?: string;
            selectedTimeStyle?: string;
            selectedTimeClass?: string;
            nowLinkStyle?: string;
            nowLinkClass?: string;
            nowString?: string;
            hourDivisions?: number;
            timeFormatter? (value: number): string;
            hourColumns?: number;
            scrollingHeight?: string;
            forceSetOnClick?: boolean;
            selectedTimeChangeHandler? (selectedTime: number): void;
            highlightingStyleSelector?: (number: any, boolean: any) => string;
            highlightingClassSelector?: (number: any, boolean: any) => string;
            disabledTimeStyle?: string;
            disabledTimeClass?: string;
            disabledTimeSelector?: (number: any) => boolean;
        }
    }
    module TimePicker {
        function initialize(element: HTMLElement, value?: number, header?: string, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, INumberEditor, IDropDown {
            public host: HTMLElement;
            public value: number;
            public header: string;
            public settings: Settings;
            constructor(host: HTMLElement, value?: number, header?: string, settings?: Settings, license?: String);
            public isInitialized: boolean;
            private static secondDuration;
            private static minuteDuration;
            private static hourDuration;
            private static dayDuration;
            static initializeSettings(settings: Settings): void;
            public refresh(): void;
            private recordClick();
            private isDuringRecordedClick();
            private isMouseWheelScrollingPopup(e);
            public getValue(): number;
            public setValue(value: number): void;
            public refreshValue(): void;
            private resetValue(value?);
            public openDropDown(): void;
            public closeDropDown(): void;
            private toggleDropDown();
            private inputHost;
            public inputElement: HTMLInputElement;
            public dropDownButtonElement: HTMLElement;
            public popupElement: HTMLElement;
            public calendarDayHost: HTMLElement;
            public calendarDay: CalendarDay.Element;
            public isOpen: boolean;
        }
        interface Settings extends CalendarDay.Settings {
            timeParser? (value: string): number;
            isNullValueAccepted?: boolean;
            openDropDownOnInputClick?: boolean;
            isDropDownButtonVisible?: boolean;
            dropDownButtonDefinition?: string;
            inputStyle?: string;
            inputClass?: string;
            popupStyle?: string;
            popupClass?: string;
            defaultPrefix?: string;
            valueChangeHandler? (value: number): void;
            dropDownOpenedHandler? (): void;
            dropDownClosedHandler? (): void;
        }
    }
    module DateTimePicker {
        function initialize(element: HTMLElement, value?: Date, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IElement, IDateEditor, IDropDown {
            public host: HTMLElement;
            public value: Date;
            public settings: Settings;
            constructor(host: HTMLElement, value?: Date, settings?: Settings, license?: String);
            public isInitialized: boolean;
            private static secondDuration;
            private static minuteDuration;
            private static hourDuration;
            private static dayDuration;
            static initializeSettings(settings: Settings): void;
            public datePicker: DatePicker.Element;
            public timePicker: TimePicker.Element;
            public inputElement: HTMLInputElement;
            public refreshValue(): void;
            public getValue(): Date;
            public setValue(value: Date): void;
            public getTimeValue(): number;
            public setTimeValue(value: number): void;
            public isOpen: boolean;
            public openDropDown(): void;
            public closeDropDown(): void;
            public isTimeOpen: boolean;
            public openTimeDropDown(): void;
            public closeTimeDropDown(): void;
            public getCurrentValuePart(): string;
        }
        interface Settings {
            theme?: string;
            isReadOnly?: boolean;
            areCurrentLinksVisible?: boolean;
            defaultTimeOfDay?: number;
            dateTimeFormatter? (value: Date): string;
            dateTimeParser? (value: string): Date;
            isNullValueAccepted?: boolean;
            popupStyle?: string;
            popupClass?: string;
            inputStyle?: string;
            inputClass?: string;
            openDropDownOnInputClick?: boolean;
            areDropDownButtonsVisible?: boolean;
            disabledDateSelector? (value: Date): boolean;
            disabledTimeSelector? (value: number): boolean;
            valueChangeHandler? (value: Date): void;
            calendarSelectorLevels?: number;
            months?: string[];
            daysOfWeek?: string[];
            datePickerSettings?: DatePicker.Settings;
            timePickerSettings?: TimePicker.Settings;
        }
    }
    module MultiSelectorComboBox {
        function initialize(element: HTMLElement, availableChoices?: string[], value?: string, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, ITextEditor, ITextSelector, IDropDown {
            public host: HTMLElement;
            public availableChoices: string[];
            public value: string;
            public settings: Settings;
            constructor(host: HTMLElement, availableChoices?: string[], value?: string, settings?: Settings, license?: String);
            public isInitialized: boolean;
            static initializeSettings(settings: Settings): void;
            public refresh(): void;
            private recordClick();
            private isDuringRecordedClick();
            private isMouseWheelScrollingPopup(e);
            public getValue(): string;
            public setValue(value: string): void;
            public refreshValue(): void;
            private resetValue(value?);
            private setValueInternal(value?, refresh?);
            public refreshAvailableChoices(): void;
            public getSelectedChoice(availableOnly?: boolean): string;
            public getSelectedChoices(availableOnly?: boolean): string[];
            public refreshSelectedChoices(): void;
            public selectChoice(choice: string): void;
            public unselectChoice(choice: string): void;
            private setSelectedChoice(choice, isSelected, closeDropDown?);
            public openDropDown(): void;
            public closeDropDown(): void;
            private toggleDropDown();
            private inputHost;
            public inputElement: HTMLInputElement;
            public dropDownButtonElement: HTMLElement;
            public popupElement: HTMLElement;
            public checkBoxListElement: HTMLElement;
            public checkBoxElements: HTMLElement[];
            public isOpen: boolean;
        }
        interface Settings {
            theme?: string;
            isReadOnly?: boolean;
            autoAppendAvailableChoices?: boolean;
            openDropDownOnInputClick?: boolean;
            isDropDownButtonVisible?: boolean;
            dropDownButtonDefinition?: string;
            separator?: string;
            isSpaceSeparated?: boolean;
            delimiters?: string[];
            inputStyle?: string;
            inputClass?: string;
            popupStyle?: string;
            popupClass?: string;
            choiceStyle?: string;
            choiceClass?: string;
            selectedChoiceStyle?: string;
            selectedChoiceClass?: string;
            areCheckBoxesVisible?: boolean;
            valueChangeHandler? (value: string): void;
            dropDownOpenedHandler? (): void;
            dropDownClosedHandler? (): void;
        }
    }
    module ComboBox {
        function initialize(element: HTMLElement, availableChoices?: string[], value?: string, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element extends MultiSelectorComboBox.Element {
            constructor(host: HTMLElement, availableChoices?: string[], value?: string, settings?: Settings, license?: String);
            public isInitialized: boolean;
        }
        interface Settings extends MultiSelectorComboBox.Settings {
        }
    }
    module DropDownList {
        function initialize(element: HTMLElement, availableChoices: string[], value?: string, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element extends ComboBox.Element {
        }
        interface Settings extends ComboBox.Settings {
        }
    }
    module ToolTip {
        function initialize(content: any, targetElement: HTMLElement, settings?: Settings, license?: String): Element;
        function get(element: HTMLElement): Element;
        class Element implements IControlElement, IAttached, ISupportsDisabling, ISupportsHiding, ISupportsPositioning, IContentContainer {
            public content: any;
            public targetElement: HTMLElement;
            public settings: Settings;
            constructor(content: any, targetElement: HTMLElement, settings?: Settings, license?: String);
            public host: HTMLElement;
            public contentContainer: HTMLElement;
            public isInitialized: boolean;
            public isEnabled: boolean;
            public isVisible: boolean;
            static initializeSettings(settings: Settings): void;
            public x: number;
            public y: number;
            public refresh(): void;
            public setPosition(x: number, y: number): void;
            public setHorizontalPosition(x: number): void;
            public setVerticalPosition(y: number): void;
            public enable(): void;
            public disable(): void;
            public show(): void;
            public hide(): void;
            private static previouslyShown;
            public setContent(content: any): void;
        }
        interface Settings {
            theme?: string;
            isEnabled?: boolean;
            duration?: number;
            isVisible?: boolean;
            containerStyle?: string;
            containerClass?: string;
            shownHandler? (): void;
            hiddenHandler? (): void;
        }
    }
    module Grid {
        function initialize(element: HTMLElement, items?: Item[], settings?: Settings, license?: String): Element;
        function getDefaultColumns(items?: Item[], settings?: Settings): Column[];
        interface Element extends Controls.TreeGrid.Element {
        }
        interface Settings extends Controls.TreeGrid.Settings {
        }
        interface Column extends Controls.TreeGrid.Column {
        }
        interface Item extends Controls.TreeGrid.Item {
        }
    }
    interface DateInterval {
        start: Date;
        finish: Date;
    }
    interface IElement {
        isInitialized: boolean;
    }
    interface IControlElement extends IElement {
        refresh(): void;
    }
    interface IContentContainer {
        content: any;
        setContent(content: any): void;
    }
    interface IItemsContainer {
        items: any[];
        setItems(items: any[]): void;
    }
    interface IHoverable {
        isHovering: boolean;
    }
    interface IPressable {
        isPressed: boolean;
    }
    interface IClickable {
        clickHandler(): void;
    }
    interface IChangeable {
        changeHandler(value: any): void;
    }
    interface IEditor {
        getValue(): any;
        setValue(value: any): void;
    }
    interface INumberEditor extends IEditor {
        getValue(): number;
        setValue(value: number): void;
    }
    interface IDateEditor extends IEditor {
        getValue(): Date;
        setValue(value: Date): void;
    }
    interface IMultipleDateEditor extends IDateEditor {
        getValues(): Date[];
        setValues(values: Date[]): void;
    }
    interface IDateRangeEditor extends IDateEditor {
        getValueRange(): DateInterval;
        setValueRange(valueRange: DateInterval): void;
    }
    interface IMultipleDateRangeEditor extends IDateRangeEditor, IMultipleDateEditor {
        getValueRanges(): DateInterval[];
        setValueRanges(valueRanges: DateInterval[]): void;
    }
    interface ITextEditor extends IEditor {
        getValue(): string;
        setValue(value: string): void;
    }
    interface ITextSelector {
        getSelectedChoice(): string;
        getSelectedChoices(): string[];
        selectChoice(value: string): void;
        unselectChoice(value: string): void;
    }
    interface IDropDown {
        isOpen: boolean;
        openDropDown(): void;
        closeDropDown(): void;
    }
    interface IAttached {
        targetElement: HTMLElement;
    }
    interface ISupportsDisabling {
        isEnabled: boolean;
        enable(): void;
        disable(): void;
    }
    interface ISupportsHiding {
        isVisible: boolean;
        show(): void;
        hide(): void;
    }
    interface ISupportsPositioning {
        x: number;
        y: number;
        setPosition(x: number, y: number): void;
        setHorizontalPosition(x: number): void;
        setVerticalPosition(y: number): void;
    }
}
