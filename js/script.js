if('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        navigator.serviceWorker.register('sw.js')
        .then((registration)=>{
            console.log('ServiceWorker registrado ok, alcance: '+ registration.scope)
        }).catch((error)=>{
            console.log('ServiceWorker registro fallido: '+ error)
        });

        //Demorar el popup de permisos de notificaciones
        if(window.Notification && Notification.permission !== 'denied'){
            setTimeout(()=>{
                Notification.requestPermission((status)=>{
                    console.log('Permiso de notificaciones: ', status);
                });
            }, 2000);

            //Mostrar notificacion
            new Notification('Hola! Soy una notificacion',{
                body: 'Gracias por permitir las notificaciones',
                icon: 'assets/icons/android-icon-192x192.png',
                image: 'assets/img/No-Image-Placeholder.svg.png',
                badge: 'assets/icons/android-icon-48x48.png',
                vibrate: [100, 50, 100],
                renotify: true,
                tag: 'notificacion-sample'
            });
        }

    });
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
        showButton.addEventListener('click', addToHomeScreen);
    }

    const addToHomeScreen = () =>{
        console.log('instalando')
        if(aviso){
            aviso.prompt();
            aviso.userChoice.then((choice)=>{
                if(choice.outcome === 'accepted'){
                    console.log('Usuario acepto la instalacion')
                }else{
                    console.log('Usuario no acepto la instalacion')
                }
                aviso = null;
            })
        }
        let showButton = document.querySelector('#addToHome');
        showButton.style.display = "none";
    }

})()