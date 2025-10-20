const API = 'https://api.magicthegathering.io/v1';
const loader = document.querySelector('.loader');
let cardFavorites = [];
let cardApi;
let cardsApi = []

const fetchData = async (url) => {
    try{
        const response = await fetch(`${API}${url}`, {
            method: 'GET',
            headers: {
            }
        });
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}


const getAllCards = async (url) =>{
    const data = await fetchData(url);
    const cards = await data.cards;
    return cards;
}

const getCard = async (id) => {
    const data = await fetchData(`/cards/${id}`);
    const card = await data.card;
    return card
}

const cardDetail = async (id) =>{
    isLoading(true);
    await getCard(id)
        .then(card =>{
            const cardElement = document.querySelector('#detailModal');
            cardElement.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="detailModalLabel">${card.name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body py-2">
                        <ul class="list-group mb-2">
                            <li class="list-group-item"><span class="fw-bold">Tipo de Carta:</span> ${card.type}</li>
                            <li class="list-group-item"><span class="fw-bold">Rareza:</span> ${card.rarity}</li>
                            <li class="list-group-item"><span class="fw-bold">Nombre del set:</span> ${card.setName}</li>
                        </ul>
                        <div class="mb-2 d-flex justify-content-center">
                            <img class="card-img-top w-50" src="${card.imageUrl}" alt="${card.name}">
                        </div>
                        <p>${card.text}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`
            if(window.location.pathname.includes('index.html')){
                cardElement.innerHTML += `
                    <button type="button" onclick="addFavorite(${card.multiverseid})" class="btn btn-primary" id="#favoriteButton">Agregar a Favoritos</button>
                `
            } else{
                cardElement.innerHTML += `
                    <button type="button" onclick="deleteFavorite(${card.multiverseid})" class="btn btn-danger" id="#favoriteButton">Borrar</button>
                `
            }

                        
            
            cardElement.innerHTML += `</div>
                                        </div>
                                            </div>`;
            isLoading(false)
            const myModal = new bootstrap.Modal('#detailModal', {});
            myModal.show();
        })

}

const cardsStyle = (cards) => {
    document.querySelector('.cards').innerHTML = '';
    cards.forEach(card => {
        if(card.multiverseid != undefined){
            const cardElement  = document.createElement('div');
            cardElement.className = 'card col-12 col-md-3 col-lg-2 p-2';
            cardElement.innerHTML = `
                <img class="card-img-top" src="${card.imageUrl}" alt="${card.name}">
                <h3 class="card-title">${card.name}</h3>
                <p class="card-text">${card.type}</p>
                <button onclick="cardDetail(${card.multiverseid})" class="btn btn-primary"> Detalle de Carta </button>
            `;
            document.querySelector('.cards').appendChild(cardElement)
        }
    });
}

const showCards = async (url) => {
    isLoading(true);
     getAllCards(url)
        .then(cards =>{
            cardsApi = cards;
            localStorage.setItem('allCards', JSON.stringify(cardsApi));
            cardsStyle(cards)
            isLoading(false);
        });

}



const isLoading = (isActive) => {

    if(isActive){
        loader.classList.remove('d-none')
    }else{
        loader.classList.add('d-none')
    }
}

const addFavorite = (id) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let cards = JSON.parse(localStorage.getItem('allCards'))
    cards.forEach( card => {
            if(card.multiverseid == id){
                favorites.push(card)
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
    });
}


const search = async () => {
    isLoading(true)
    data = document.querySelector('#search').value;
    
    let cards = await fetchData('/cards?name='+data);

    cardsStyle(cards.cards)
    isLoading(false)

}

const showFavorites = () =>{
    let favorites  = JSON.parse(localStorage.getItem('favorites')) || [];

    if(favorites.length === 0){
        console.log(' no hay nada')
    } else {
        cardsStyle(favorites);
    }
}

const deleteFavorite = (id) =>{
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter((card) =>{
        return card.multiverseid != id;
    })
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
}

window.addEventListener('load',  () => {
    const route = window.location.pathname;
    console.log(route);
    if(route.includes('index.html')){
        showCards('/cards')
    }else{
        showFavorites()
    }
})



