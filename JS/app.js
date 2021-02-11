let burger = document.getElementById('burger');
let titHiden = document.getElementById('titHiden');

burger.addEventListener('click', openList);

//Seccion de burger
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
const pathTendencias = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3`;

let pTrend = document.getElementById('pTrend');
let ctnGif = document.getElementById('ctnGif');

async function cargarTendencias (){
    const response = await fetch(pathTendencias);
    const json = await response.json();
    console.log(json.data);
        json.data.forEach(element => {
            pTrend.innerHTML += `${element.title}`;
            ctnGif.innerHTML += `
            <img src="${element.images.fixed_width.url}" alt="">`;
        });
}
cargarTendencias();

//Dark-Mode

const darkThemeButton = document.getElementById('modoNocturno');
const darkTheme = 'dark-theme';

darkThemeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
})


//Seccion Busqueda

let searchBar = document.getElementById('btn-search'); 
let searchIcon = document.querySelector('.imgSearch'); 
let searchTitle = document.querySelector('.tittleResults'); 
let resultSection = document.querySelector('.sectionPrincipal'); 
let resultContainer = document.getElementById('resultsImg');
let sectionSearch = document.querySelector('.resultsSearch');
let btnMore = document.getElementById('btnMore');



searchBar.addEventListener('focusin', () => {
    searchIcon.src = './imagenes/close.svg';
    resultSection.style.display = 'none'

});

searchIcon.addEventListener('click', () => {
    searchIcon.src = '/imagenes/icon-search.svg';
    resultSection.style.display = 'block';
    searchBar.value = '';
    searchTitle.innerHTML = '';
    resultContainer.innerHTML = '';
    btnMore.style.display = 'none'; 
});

async function searchGif () { 
    const wantedGif = searchBar.value;
    const pathBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&q=${wantedGif}`;
    const answerGif = await fetch(pathBusqueda);
    const answerJson = await answerGif.json();
    console.log(answerJson);
    resultContainer.innerHTML = '';
    searchTitle.innerHTML = `${wantedGif}`;
    for (let index = 0; index < answerJson.data.length; index++) {
        const element = answerJson.data[index];
        resultContainer.innerHTML +=`
        <img src="${element.images.fixed_width.url}" alt="">
        `;   
        
    }
};


searchBar.addEventListener('keyup', async (e) => {
    if(searchBar.value.length > 3) {
        await searchGif();
        btnMore.style.display = 'block';
    }
    
});

// btnMore.addEventListener('click', () =>{
//     if(answerJson.length > 12) {
//         searchGif();
//     }
    

// })

// searchBar.addEventListener('keyup', async function () {
//     let tagRecomend = searchBar.value;
//     let pathSearch = `https://api.giphy.com/v1/tags/related/${tagRecomend}?api_key=${apiKey}&limit=4`

//     const recomendGifs = await fetch(pathSearch);
//     const recomendJson = await recomendGifs.json();
    

// })



// searchBar.addEventListener('keyup', async (e) =>{
//     if(searchBar.value.length > 3) {
//         searchTitle.textContent = searchBar.value;
//         resultSection.style.display = 'block';

//         let gifts = await buscarGif(searchBar.value);
        
//     }
// });

// searchIcon.addEventListener('click', () => {
//     if(searchBar.value){
//         searchBar.value = '';
//         searchIcon.src = './imagenes/icon-search.svg';
//         resultSection.style.display = 'none';
//         resultContainer.innerHTML = '';
//         toggleWhenFocusSearchBar();
//     }
// });