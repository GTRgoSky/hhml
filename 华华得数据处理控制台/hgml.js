const Koa = require('koa');
const fs = require('fs.promised');
const static = require('koa-static')
const path = require('path')
const cors = require('koa2-cors');
const koa2Req = require('koa2-request');
let getExcel = require('./getExcel.js');//获取excel方法
var llq = require('child_process');
const app = new Koa();

// 具体参数我们在后面进行解释
app.use(cors({
  origin: function (ctx) {
    return "*"; // 允许来自所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(static(
  // path.join(__dirname, './hhlh/build')
  path.join(__dirname, './hhlh_update/dist')
))

app.use(async (ctx, next) => {
  if (ctx.request.url == '/getInner') {
    let postData = await parsePostData(ctx);
    console.log(new Date());
    if(!postData.baseUrl) {
      ctx.response.status = 301
      return ctx.response.body = '请填写后缀'
    }
    let _arr = [];
    await Promise.all(postData.baseUrl.split(',').map(async (el) => {
      //耗时操作
      let res = await koa2Req(`http://gepia.cancer-pku.cn/assets/PHP2/bodymap.php?gene=${el}&type=tumor&iflog=no`);
      let a = cleanData(res.body,postData.keys,el);
      _arr.push(a);
    }));
    if(postData.excel == 'excel'){
      getExcel(_arr,postData.names)
    }
    ctx.status = 200;
    return ctx.body = JSON.stringify(_arr);
  }
  function cleanData(data,keys,baseUrl) {
    let matchArr = data.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi);//提取所有script里面的内容
    let script = matchArr[3];
    let index = 0;
    let pass = false;
    script.match(/types=\[.*\]/)[0].replace('types=','').replace('[','').replace(']','').split(',').map((el,i)=>{
      if(el.replace(/"/g,'') == keys.toLocaleUpperCase()) {
        index = i;
        pass = true;
      }
    });
    if(pass === false) {
      return {
        "baseUrl":baseUrl,
        "KESY":keys,
        "resTumor":'没有该数值',
        "resNormal":'没有该数值'
      };
    }
    return {
      "baseUrl":baseUrl,
      "KESY":keys,
      "resTumor":script.match(/t=\[.*\]/)[0].match(/\d.*\d/)[0].split(',')[index],
      "resNormal":script.match(/n=\[.*\]/)[0].match(/\d.*\d/)[0].split(',')[index]
    }
  }
  function parsePostData() {
    return new Promise((resolve, reject) => {
      try {
        let postData = '';
        ctx.req.addListener('data', (data) => { // 有数据传入的时候
          postData += data;
        });
        ctx.req.on('end', () => {
          let parseData = parseQueryStr(postData);
          resolve(parseData);
        });
      } catch (e) {
        reject(e);
      }
    })
  }
  // 处理 string => json
  function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    for (let [index, queryStr] of queryStrList.entries()) {
      let itemList = queryStr.split('=');
      queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData;
  }
})

app.use(async (ctx, next) => {
  console.log(ctx.request.url)
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
  console.log(123);
  // ctx.body = 'Hello World';y
  ctx.response.type = 'html';
  // ctx.response.body = await fs.readFile('./hhlh/build/index.html', 'utf8');
  ctx.response.body = await fs.readFile('./hhlh_update/dist/index.html', 'utf8');
});



//启动日志
// app.use(convert(logger()));
//端口启动
app.listen(8890);

// http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);
console.log('app started at port: http://localhost:8890');

llq.exec('start http://localhost:8890');

