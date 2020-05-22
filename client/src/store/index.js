import UserStore from "./user";
import TicketStore from "./ticket";

const store = {
    userStore: new UserStore(),
    ticketStore: new TicketStore()
}

export default store;