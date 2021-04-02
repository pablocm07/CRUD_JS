export default class ModalMovie {
  constructor() {
    const d = document;
    this.idModal = 'modalMovie';
    this.modalTitle = d.querySelector('.modal-title');
    this.btnModal = d.getElementById('saveMovie');
  }

  show(params) {
    this.modalTitle.innerHTML = params.title;
    this.btnModal.dataset.eventForm = params.eventType;
    $(`#${this.idModal}`).modal("show");
  }

  hide() {
    $(`#${this.idModal}`).modal("hide");
  }

}