import * as React from 'react';
import "./ProfileSettingInput.css";

export class ProfileSettingInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: Number(JSON.parse(localStorage.getItem("userInfo")).gender),
    };

    this.input = React.createRef();
    console.log(props)
  }

  selectGender = (e) => {
    let num = e.target.dataset.gnum;
    console.log(num);
    this.setState({gender: Number(num)});
    this.props.changeGenderEvent(Number(num));
  };

  render() {
    const {gender} = this.state;
    return (
      <div className='profileSettingItemInputWrap'>
        <div className="profileSettingItemIconStyle">
          <span className={`ico_ks ${this.props.iconType}`}/>
        </div>
        {
          (this.props.type !== "checkbox") ?
            <input type="text" placeholder={this.props.placeholder} className="profileSettingItemInput" ref={this.props.refName} maxLength={this.props.maxLength}/> :

            <div style={{margin: "13px 3px"}}>
              <label className={`lab_g ${(gender === 0) ? "item_on" : null}`}
                     style={{display: "inline-block", marginRight: "10px"}}>
                <span className="ico_account ico_signup_check" onClick={this.selectGender} data-gnum="0"/>
                <span className="txt_check">남성</span>
              </label>
              <label className={`lab_g ${(gender === 1) ? "item_on" : null}`} style={{display: "inline-block"}}>
                <span className="ico_account ico_signup_check" onClick={this.selectGender} data-gnum="1"/>
                <span className="txt_check">여성</span>
              </label>
            </div>
        }

      </div>
    );
  };
};