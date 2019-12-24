import React, {
  Component
} from 'react';
import {
  Form, Input, Button, Table, Card, List, PageHeader, Tooltip
} from 'antd';

import styles from './index.css';

const { TextArea } = Input;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Tumor',
  dataIndex: 'tumor',
  key: 'tumor',
}, {
  title: 'Normal',
  dataIndex: 'normal',
  key: 'normal',
}];
let Listdata = [];
let useList = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: '',
      baseUrl: '',
      resTumor:'',
      resNormal:"",
      names:"",
      historyList: [],

    }
    this.handleChange = this.handleChange.bind(this);
  };
  componentDidMount() {
    let history = localStorage.getItem('history');
    this.setState({
      historyList : JSON.parse(history) || []
    })
    useList = JSON.parse(history);
  };
  historySerch = (item) => {
    console.log(item);
    this.setState({
      resTumor:item.resTumor,
      resNormal:item.resNormal,
      baseUrl:item.baseUrl,
      keys:item.Keys
    })
  };
  serch = (excel) => {
    let self = this;
    //步骤一:创建异步对象
    var ajax = new XMLHttpRequest();
    //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
    ajax.open('post', 'http://localhost:8890/getInner');
    ajax.setRequestHeader("Content-Type","application/json");
    //步骤三:发送请求
    ajax.send("baseUrl="+self.state.baseUrl+'&keys='+self.state.keys+'&excel='+excel+'&names='+self.state.names);
    //步骤四:注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
      // document.getElementById('serchCont').innerHTML = ajax.responseText;
      if (ajax.readyState === 4 && ajax.status === 200) {
        //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
        let _cleanData = JSON.parse(ajax.responseText);
        let _strTumor = '';
        let _strNormal = '';
        Listdata = [];
         _cleanData.map((el,index)=>{
          _strTumor+=el.resTumor+'['+el.baseUrl+']';
          _strNormal+=el.resNormal+'['+el.baseUrl+']'
          Listdata.push({
            name :el.baseUrl ,
            tumor : el.resTumor,
            normal : el.resNormal,
            key:index
          })
         
        })
        let data = {
          baseUrl : self.state.baseUrl,
          Keys: self.state.keys,
          resTumor:_strTumor,
          resNormal:_strNormal
        }
        self.setState({
          resTumor:_strTumor,
          resNormal:_strNormal
        })
        let history = JSON.parse(localStorage.getItem('history')) || [];
        let _save = true;
        history.map(el=>{
          if(el.Keys == self.state.keys && el.baseUrl == self.state.baseUrl) {
            _save = false;
          }
        })
        if(_save) {
          history.push(data)
          if(history.length > 20) {
            history.unshift();
          }
          localStorage.setItem('history',JSON.stringify(history));
          self.setState({
            historyList:history
          })
          useList = history
        }
      }
    }
  };
  clear = () => {
    this.setState({
      keys: '',
      baseUrl: '',
      names:"",
    })
  };
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  };
  render() {
    return ( 
      <div>
        <Form className={styles.top} labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
          <Form.Item
            label="基因"
          >
            <TextArea name="baseUrl" onChange={this.handleChange} value={this.state.baseUrl} />
          </Form.Item>
          <Form.Item
            label="癌症"
          >
          <Input name="keys" onChange={this.handleChange} value={this.state.keys}/>
          </Form.Item>
          <Form.Item
            label="表格名称"
          >
          <Input name="names" onChange={this.handleChange} value={this.state.names} />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button type="primary" onClick = {this.serch.bind(this,'serch') }>
              搜索
            </Button>
            <Button type="primary" className={styles.test} onClick = {this.serch.bind(this,'excel') }>
              生成Excel
            </Button>
            <Button type="primary" className={styles.test} onClick = {this.clear.bind(this) }>
              清空表单
            </Button>
          </Form.Item>
        </Form>
        <PageHeader
          title="历史记录"
        />
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={useList}
          renderItem={el => (
            <List.Item>
              <Card  title={el.Keys} onClick = {this.historySerch.bind(this,el)}>
              <Tooltip placement="topLeft" title={el.baseUrl}>
                <p className={styles.history}>{el.baseUrl}</p>
              </Tooltip>
              </Card>
            </List.Item>
          )}
        />
        <PageHeader
          title="当前数据列表"
        />
        <Table columns={columns} dataSource={Listdata} />
      </div>
    );
  };

}
export default App;
