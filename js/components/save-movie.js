import Alert from "./alert.js";

export default class SaveMovie {
  constructor() {
    const d = document;
    this.btnAdd = d.getElementById('saveMovie');
    this.formMovie = d.getElementsByClassName('needs-validation')[0];

    this.idMovie = null;
    this.movieName = d.getElementById('movieName');
    this.releaseYear = d.getElementById('releaseYear');
    this.duration = d.getElementById('duration');
    this.gender = d.getElementById('gender');
    this.actors = d.getElementById('actors');
    this.alert = new Alert();
    }

    setValues(params) {
      this.idMovie = params.id || null;
      this.movieName.value = params.movieName || '';
      this.releaseYear.value = params.releaseYear || '';
      this.duration.value = params.duration || '';
      this.gender.value = params.gender || '';
      this.actors.value = params.actors || '';
    }

    checkValues() {
      if (this.movieName.value === '') return false;
      if (this.releaseYear.value === '') return false;
      if (this.duration.value === '') return false;
      if (this.gender.value === '') return false;
      if (this.actors.value === '') return false;
      return true;
    }

    onClickSave(callback){
      this.btnAdd.onclick = (e) => {
        e.preventDefault();
        if (!this.checkValues()){
          // this.alert.show({message:"Llenar todos los valores", alertType: "danger"});
          this.formMovie.classList.add('was-validated');
          setTimeout(() => {
            // this.alert.hide();
            this.formMovie.classList.remove('was-validated');
          }, 2000);
        }else{

          const data = {};
          data.idMovie = this.idMovie;
          data.movieName = this.movieName.value;
          data.releaseYear = this.releaseYear.value;
          data.duration = this.duration.value;
          data.gender = this.gender.value;
          data.actors = this.actors.value;

          callback(data);

          $("#modalMovie").modal("hide");
        }
      }
    }
}