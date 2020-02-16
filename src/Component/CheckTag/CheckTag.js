import React from 'react';
import './CheckTag.css';

export class CheckTag extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const {type, onCheckChange, text, agree, agreeNum} = this.props;
    console.log(type, onCheckChange, text, agree, agreeNum);
    return (
      <div style={{margin:"10px 0"}}>
        <label htmlFor={(type === "checkAll") ? "checkAll" : null} className={`lab_g ${(agree) ? "item_on" : null}`}
               data-num={agreeNum} onClick={onCheckChange}>
          <span data-num={agreeNum} className="ico_account ico_signup_check"/>
          <span data-num={agreeNum} className={`txt_check ${(type === "checkAll") ? "txt_checkall" : null}`}
                style={ (type === "login") ? {color: "#fff"}: null}>{text}</span>
        </label>
      </div>
    );
  };
}