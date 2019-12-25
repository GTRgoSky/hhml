import React from 'react';

import style from './index.less';

import { connect, Dispatch } from 'dva';

import ToolList from '../../components/toolList/toolList';

interface toolListINF {
    dispatch: Dispatch;
    toolList: any;
}

const toolList = ({ dispatch, toolList }: toolListINF) => {
    function handleDelete(id: any) {
        dispatch({
            type: 'toolList/delete',
            payload: id,
        });
    }
    return (
        <div>
            <h2 className={style.normal}>List of toolList</h2>
            <ToolList onDelete={handleDelete} listParam={toolList} />
        </div>
    );
};

export default connect(({ toolList }: any) => ({
    toolList,
}))(toolList);
