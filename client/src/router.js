import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './views/Login'
import TicketsView from './views/Tickets';
import TicketDetail from './views/TicketDetail';
import { observer, inject } from 'mobx-react';
import Purchase from './views/Purchase';


function Router({ userStore: { user } }) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/tickets" />} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/purchase/:ticket" component={Purchase} />
                <Route exact path="/tickets/:_id" component={TicketDetail} />
                <PrivateRoute exact user={user} path="/tickets" component={TicketsView} />
                <Route path="*" component={() => <div>404</div>} />
            </Switch>
        </BrowserRouter>
    )
}


const PrivateRoute = ({ user, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            user ? (<Component {...props} />) : (<Redirect to={{ pathname: "/login" }} />)
        )}
    />
)

export default inject("userStore")(observer(Router));