// create map
const map = L.map("mapid").setView([-27.222633, -49.6455874], 15);

// create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// create icon
const icon = L.icon({
  iconUrl: "./public/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// adicionar o campo de fotos
function addPhotoField() {
  // pegar o container de fotos #images
  const container = document.querySelector("#images");
  // pegar o container para duplicar .new-image
  const fieldsContainer = document.querySelectorAll(".new-upload");
  // realizar o clone da última imagem adicionada
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  // verificar se o campo está vazio, se sim, não adicionar ao container de imagens
  const input = newFieldContainer.children[0]

  if(input.value == "") {
      return
  }

  // limpar o campo antes de adicionar ao container de imagens
  input.value = ""

  // adicionar o clone ao container de #imagens
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll(".new-upload");

    if(fieldsContainer.length < 2) {
        // limpar o valor do campo
        span.parentNode.children[0].value = ""
        toggleDeleteButton();

        return
    }

    // deletar o campo
    span.parentNode.remove();
    
    // ativar o toggleDeleteButton
    toggleDeleteButton();
}

// select yes or no
function toggleSelect(event) {
    // retirar a clase active dos botoes 
    document.querySelectorAll('.button-select button')
    .forEach( button => button.classList.remove('active'))
    
    // colocar a class active no botao clicado
    const button = event.currentTarget
    button.classList.add('active')

    // atualizar o imput hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    
    input.value = button.dataset.value
}

function toggleDeleteFieldButton() {
    // buscar o input e span (delete button)
    const input = document.querySelector('[name="images"]')
    const span = document.querySelector('.new-upload span')
    const fieldsContainer = document.querySelectorAll(".new-upload");

    //verificar se o input está vazio
    if (input.value !== '') {
        // se não vazio, aparecer o botao
        span.classList.remove('empty-input')
    } else if (fieldsContainer.length < 2) {
        span.classList.add('empty-input')
    }

    // se não, colocar o span
}
