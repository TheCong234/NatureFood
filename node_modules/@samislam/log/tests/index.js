const colors = require("colors/safe");

const log = require("../");

const y = require("./y");
const x = require("./x");
log(1, 2, 3);
log("hi");
log("Hello", "Everyone");
log({ name: "mr.X" });
log.error(log.label)

log.error   (log.label, "Testing the log module")
log.err     (log.label, "Testing the log module")
log.e       (log.label, "Testing the log module")
log.f       (log.label, "Testing the log module")
log.fail    (log.label, "Testing the log module")
log.faild   (log.label, "Testing the log module")
log.danger  (log.label, "Testing the log module")
log.success (log.label, "Testing the log module")
log.ok      (log.label, "Testing the log module")
log.s       (log.label, "Testing the log module")
log.w       (log.label, "Testing the log module")
log.warn    (log.label, "Testing the log module")
log.warning (log.label, "Testing the log module")
log.note    (log.label, "Testing the log module")
log.i       (log.label, "Testing the log module")
log.info    (log.label, "Testing the log module")
log.information (log.label, "Testing the log module")
log.done    (log.label, "Testing the log module")




log.set("merhaba", "underline", "Hello: ");
log.merhaba("The application is now launched")
log.merhaba(log.label, "The application is now launched")

