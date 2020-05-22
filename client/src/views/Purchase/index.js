import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, InputNumber, Button } from 'antd';
import { NumberOutlined } from '@ant-design/icons';

function PurchaseView({ purchase, loading, match: { params: { ticket } } }) {
    const [amount, setAmount] = useState(1)
    const onSubmit = async () => {
        purchase({ amount, ticket });
    };

    return (
        <div className="login-form">
            <Form initialValues={{ email: "user47@gmail.com", password: "90825" }} onFinish={onSubmit}>
                <h3>Purchase Tickets</h3>
                <Form.Item
                    name="amount"
                >
                    <NumberOutlined /> <InputNumber min={1} value={amount} max={100} onChange={setAmount} />
                </Form.Item>
                <Form.Item>
                    <Button type="ghost" loading={loading} htmlType="submit">
                        Buy
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default inject(({ ticketStore: { purchase, loading } }) => ({ purchase, loading }))(observer(PurchaseView));