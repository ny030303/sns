import * as React from 'react';
import "./NormalSettingPage.css";
import {NormalSettingListItem} from "./NormalSettingListItem/NormalSettingListItem";

export class NormalSettingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo);
  }



  render() {
    return (
      <div className="article_story">
        <div className="normalSettingPage">
          <div className="tit_modify">일반설정</div>
          <div className="subtit_modify">계정설정</div>
          <div>
            <NormalSettingListItem type="id" titleText="계정 아이디"
                                   idName={this.userInfo.id} labelText="아이디, 이름 검색을 통해 나를 찾을 수 있도록 허용합니다."
                                   checkNum={Number(this.userInfo.allow_search)}/>
            <NormalSettingListItem type="radioCheckBoxes" titleText="친구신청 범위 설정"
                                   inputArr={["모두에게 받기","친구의 친구에게만 받기"]} arrName="requestFriendRadio"
                                   labelText="나에게 친구신청을 보낼 수 있는 사람의 범위를 설정합니다."
                                   checkNum={Number(this.userInfo.allow_reqfriends)}/>
            <NormalSettingListItem type="radioCheckBoxes" titleText="쪽지 수신 설정"
                                   inputArr={["모두에게 받기","친구에게만 받기"]} arrName="messageRadio"
                                   checkNum={Number(this.userInfo.allow_message)}/>

            <div className="subtit_modify">내 스토리 설정</div>
            <NormalSettingListItem type="radioCheckBoxes" titleText="친구 목록 공개 설정" columeStyle={{border: "none"}}
                                   inputArr={["전체공개","친구공개", "나만보기"]} arrName="friendListRadio"
                                   checkNum={Number(this.userInfo.allow_friendslist)}/>
            <NormalSettingListItem type="radioCheckBoxes" titleText="관심글 공개 설정"
                                   inputArr={["전체공개","친구공개", "나만보기"]} arrName="interestPostsRadio"
                                   />
            <div className="subtit_modify">이용동의</div>
            <NormalSettingListItem type="isAgreeCheck" titleText={(<>스토리 프로필<br/>수집 동의</>)} columeStyle={{border: "none"}}
                                   idName="noa674" labelText="프로필 정보는 친구 추천 및 컨텐트 추천, 카카오 서비스에
                                   프로필 정보 연동에 활용되며, 회원탈퇴 또는 동의 철회 시 즉시 파기됩니다."/>

            <div className="withdrawal_wrap">탈퇴하기</div>
          </div>
        </div>
      </div>
    );
  };
}