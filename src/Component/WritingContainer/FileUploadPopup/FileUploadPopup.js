import React from "react";
import "./FileUploadPopup.css";
import Pagination from "../../Pagination/Pagination";

export default class FileUploadPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      currPage: 1
    };
    this.sizePerPage = 10;
  }
  hidePopup = () => this.props.showFileUploadPopup(false);

  dragOverEvent = (e) => {
    console.log("드래그 오버");
    e.preventDefault();
  };

  dropEvent = (e) => {
    e.preventDefault();
    let list = Array.from(e.dataTransfer.files);
    list.forEach(v => {
      this.props.fileToDataURL(v).then(res => {
        this.setState({fileList: [...this.state.fileList, ...[{name: v.name, type: v.type, data: res}]]});
      });
    });
  };

  componentDidMount() {

  }


  deleteFile = (e) => {
    let {fileList} = this.state;
    let num = e.target.dataset.lnum;
    fileList.splice(num, 1);
    this.setState({fileList: fileList});
    if (fileList.length <= this.state.currPage * this.sizePerPage - this.sizePerPage) {
      this.setState({currPage: this.state.currPage - 1});
    }
  };

  onChangePage = (e) => {
    let currPage = Number(e.target.dataset.page);
    let maxPage = Math.floor((this.state.fileList.length + this.sizePerPage - 1) / this.sizePerPage);
    if(currPage < 1 || currPage > maxPage) return;
    this.setState({currPage: currPage});
  };

  attachFiles = () => this.props.attachFiles(this.state.fileList);

  render() {
    const {fileList, currPage} = this.state;
    return (
      <div className="modal fade in" style={{display: "block", opacity: "1", backgroundColor: "rgba(0,0,0,0.6)"}}
           id="fileUploadPopup">
        <div className="modal-dialog" style={{maxWidth: "600px", top: "23%"}}>
          <div className="modal-content popupStyle1">
            <div className="modal-header" style={{border: "none"}}>
              <button type="button" className="close" data-dismiss="modal"
                      onClick={this.hidePopup}>&times;</button>
            </div>
            <div className="modal-body" style={{padding: "0", margin: "1rem 36px"}} onDragOver={this.dragOverEvent}
                 onDrop={this.dropEvent}>
              {
                (fileList.length <= 0) ?
                  (<div className="dragHere">
                    <div className="dragHereContents">
                      {/*<img className="file_drop_img" src="/images/file_upload.png"/>*/}
                      <div>DRAG FILES HERE</div>
                    </div>
                  </div>) :
                  (<>
                    <ul className="uk-list fileList">
                      {
                        fileList.filter((fv, fi) => Math.floor((fi + this.sizePerPage-1 + 1) / this.sizePerPage) === currPage).map((v, i) =>
                          (<div key={i} className="upload-item">
                            <div className="img-box">
                              <img src={v.data} alt="img"/>
                              <span className="ico_ks bn_x" onClick={this.deleteFile} data-lnum={i}/>
                            </div>
                            <div className="text-box">
                              {v.name}
                            </div>
                          </div>))
                      }
                    </ul>

                    <Pagination dataCnt={fileList.length} sizePerPage={this.sizePerPage} currPage={currPage}
                                changePage={this.onChangePage}/>

                    <div style={{textAlign: "center"}}>
                      <button className="uk-button uk-button-default" id="fileBtn" onClick={this.attachFiles}>파일 첨부</button>
                    </div>
                  </>)
              }


            </div>
          </div>
        </div>
      </div>
    );
  }
}