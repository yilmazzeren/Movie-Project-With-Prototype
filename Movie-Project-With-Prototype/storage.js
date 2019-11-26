function Storage () {

}

Storage.prototype.addFilmToStorage = function(newFilm) {
    
    let films=this.getFilmsFromStorage();

    films.push(newFilm); // Array'e newFilm ekleme

    localStorage.setItem("films",JSON.stringify(films));
    // Bu array localstorage yazdık. key'e films dedik. Ama şimdide array'i string 'e çevirmemiz gerekiyor. Çünkü localstorage sadece string kabul ediyor.

}

Storage.prototype.getFilmsFromStorage = function(){
    let films;
    if(localStorage.getItem("films")===null){ // films isminde herhangi bir key var mı ?
        films = [];
    } else{
        films = JSON.parse(localStorage.getItem("films")); // Array'e çevirme
    }

    return films;
}

Storage.prototype.deleteFilmFromStorage = function(filmTitle) {
    let films = this.getFilmsFromStorage();

    films.forEach(function(film,index){
        if (film.title ===filmTitle) {
            films.splice(index,1);
        }
    });

    localStorage.setItem("films",JSON.stringify(films));
}

Storage.prototype.clearAllFilmsFromStorage = function (){
    localStorage.removeItem ("films");
}