import * as React from 'react';
import {CheckTag} from "../../../Component/CheckTag/CheckTag";
import alertDialog from "../../../services/AlertDialog";

export class AgreeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agrees: [false,false,false, false,false,false,false]
      // checkedNum: 0,
      // isAgree : false
    };
  }

  componentDidMount() {
    // eventService.listenEvent("signupCheckOn", (data) => {
    //   console.log("on:", data);
    //   if(data >= 7) this.setState({checkedNum: 7});
    //   else  this.setState({checkedNum: this.state.checkedNum+=data});
    //
    //   // console.log(this.state.checkedNum);
    //   console.log("checkedNum:", this.state.checkedNum);
    //   if(this.state.checkedNum === 7) this.setState({isAgree: true});
    //   else this.setState({isAgree: false});
    // });
    // eventService.listenEvent("signupCheckOff", (data) => {
    //   console.log("off:", data);
    //   if(data <= 0) this.setState({checkedNum: 0});
    //   else  this.setState({checkedNum: this.state.checkedNum-=data});
    //   // console.log(this.state.checkedNum, checkedNum);
    //
    //   console.log("checkedNum:", this.state.checkedNum);
    //   if(this.state.checkedNum === 7) this.setState({isAgree: true});
    //   else this.setState({isAgree: false});
    // });
  }

  checkAll = () => {
    let agree = this.state.agrees.filter(v => v === false).length > 0;
    this.setState({agrees: this.state.agrees.map(v => agree)})
  };

  onCheckChange = (e) => {
    console.log(e.target.dataset.num);
    let num = Number(e.target.dataset.num);
    this.state.agrees[num] = !this.state.agrees[num];
    this.setState({agrees: this.state.agrees})
  };

  agreeCheck = () => {
    const checkAgrees = [true, true, true, false, true, false, false];
    let agree = this.state.agrees.filter((v,i) => v === true && checkAgrees[i]).length === 4;
      if(agree) {
        this.props.switchingForm();
      } else {
        alertDialog.show("알림", "필수 약관동의를 확인해주세요.");
      }
  };

  render() {
    // const {isAgree} = this.state;
    return (
      <div className="signupArticle">
        <h2 className="tit_step">서비스약관에 동의해주세요.</h2>
        <CheckTag type="checkAll" text="모두 동의합니다."
                  agree={!(this.state.agrees.filter(v => v === false).length > 0)} onCheckChange={this.checkAll}/>
        <p className="desc_check desc_checkall">
          전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.
          선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
        </p>
        <CheckTag type="check" text="만 14세 이상입니다."
                  agree={this.state.agrees[0]} agreeNum={0} onCheckChange={this.onCheckChange}/>
        <CheckTag type="check" text="[필수] 계정 약관"
                  agree={this.state.agrees[1]} agreeNum={1} onCheckChange={this.onCheckChange}/>
        <CheckTag type="check" text="[필수] 통합서비스약관"
                  agree={this.state.agrees[2]} agreeNum={2} onCheckChange={this.onCheckChange}/>
        <p className="desc_check desc_checkall" style={{border: "0 none"}}>
          본 약관은 카카오, Daum, Melon 서비스 등에 공통 적용되며, 본 약관에 동의함으로써
          해당 서비스들을 별도 이용계약 체결 없이 이용할 수 있습니다.
        </p>
        <CheckTag type="check" text="[선택] 알림 채널 추가 및 광고메시지 수신"
                  agree={this.state.agrees[3]} agreeNum={3} onCheckChange={this.onCheckChange}/>
        <CheckTag type="check" text="[필수] 개인정보 수집 및 이용 동의"
                  agree={this.state.agrees[4]} agreeNum={4} onCheckChange={this.onCheckChange}/>
        <CheckTag type="check" text="[선택] 위치정보 수집 및 이용 동의"
                  agree={this.state.agrees[5]} agreeNum={5} onCheckChange={this.onCheckChange}/>
        <CheckTag type="check" text="[선택] 프로필 정보 추가 수집 동의"
                  agree={this.state.agrees[6]} agreeNum={6} onCheckChange={this.onCheckChange}/>
        <br/>
        {/*<button className={`btn_g ${(isAgree) ? "btn_confirm" : null}`}>동의</button>*/}
        <button className="btn_g btn_confirm" onClick={this.agreeCheck}>동의</button>
      </div>
    );
  };
};