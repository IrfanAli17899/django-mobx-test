import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Table } from 'antd';


function TicketsView({ ticketStore: { getTicket, loading }, match: { params: { _id } } }) {
    const [ticket, setTicket] = useState([])
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const ticket = await getTicket(_id);
        setTicket(ticket ? [ticket] : []);

    }

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
    ];

    return (
        <div className="login-form form-big">
            <Table
                loading={loading}
                dataSource={ticket}
                columns={columns}
                rowKey={(row) => row._id}
                pagination={false}
            />;
        </div>
    )
}

export default inject(({ ticketStore }) => ({ ticketStore }))(observer(TicketsView));