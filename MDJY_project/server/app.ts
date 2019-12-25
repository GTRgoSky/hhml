import express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './router/index';

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

let app = new App().app;

const PORT = 3099;

app.listen(PORT, () => {
    console.log('Express server listening on  http://localhost:' + PORT);
});
export default app;
