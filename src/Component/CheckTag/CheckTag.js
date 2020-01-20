import React from 'react';
import './CheckTag.css';

export class CheckTag extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCheckOn: false
    };
  }

  checkEvent = (e) => {
    let check = (this.state.isCheckOn) ? false : true;
    this.setState({isCheckOn: check});
    console.log(check)
    // if (check) eventService.emitEvent("signupCheckOn", (this.props.type === "checkAll") ? 7 : 1);
    // else eventService.emitEvent("signupCheckOff", (this.props.type === "checkAll") ? 0 : 1);
  };


  render() {
    const {type} = this.props;
    const {text} = this.props;
    const {isCheckOn} = this.state;
    return (
      <div style={{margin:"10px 0"}}>
        <label htmlFor={(type === "checkAll") ? "checkAll" : null} className={`lab_g ${(isCheckOn) ? "item_on" : null}`} onClick={this.checkEvent}>
          <span className="ico_account ico_signup_check"/>
          <span className={`txt_check ${(type === "checkAll") ? "txt_checkall" : null}`}
                style={ (type === "login") ? {color: "#fff"}: null}>{text}</span>
        </label>
      </div>
    );
  };
}