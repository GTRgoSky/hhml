import React from 'react';
import style from './index.less';

const BasicLayout: React.FC = props => {
    return <div className={style.normal}>{props.children}</div>;
};

export default BasicLayout;
