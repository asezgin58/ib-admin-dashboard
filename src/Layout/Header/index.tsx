import {FC} from 'react';
import {IHeaderProps} from "./type";
import {AppBar, Toolbar} from "@material-ui/core";
import {useHistory} from "react-router-dom";

/**
 * Component File Description
 */
const Header: FC<IHeaderProps> = ({
                                      position = 'fixed',
                                      className,
                                      logo,
                                      miniLogo,
                                      title,
                                      children
                                  }) => {

    let history = useHistory();
    return (
        <>
            <AppBar position={position} className={`header ${className || ''}`}>
                <Toolbar>
                    <div className="title-area">
                        {logo || miniLogo ? (
                            <>
                                <div className="logo-area" onClick={() => history.push('/')}>
                                    {logo && <img className="logo" src={logo} alt=""/>}
                                    {miniLogo && <img className="logo-mini" src={miniLogo} alt=""/>}
                                </div>
                            </>
                        ) : null}
                        {title && <h6 className={'title'}>{title}</h6>}
                    </div>
                    <div className={'menu-area'}>{children}</div>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;