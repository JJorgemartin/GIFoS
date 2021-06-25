//Seccion de burger

let burger = document.getElementById('burger');
let titHiden = document.getElementById('titHiden');

burger.addEventListener('click', openList);

function openList(){
    if(titHiden.style.display === 'none') {
        if(document.body.classList.contains(darkTheme)){
            burger.src = '/imagenes/close-modo-noct.svg'
        } else{
            burger.src = '/imagenes/close.svg'
        };
        
        titHiden.style.display = 'block';
    } else {
        if(document.body.classList.contains(darkTheme)){
            burger.src = '/imagenes/burger-modo-noct.svg'
        } else{
            burger.src = '/imagenes/burger.svg'
        };
        
        titHiden.style.display = 'none';
    }
}

//Seccion tendencias

const apiKey = 'XMLnEoJBC2LcT7wr2NKS6Lsj4SYnIjcb';
const pathTendencias = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=9`;

let pTrend = document.getElementById('pTrend');
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

//Trending-search

async function trendingSearches() {
    try {
        const pathSearches = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
        let = response = await fetch(pathSearches);
        let = json = await response.json();
        pTrend.innerHTML = "";
        for (let index = 0; index < 5; index++) {
            const element = json.data[index];
            pTrend.innerHTML += `<span onclick='searchGif("${element}")'>${element}</span>${
                index === 4 ? " " : ", "
            }`;
        }
    } catch (error) {
        console.log("ERROR EN LOS TRENDINGS SEARCHES Tipo: " + error);
    }
}

trendingSearches();


//Dark-Mode
let iconFb = document.getElementById('iconFb');
let iconTw = document.getElementById('iconTw');
let iconIg = document.getElementById('iconIg');
let logo = document.getElementById('logo');
let creaGif= document.getElementById('creaGif');
const darkThemeButton = document.getElementById('modoNocturno');
const darkTheme = 'dark-theme';

darkThemeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    if(document.body.classList.contains(darkTheme)){
        logo.src = '/imagenes/logo-modo-noc.svg';
        creaGif.src = '/imagenes/CTA-crear-gifo-modo-noc.svg'
        sliderR.src = '/imagenes/button-slider-right-md-noct.svg'
        sliderL.src = '/imagenes/button-slider-left-md-noct.svg'
        searchIcon.src = '/imagenes/icon-search-modo-noct.svg'
        burger.src = '/imagenes/burger-modo-noct.svg'
    } else {
        logo.src = '/imagenes/logo-desktop.svg'
        creaGif.src = '/imagenes/button-crear-gifo.svg'
        sliderR.src = '/imagenes/Button-Slider-right.svg'
        sliderL.src = '/imagenes/button-slider-left.svg'
        searchIcon.src = '/imagenes/icon-search.svg'
        burger.src = '/imagenes/burger.svg'
    }

});

const userHasDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
const selectedTheme = localStorage.getItem('selected-theme');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'] (darkTheme)
} else {
    if(userHasDarkTheme) document.body.classList.add(darkTheme)
}




// Hover's en imagenes 

creaGif.addEventListener("mouseenter", () => {
    if (document.body.classList.contains(darkTheme)) {
        creaGif.src = "/imagenes/CTA-crear-gifo-hover-modo-noc.svg";
    } else {
        creaGif.src = "/imagenes/CTA-crear-gifo-hover.svg";
    }
});
creaGif.addEventListener("mousedown", () => {
    if (document.body.classList.contains(darkTheme)) {
        creaGif.src = "/imagenes/CTA-crear-gifo-active-modo-noc.svg";
    } else {
        creaGif.src = "/imagenes/CTA-crear-gifo-active.svg";
    }
});
creaGif.addEventListener("mouseout", () => {
    if (document.body.classList.contains(darkTheme)) {
        creaGif.src = "/imagenes/CTA-crear-gifo-modo-noc.svg";
    } else {
        creaGif.src = "/imagenes/button-crear-gifo.svg";
    }
});

if (sliderL !== null) {
    sliderL.addEventListener("mouseenter", () => {
        sliderL.src = "/imagenes/button-slider-left-hover.svg";
    });
    sliderL.addEventListener("mouseout", () => {
        if (document.body.classList.contains(darkTheme)) {
            sliderL.src = "/imagenes/button-slider-left-md-noct.svg";
            
        } else {
            sliderL.src = "/imagenes/button-slider-left.svg";
        }
    });
    sliderR.addEventListener("mouseenter", () => {
        sliderR.src = "/imagenes/Button-Slider-right-hover.svg";
    });
    sliderR.addEventListener("mouseout", () => {
        if (document.body.classList.contains(darkTheme)) {
            sliderR.src = "/imagenes/button-slider-right-md-noct.svg";
            
        } else {
            sliderR.src = "/imagenes/Button-Slider-right.svg";
        }
    });
}

iconFb.addEventListener("mouseenter", () => {
    if (document.body.classList.contains(darkTheme)) {
        iconFb.src = "/imagenes/icon_facebook_noc.svg";
        
    } else {
        iconFb.src = "/imagenes/icon_facebook_hover.svg";
    }
});
iconFb.addEventListener("mouseout", () => {
    iconFb.src = "/imagenes/icon_facebook.svg";
});

iconTw.addEventListener("mouseenter", () => {
    if (document.body.classList.contains(darkTheme)) {
        iconTw.src = "/imagenes/icon_twitter_noc.svg";
        
    } else {
        iconTw.src = "/imagenes/icon-twitter-hover.svg";
    }
});
iconTw.addEventListener("mouseout", () => {
    iconTw.src = "/imagenes/icon-twitter.svg";
});

iconIg.addEventListener("mouseenter", () => {
    if (document.body.classList.contains(darkTheme)) {
        iconIg.src = "/imagenes/icon_instagram_noc.svg";
        
    } else {
        iconIg.src = "/imagenes/icon_instagram-hover.svg";
    }
});
iconIg.addEventListener("mouseout", () => {
    iconIg.src = "/imagenes/icon_instagram.svg";
});


//Seccion Busqueda

let searchBar = document.getElementById('btn-search'); 
let searchIcon = document.querySelector('.imgSearch'); 
let searchTitle = document.querySelector('.tittleResults'); 
let resultSection = document.querySelector('.sectionPrincipal'); 
let resultContainer = document.getElementById('resultsImg');
let sectionSearch = document.querySelector('.resultsSearch');
let btnMore = document.getElementById('btnMore');
let searchTotal = document.getElementById('searchTotal');



searchBar.addEventListener('focusin', () => {
    resultSection.style.display = 'none'
    if(document.body.classList.contains(darkTheme)){
        searchIcon.src = '/imagenes/close-modo-noct.svg'
    } else{
        searchIcon.src = '/imagenes/close.svg'
    };

});

searchIcon.addEventListener('click', () => {
    if(document.body.classList.contains(darkTheme)){
        searchIcon.src = '/imagenes/icon-search-modo-noct.svg'
    } else{
        searchIcon.src = '/imagenes/icon-search.svg'
    };
    resultSection.style.display = 'block';
    searchBar.value = '';
    searchTitle.innerHTML = '';
    resultContainer.innerHTML = '';
    btnMore.style.display = 'none';
    hrInput.style.display = 'none';
    searchRecomend.style.display = 'none';
    
});

// Seccion de busqueda principal

let offset = 0;

async function searchGif (text) { 
    const wantedGif = searchBar.value;
    searchBar.value = text;
    const pathBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=${wantedGif}&offset=${offset}`;
    const answerGif = await fetch(pathBusqueda);
    const answerJson = await answerGif.json();
    resultContainer.innerHTML = '';
    searchTitle.innerHTML = `${wantedGif}`;
    for (let index = 0; index < answerJson.data.length; index++) {
        const element = answerJson.data[index];
        resultContainer.innerHTML +=`
        <div class="ctnCard" >
            <img class="gif" onclick='showModalMobile("${element.id}")' id="${element.id}" src="${element.images.original.url}" alt="${element.title}" />
            <div class="ctnIcon">
                <div class="iconFav" onclick='agregarFavorito("${element.id}")'></div>
                <div class="iconDown"onclick='downloadGif("${element.images.original.url}", "${element.slug}")'></div>
                <div class="iconMax" onclick='showModal("${element.id}")'></div>
                <div class="gifData">
                    <p class= "userName">${element.username}</p>
                    <h4 class="gifTitle">${element.title}</h4>
                </div>
            </div>
        </div>`;   
        
    }
};



