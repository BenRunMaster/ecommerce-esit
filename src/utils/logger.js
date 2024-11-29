const winston = require('winston');
const path = require('path');

// Logger para logs generales (app.log, error.log)
const generalLogger = winston.createLogger({
  level: 'info', // Nivel de logs predeterminado ('info', 'warn', 'error')
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`; 
    })
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(__dirname, 'logs', 'app.log'), 
      level: 'info' 
    }),
    new winston.transports.File({ 
      filename: path.join(__dirname, 'logs', 'error.log'), 
      level: 'error' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  generalLogger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Logger para logs de tiempo de respuesta (response-time.log)
const responseTimeLogger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'response-time.log'),
      level: 'info' 
    })
  ]
});

module.exports = {
  generalLogger,
  responseTimeLogger
};
