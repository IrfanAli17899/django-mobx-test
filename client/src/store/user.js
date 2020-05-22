import { observable, action } from 'mobx';
import axios, { setToken } from '../config';

class UserStore {
    @observable user = null;
    @observable loading = false;

    @action
    login = async (data) => {
        try {
            this.loading = true;
            const resObj = await axios.post('/auth/login', data);
            if (resObj?.data?.success) {
                this.user = resObj.data.data;
                this.loading = false;
                setToken(this.user.token);
                return true;
            }
        } catch (err) {
            console.log(err);
            const { response } = err;
            this.loading = false;
            alert(response?.data?.message || "Something went wrong !!")
        }
    }
}

export default UserStore;