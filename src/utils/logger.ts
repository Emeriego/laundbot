import pino from "pino";
import dayjs from "dayjs";

// Create a logger instance with custom configuration
const logger = pino({
  transport: {
    target: "pino-pretty", // Use pino-pretty for human-readable log output
  },
  base: {
    pid: false, // Exclude process ID from logs
  },
  timestamp: () => `,"time":"${dayjs().format()}"`, // Custom timestamp format using dayjs
});

export default logger;
