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
                server.serchMDJYGo('?value=' + values.note).then(res => {
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
                <Form.Item label="获取字符串后的搜索">
                    {getFieldDecorator('acc', {})(<Input />)}
                </Form.Item>
                <Form.Item label="" className={styles.noshow}>
                    {getFieldDecorator(
                        'csrfmiddlewaretoken',
                        {},
                    )(
                        <Input value="3tLErIF8fsENA6ojWvy54S8SgRVMPk8ocPdHFGHV1B8xZ5wwBJUgxWj7qNuWG981" />,
                    )}
                </Form.Item>
                <Form.Item label="" className={styles.noshow}>
                    {getFieldDecorator('orffrom', {
                        initialValue: '',
                    })(<Input value="" />)}
                </Form.Item>
                <Form.Item label="" className={styles.noshow}>
                    {getFieldDecorator('orfto', {
                        initialValue: '',
                    })(<Input value="" />)}
                </Form.Item>
                <Form.Item label="" className={styles.noshow}>
                    {getFieldDecorator('minlen', {
                        initialValue: '25',
                    })(<Input value="25" />)}
                </Form.Item>
                <Form.Item label="" className={styles.noshow}>
                    {getFieldDecorator('gcode', {
                        initialValue: '1',
                    })(<Input value="1" />)}
                </Form.Item>
                <Form.Item label="" className={styles.noshow}>
                    {getFieldDecorator('startcdn', {
                        initialValue: '1',
                    })(<Input value="1" />)}
                </Form.Item>
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
