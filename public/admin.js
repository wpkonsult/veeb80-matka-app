console.log("Asume matkade andmeid lugema")

/*
*See on funktsioon registeerumiste lugemiseks
*
*Sisend: matk - matka indeks. -1 - kõigile matkadele registreerumised
*Väljund: massiiv matkale registreerumistest
*
*/
function loeRegistreerumised(matk) {
    const matkadeValjundEl = document.getElementById("matkade-valjund")
    let aadress = "/api/registreerumised"

    if (matk >= 0) {
        aadress += "?matk=" + matk
    }

    $.ajax({
        url: aadress, 
        method: "GET",
        error: function(ajaxError) {
            matkadeValjundEl.innerHTML = `
            <div class="alert alert-danger">
                Andmete lugemine serveris ebaõnnestus
            </div>
            `
            return false
        }
    }).done(function(andmed) {
        if (!andmed || !Array.isArray(andmed) ) {
            matkadeValjundEl.innerHTML = `
            <div class="alert alert-danger">
                Serverist saadud andmed ei ole
            </div>
            `
            return false
        }

        let valjundHtml = ""
        andmed.forEach(function(reg){
           valjundHtml += `
            <div>
                Matk: ${reg.matkaIndeks}, 
                nimi: ${reg.nimi}, 
                email: ${reg.email}
            </div>
           ` 
        })

        matkadeValjundEl.innerHTML = valjundHtml
        return true
    })
}

loeRegistreerumised(0)