import React from 'react';
import DropdownState from './DropdownState';
import MenuConfig from './MenuConfig';

class UserInfor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                <MenuConfig></MenuConfig>
                <DropdownState></DropdownState>
            </ul>
        );
    }
}

export default UserInfor