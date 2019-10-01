function doGet(event) {
    if(!event.pathInfo){
        return _renderQUnitTestResults(event);
    }
    function _renderQUnitTestResults(e){
        QUnit.urlParams(e.parameter);
        QUnit.config({
            title: "Money App. Tests"
        });
        QUnit.load(tests);
        return QUnit.getHtml();
    }
}
