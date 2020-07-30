import React from 'react';
import FrameCallNow from './FrameCallNow';
import Search from './Search';
import UserInfor from './UserInfor';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand navbar-light custom-header topbar static-top fixed-top custom-nav-shadow"
                style={{ height: 64 }}
            >
                <img id="logo-company" style={{ width: 50, height: 40 }} src="/img/Connect247_logo.png"/>
                <div id="framecallnow">
                    <FrameCallNow></FrameCallNow>
                </div>
                <Search></Search>
                <UserInfor></UserInfor>
            </nav>
        );
    }
}

export default Header