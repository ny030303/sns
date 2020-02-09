import * as React from 'react';
import "./NormalSettingListItem.css";

export class NormalSettingListItem extends React.Component {
  render() {
    const {type, titleText} = this.props;
    return (
      <div className="row normalSettingListItem">
        <div className="col-4">
          <div className="subTitleText">{titleText}</div>
        </div>
        {
          (type === "id") ?
            (
              <div className="col-8 subText" style={{border: "none"}}>
                <div className="txt_id">{this.props.idName}</div>
                <div className="agree_inp id_inp">
                  <input type="checkbox" className="name_searchable" defaultChecked={(this.props.checkNum === 1) ? "checked" : null}/>
                  <label htmlFor="name_searchable">{this.props.labelText}</label>
                </div>
              </div>
            )  : (type === "isAgreeCheck") ?
              (
                <div className="col-8 subText" style={(this.props.columeStyle !== undefined) ? this.props.columeStyle : null}>
                  <div className="txt_id">
                    <input type="checkbox" className="name_searchable" defaultChecked={(this.props.checkNum === 1) ? "checked" : null}/>
                    <label htmlFor="name_searchable" style={{marginLeft: "5px"}}>동의함</label>
                  </div>
                  <div className="agree_inp id_inp">
                    <label>{this.props.labelText}</label>
                  </div>
                </div>
              ): (type === "radioCheckBoxes") ?
              (
                <div className="col-8 subText" style={(this.props.columeStyle !== undefined) ? this.props.columeStyle : null}>
                  {
                    this.props.inputArr.map((v,i) =>
                      (<div  key={i} className="txt_id" style={{display: "inline-block", margin:"0 5px"}}>
                        <input type="radio" id={`radio_searchable_${i}`} name={this.props.arrName} defaultChecked={(this.props.checkNum === i) ? "checked" : null}/>
                        <label htmlFor={`radio_searchable_${i}`}  name={this.props.arrName} style={{marginLeft: "5px"}}>{v}</label>
                      </div>)
                    )
                  }
                  {
                    (this.props.labelText !== undefined) ?
                      (<div className="agree_inp id_inp">
                        <label>{this.props.labelText}</label>
                      </div>) : null
                  }
                </div>
              )
              : null
        }

      </div>
    );
  };
}