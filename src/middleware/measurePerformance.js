const { responseTimeLogger } = require('../utils/logger'); 

const measurePerformance = (req, res, next) => {
  const start = Date.now();  

  res.on('finish', () => {
    const duration = Date.now() - start;  // Calcular el tiempo de duración
    const method = req.method;           // Método HTTP (GET, POST, PUT, DELETE)
    const route = req.originalUrl;       // Ruta solicitada
    const statusCode = res.statusCode;   // Código de estado de la respuesta

    // Log de tiempo de respuesta, se registra en response-time.log
    responseTimeLogger.info(`Method: ${method}, Route: ${route}, Status: ${statusCode}, Duration: ${duration}ms`);
  });

  next(); 
};

module.exports = measurePerformance;
