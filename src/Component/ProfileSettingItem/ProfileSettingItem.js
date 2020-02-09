import * as React from 'react';
import "./ProfileSettingItem.css";
import {ProfileSettingInput} from "./ProfileSettingInput/ProfileSettingInput";
import {updateUserProfileInfo} from "../../services/DataService";
import alertDialog from "../../services/AlertDialog";

export class ProfileSettingItem extends React.Component {

  constructor(props) {
    super(props);
    this.nowUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.state = {
      gender: this.nowUserInfo.birth,
    };

    this.nameInput = React.createRef();
    this.introInput = React.createRef();
    this.birthInput = React.createRef();
    this.gender = React.createRef();


  }


  componentDidMount() {
    this.nameInput.current.value = this.nowUserInfo.name;
    this.introInput.current.value = this.nowUserInfo.memo;
    this.birthInput.current.value = this.nowUserInfo.birth;
  }

  editProfileInfo = () => {
    let data = {
      name: this.nameInput.current.value,
      memo: this.introInput.current.value,
      birth: this.birthInput.current.value,
      gender: this.state.gender,
      userid: this.nowUserInfo.id,
    };

    updateUserProfileInfo(data, (res) => {
      this.props.loadUserInfo();
      alertDialog.show("알림", "정상적으로 수정됐습니다.");
    });
  };

  changeGenderEvent = (num) => this.setState({gender: num});

  render() {
    return (
      <div className="profileSettingItem section">
        <h4 className="tit_collection">기본 정보</h4>
        <ProfileSettingInput iconType="ico_profile_name" placeholder="닉네임" refName={this.nameInput} maxLength="200"/>
        <ProfileSettingInput iconType="ico_profile_intro" placeholder="한줄 소개+" refName={this.introInput} maxLength="50"/>
        {/*<h4 className="tit_collection">카카오 내정보</h4>*/}
        <ProfileSettingInput iconType="ico_profile_birth" placeholder="생년월일 (ex. 20030101)" refName={this.birthInput} maxLength="8"/>
        <ProfileSettingInput iconType="ico_profile_gender" type="checkbox" checkNum={this.state.gender} changeGenderEvent={this.changeGenderEvent}/>

        <br/><br/><br/>
        <button className="btn_g btn_confirm" onClick={this.editProfileInfo}>수정</button>
      </div>
    );
  };
}