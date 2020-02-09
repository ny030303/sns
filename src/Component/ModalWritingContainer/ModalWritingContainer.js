import * as React from 'react';
import WritingContainer from "../WritingContainer/WritingContainer";
import "./ModalWritingContainer.css";

export class ModalWritingContainer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="modalWritingContainer">
        <div>
          <WritingContainer writingType="modal" postData={this.props.postData}
                            showModalWritingContainer={this.props.showModalWritingContainer}/>

        </div>
      </div>
    );
  };
}