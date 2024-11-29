const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
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
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(), 
      winston.format.simple() 
    )
  }));
}

module.exports = logger;
