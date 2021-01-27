import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import List from "./List";
import Detail from "./Detail";
import Create from "./Create";

/**
 * Component File Description
 */
const User = () => {
    const match: any = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${match.url}`}>
                <Redirect to={`${match.url}/list`}/>
            </Route>
            <Route path={`${match.url}/list`} component={List}/>
            <Route path={`${match.url}/detail/:id`} component={Detail}/>
            <Route path={`${match.url}/create`} component={Create}/>
        </Switch>
    )
};

export default User;