import React, { Component } from 'react';

class Navbar extends Component {

  render() {

    return (
      <nav className="navbar navbar-md">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand navbar-brand-md" href="https://thevkapitest.herokuapp.com/">VK API</a>
          </div>
            {this.props.user &&
              <ul className="nav nav-pills nav-pills-md pull-right">
                <li>
                  <a href={"https://vk.com/"+this.props.user.domain}>
                    <img src={this.props.user.photo_50} alt="user_logo"/>
                  </a>
                </li>
                <li>
                  <button onClick={this.props.logout}>Logout</button>
                </li>
              </ul>
            }
        </div>
      </nav>
    );
  }

}

export default Navbar;
