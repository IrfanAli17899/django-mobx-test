import { observable, action } from 'mobx';

import axios from '../config';
import { notification } from 'antd';

class TicketStore {
    @observable tickets = [];
    @observable loading = false;

    @action
    getTickets = async (data) => {
        try {
            this.loading = true;
            const resObj = await axios.post('/tickets', data);
            if (resObj?.data?.success) {
                this.tickets = resObj.data.data;
                this.loading = false;
            }
        } catch (err) {
            console.log(err);
            const { response } = err;
            this.loading = false;
            notification.error({ message: response?.data?.message || "Something went wrong !!" })
        }
    }

    addTicket = async (data) => {
        try {
            this.loading = true;
            const resObj = await axios.post('/tickets/add', data);
            console.log(resObj);
            if (resObj?.data?.success) {
                this.tickets = [...this.tickets, resObj.data.data]
                this.loading = false;
            }
        } catch (err) {
            console.log(err);
            const { response } = err;
            this.loading = false;
            notification.error({ message: response?.data?.message || "Something went wrong !!" })
        }
    }

    @action
    deleteTicket = async ({ hotel, user, _id }) => {
        try {
            this.loading = true;
            const resObj = await axios.delete('/tickets/delete', { data: { hotel, user, ticket: _id } });
            if (resObj?.data?.success) {
                this.loading = false;
                const found = this.tickets.find(i => i._id === _id)
                this.tickets = this.tickets.filter(item => item != found);
            }
        } catch (err) {
            console.log(err);
            const { response } = err;
            this.loading = false;
            notification.error({ message: response?.data?.message || "Something went wrong !!" })
        }
    }

    @action
    purchase = async (data) => {
        try {
            this.loading = true;
            const resObj = await axios.put('/purchase/' + data.ticket, data);
            if (resObj?.data?.success) {
                this.loading = false;
                notification.success({ message: "Tickets Purchased !!" })
            }
        } catch (err) {
            console.log(err);
            const { response } = err;
            this.loading = false;
            notification.error({ message: response?.data?.message || "Something went wrong !!" })
        }
    }

    @action
    update = async (data) => {
        try {
            this.loading = true;
            const resObj = await axios.put('/tickets/update', data);
            if (resObj?.data?.success) {
                this.loading = false;
                const i = this.tickets.findIndex(i => i._id === data._id);
                console.log(i);
                const remaining = this.tickets.filter((item) =>item);
                remaining[i] = resObj.data.data;
                console.log(remaining);
                
                remaining.slice(i, 0, resObj.data.data);
                console.log(remaining);
                this.tickets = remaining;
            }
        } catch (err) {
            console.log(err);
            const { response } = err;
            this.loading = false;
            notification.error({ message: response?.data?.message || "Something went wrong !!" })
        }
    }

    @action
    getTicket = async (ticket) => {
        try {
            this.loading = true;
            const resObj = await axios.get('/tickets/' + ticket);
            if (resObj?.data?.success) {
                this.loading = false;
                return resObj.data.data;
            }
        } catch (err) {
            console.log(err);
            const { response } = err;
            this.loading = false;
            notification.error({ message: response?.data?.message || "Something went wrong !!" })
        }
    }
}

export default TicketStore;