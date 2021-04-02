import ModelMovies from "./model.js";
import ViewMovies from "./view.js";

const d = document;

d.addEventListener('DOMContentLoaded', ()=> {
  const modelMovies = new ModelMovies();
  const viewMovies = new ViewMovies();
  modelMovies.setView(viewMovies);
  viewMovies.setModel(modelMovies);

  viewMovies.loadDataTable();
});