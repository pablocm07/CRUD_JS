export default class ModelMovies {
  constructor() {
    this.view = null;
    this.list = JSON.parse(localStorage.getItem('movies')) || [];
    this.currentId = (this.list.length !== 0) ? this.list[this.list.length - 1].id + 1: 1;
  }

  setView(view) {
    this.view = view;
  }

  save() {
    localStorage.setItem('movies', JSON.stringify(this.list));
    //  console.log(this.list);
  }

  getList() {
    return this.list;
  }

  findList(id){
    return this.list.findIndex((movie) => movie.id === id);
  }

  getMovie(id) {
    console.log(id, this.list);
    let index = this.findList(id);
    return this.list[index];
  }

  addMovie(movieName, releaseYear, duration, gender, actors){
    const movie = {
      id: this.currentId++,
      movieName,
      releaseYear,
      duration,
      gender,
      actors
    }
    this.list.push(movie);
    this.save();

    return {... movie}; // returns a copy of the object
  }

  removeMovie(id) {
    const index = this.findList(id);
    this.list.splice(index, 1);
    this.save();
  }

  updateMovie(params) {
    const index = this.findList(params.idMovie);
    delete params.idMovie;
    console.log(params);
    Object.assign(this.list[index], params);
    this.save();
  }
}