import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import Detail from "./Detail";
import Edit from "./Edit";

/**
 * Component File Description
 */
const Author = () => {
    const match: any = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${match.url}`}>
                <Redirect to={`${match.url}/detail`}/>
            </Route>
            <Route path={`${match.url}/detail`} component={Detail}/>
            <Route path={`${match.url}/edit`} component={Edit}/>
        </Switch>
    )
};

export default Author;