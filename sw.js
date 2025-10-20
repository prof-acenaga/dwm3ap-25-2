let cacheName = 'cache';

let cacheDynamic = 'cache2';


self.addEventListener('install', (e) =>{
    self.skipWaiting();
    /* precaching */
    // e.waitUntil(
    //     caches.open(cacheName)
    //         .then((cache) => {
    //             cache.addAll([
    //                 'assets/img/hero-home.jpeg'
    //             ])
    //         })
    // )
    console.log('sw instalado: ', e) //installEvent
});

self.addEventListener('activate', (e) =>{
    console.log('sw Activado: ', e) //extendableEvent
});


self.addEventListener('fetch', (e)=>{ // Agrega un detector de eventos al evento fetch
    //🔽proporciona una respuesta a esta busqueda fetch
    e.respondWith(caches.match(e.request) // Comprubea si la URL de solicitud coincide con algo que esta en el cache
        .then((response)=>{ //Si hay una respuesta y no esta indefinica/nula, la decuelce
            if(response){
                return response;
            }
            let requestToCache = e.request.clone() // Clonamos la solicitud: una solicitud es un flujo y se puede consumir una sola vez
            return fetch(requestToCache)
                .then( //trata de hacer la solicitud HTTP original segun lo previsto
                    (response) =>{
                        if(!response || response.status !== 200){
                            //si la respuesta falla o el servidor response con un codigo de error, lo devolvemos inmediatamente
                            return response;
                        }

                        let responseToCache = response.clone(); //Nuevamente, clonamos la respuesta porque necesitamos agregarla al caché  y porque se usa para la respuesta final

                        caches.open(cacheDynamic) //Abre el cache
                            .then((cache2) => {
                                cache2.put(requestToCache, responseToCache); //añadimos la respuesta en el cache
                            });
                            return response;
                    }



                )
        })
    )
})

//notificaciones push
self.addEventListener('push', (e)=>{
    let data = e.data ? e.data.text() : 'no vino texto';
    let options = {
        body: data,
        icon: 'assets/icons/android-icon-192x192.png',
        badge: 'assets/icons/android-icon-48x48.png',
        image: 'assets/img/No-Image-Placeholder.svg.png',
        vibrate: [100, 50, 100],
        renotify: true,
        actions: [
            {action: 'SI', title: 'Ver detalle'},
            {action: 'NO', title: 'Cerrar'}
        ],
        tag: 'notificacion-sample'
        
    };
    e.waitUntil(
        self.registration.showNotification('Notificacion desde SW', options)
    );
});

self.addEventListener('notificationclick', (e)=>{
    console.log('notificacion click: ', e);
    if(e.action === 'SI'){
        console.log('el usuario quiere ver el detalle');
        clients.openWindow('https://www.google.com');
    }else{
        console.log('el usuario no quiere ver el detalle');
    }
    e.notification.close();
});
