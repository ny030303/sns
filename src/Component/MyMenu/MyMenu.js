import * as React from 'react';
import "./MyMenu.css";

export class MyMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {menuInfo} = this.props;
    return (
      <div className="cover_layer" style={(this.props.menuStyle !== null) ? this.props.menuStyle : null}>
        {
          menuInfo.filter(v => v.type === "normal").map((v,i) =>
            (<div className="mymenu_li" key={i} onClick={v.eventCallback}
                  data-num={(v.data_set !== null) ? v.data_set: null}
                  data-num2={(v.data_set2 !== null) ? v.data_set2: null}
                  style={(v.style) ? v.style : null}>
              <span className="txt_menu" data-num={(v.data_set !== null) ? v.data_set: null}
                    data-num2={(v.data_set2 !== null) ? v.data_set2: null}>{v.text}</span>
            </div>))
        }
        {
          menuInfo.filter(v => v.type === "file").map((v,i) =>
            (<label className="mymenu_li" htmlFor={`mymenu_${i}`} key={i}>
              <span className="txt_menu">{v.text}</span>
              <input type="file" id={`mymenu_${i}`} onChange={v.eventCallback}/>
            </label>))
        }

        {
          menuInfo.filter(v => v.type === "checkBox").map((v,i) =>
            (<div className="mymenu_checkbox" key={i} onClick={v.eventCallback} data-num={(v.data_set !== null) ? v.data_set: null}>
              <span className={v.icon+" mymenu_icon"} data-num={(v.data_set !== null) ? v.data_set: null}/>
              <span className="txt_menu" data-num={(v.data_set !== null) ? v.data_set: null}>{v.text}</span>
            </div>))
        }
      </div>
    );
  };
}