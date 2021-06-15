console.log("test")

let matkad = []

function loeMatkad() {
    let aadress = "/api/matkad"
    $.ajax({
        url: aadress, 
        method: "GET",
    }).done(function(andmed) {
        if (!andmed || !Array.isArray(andmed) ) {
            console.log("Matkade lugemine ebaõnnestus")
            return false
        }
        matkad = andmed
        andmed.forEach(naitaMatkaAndmeid)
    })
   
}

function naitaMatkaAndmeid(matk, indeks) {
    //Kustuta ära olemasolevad matkade andmed
    //Lisa:
    //const matkad = loeMatkad()
    //Loo funktsioon loeMatkad mis loeb serverist matkade andmed
    //kasuta selleks endpointi /api/matkad

    const valjundElement = document.getElementById("matkade_valjund")
    const vabadKohad = matk.kohti - matk.registreerunud.length
    let valjundHtml = `
        <div class="col-md-4 card">
            <img class="card-img-top" src="${matk.pildiUrl}" alt="">
            <div class="card-body">
                <h4 class="card-title">${matk.nimetus}</h4>
                <p class="card-text">
                    ${matk.kirjeldus}
                </p>
                <p class="card-text">
                    Vabu kohti: ${vabadKohad}
                </p>
                <a href="/registreeru/${indeks}" class="btn btn-success" >Registreeru</a>
            </div>
        </div>    
    `
    valjundElement.innerHTML += valjundHtml
}

//let i = 0;
//for (const matk of matkad) {
//    naitaMatkaAndmeid(matk, i)
//    i++
//}

//matkad.forEach((matk, indeks) => naitaMatkaAndmeid(matk, i))

loeMatkad()