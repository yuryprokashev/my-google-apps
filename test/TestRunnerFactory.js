var _global = this;
/**
 *
 * @constructor
 */
function TestRunnerFactory() {
    this.getBuilder = function () {
        return new TestRunnerBuilder();
    };

    /**
     *
     * @constructor
     */
    function TestRunnerBuilder() {
        var _urlParams, _filterStr, _moduleName;
        this.setUrlParams = function (object) {
            _urlParams = object;
            return this;
        };
        this.setFilterString = function (str) {
            _filterStr = str;
            return this;
        };
        this.setModuleName = function (str) {
            _moduleName = str;
            return this;
        };
        this.build = function () {
            return new TestRunner(_urlParams, _filterStr, _moduleName);
        }
    }

    /**
     *
     * @constructor
     */
    function TestRunner(urlParams, filterString, moduleName) {
        this.run = function () {
            var title = "Tests.";
            if(moduleName) title += " Module: " + moduleName;
            if(filterString) title += " Filter: " + filterString;
            QUnit.urlParams(urlParams);
            QUnit.config({
                title: title,
                filter: filterString,
                module: moduleName
            });
            QUnit.helpers(_global);
            QUnit.load(suites);
            return QUnit.getHtml();
        }
    }
}