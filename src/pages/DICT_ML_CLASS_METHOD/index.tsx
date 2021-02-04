import { useRouteMatch,Route,Switch, Redirect} from "react-router-dom"
import List from "./List";
import Create from "./Create";

/**
 * Component File Description
 * 
 */
const DictMlClassMethod = () =>{
    const match: any = useRouteMatch();
    return(
        <Switch>
            <Route exact path={`${match.url}`}>
                <Redirect to={`${match.url}/list`}/>
            </Route>           
            <Route path={`${match.url}/list`} component={List}/>
            <Route path={`${match.url}/create`} component={Create}/>

       </Switch>
    )
};
export default DictMlClassMethod;