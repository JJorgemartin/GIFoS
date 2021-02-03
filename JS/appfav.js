const apiKey = 'XMLnEoJBC2LcT7wr2NKS6Lsj4SYnIjcb';
const pathTendencias = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3`;

let pTrend = document.getElementById('pTrend');
let ctnGif = document.getElementById('ctnGif');

async function cargarTendencias (){
    const response = await fetch(pathTendencias);
    const json = await response.json();
    console.log(json.data);
        json.data.forEach(element => {
            ctnGif.innerHTML += `
            <img src="${element.images.fixed_width.url}" alt="">`;
        });
}
cargarTendencias();