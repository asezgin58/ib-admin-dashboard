import {FC} from 'react';
import Header from "./Header";
import Sidebar from "./Sidebar";

/**
 * Page Layout Description
 */
const Layout: FC<any> = (props: { children: React.ReactNode }) => {
    return (
        <>
            <Header
                logo={'/images/logo.svg'}
                title={'Admin Dashboard'}
            />
            <Sidebar/>
            <div className="content p-3">
                <div className="container-fluid">
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default Layout;