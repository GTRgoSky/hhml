import React, { RefObject } from 'react';
import styles from './index.less';
import { Modal, Button } from 'antd';

export default class ModalBasic extends React.Component {
    state = { visible: false, htmlShow: true };

    showModal = (res: string) => {
        this.setState({
            visible: true,
            htmlShow: true,
        });
        (document.getElementById('iwanthtml') as any).innerHTML = (res.match(
            /<pre>[\S|\s]+<\/pre>/,
        ) as any)[0];
    };

    showModalT = (res: string) => {
        this.setState({
            visible: true,
            htmlShow: false,
        });
        debugger;
        (document.getElementById('iserchhtml') as any).innerHTML = res;
    };

    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    maskClosable={false}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.state.htmlShow ? (
                        <section id="iwanthtml"></section>
                    ) : (
                        <section id="iserchhtml"></section>
                    )}
                </Modal>
            </div>
        );
    }
}
