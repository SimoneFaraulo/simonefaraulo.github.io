const CACHE_NAME = `conversione-temperatura`


//aggiunge un eventlistener per l'evento install che è il primo evento del service worker qui andiamo a scefliere quali file inserire nella cache

self.addEventListener("install", event => {
    event.waitUntil(
        //wait until prende una clousere (funzione anonima)
        (async () => {
        //ccaches è l'API javascript per accedere alla cache
        //chaches.open(X) accede alla cache con come X
        //se non esiste la crea
        const cache = await caches.open(CACHE_NAME);
        //aggiunge alla cache tutti gli elementi nell'array A, aggiungere 
        cache.addAll(['/','/convertitore.js']);
        })() /* invoco la funzione data come paramentro a waitUntil*/);
});

//STEP 2: per ogni evento fetch
//accede alla cache e mi chiedo se la risora chiesta nell'evento fetch
//sia immagazzinata nella cache: se si la restituisco
// se non è nella cache allora provo a richiederla al server 
// e la aggiungo alla cache

self.addEventListener("fetch", event => {
    event.respondWith(
        (async () => {
        const cache = await caches.open(CACHE_NAME);
        //controlla se la cache ha questa risorsa
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            //se si la restituisco
            return cachedResponse;
        } else {
            try {

                //altrimenti la richiedo al server 
                const fetchResponse = await fetch(event.request);
                //e la immagazzino nella cache
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
    // errore
            }
        }
    })());
});