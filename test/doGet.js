/**
 * Allows to call the automated tests using the WebApp url and see the test results in the browser
 * @param e {Object} - google Http Event object
 * @return {HtmlOutput} - the google Html output object
 */
function doGet(e) {
    var testRunnerBuilder = new TestRunnerFactory().getBuilder();
    var testRunner = testRunnerBuilder
        .setUrlParams(e.parameter)
        .setFilterString(e.parameter.filter)
        .setModuleName(e.parameter.module)
        .build();
    return testRunner.run();
}