import React from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import MyHeader from "./MyHeader/MyHeader";
import MyRightHeader from "./MyRightHeader/MyRightHeader";
import MainStory from "./Routes/MainStory/MainStory";
import UserStory from "./Routes/UserStory/UserStory";
import LoginForm from "./Routes/LoginForm/LoginForm";
import SignUpForm from "./Routes/SignUpForm/SignUpForm";
import eventService from "./services/EventService";
import {getUser, getUserInfoAll, logout} from "./services/DataService";
import {NormalSettingPage} from "./Routes/NormalSettingPage/NormalSettingPage";
import {HashtagStory} from "./Routes/HashtagStory/HashtagStory";
import waitDialog from "./services/WaitDialog/WaitDialog";
import {AdminPage} from "./Routes/AdminPage/AdminPage";


const PrivateRoute = ({component: Component, authed, ...rest}) => (
    <Route
        {...rest}
        render={(props) =>
            (authed === true) ?
                (<Component {...props} />) :
                (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
        }/>
);

const LoginRoute = ({component: Component, authed, ...rest}) => (
    <Route
        {...rest}
        render={(props) =>
            (authed === true) ?
                (<Redirect to={{pathname: '/', state: {from: props.location}}}/>) :
                (<Component {...props} />)
        }/>
);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMenuHide: false,
      authed: false
    };
    this.aTag = React.createRef();

    // console.log(localStorage.getItem("isSaveUserInfo"));
    if(localStorage.getItem("isSaveUserInfo")) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isSaveUserInfo");
    } else {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    }

    this.state.authed = this.userInfo ? true : false;

    eventService.listenEvent('loginStatus', logined => this.setState({authed: logined}));
    eventService.listenEvent("topMenuHide", (visible) => {
      // console.log("visible: ", visible);
      this.setState({topMenuHide: visible});
    })
  }

  componentDidMount() {
    if(this.userInfo) {
      if(this.userInfo.id === "admin") {
        // console.log("app 들어옴", this.state.authed);
        this.setState({authed: true, topMenuHide: true}, () => {
          this.aTag.current.click();
        });
        // this.aTag.current.click();
      }
    }

    getUser(null, null, res => {
      // console.log(res);
      if (res.result === 0) {
        localStorage.removeItem("userInfo");
        this.setState({authed: false});
      }
    });
    getUserInfoAll(res => eventService.emitEvent("updateUserInfoAll", null));
  }

  logout = () => {
    localStorage.removeItem("userInfo");
    eventService.emitEvent("loginStatus", false);
    logout((data) => {
      // console.log(data)
    });
  };

  render() {
    return (
        <div className="App">
          <HashRouter>
            {
              (!this.state.topMenuHide) ? (<div><MyHeader/><MyRightHeader/></div>) : (<div></div>)
            }
            <Switch>
              <PrivateRoute exact authed={this.state.authed} path="/" component={MainStory}/>
              <PrivateRoute exact authed={this.state.authed} path="/story/:userId/:type" component={UserStory}/>
              <PrivateRoute exact authed={this.state.authed} path="/hashtag/:tag" component={HashtagStory}/>
              <PrivateRoute exact authed={this.state.authed} path="/setting" component={NormalSettingPage}/>
              <PrivateRoute exact authed={this.state.authed} path="/adminpage" component={AdminPage}/>
              <LoginRoute exact authed={this.state.authed} path="/login" component={LoginForm}/>
              <Route exact path="/signup" component={SignUpForm}/>
            </Switch>
          </HashRouter>
          <a className="gotoAdminPage" href="/#/adminpage" ref={this.aTag}/>
        </div>
    )
  }
}

export default App;
