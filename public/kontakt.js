function isEmail(mail) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(mail).toLowerCase());
   }  

function saadaVorm() {
    const nimi = document.getElementById("nimi").value
    const email = document.getElementById("email").value
    const teade = document.getElementById("teade").value

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

    const andmed = {
        nimi: nimi,
        email: email,
        teade: teade
    }
    console.log("Saadetakse andmed:")
    console.log(andmed)
}