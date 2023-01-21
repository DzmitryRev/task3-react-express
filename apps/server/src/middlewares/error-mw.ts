import { Response, Request } from 'express';
import ApiError from '../utils/api-error-util';

function errorMiddleware(err: Error, req: Request, res: Response) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
}

export default errorMiddleware;
