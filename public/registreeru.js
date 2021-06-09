function isEmail(mail) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(mail).toLowerCase());
   }  

function registreeru(matkaIndeks) {
    const nimi = document.getElementById("nimi").value
    const email = document.getElementById("email").value
    const teade = document.getElementById("teade").value
    const jalusElement = document.getElementById("jalus")

    //siin saab teha validatsioone
    if (!isEmail(email)) {
        console.log("Pole email, proovi uuesti")
        document.getElementById("email").focus()
        return false
    }

    if (!teade) {
        console.log("Pole teadet, proovi uuesti")
        document.getElementById("teade").focus()
        return false
    }

    const aadress = `/api/registreeru?matk=${matkaIndeks}&nimi=${nimi}&email=${email}`

    const settings = {
        url: aadress,
        method: 'GET',
        headers: {}
    }

    $.ajax(settings).done(function (response) {
        console.log("Registreerimine õnnestus!")
        jalusElement.innerHTML = `
        <div class="alert alert-success">
        ${nimi} - registreerumine õnnestus
        </div>
        `
    })
}