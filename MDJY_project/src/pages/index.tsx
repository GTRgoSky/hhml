import React from 'react';
import style from './index.less';
export default function() {
    return (
        <div className={style.normal}>
            <div className={style.welcome} />
            <ul className={style.list}>
                <li>华哥的一些数据工具集合</li>
            </ul>
        </div>
    );
}
