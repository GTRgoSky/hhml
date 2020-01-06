import { Request, Response } from 'express';
let httpRouter = require('./http');

// 第一层需要爬取的接口，用输入的值替换 :  ${replaceURL}
let serchURL =
    'http://asia.ensembl.org/Homo_sapiens/Ajax/search?q=(+${replaceURL}^316+AND+species:%22CrossSpecies%22+)+OR+(+${replaceURL}^190+AND+species:%22Human%22+)+OR+(+${replaceURL}^80+AND+species:%22Mouse%22+)+OR+(+${replaceURL}+AND+species:%22Zebrafish%22+)&fq=(++(++species:%22CrossSpecies%22+AND+(+reference_strain:1+)++)++OR++(++species:%22Human%22+AND+(+reference_strain:1+)++)++OR++(++species:%22Mouse%22+AND+(+reference_strain:1+)++)++OR++(++species:%22Zebrafish%22+AND+(+reference_strain:1+)++)++)&fq=species:%22Human%22&hl=true&hl.fl=_hr&hl.fl=content&hl.fl=description&hl.fragsize=500&start=0&rows=10';

let exportURL =
    'http://asia.ensembl.org/Homo_sapiens/Export/Output/Transcript?flank3_display=0;flank5_display=0;output=fasta;strand=feature;param=cdna;genomic=unmasked;_format=HTML';
class mdjyRoute extends httpRouter {
    constructor() {
        super();
    }
    public router(app: any) {
        // http://asia.ensembl.org/Homo_sapiens/Ajax/search
        app.route('/mdjy').get(async (req: Request, res: Response) => {
            try {
                console.log(req.query.id);
                let id = req.query.id;
                let str = serchURL.replace(/\${replaceURL}/g, id); // 替换搜索条件ID
                let { body: getSerchBody } = await this.httpGet(str); //获取搜索结果
                getSerchBody = JSON.parse(getSerchBody);
                let docsParams = getSerchBody.result.response.docs[0];
                let getSerchUrl = docsParams.domain + '/' + docsParams.domain_url; //获取下载地址
                let { body : responseURL } = await this.httpGet(getSerchUrl);// 匹配下载得路径 ; 匹配下载得真实路径提取关键字段g,r,t
                let getStrList = responseURL.match(/\/Homo_sapiens\/Export\/Configure\/Transcript\?\S+/)[0].replace(/\"/g, '').match(/\?\S+/)[0].substr(1).split(';');
                getStrList.map((el:string) => {
                    exportURL += ';' + el
                });
                let { body: getExportHTML } = await this.httpGet(exportURL); //获取导出页面
                // console.log(responseURL);
                res.status(200).send({
                    message: 'GET request successfulll!!!!',
                    response: getExportHTML,
                });
            } catch (e) {
                this.getErrorLog(e);
                res.status(200).send({
                    message: 'GET request successfulll!!!!',
                    response: 'error',
                });
            }
        });
    }
}

module.exports = new mdjyRoute();


// http://asia.ensembl.org/Homo_sapiens/Export/Output/Transcript?db=core;flank3_display=0;flank5_display=0;g=ENSG00000177133;output=fasta;r=1:3059615-3062531;strand=feature;t=ENST00000606861;param=cdna;genomic=unmasked;_format=HTML

// http://asia.ensembl.org/Homo_sapiens/Export/Configure/Transcript?db=core;g=ENSG00000177133;r=1:3059615-3062531;t=ENST00000606861;time=1577430661552.552