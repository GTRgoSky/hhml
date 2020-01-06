import React from 'react';
import styles from './index.less';
import { Form, Select, Input, Button } from 'antd';
import server from '../../../server/mdjyComp';

const { Option } = Select;

interface RadarProps {
    resBack: any;
}
class App extends React.Component<RadarProps> {
    props: any;
    handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(this.props);
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values);
                server.serchMDJY('?id=' + values.note).then(res => {
                    console.log(res);
                    if (res.response == 'error') {
                        this.props.resBack(false);
                    } else {
                        this.props.resBack(res.response);
                    }
                });
            }
        });
    };

    handleSelectChange = (value: any) => {
        console.log(value);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Note">
                    {getFieldDecorator('note', {
                        // rules: [{ required: true, message: "Please input your note!" }]
                    })(<Input />)}
                </Form.Item>
                {/* <Form.Item label="Gender">
                    {getFieldDecorator('gender', {
                        // rules: [{ required: true, message: "Please select your gender!" }]
                    })(
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={this.handleSelectChange}
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                        </Select>,
                    )}
                </Form.Item> */}
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(App);

export default class FormCoordinated extends React.Component<RadarProps> {
    props: any;
    render() {
        return (
            <div className={styles.container}>
                <div id="components-form-demo-coordinated">
                    <WrappedApp {...this.props} />
                </div>
            </div>
        );
    }
}
