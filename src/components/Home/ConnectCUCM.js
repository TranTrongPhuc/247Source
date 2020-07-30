import React from 'react';
import './stylehomeintro.css';
import { UrlApi } from '../../constants/config';

class ConnectCUCM extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-scroller div-intro">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row w-100">
                            <div className="col-lg-3 mx-auto">
                                <p className="text-intro">CONNECTING TO SERVER...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConnectCUCM