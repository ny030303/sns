import React from 'react';
import './SignUpForm.css';
import eventService from "../../services/EventService";
import {AgreeForm} from "./AgreeForm/AgreeForm";
import FeedInfoForm from "./FeedInfoForm/FeedInfoForm";


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formNum: 0,
      forms: [
        (<AgreeForm switchingForm={this.switchingForm}/>),
        (<FeedInfoForm switchingForm={this.switchingForm}/>)
      ]
    };
    this.switchingForm = this.switchingForm.bind();
  }

  componentDidMount() {
    eventService.emitEvent("topMenuHide", true);
  }

  switchingForm = () => {this.setState({formNum: this.state.formNum+=1}); console.log(this.state.formNum)};

  render() {

    return (
      <div className="signUpForm">
        <div className="signupWrap">
          <div id="signupHead">
            <h1 className="signupLogo"/>
          </div>
          {
            this.state.forms[this.state.formNum]
          }
        </div>
      </div>
    )
  }
}

export default SignUpForm;
