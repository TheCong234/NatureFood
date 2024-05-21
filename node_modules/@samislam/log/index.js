// ============ PRIVATE ============
const colors = require("colors/safe");

const engine = (label, key, ...message) => {
  const coloredLabel = colors.bold(label);
  if (message[0] === log.label) message[0] = coloredLabel;
  const coloredMessages = message.map((el) => {
    return colors[key](el);
  });
  console.log(...coloredMessages);
};

const setTheme = (key, value, label = capitalize(key)) => {
  if (!key || !value) throw new Error("Syntax: log.set('myName', 'red')");
  theme[key] = value;
  colors.setTheme(theme);
  log[key] = (...message) => {
    engine(label, key, ...message);
  };
};

const capitalize = (s) => {
  return s && s[0].toUpperCase() + s.slice(1);
};

const theme = {};
// ============ PUBLIC ============

const log = function (...message) {
  if (message.length != 0) console.log(...message);
};
Object.defineProperty(log, "label", {
  enumerable: false,
  value: Symbol(),
  configurable: false,
  // writable: false,
});
Object.defineProperty(log, "set", {
  enumerable: false,
  value (key, value, label) {
    setTheme(key, value, label);
  },
  configurable: false,
  // writable: false,
});

// PRE-DEFINED THEMES

const pre = {
  error: ["red", "Error:"],
  err: ["red", "Error:"],
  e: ["red", "Error:"],
  f: ["red", "Error:"],
  fail: ["red", "Fail:"],
  faild: ["red", "Faild:"],
  danger: ["red", "Danger:"],
  success: ["green", "Success:"],
  ok: ["green", "OK:"],
  s: ["green", "Success:"],
  w: ["yellow", "Warning:"],
  warn: ["yellow", "Warning:"],
  warning: ["yellow", "Warning:"],
  note: ["yellow", "Note: "],
  i: ["cyan", "info:"],
  info: ["cyan", "info:"],
  information: ["cyan", "information:"],
  done: ["cyan", "Done!"],
};

for ([key, value] of Object.entries(pre)) {
  const style = value[0];
  const label = value[1];
  log.set(key, style, label);
}

module.exports = log;
