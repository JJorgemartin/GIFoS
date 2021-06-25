//Seccion de burger
let burger = document.getElementById('burger');
let titHiden = document.getElementById('titHiden');

burger.addEventListener('click', openList);


function openList(){
    if(titHiden.style.display === 'none') {
        burger.src = '/imagenes/close.svg' ;
        titHiden.style.display = 'block';
    } else {
        burger.src = '/imagenes/burger.svg';
        titHiden.style.display = 'none';
    }
}


//Seccion tendencias

const apiKey = 'XMLnEoJBC2LcT7wr2NKS6Lsj4SYnIjcb';
const pathTendencias = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=9`;


let ctnResultGif = document.getElementById('ctnResultGif');
let sliderL = document.getElementById('sliderL');
let sliderR = document.getElementById('sliderR');

async function cargarTendencias (){
    try {
        const response = await fetch(pathTendencias);
        const json = await response.json();
        console.log(json.data);
            json.data.forEach(element => {
                ctnResultGif.innerHTML += `
                <div class="ctnCard" onclick='showModalMobile("${element.id}")'> 
                    <img class="gif" src="${element.images.original.url}" alt="${element.title}" id="${element.id}"/>
                    <div class="ctnIcon">
                        <div class="iconFav" onclick='agregarFavorito("${element.id}")'></div>
                        <div class="iconDown" onclick='downloadGif("${element.images.original.url}", "${element.slug}")'></div>
                        <div class="iconMax" onclick='showModal("${element.id}")'></div>
                        <div class="gifData">
                            <p class= "userName">${element.username}</p>
                            <h4 class="gifTitle">${element.title}</h4>
                        </div>
                    </div>
                </div>`;
            });
    } catch (error) {
        console.log("Error en la muestra de los trending" + error);
    }
};

window.onload = cargarTendencias();

if (sliderL !== null) {
    sliderL.addEventListener("click", () => {
        ctnResultGif.scrollLeft -= 1200;
    });
    sliderR.addEventListener("click", () => {
        ctnResultGif.scrollLeft += 1200;
    });
}



//Dark-Mode

const darkThemeButton = document.getElementById('modoNocturno');
const darkTheme = 'dark-theme';

darkThemeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
})

// Funcion descargar Gif

async function downloadGif(url, title) {
    let response = await fetch(url);
    let blob = response.blob();
    let gif = URL.createObjectURL(await blob);
    let save = document.createElement("a");
    save.href = gif;
    save.download = `${title}.gif`;
    save.style.display = "none";
    document.body.appendChild(save);
    save.click();
    document.body.removeChild(save);
}; 

//Agregar - eliminar  Favoritos

let arrayFavoritos = [];

if (localStorage.getItem("favoritos") !== null) {
    arrayFavoritos = JSON.parse(localStorage.getItem("favoritos"));
}
function agregarFavorito(id) {
    arrayFavoritos.push(id);
    localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));
}


const ctnFavGif = document.getElementById("ctnFavGif");
const noFav = document.getElementById("noFav");
const matchMedia = window.matchMedia("(max-width: 769px)");

async function getFavorites() {
    if (
        localStorage.getItem("favoritos") !== "[]" &&
        localStorage.getItem("favoritos") !== null
    ) {
        let favoritosParsed = JSON.parse(localStorage.getItem("favoritos"));
        for (let i = 0; i < favoritosParsed.length; i++) {
            const element = favoritosParsed[i];
            const pathGetFavs = `https://api.giphy.com/v1/gifs/${element}?api_key=${apiKey}`;
            let = response = await fetch(pathGetFavs);
            let = json = await response.json();
            noFav.style.display = 'none';
            ctnFavGif.innerHTML += `
            <div class="ctnCard" onclick='showModalMobile("${json.data.id}")'>
                <img class="gif" src="${json.data.images.original.url}" alt="${json.data.title}" />
                <div class="ctnIcon">
                    <div class="iconFav itsFav" onclick='deleteFav("${json.data.id}")'></div>
                    <div class="iconDown" onclick='downloadGif("${json.data.images.original.url}", "${json.data.slug}")'></div>
                    <div class="iconMax" onclick='showModal("${json.data.id}")'></div>
                    <div class="gifData">
                        <p class= "userName">${json.data.username}</p>
                        <h4 class="gifTitle">${json.data.title}</h4>
                    </div>
                </div>
            </div>`;
        }
    } else {
        empty.style.display = "flex";
    }
}
if (ctnFavGif) {
    window.onload = getFavorites();
}


function deleteFav(id) {
    let listaFavs = JSON.parse(localStorage.getItem("favoritos"));
    let idPosition = listaFavs.indexOf(id);
    listaFavs.splice(idPosition, 1);
    localStorage.setItem("favoritos", JSON.stringify(listaFavs));
    ctnFavGif.innerHTML = "";
    getFavorites();
}

//Funcion para agrandar el gif

const modal = document.getElementById("modal");
async function showModal(id) {
    modal.style.display = "flex";
    const pathGetById = `https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`;
    let = response = await fetch(pathGetById);
    let = json = await response.json();
    modal.innerHTML = `
        <img id='maxGifX' class="maxGifX" src="/imagenes/close.svg" alt="X">
        <img class="maxGifImg" src="${json.data.images.original.url}" alt="${json.data.title}">
        <div class="maxGifCtn">
            <div class="maxGifData">
                <p> ${json.data.username}</p>
                <h4>${json.data.title}</h4>
            </div>
            <div class="maxGifButtons">
                <div><img id='maxGifFav' src="/imagenes/icon-fav.svg" alt="Favorite" onclick='agregarFavorito("${id}")'></div>
                <div><img id='maxGifDown' src="/imagenes/icon-download.svg" alt="Down" onclick='downloadGif("${json.data.images.original.url}", "${json.data.slug}")'></div>
            </div>
        </div>`;
    const maxGifX = document.getElementById("maxGifX");
    maxGifX.addEventListener("click", () => {
        modal.style.display = "none";
    });
    const maxGifFav = document.getElementById("maxGifFav");
    const maxGifDown = document.getElementById("maxGifDown");
    maxGifFav.addEventListener("mouseenter", () => {
        maxGifFav.src = "/imagenes/icon-fav-hover.svg";
    });
    maxGifFav.addEventListener("mouseout", () => {
        maxGifFav.src = "/imagenes/icon-fav.svg";
    });
    maxGifDown.addEventListener("mouseenter", () => {
        maxGifDown.src = "/imagenes/icon-download-hover.svg";
    });
    maxGifDown.addEventListener("mouseout", () => {
        maxGifDown.src = "/imagenes/icon-download.svg";
    });
}

function showModalMobile(id) {
    if (matchMedia.matches) {
        showModal(id);
    }
}