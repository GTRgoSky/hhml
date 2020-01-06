import React, { RefObject } from 'react';
import styles from './index.less';
import { Modal, Button } from 'antd';

export default class ModalBasic extends React.Component {
    state = { visible: false, htmlTest: '' };

    showModal = (res: string) => {
        this.setState({
            visible: true,
        });
        debugger;
        (document.getElementById('iwanthtml') as any).innerHTML = (res.match(
            /<pre>[\S|\s]+<\/pre>/,
        ) as any)[0];
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
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
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <section id="iwanthtml"></section>
                </Modal>
            </div>
        );
    }
}
