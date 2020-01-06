import express from "express";
import * as bodyParser from 'body-parser';
import Routes from './router/index';
const path = require('path');
var llq = require('child_process');

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
        console.log(path.join(__dirname, '../dist'));
        this.app.use(express.static(
            path.join(__dirname, '../dist')
        ))
    }
}

let app = new App().app;

const PORT = 3099;

app.listen(PORT, () => {
    console.log('Express server listening on  http://localhost:' + PORT);
});

llq.exec('start http://localhost:3099');
export default app;
