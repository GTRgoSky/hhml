import commonClass from './index';

class mdjyComp extends commonClass {
    constructor() {
        super();
    }
    serchMDJY() {
        return this.requestFun('/mdjy');
    }
}

export default new mdjyComp();
