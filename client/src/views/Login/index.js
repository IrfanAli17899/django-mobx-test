import React from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login({ userStore: { login, loading }, history }) {
    const onSubmit = async ({ email, password }) => {
        if (!email || !password) {
            alert('Please Provide Credentials');
            return;
        }
        const user = await login({ email, password });
        if (user) {
            history.replace('/tickets');
        }
    };
    return (
        <div className="login-form">
            <Form initialValues={{ email: "user47@gmail.com", password: "90825" }} onFinish={onSubmit}>
                <h3>Hotel App</h3>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="ghost" loading={loading} htmlType="submit">
                        Log in
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject("userStore")(observer(Login));