import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, RefObject } from 'react';
import { Spin, message } from 'antd';
import styles from './index.less';
import FormCoordinated from './FormCoordinated';
import ModalBasic from './ModalBasic';

const modalRef = React.createRef<any>();

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

    let testRef = function(res: string | boolean) {
        modalRef.current.showModal(res);
    };

    let testRefT = function(res: string | boolean) {
        console.log(res);
        modalRef.current.showModalT(res);
    };

    return (
        <PageHeaderWrapper content="目的基因搜索功能" className={styles.main}>
            <FormCoordinated
                resBack={(res: boolean | string) => {
                    if (!res) success();
                    if (res) testRef(res);
                }}
            />
            <iframe
                className={styles.iframecls}
                src="http://www.ncbi.nlm.nih.gov/orffinder/"
            ></iframe>

            <div
                style={{
                    paddingTop: 100,
                    textAlign: 'center',
                }}
            >
                <Spin spinning={loading} size="large"></Spin>
            </div>
            <ModalBasic ref={modalRef} />
        </PageHeaderWrapper>
    );
};
