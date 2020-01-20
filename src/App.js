import React, {useRef} from 'react';
import './App.css';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import MyHeader from "./MyHeader/MyHeader";
import MyRightHeader from "./MyRightHeader/MyRightHeader";
import MainStory from "./Routes/MainStory/MainStory";
import UserStory from "./Routes/UserStory/UserStory";
import LoginForm from "./Routes/LoginForm/LoginForm";
import SignUpForm from "./Routes/SignUpForm/SignUpForm";
import eventService from "./services/EventService";
import {getUser, logout} from "./services/DataService";

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
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.state.authed = this.userInfo ? true : false;

        eventService.listenEvent('loginStatus', logined => this.setState({authed: logined}));
        eventService.listenEvent("topMenuHide", (visible) => {
            console.log("visible: ", visible);
            this.setState({topMenuHide: visible});
        })
    }

    componentDidMount() {
        getUser(null, null, res => {
            if (res.result === 0) {
                localStorage.removeItem("userInfo");
                this.setState({authed: false});
            }
        });
    }

    logout = () => {
        localStorage.removeItem("userInfo");
        eventService.emitEvent("loginStatus",false);
        logout((data) => {console.log(data)});
    };

    render() {
    return (
        <div className="App">
            <HashRouter>
                {
                    (!this.state.topMenuHide) ? (<><MyHeader/><MyRightHeader/></>) : null
                }
                <Switch>
                    <PrivateRoute exact authed={this.state.authed} path="/" component={MainStory}/>
                    <PrivateRoute exact authed={this.state.authed}  path="/story" component={UserStory}/>
                    <LoginRoute exact authed={this.state.authed} path="/login" component={LoginForm}/>
                    <Route exact path="/signup" component={SignUpForm}/>
                </Switch>
            </HashRouter>
        </div>
    )
  }
}

export default App;
