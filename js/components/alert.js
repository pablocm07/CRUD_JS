export default class Alert {
  constructor() {
    const d = document;
    this.elementAlert;
    this.body = d.getElementsByTagName('body')[0];
  }

  show(params){
    this.elementAlert = `
      <div class="alert alert-${params.alertType} text-center fixed-top">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        ${params.message}
      </div>
    `;
      this.body.insertAdjacentHTML('afterbegin', this.elementAlert);
      // <strong>Success!</strong> Indicates a successful or positive action.
  }

  hide(){
    this.elementAlert = document.querySelector('.alert');
    this.elementAlert.remove();
  }
  
}