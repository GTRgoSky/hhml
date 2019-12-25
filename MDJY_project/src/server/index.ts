import request from 'umi-request';

interface paramsINF {
    method: string;
    body: any;
}

class commonClass {
    baseUrl: string;
    constructor() {
        this.baseUrl = 'http://localhost:3099';
    }
    async requestFun(url: string, params?: paramsINF) {
        if (params) {
            return request(this.baseUrl + url, {
                method: params.method || 'POST',
                body: params.body || '',
            });
        } else {
            return request(this.baseUrl + url);
        }
    }
}

export default commonClass;
