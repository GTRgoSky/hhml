import { Request, Response, NextFunction } from 'express';
const routerMapList = require('./router.map.js');
const path = require('path');
let wingsTime = require('wing-time').timeFormat('YYYY-MM-DD hh:mm:ss');

export default class Routes {
    constructor() {
        console.log('init common');
    }
    public routes(app: any): void {
        app.all('*', (req: Request, res: Response, next: NextFunction) => {
            //设置允许跨域的域名，*代表允许任意域名跨域
            res.header('Access-Control-Allow-Origin', '*');
            //允许的header类型
            res.header('Access-Control-Allow-Headers', 'content-type,jwt-token,authorization');
            //跨域允许的请求方式
            res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
            //
            res.header('Access-Control-Allow-Credentials', 'true');
            console.log(wingsTime, ':', req.method.toLowerCase(), '->', req.originalUrl);
            if (req.method.toLowerCase() == 'options') {
                res.sendStatus(200); //让options尝试请求快速结束
            } else {
                next();
            }
        });
        routerMapList.map((el: string) => {
            let routerConfig = require(el);
            routerConfig.router(app);
        });

        app.route('/html').get(async (req: Request, res: Response, next: NextFunction) => {
            console.log('get html');
            res.sendFile(path.join(__dirname, '../../dist/index.html'));
        });

    }
}
