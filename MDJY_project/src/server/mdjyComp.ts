import commonClass from './index';

class mdjyComp extends commonClass {
    constructor() {
        super();
    }
    serchMDJY(str: string) {
        return this.requestFun('/mdjy' + str);
    }

    serchMDJYGo(str: string) {
        return this.requestFun('/mdjyserch' + str);
    }
}

export default new mdjyComp();
