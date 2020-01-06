var request = require('request');
let commonLog = require('./log.ts');
interface postINF {
    url: string;
    body: string;
}

class httpRouter {
    constructor() { }
    public async httpGet(url: string) {
        let res = await new Promise((r, j) => {
            console.log(url);
            request(url, (error: Error, response: any, body: any) => {
                // console.log(error, response, body);
                try {
                    if (error) {
                        this.getErrorLog(error);
                        r({ body: 'error' });
                    }
                    r({ response, body: body });
                } catch (e) {
                    this.getErrorLog(e);
                    r({ body: 'error' });
                }
            });
        });
        return res;
    }
    public httpPOST({ url, body }: postINF) {
        request(
            {
                url: url, //请求路径
                method: 'POST', //请求方式，默认为get
                headers: {
                    //设置请求头
                    'content-type': 'application/json',
                },
                body: body, //post参数字符串
            },
            function (error: Error, response: any, body: any) {
                if (!error && response.statusCode == 200) {
                }
            },
        );
    }
    public getErrorLog(error: any) {
        commonLog.debug(error);
    }

    public httpSend(res: any, body: Object) {
        console.log('*****send message end*****');
        res.status(200).send(body);
    }
}

module.exports = httpRouter;
