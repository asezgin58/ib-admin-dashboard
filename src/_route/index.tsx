import {Route} from 'react-router-dom';
import Layout from '../Layout';

const PublicRoute = ({component: Component, ...rest}: any) => {
    return (
        <Route
            {...rest}
            render={props => {
                return Component ? (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                ) : (
                    rest.render(props)
                );
            }}
        />
    );
};

export default PublicRoute;