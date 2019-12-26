import commonClass from './index';

class mdjyComp extends commonClass {
    constructor() {
        super();
    }
    serchMDJY(str: string) {
        return this.requestFun('/mdjy' + str);
    }
}

export default new mdjyComp();
