if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("sw.js").then(registeration=>{
        console.log("registered seviceworker")
    }).catch(error =>{
        console.log("SW REGISTERATION FAILED")
        console.log(error)
    });
  }