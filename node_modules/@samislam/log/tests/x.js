const log = require("..");
const colors = require("colors/safe");
log.set("test", "rainbow", "Test: ");

log.test(log.label, "This is just a test!");

// let themes = [];
for ([key, value] of Object.entries(log)) {
  //   themes.push(key);
  log[key](log.label, "This is a test message!");
}