btnMore.addEventListener("click", () => {
    offset += 12
    searchGif(searchBar.value)
});


searchBar.addEventListener('keyup', function (event) {
    if(event.key === 'Enter') {
        event.preventDefault();
        searchGif(searchBar.value);
        btnMore.style.display = 'block';
        searchRecomend.style.display = 'none';
        hrInput.style.display = 'none';
    }
    
});

const hrInput = document.getElementById('hrInput');
const searchRecomend = document.getElementById('searchRecomend');
const recomendTag = document.getElementById('recomendTag');


async function showSuggestions() {
    try {
        const pathSuggestions = `https://api.giphy.com/v1/gifs/search/tags?apiKey=${apiKey}&q=${searchBar.value}&limit=4`;
        let = response = await fetch(pathSuggestions);
        let = json = await response.json();
        recomendTag.innerHTML = "";
        for (let index = 0; index < json.data.length; index++) {
            const element = json.data[index];
            recomendTag.innerHTML += `
            <li id="sugerencia${index}">
                <img src="/imagenes/icon-search.svg" alt="Lupa" class="lupaSugerencias">
                <span id="textoSugg${index}" onclick="searchGif('${element.name}')">${element.name}</span>
            </li>`;
        }
    } catch (error) {
        console.log("ERROR EN LAS SUGERENCIAS: " + error);
    }
}


