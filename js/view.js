import SaveMovie from "./components/save-movie.js";
import ModalMovie from "./components/modal-movie.js";
import Search from "./components/search.js";

export default class ViewMovies {
  constructor() {
    const d = document;
    this.model = null;
    this.table = d.getElementById('tableMovies');
    this.btnAdd = d.getElementById('addMovie');
    this.saveMovie = new SaveMovie();
    this.modalMovie = new ModalMovie();
    this.searchMovie = new Search();

    this.clickEvents();
  }

  setModel(model) {
    this.model = model;
  }

  getMovie(td) {
    const id = parseInt(td.parentNode.dataset.idRow); // <tr>
    let movieValues = this.model.getMovie(id);
    this.saveMovie.setValues(movieValues);
  }

  addMovie(params){
    let { movieName, releaseYear, duration, gender, actors } = params;
    const list = this.model.addMovie(movieName, releaseYear, duration, gender, actors);
    this.insertRow(list);
  }

  removeMovie(td) {
    const trSon = td.parentNode; // <tr>

    this.model.removeMovie(parseInt(trSon.dataset.idRow)); // Delete record of storage
    trSon.remove();
  }

  updateMovie(params) {
    this.model.updateMovie(params);
    const rows = document.querySelector('#tableMovies > thead').children;
    // if (rows.length > 1) {
      for (let row of rows) {
        setTimeout(() => {
          if (row.dataset.idRow !== undefined) row.remove();
        }, 10);
      }
    // }
    this.loadDataTable();
  }

  clikOnTable() {
    this.table.onclick = (e) =>{
      // Identify element <td>
        let td = (e.target.matches('i')) ? e.target.parentNode.parentNode : e.target.parentNode;

      if (e.target.matches('.delete')){ // Click on button of table to DELETE
        this.removeMovie(td); 
      }

      if (e.target.matches('.edit')){
        this.modalMovie.show({title: 'Edit movie', eventType: 'edit'});
        this.getMovie(td);
      }

    }
  }

  insertRow(list) {
    const row = this.table.insertRow();
    row.dataset.idRow = list.id;
    row.innerHTML = `
      <td>${list.movieName}</td>
      <td>${list.releaseYear}</td>
      <td>${list.duration}</td>
      <td>${list.gender}</td>
      <td>${list.actors}</td>
      <td class="justify-content-end d-flex">
        <button class="btn btn-primary mb-1 mr-2 edit">
          <i class="fa fa-pencil-alt edit"></i>
        </button>
        <button class="btn btn-primary mb-1 delete">
          <i class="fa fa-trash delete"></i>
        </button>
      </td>
    `;
  }

  clickEvents(){
    this.saveMovie.onClickSave((params) => {
      if (params.idMovie === null){
        this.addMovie(params);
      }else{
        this.updateMovie(params);
      }
      });
    this.btnAdd.onclick = (e) => {
      this.modalMovie.show({title: 'New movie', eventType: 'add'});
      this.saveMovie.setValues({});
    }

    this.searchMovie.onClickSearch((params) => {
      const word = params.words;
      const [, ...rows] = this.table.getElementsByTagName('tr');
      for (const row of rows){
        const [nameMovie, releaseYear, duraction, gender, actors] = row.children;
        let shouldHide = false;

        if (word){
          shouldHide = 
            !nameMovie.innerText.includes(word) &&
            !releaseYear.innerText.includes(word) &&
            !duraction.innerText.includes(word) &&
            !gender.innerText.includes(word) &&
            !actors.innerText.includes(word)
          ;
        }

        if (shouldHide) {
          row.classList.add('d-none');
        }else{
          row.classList.remove('d-none');
        }

        console.log(row, shouldHide);
      }
    });

    this.clikOnTable();
  }


  loadDataTable() {
    const movies = this.model.getList();
    movies.forEach((movie) => this.insertRow(movie));
  }

}