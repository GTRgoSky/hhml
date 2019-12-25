// umi 里约定 src/models 下的 model 会被自动注入，你无需手动注入。
interface payloadINF {
  payload: any;
}

export default {
  namespace: 'toolList', // 表示在全局 state 上的 key
  state: {
    toolList: [
      { name: 'dva', age: 1, key: '1' },
      { name: 'antd', age: 2, key: '2' },
    ],
  }, // 是初始值，在这里是空数组
  // reducers 等同于 redux 里的 reducer，接收 action，同步更新 state
  reducers: {
    delete(state: any, { payload: id }: payloadINF) {
      console.log(state, id);
      let key = new Date().valueOf() + '';
      let saveObj = Object.assign({}, state);
      saveObj.toolList.push({ name: 'antd' + key, age: 2, key: key });
      return saveObj;
    },
  },
};
