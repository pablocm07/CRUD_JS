export default class Search {
  constructor() {
    const d = document;
    this.btnSearch = d.getElementById('btnSearch');
    this.inputFilter = d.getElementById('inputFilter');
  }

  onClickSearch(callback) {
    this.btnSearch.addEventListener('click', e => {
      e.preventDefault();
      callback({
        words: this.inputFilter.value,
      });
    })
  }
}