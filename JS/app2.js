//BORRADOR 



let buscar = document.getElementById('buscar');
let texto = document.getElementById('texto');
let sugerencias = document.getElementById('sugerencias');

texto.addEventListener('keyup', function () {
    let tag = texto.value;
    let pathSearch = `https://api.giphy.com/v1/tags/related/${tag}?api_key=${apiKey}&limit=10`
    

    fetch(pathSearch)
        .then(respuesta => respuesta.json())
        .then(json => {
            console.log(json);
            sugerencias.innerHTML = '';
            for (let index = 0; index < json.data.length; index++) {
                const element = json.data[index];
                let li = document.createElement('li');
                li.innerHTML = element.name;
                sugerencias.appendChild(li);

                
            }
        })
        .catch(error => console.error(error));

})


