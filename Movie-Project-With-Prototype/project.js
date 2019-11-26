
const form = document.getElementById("film-form"); // Formu seçme
const titleElement = document.querySelector("#title"); // İnput seçme
const directorElement = document.querySelector("#director"); // İnput seçme
const urlElement = document.querySelector("#url"); // İnput seçme
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// UI Objesini başlatma

const ui = new UI();

// Storage'dan obje oluşturma

const storage = new Storage();

// Tüm Eventleri Yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm); // Forma submıt olayı oldugunda addFilm fonk çalışşsın.
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    secondCardBody.addEventListener("click",deleteFilm);

    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){

    const title = titleElement.value; // title inputuna gelen degerı aldık
    const director = directorElement.value; // yönetmen inputundan gelen deger alma
    const url = urlElement.value; // Linkten inputundan gelen degeri alma

    if (title ==="" || director==="" || url==="") {
        // Hata
        /*<div class="alert alert-danger" role="alert">
            This is a danger alert—check it out!
          </div> */
          ui.displayMessages("Tüm alanları doldurun...","danger");
    }
    else {
        // Yeni Film
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // Arayüze film ekleme
        storage.addFilmToStorage(newFilm); // Storage film ekleme
        ui.displayMessages("Film başarı ile eklendi","success");
    }

    ui.clearInput(titleElement,urlElement,directorElement); // Her ekleme işlemminden sonra ınput temızlensın. 
    
    e.preventDefault();
}

function deleteFilm(e){

    if(e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent); // Burda film title aldık
        ui.displayMessages("Silme işlemi başarılı","success");
        
    }
}

function clearAllFilms(){
    if(confirm("Emin misiniz ?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }

   
}