import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
export declare const sNextGenerator: (errorHandler: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => (error?: unknown) => Promise<void>;
export default sNextGenerator;
//# sourceMappingURL=sNextGenerator.d.ts.map