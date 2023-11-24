import { Request, Response, NextFunction } from 'express';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export function handleApiResponse<T>(res: Response, response: ApiResponse<T>): void {
  if (response.success) {
    res.json(response.data);
  } else {
    res.status(500).json({ error: response.error || 'Erro desconhecido na resposta da API.' });
  }
}

export function sendExceptionToClient(err: Error, res: Response, additionalInfo?: string): void {
  console.error(err.stack);

  // Aqui, você pode personalizar a resposta de erro para atender às suas necessidades
  res.status(500).json({
    error: err.message,
    additionalInfo: additionalInfo || '',
  });
}

// Middleware de erro personalizado
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  sendExceptionToClient(err, res);
}