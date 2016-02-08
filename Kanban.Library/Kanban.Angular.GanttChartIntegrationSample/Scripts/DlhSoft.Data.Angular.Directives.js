// Version 1.1.0.0.
var module = angular.module("DlhSoft.Data.Directives", []);
dsDefineDDirective(module, "ContentControl");
dsDefineDIDirective(module, "ItemsControl");
dsDefineDDirective(module, "Button", ["click"]);
dsDefineDDirective(module, "ToggleButton", ["toggle"]);
dsDefineDDirective(module, "TextBox", undefined, true);
dsDefineDDirective(module, "CalendarSelector", ["selectedTime"]);
dsDefineDDirective(module, "Calendar", ["selectedDate"]);
dsDefineDVDirective(module, "DatePicker");
dsDefineDDirective(module, "CalendarDay", ["selectedTime", "header"]);
dsDefineDVDirective(module, "TimePicker", ["header"]);
dsDefineDVDirective(module, "DateTimePicker");
dsDefineDCVDirective(module, "MultiSelectorComboBox");
dsDefineDCVDirective(module, "ComboBox");
dsDefineDCVDirective(module, "DropDownList");
dsDefineDCDirective(module, "ToolTip");
dsDefineDGDirective(module, "Grid");
function dsDefineDDirective(module, directiveName, appendedScope, isChangeHandler, controlName) {
    module.directive("ds" + directiveName, function () {
        return {
            restrict: "EAC",
            replace: true,
            transclude: true,
            scope: getScope({
                settings: "=",
                license: "="
            }, appendedScope, isChangeHandler),
            template: "<div><ng-transclude></ng-transclude></div>",
            link: function (scope, element) {
                var controlElement = element[0];
                var valueProperty = null;
                var initialization = function () {
                    var settings = scope.settings;
                    if (!settings)
                        settings = {};
                    var license = scope.license;
                    if (isChangeHandler) {
                        valueProperty = appendedScope ? (appendedScope.indexOf("value") < 0 ? appendedScope[0] : "value") : "value";
                        var changeHandler = settings.valueChangeHandler;
                        if (!changeHandler)
                            changeHandler = settings.changeHandler;
                        settings.changeHandler = settings.valueChangeHandler = function (value) {
                            if (changeHandler)
                                changeHandler(value);
                            scope[valueProperty] = value;
                            scope.$apply();
                            if (scope.change)
                                scope.change(value);
                        }
                    }
                    var component = DlhSoft.Controls[controlName ? controlName : directiveName].initialize.apply(this, getArguments([controlElement, settings, license], appendedScope, scope));
                    if (isChangeHandler && component.setValue)
                        component.setValue(valueProperty && scope[valueProperty] ? scope[valueProperty] : element.text());
                }
                initialization();
                if (valueProperty) {
                    scope.$watch(valueProperty, function (nv, ov) {
                        if (nv == ov)
                            return;
                        var component = DlhSoft.Controls[controlName ? controlName : directiveName].get(controlElement);
                        var newValue = scope[valueProperty];
                        if (component.setValue && component.getValue && newValue != component.getValue())
                            setTimeout(function () { component.setValue(newValue); });
                    });
                }
            }
        };
    });
}
function dsDefineDVDirective(module, directiveName, appendedScope, controlName) {
    dsDefineDDirective(module, directiveName, combineScopes(["value"], appendedScope), true, controlName);
}
function dsDefineDIDirective(module, directiveName, appendedScope, controlName) {
    dsDefineDDirective(module, directiveName, combineScopes(["items"], appendedScope), true, controlName);
}
function dsDefineDCVDirective(module, directiveName, appendedScope, controlName) {
    dsDefineDDirective(module, directiveName, combineScopes(["availableChoices", "value"], appendedScope), true, controlName);
}
function dsDefineDCDirective(module, directiveName, appendedScope, controlName) {
    module.directive("ds" + directiveName, function () {
        return {
            restrict: "EAC",
            replace: true,
            transclude: true,
            scope: getScope({
                settings: "=",
                license: "="
            }, appendedScope),
            template: "<div><ng-transclude></ng-transclude></div>",
            link: function (scope, element) {
                var controlElement = element[0];
                var parent = element.parent();
                var targetElement = parent[0];
                var initialization = function () {
                    var settings = scope.settings;
                    if (!settings)
                        settings = {};
                    var license = scope.license;
                    DlhSoft.Controls[controlName ? controlName : directiveName].initialize.apply(this, getArguments([controlElement, targetElement, settings, license], appendedScope, scope, 1));
                }
                initialization();
            }
        };
    });
}
function dsDefineDGDirective(module, directiveName, controlName) {
    module.directive("ds" + directiveName, function () {
        return {
            restrict: "EAC",
            replace: true,
            transclude: true,
            scope: {
                items: "=",
                settings: "=",
                change: "=",
                autoRefresh: "@",
                license: "="
            },
            template: "<div><ng-transclude></ng-transclude></div>",
            link: function (scope, element) {
                var controlElement = element[0];
                var initialization = function () {
                    var items = scope.items;
                    if (!items)
                        items = [];
                    var settings = scope.settings;
                    if (!settings)
                        settings = {};
                    var license = scope.license;
                    var changeHandler = settings.itemPropertyChangeHandler;
                    DlhSoft.Controls[controlName ? controlName : directiveName].initialize(controlElement, items, settings, license);
                    if (scope.change) {
                        settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
                            if (changeHandler)
                                changeHandler(item, propertyName, isDirect, isFinal);
                            scope.change(item, propertyName, isDirect, isFinal);
                        }
                    }
                }
                initialization();
                var isWaitingToRefresh = false;
                var refresh = function () {
                    if (isWaitingToRefresh)
                        return;
                    isWaitingToRefresh = true;
                    setTimeout(function () {
                        initialization();
                        isWaitingToRefresh = false;
                    });
                }
                setTimeout(function () {
                    scope.$watch("items", refresh);
                    scope.$watch("settings", refresh);
                    if (scope.autoRefresh == "true")
                        scope.$watch(refresh);
                }, 0);
            }
        };
    });
}
function combineScopes(scope, appendedScope) {
    if (appendedScope) {
        for (var i = 0; i < appendedScope.length; i++)
            scope.push(appendedScope[i]);
    }
    return scope;
}
function getScope(scope, appendedScope, isChangeHandler) {
    if (appendedScope) {
        for (var i = 0; i < appendedScope.length; i++)
            scope[appendedScope[i]] = "=";
    }
    else if (isChangeHandler)
        scope["value"] = "=";
    if (isChangeHandler)
        scope["change"] = "=";
    return scope;
}
function getArguments(arguments, appendedScope, scope, injectionIndex) {
    if (typeof injectionIndex === "undefined")
        injectionIndex = 0;
    if (appendedScope) {
        for (var i = 0; i < appendedScope.length; i++)
            arguments.splice(i + injectionIndex + 1, 0, scope[appendedScope[i]]);
    }
    return arguments;
}
function dsDefineHDDirective(module, directiveName, controlName) {
    module.directive("ds" + directiveName, function () {
        return {
            restrict: "EAC",
            replace: true,
            transclude: true,
            scope: {
                items: "=",
                settings: "=",
                change: "=",
                autoRefresh: "@",
                license: "="
            },
            template: "<div><ng-transclude></ng-transclude></div>",
            link: function (scope, element) {
                var controlElement = element[0];
                var initialization = function () {
                    var items = scope.items;
                    if (!items)
                        items = [];
                    var settings = scope.settings;
                    if (!settings)
                        settings = {};
                    var license = scope.license;
                    var changeHandler = settings.itemPropertyChangeHandler;
                    DlhSoft.Controls[controlName ? controlName : directiveName].initialize(controlElement, items, settings, license);
                    if (scope.change) {
                        settings.itemPropertyChangeHandler = function (item, propertyName, isDirect, isFinal) {
                            if (changeHandler)
                                changeHandler(item, propertyName, isDirect, isFinal);
                            scope.change(item, propertyName, isDirect, isFinal);
                        }
                    }
                }
                initialization();
                var isWaitingToRefresh = false;
                var refresh = function() {
                    if (isWaitingToRefresh)
                        return;
                    isWaitingToRefresh = true;
                    setTimeout(function () {
                        initialization();
                        isWaitingToRefresh = false;
                    });
                }
                setTimeout(function () {
                    scope.$watch("items", refresh);
                    scope.$watch("settings", refresh);
                    if (scope.autoRefresh == "true")
                        scope.$watch(refresh);
                }, 0);
            }
        };
    });
}
