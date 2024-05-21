import type { ErrorCodes } from './types';
interface ErrorBody {
    localErrorHandlerError: any;
    error: any;
}
export declare class CatchAsyncError extends Error {
    message: string;
    code: ErrorCodes;
    error: ErrorBody;
    name: string;
    constructor(message: string, code: ErrorCodes, error: ErrorBody);
}
export default CatchAsyncError;
//# sourceMappingURL=CatchAsyncError.d.ts.map