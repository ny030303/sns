import $ from "jquery"
import "./WaitDialog.css";

class WaitDialog {
  constructor() {
    this.timer = null;
  }

  show() {
    $('body').append(`
        <div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false">
<!--          <div class="spinner-border text-warning wait-spinner"></div>-->
                <div class="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
        </div>`
    );
    $('#pleaseWaitDialog').modal();
    this.timer = setTimeout(() => this.hide(1), 180000);
  }

  hide(bAutoClose) {
    if (bAutoClose === undefined) {
      clearTimeout(this.timer);
    }
    $('#pleaseWaitDialog').modal('hide');
    $('#pleaseWaitDialog').remove();
  }
}

const waitDialog = new WaitDialog;

export default waitDialog;