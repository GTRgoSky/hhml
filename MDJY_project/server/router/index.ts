const routerMapList = require('./router.map.js');

export default class Routes {
    constructor() {
        console.log('init common');
    }
    public routes(app: any): void {
        routerMapList.map((el: string) => {
            let routerConfig = require(el);
            routerConfig.router(app);
        });
    }
}
