import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Home, Author, ExamplePage, Class, DICT_ML_CLASS, DICT_ML_CLASS_METHOD} from "./pages";
import Route from './_route';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/author" component={Author}/>
                <Route path="/example-page" component={ExamplePage}/>
                <Route path="/class" component={Class}/>
                <Route path="/DICT_ML_CLASS" component={DICT_ML_CLASS}/>
                <Route path ="/DICT_ML_CLASS_METHOD" component={DICT_ML_CLASS_METHOD}/>

            </Switch>
        </Router>
    );
};

export default App;