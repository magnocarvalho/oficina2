const opts = {
    errorEventName: "error",
    logDirectory: "./bin/log/", // NOTE: folder must exist and be writable...
    fileNamePattern: "<DATE>.log",
    dateFormat: "YYYY.MM.DD"
};

const log = require("simple-node-logger").createRollingFileLogger(opts);

export default log;