import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import styles from './index.less';
import FormCoordinated from './FormCoordinated';

export default () => {
    const [loading, setLoading] = useState<boolean>(true);
    const success = () => {
        message.error('未知错误，请联系老范或者等下再试一次');
    };
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);
    return (
        <PageHeaderWrapper content="目的基因搜索功能" className={styles.main}>
            <FormCoordinated
                resBack={() => {
                    success();
                }}
            />
            <div
                style={{
                    paddingTop: 100,
                    textAlign: 'center',
                }}
            >
                <Spin spinning={loading} size="large"></Spin>
            </div>
        </PageHeaderWrapper>
    );
};
