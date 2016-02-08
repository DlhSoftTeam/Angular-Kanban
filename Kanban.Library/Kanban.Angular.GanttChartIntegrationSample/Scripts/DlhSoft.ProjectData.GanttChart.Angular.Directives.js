// Version 1.0.0.0.
var module = angular.module("DlhSoft.ProjectData.GanttChart.Directives", []);
dsDefinePDGCDirective(module, "GanttChart");
dsDefinePDGCDirective(module, "ScheduleChart");
dsDefinePDGCDirective(module, "LoadChart");
function dsDefinePDGCDirective(module, directiveName, controlName) {
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
                    DlhSoft.Controls[controlName ? controlName : directiveName + "View"].initialize(controlElement, items, settings, license);
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