if (searchBar.value != null) {
    searchBar.addEventListener("keyup", function (event) {
        if (event.key !== "Enter") {
            if (!matchMedia.matches) {
                hrInput.style.display = "block";
                searchRecomend.style.display = "block";
            }
            showSuggestions();
        }
    });
}


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
            ctnFavGif.innerHTML += `
            <div class="card" onclick='showModalMobile("${json.data.id}")'>
                <img class="gif" src="${json.data.images.original.url}" alt="${json.data.title}" />
                <div class="icons-card">
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
        <img id='maxGifX' class="maxGifX" src="./imagenes/close.svg" alt="X">
        <img class="maxGifImg" src="${json.data.images.original.url}" alt="${json.data.title}">
        <div class="maxGifCtn">
            <div class="maxGifData">
                <p> ${json.data.username}</p>
                <h4>${json.data.title}</h4>
            </div>
            <div class="maxGifButtons">
                <div><img id='maxGifFav' src="./imagenes/icon-fav.svg" alt="Favorite" onclick='agregarFavorito("${id}")'></div>
                <div><img id='maxGifDown' src="./imagenes/icon-download.svg" alt="Down" onclick='downloadGif("${json.data.images.original.url}", "${json.data.slug}")'></div>
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

const header = document.getElementById("header");

window.addEventListener("scroll", (e) => {
    if (window.pageYOffset > 75) {
        header.classList.add("add-shadow");
    } else {
        header.classList.remove("add-shadow");
    }
});

function callback(entries) {
    if (entries[0].isIntersecting) {
        searchTotal.classList.remove("isSticky");
    } else {
        searchTotal.classList.add("isSticky");
    }
}
const divObserver = document.getElementById("divObserver");

const options = {
    rootMargin: "0px 0px 0px 0px",
    threshold: 1,
};

const observer = new IntersectionObserver(callback, options);

if (divObserver) {
    observer.observe(divObserver);
}