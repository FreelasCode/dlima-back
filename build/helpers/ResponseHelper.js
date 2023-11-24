"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.sendExceptionToClient = exports.handleApiResponse = void 0;
function handleApiResponse(res, response) {
    if (response.success) {
        res.json(response.data);
    }
    else {
        res.status(500).json({ error: response.error || 'Erro desconhecido na resposta da API.' });
    }
}
exports.handleApiResponse = handleApiResponse;
function sendExceptionToClient(err, res, additionalInfo) {
    console.error(err.stack);
    // Aqui, você pode personalizar a resposta de erro para atender às suas necessidades
    res.status(500).json({
        error: err.message,
        additionalInfo: additionalInfo || '',
    });
}
exports.sendExceptionToClient = sendExceptionToClient;
// Middleware de erro personalizado
function errorHandler(err, req, res, next) {
    sendExceptionToClient(err, res);
}
exports.errorHandler = errorHandler;
