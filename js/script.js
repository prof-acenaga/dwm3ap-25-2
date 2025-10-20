if('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        navigator.serviceWorker.register('sw.js')
        .then((registration)=>{
            console.log('ServiceWorker registrado ok, alcance: '+ registration.scope)
        })
    })
}

//Funcion flecha anonima auto ejecutable
//(()=>{})()
(()=>{
    let aviso;

    window.addEventListener('beforeinstallprompt', (event)=>{
        event.preventDefault();
        aviso = event;
        console.log(aviso);

        showAddToHomeScreen()

    })

    const showAddToHomeScreen = () =>{
        let showButton = document.querySelector('#addToHome');
        showButton.style.display = "block";
        showButton.addEventListener('click', addToHomeScreen());
    }

})()