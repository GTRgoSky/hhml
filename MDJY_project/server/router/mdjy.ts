import { Request, Response } from 'express';

class mdjyRoute {
    constructor() {}
    public router(app: any) {
        app.route('/mdjy').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!',
            });
        });
    }
}

module.exports = new mdjyRoute();
