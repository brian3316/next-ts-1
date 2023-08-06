export interface ApiResponse {
    success: boolean;
    data: any;
    message: string;
    code: number;
}

export class ServiceResp {
    resParam: ApiResponse;
    constructor(resParam: ApiResponse) {
        this.resParam = resParam;
    }
    isSuccess() {
        return this.resParam.success;
    }
    static builder() {
        return new ServiceRespBuilder();
    }
}

class ServiceRespBuilder {
    resParam: ApiResponse;
    constructor() {
        this.resParam = {
            success: false,
            data: null,
            message: '',
            code: 0
        };
    }
    success(status: boolean) {
        this.resParam.success = status;
        return this;
    }
    data(data: any) {
        this.resParam.data = data;
        return this;
    }
    message(message: string) {
        this.resParam.message = message;
        return this;
    }
    code(code: number) {
        this.resParam.code = code;
        return this;
    }
    build() {
        return new ServiceResp(this.resParam);
    }
}