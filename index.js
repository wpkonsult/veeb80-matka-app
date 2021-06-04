const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const matk1 = {
  nimetus: "Jalgsimatk Kõrvemaal",
  pildiUrl: "./pildid/matkaja.png",
  kohti: 12,
  kirjeldus: "Kõnnime palju, aga loodus on ilus. Lõuna lõkkel.",
  registreerunud: [],
}
const matk2 = {
  nimetus: "Süstamatk ümber Hiiunmaa",
  pildiUrl: "./pildid/syst1.jpg",
  kohti: 6,
  kirjeldus: "Sõidame palju, aga loodus on ilus. Lõuna lõkkel.",
  registreerunud: [],
}

const matk3 = {
  nimetus: "Jalgrattamatk Virumaal",
  pildiUrl: "./pildid/matkaja.png",
  kohti: 10,
  kirjeldus: "Sõidame palju, aga loodus on ilus. Lõuna lõkkel.",
  registreerunud: [],
}

const matk4 = {
  nimetus: "Kepikõnnimatk ümber Tartu",
  pildiUrl: "./pildid/matkaja.png",
  kohti: 10,
  kirjeldus: "Kõnnime palju, aga loodus on ilus. Lõuna lõkkel.",
  registreerunud: [],
}

const matkad = [matk1, matk2, matk3, matk4]

function aeg(req, res) {
  const aeg = new Date()
  res.send("Kellaaeg on: " + aeg.toString())
}

function registreeru(req, res) {
  if (isNaN(req.params.matk)) {
    veateade = "Matka indeks peab olema number. Registreerumine ebaõnnestus"
    return res.render("pages/viga", {veateade})
  }
  
  const matk = parseInt(req.params.matk)

  if (matk < 0 || matk >= matkad.length) {
    veateade = "Matka number on vale. Registreerumine ebaõnnestus"
    return res.render("pages/viga", {veateade})
  }

  console.log(matk)

  const matkaAndmed = matkad[matk]
  res.render("pages/registreeru", {matkaNumber: matk, matkaAndmed: matkaAndmed})
}

function lisaRegistreerumine(req, res) {
  if (req.query.matk < 0 || req.query.matk >= matkad.length) {
    return res.send("Matka number on vale. Registreerumine ebaõnnestus")
  }

  const registreerumine = {
    matk: req.query.matk,
    nimi: req.query.nimi,
    email: req.query.email
  }


  const matk = matkad[req.query.matk]
  matk.registreerunud.push(registreerumine)

  console.log(matk)
  res.send(`Saadeti andmed: matk: ${registreerumine.matk} nimi - ${registreerumine.nimi}, email: ${registreerumine.email}, kokku registreerunuid: ${matk.registreerunud.length}`)
}

function saadaMatkad(req, res) {
  const avalikudAndmed = matkad.map((matk) => {
    return { ...matk, registreerunud: matk.registreerunud.length}
  })
  res.send(avalikudAndmed)
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/kontakt', (req, res) => res.render('pages/kontakt'))
  .get('/uudised', (req, res) => res.render('pages/uudised'))
  .get('/registreeru/:matk', registreeru)
  .get('/aeg', aeg)
  .get('/api/registreeru', lisaRegistreerumine)
  .get('/api/matkad', saadaMatkad)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
