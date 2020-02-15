import * as React from 'react';
import * as uikit from 'uikit/dist/js/uikit.min';
import "./MyMenu.css";

export class MyMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  onSelectDropDown = (e, evtCallback) => {
    let element = e.target;
    while( !element.getAttribute('uk-dropdown') ) {
      // Finds the 'uk-dropdown' parent of the event.
      element = element.parentElement;
    }
    uikit.dropdown(element).hide();
    evtCallback(e);
  };

  render() {
    const {menuInfo, menuPos} = this.props;
    const menuStyle = Object.assign(this.props.menuStyle || {}, {minWidth: "120px"})
    return (
      <div uk-dropdown={`mode: click; pos: ${menuPos || "bottom-right"}`} className="cover_layer p-1" style={menuStyle}>
        {
          menuInfo.filter(v => v.type === "normal").map((v, i) =>
            (<div className="mymenu_li" key={i} onClick={(e) => this.onSelectDropDown(e, v.eventCallback)}
                  data-num={(v.data_set !== null) ? v.data_set : null}
                  data-num2={(v.data_set2 !== null) ? v.data_set2 : null}
                  style={v.style || null}>
              <span className="txt_menu" data-num={(v.data_set !== null) ? v.data_set : null}
                    data-num2={(v.data_set2 !== null) ? v.data_set2 : null}>{v.text}</span>
            </div>))
        }
        {
          menuInfo.filter(v => v.type === "file").map((v, i) =>
            (<label className="mymenu_li" htmlFor={`mymenu_${i}`} key={i}>
              <span className="txt_menu">{v.text}</span>
              <input type="file" id={`mymenu_${i}`} onChange={(e) => this.onSelectDropDown(e, v.eventCallback)}/>
            </label>))
        }

        {
          menuInfo.filter(v => v.type === "checkBox").map((v, i) =>
            (<div className="mymenu_checkbox" key={i} onClick={(e) => this.onSelectDropDown(e, v.eventCallback)}
                  data-num={(v.data_set !== null) ? v.data_set : null}>
              <span className={v.icon + " mymenu_icon"} data-num={(v.data_set !== null) ? v.data_set : null}/>
              <span className="txt_menu" data-num={(v.data_set !== null) ? v.data_set : null}>{v.text}</span>
            </div>))
        }
      </div>
    );
  };
}