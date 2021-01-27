import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Home, Author, ExamplePage, Class} from "./pages";
import Route from './_route';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/author" component={Author}/>
                <Route path="/example-page" component={ExamplePage}/>
                <Route path="/class" component={Class}/>
            </Switch>
        </Router>
    );
};

export default App;