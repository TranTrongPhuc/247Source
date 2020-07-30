import React from 'react';
import './styleframecallnow.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        return (
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control border-0 small custom-searchbox" placeholder="Search contact..." aria-label="Search" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn custom-searchbutton" type="button">
                            <img src="/img/headbar_search.svg" style={{width: 22}} />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Search