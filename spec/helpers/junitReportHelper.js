var reporters = require('jasmine-reporters');

var junitReporter = new reporters.JUnitXmlReporter({
  savePath: "reports/junit",
  consolidateAll: true
});

jasmine.getEnv().addReporter(junitReporter);
