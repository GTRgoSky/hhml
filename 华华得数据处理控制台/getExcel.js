// workbook
//https://segmentfault.com/a/1190000004395728
const XLSX = require('xlsx');
module.exports = function getExcel(getData, keys) {
    var _headers = ['后缀', 'resNormal', 'resTumor'];
    let _data = [];
    let col = []
    let _keys = keys;
    getData.map(el => {
        el['后缀'] = el.baseUrl;
        _data.push(el);
    })
    _headers.map(el=>{
        col.push({
            wpx: 170
        })
    })
    var headers = _headers.map((v, i) => 
        Object.assign({}, { // 为 _headers 添加对应的单元格位置
            v: v,
            position: String.fromCharCode(65 + i) + 1
        }))
        .reduce((prev, next) => Object.assign({}, prev, {
            [next.position]: {
                v: next.v
            }
        }), {});

    var data = _data.map((v, i) => _headers.map((k, j) => Object.assign({}, {
            v: v[k],
            position: String.fromCharCode(65 + j) + (i + 2)
        })))
        .reduce((prev, next) => prev.concat(next))
        .reduce((prev, next) => Object.assign({}, prev, {
            [next.position]: {
                v: next.v
            }
        }), {});

    // 合并 headers 和 data
    var output = Object.assign({}, headers, data);
    // 获取所有单元格的位置
    var outputPos = Object.keys(output);
    // 计算出范围
    var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

    // 构建 workbook 对象
    
    var wb = {
        SheetNames: ['mySheet'],
        Sheets: {
            'mySheet': Object.assign({}, output, { '!ref': ref } , {'!cols' : col})
        }
    };

    // 导出 Excel
    XLSX.writeFile(wb, _keys + '.xlsx');
}