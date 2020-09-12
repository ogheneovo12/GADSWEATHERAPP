self.addEventListener("install",e=>{
  e.waitUntil(
     caches.open("static").then(cache =>{
         return cache.addAll(["./","./src/css/alert.css","./src/css/app.css","./images/icons/cloudy.png","./images/icons/sunny.png"])
     })
  )
})

self.addEventListener("fetch", e =>{
   e.respondWith(caches.match(e.request).then(response =>{
       return response || fetch(e.request)
   }))
})