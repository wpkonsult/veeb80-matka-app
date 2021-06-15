const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { MongoClient } = require("mongodb")

const mongoUri = "mongodb+srv://veeb80:HerneSupp12@cluster0.mm2xg.mongodb.net/matkaklubi?retryWrites=true&w=majority"

async function leiaRegistreerumised(req, res) {
  const client = new MongoClient(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });

   let regFilter = {}

   if (req.query.matk) {
     regFilter = {matkaIndeks: req.query.matk}
   }

   await client.connect()
   const database = client.db("matkaklubi")
   const registreerumised = database.collection("registreerumised")
   const result = registreerumised.find(regFilter)
   const tulemus = []
   await result.forEach((reg) => {
     tulemus.push(reg)
   })

   await client.close()
   return res.send(tulemus)
}

async function salvestaRegistreerimine(matkaIndeks, nimi, email, markus) {
  const client = new MongoClient(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });

   const registreerunu = {
     matkaIndeks,
     nimi,
     email,
     markus
   }

   await client.connect()
   const database = client.db("matkaklubi")
   const registreerumised = database.collection("registreerumised")
   const result = await registreerumised.insertOne(registreerunu)

   console.log(result.insertedId)

   await client.close()

   return true

}

async function lisaUudis(req, res) {
  //Kuidas lugeda requestist uudise andmed?
  //Kui andmed on loetud, loo uudise objekt
  const uudis = {
    matk: req.query.pealkiri,
    nimi: req.query.uudis,
  }

  //Võta ühendust mongo andmebaasiga, vali kollektsioon "uudised"
  const client = new MongoClient(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });

   await client.connect()
   const database = client.db("matkaklubi")
   const registreerumised = database.collection("uudised")
   
   //Lisa uudise objekt andmebaasi
   const result = await registreerumised.insertOne(uudis)
   await client.close()
   
   //Saada endpoindile tagasi lisatud uudise id (sarnane registreerumisele)
   console.log(result.insertedId)
   res.send({status: "ok", lisatudId: result.insertedId})
}
 
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

async function lisaRegistreerumine(req, res) {
  if (req.query.matk < 0 || req.query.matk >= matkad.length) {
    return res.send("Matka number on vale. Registreerumine ebaõnnestus")
  }

  const registreerumine = {
    matk: req.query.matk,
    nimi: req.query.nimi,
    email: req.query.email
  }

  const result = await salvestaRegistreerimine(
    req.query.matk,
    req.query.nimi,
    req.query.email,
    req.query.markus,
  )

  if (!result) {
    return res.send({viga: "Andmete salvestamine ebaõnnestus"})
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
  .get('/admin', (req, res) => res.render('pages/admin', {matkad}))
  .get('/admin/lisaUudis', (req, res) => res.render('pages/lisa_uudis'))
  .get('/registreeru/:matk', registreeru)
  .get('/aeg', aeg)
  .get('/api/registreeru', lisaRegistreerumine)
  .get('/api/matkad', saadaMatkad)
  .get('/api/registreerumised', leiaRegistreerumised)
  .get('/api/lisaUudis', lisaUudis)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
