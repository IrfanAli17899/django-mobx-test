import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Form, Input, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


function TicketsView({ user, ticketStore: { getTickets, tickets, loading, deleteTicket, addTicket, update } }) {
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({ name: "", maxPurchaseCount: 0, _id: null });
    const [hotel, setHotel] = useState("");
    useEffect(() => {
        handleMenuClick({ key: user.hotels[0]._id });
    }, [])

    const onSubmit = async ({ maxPurchaseCount, name }) => {
        edit ? update({ maxPurchaseCount, name, _id: data._id }) :
            addTicket({ maxPurchaseCount, name, user: user._id, hotel: hotel._id });
        setData({ name: "", maxPurchaseCount: 0, _id: null });
        setEdit(false);
    };

    const onEdit = (row) => {
        setEdit(true);
        setData(row);
    }


    const handleMenuClick = ({ key }) => {
        setHotel(user.hotels.find(i => i._id === key));
        setEdit(false);
        getTickets({ user: user._id, hotel: key });

    };

    const onFieldsChange = (change) => {
        console.log(change);
        if (change.length) {
            const [{ name, value }] = change;
            console.log(name[0], value)
            setData({ ...data, [name[0]]: value });
        }
    };

    const menu = () => (
        <Menu selectedKeys={hotel._id} onClick={handleMenuClick}>
            {user.hotels.map(({ name, _id }) => (
                <Menu.Item key={_id}>
                    {name}
                </Menu.Item>
            ))}
        </Menu>
    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Max Purchase',
            dataIndex: 'maxPurchaseCount',
        },
        {
            title: 'Reamining',
            dataIndex: 'remaining',
        },
        {
            title: "",
            render: (row) => <Button onClick={() => onEdit(row)}><EditOutlined /> Edit</Button>
        },
        {
            title: "",
            render: (row) => <Button onClick={() => deleteTicket(row)}><DeleteOutlined /> Delete</Button>
        }
    ];
    const fields = [{ name: ['name'], value: data.name }, { name: ['maxPurchaseCount'], value: data.maxPurchaseCount }]
    return (
        <div className="login-form form-big">
            <div className="upper-container">
                <h1>{hotel?.name}</h1>
                <Dropdown overlay={menu()}>
                    <Button>
                        {hotel?.name}<DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <Form onFinish={onSubmit} fields={fields} onFieldsChange={onFieldsChange}>
                <h3>Create Ticket</h3>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Name!',
                        },
                    ]}
                >
                    <Input value={data.name} placeholder="Name" />
                </Form.Item>
                <Form.Item
                    name="maxPurchaseCount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Max Purchase!',
                        },
                    ]}
                >
                    <Input
                        value={data.maxPurchaseCount}
                        type="number"
                        placeholder="Max Purchase"
                    />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} htmlType="submit">
                        {edit ? "Update" : "Create"}
                    </Button>
                </Form.Item>
            </Form>
            <Table
                loading={loading}
                dataSource={tickets}
                columns={columns}
                rowKey={(row) => row._id}
                pagination={false}
            />;
        </div>
    )
}

export default inject(({ userStore: { user }, ticketStore }) => ({ user, ticketStore }))(observer(TicketsView));