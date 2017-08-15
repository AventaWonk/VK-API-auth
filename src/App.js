import React, { Component } from 'react';
import { getUserInformation, login, logout } from './lib'
import Navbar from './Navbar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      userData: null,
      friends: [],
    }
    this.onUserDataReceived = this.onUserDataReceived.bind(this);
    this.onFriendsDataReceived = this.onFriendsDataReceived.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    let auth = getUserInformation();
    if (auth.isAuth) {
      auth.getUserData(this.onUserDataReceived); //await
      auth.getUserFriends(5, this.onFriendsDataReceived); //await
      this.setState({
        isAuth: auth.isAuth,
        isLoading: true,
      });
    }
  }

  onUserDataReceived(data) {
    this.setState({
      userData: data.response[0],
    });
  }

  onFriendsDataReceived(data) {
    this.setState({
      friends: data.response.items,
      isLoading: false,
    });
  }

  handleAuthClick() {
    login();
  }

  handleLogout() {
    logout();
    this.setState({
      isAuth: false,
      userData: null,
    });
  }


  render() {
    let containerData = <button className="button-md center-block" onClick={this.handleAuthClick}>Sign in by VK.com</button>;

    if (this.state.isAuth) {
      containerData = this.state.friends.map((friend, i)=>
        <div className="col-sm-6 col-md-2" key={i}>
          <div className="thumbnail thumbnail-md">
            <img src={friend.photo_200} alt={friend.first_name}/>
            <div className="caption">
              <a href={"https://vk.com/"+friend.domain}>{friend.first_name} {friend.last_name}</a>
            </div>
          </div>
        </div>
      );
      containerData = <div className="col-md-offset-2">
          {containerData}
        </div>;
    }

    return (
      <div>
        <Navbar isAuth={this.state.isAuth} user={this.state.userData} logout={this.handleLogout}/>
        <div className="container">
          {containerData}
        </div>
      </div>
    );
  }
}

export default App;
