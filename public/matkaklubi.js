console.log("test")

const matk1 = {
    nimetus: "Jalgsimatk Kõrvemaal",
    pildiUrl: "./pildid/matkaja.png",
    kohti: 12,
    kirjeldus: "Kõnnime palju, aga loodus on ilus. Lõuna lõkkel.",
    registreerunud: ['Mati', 'Kati', 'Rebase Rein', "Jänku Juta"],
}
const matk2 = {
    nimetus: "Süstamatk ümber Hiiunmaa",
    pildiUrl: "./pildid/syst1.jpg",
    kohti: 6,
    kirjeldus: "Sõidame palju, aga loodus on ilus. Lõuna lõkkel.",
    registreerunud: ['Rebase Rein', "Jänku Juta"],
}

const matk3 = {
    nimetus: "Jalgrattamatk Virumaal",
    pildiUrl: "./pildid/matkaja.png",
    kohti: 10,
    kirjeldus: "Sõidame palju, aga loodus on ilus. Lõuna lõkkel.",
    registreerunud: ['Rebase Rein', "Jänku Juta"],
}

const matk4 = {
    nimetus: "Kepikõnnimatk ümber Tartu",
    pildiUrl: "./pildid/matkaja.png",
    kohti: 10,
    kirjeldus: "Kõnnime palju, aga loodus on ilus. Lõuna lõkkel.",
    registreerunud: ['Rebase Rein', "Jänku Juta"],
}

const matkad = [matk1, matk2, matk3, matk4]

function naitaMatkaAndmeid(matk) {
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
                <a href="#" class="btn btn-success" >Registreeru</a>
            </div>
        </div>    
    `
    valjundElement.innerHTML += valjundHtml
}

for (const matk of matkad) {
    naitaMatkaAndmeid(matk)
}