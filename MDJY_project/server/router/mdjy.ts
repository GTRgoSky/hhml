import { Request, Response } from 'express';
let httpRouter = require('./http');

// 第一层需要爬取的接口，用输入的值替换 :  ${replaceURL}
let serchURL =
    'http://asia.ensembl.org/Homo_sapiens/Ajax/search?q=(+${replaceURL}^316+AND+species:%22CrossSpecies%22+)+OR+(+${replaceURL}^190+AND+species:%22Human%22+)+OR+(+${replaceURL}^80+AND+species:%22Mouse%22+)+OR+(+${replaceURL}+AND+species:%22Zebrafish%22+)&fq=(++(++species:%22CrossSpecies%22+AND+(+reference_strain:1+)++)++OR++(++species:%22Human%22+AND+(+reference_strain:1+)++)++OR++(++species:%22Mouse%22+AND+(+reference_strain:1+)++)++OR++(++species:%22Zebrafish%22+AND+(+reference_strain:1+)++)++)&fq=species:%22Human%22&hl=true&hl.fl=_hr&hl.fl=content&hl.fl=description&hl.fragsize=500&start=0&rows=10';

let exportURL =
    'http://asia.ensembl.org/Homo_sapiens/Export/Output/Transcript?db=core;flank3_display=0;flank5_display=0;g=${replaceOne};output=fasta;r=${replaceTwo};strand=feature;t=${replaceThree};param=cdna;genomic=unmasked;_format=HTML';
class mdjyRoute extends httpRouter {
    constructor() {
        super();
    }
    public router(app: any) {
        // http://asia.ensembl.org/Homo_sapiens/Ajax/search
        app.route('/mdjy').get(async (req: Request, res: Response) => {
            console.log(req.query.id);
            let id = req.query.id;
            let str = serchURL.replace(/\${replaceURL}/g, id);
            exportURL = exportURL.replace('${replaceThree}', id);
            let response = await this.httpGet(str);
            res.status(200).send({
                message: 'GET request successfulll!!!!',
                response: response.body,
            });
        });
    }
}

module.exports = new mdjyRoute();
