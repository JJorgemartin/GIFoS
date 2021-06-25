
const divInterno = document.getElementById("divInterno");
const h2Crear = document.getElementById("h2Crear");
const pCrear = document.getElementById("pCrear");
const loading = document.getElementById("loading");
const btnsCtn = document.getElementById("btnsCtn");
const linkBtn = document.getElementById("linkBtn");
const loadingImg = document.getElementById("loadingImg");
const loadingH5 = document.getElementById("loadingH5");
const video = document.getElementById("video");
const gifCreado = document.getElementById("gifCreado");
const pasoUno = document.getElementById("pasoUno");
const pasoDos = document.getElementById("pasoDos");
const pasoTres = document.getElementById("pasoTres");
const comenzarButton = document.getElementById("comenzarButton");
const grabarButton = document.getElementById("grabarButton");
const finalizarButton = document.getElementById("finalizarButton");
const subirGifoButton = document.getElementById("subirGifoButton");
const apiKey = 'XMLnEoJBC2LcT7wr2NKS6Lsj4SYnIjcb';

let recorder;
let blob;
let form = new FormData();
let arrayMisGifos = [];

function getStreamAndRecord() {
    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                height: { max: 480 },
            },
        })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            video.style.display = "block";
            divInterno.style.display = "none";
            pasoUno.style.backgroundColor = "white";
            pasoUno.style.color = "#572ee5";
            pasoDos.style.backgroundColor = "#572ee5";
            pasoDos.style.color = "white";
            grabarButton.style.display = "block";
            recorder = RecordRTC(stream, {
                type: "gif",
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log("started");
                },
            });
        });
}
if (comenzarButton) {
    comenzarButton.addEventListener("click", () => {
        h2Crear.innerHTML = "¿Nos das acceso a tu cámara?";
        pCrear.innerHTML =
            "El acceso a tu camara será válido sólo<br/>por el tiempo en el que estés creando el GIFO.";
        pasoUno.style.backgroundColor = "#572ee5";
        pasoUno.style.color = "white";
        comenzarButton.style.display = "none";
        getStreamAndRecord();
    });

    grabarButton.addEventListener("click", () => {
        grabarButton.style.display = "none";
        finalizarButton.style.display = "block";

        recorder.startRecording();
    });

    finalizarButton.addEventListener("click", () => {
        recorder.stopRecording(() => {
            blob = recorder.getBlob();
            var uri = URL.createObjectURL(blob);
            video.style.display = "none";
            gifCreado.style.display = "block";
            gifCreado.src = uri;
            form.append("file", blob, "myGif.gif");
            finalizarButton.style.display = "none";
            subirGifoButton.style.display = "block";
        });
    });

    subirGifoButton.addEventListener("click", async () => {
        loading.style.display = "block";
        pasoDos.style.backgroundColor = "white";
        pasoDos.style.color = "#572ee5";
        pasoTres.style.backgroundColor = "#572ee5";
        pasoTres.style.color = "white";
        let idCreated = await createGif(form);
        arrayMisGifos.push(idCreated);
        localStorage.setItem("misGifos", JSON.stringify(arrayMisGifos));
        linkBtn.href = `https://media.giphy.com/media/${idCreated}/giphy.gif`;
        loadingImg.src = "./images/check.svg";
        loadingH5.innerHTML = "GIFO subido con éxito";
        btnsCtn.style.display = "flex";
    });
}

const pathUpload = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;

async function createGif(formData) {
    const response = await fetch(pathUpload, {
        method: "POST",
        body: formData,
    });
    const result = await response.json();
    return result.data.id;
}

// MOSTRAR MIS GIFOS

if (localStorage.getItem("misGifos") !== null) {
    arrayMisGifos = JSON.parse(localStorage.getItem("misGifos"));
} else {
    localStorage.setItem("misGifos", "[]");
}

const misGifosCtn = document.getElementById("misGifosCtn");

async function getMisGifos() {
    if (localStorage.getItem("misGifos") !== "[]") {
        empty.style.display = "none";
        let misGifosParsed = JSON.parse(localStorage.getItem("misGifos"));
        for (let index = 0; index < misGifosParsed.length; index++) {
            const element = misGifosParsed[index];
            const pathGetGifs = `https://api.giphy.com/v1/gifs/${element}?api_key=${api_key}`;
            let = response = await fetch(pathGetGifs);
            let = json = await response.json();
            misGifosCtn.innerHTML += `
            <div class="card" onclick='showModalMobile("${element.id}")'>
                <img class="gif" src="${json.data.images.original.url}" alt="${json.data.title}" />
                <div class="icons-card">
                    <div class="iconFav itsFav" onclick='deleteGif("${json.data.id}")'></div>
                    <div class="iconDown" onclick='downloadGif("${json.data.images.original.url}", "${json.data.slug}")'></div>
                    <div class="iconMax" onclick='showModal("${json.data.id}")'></div>
                    <div class="gifData">
                        <p class= "userName">${json.data.username}</p>
                        <h4 class="gifTitle">${json.data.title}</h4>
                    </div>
                </div>
            </div>`;
        }
    }
}
if (misGifosCtn) {
    empty.style.display = "flex";
    window.onload = getMisGifos();
}

// ELIMINAR MIS GIFOS------------------------------------------------
function deleteGif(id) {
    let listaGifos = JSON.parse(localStorage.getItem("misGifos"));
    let idPosition = listaGifos.indexOf(id);
    listaGifos.splice(idPosition, 1);
    localStorage.setItem("misGifos", JSON.stringify(listaGifos));
    misGifosCtn.innerHTML = "";
    getMisGifos();
}