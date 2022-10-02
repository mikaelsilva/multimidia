const express = require('express')
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const app = express()

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mvs2:Mongodb123@cluster0.75iwdbw.mongodb.net/test";

MongoClient.connect(uri,{useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err)
    db = client.db('test')

    app.listen(3000, () => {
        console.log('server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.get('/',(req,res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req,res) => {
    db.collection('data').find().toArray((err,results) => {
        if (err) return console.log(err)
        //console.log(results)
        res.render('show.ejs', {data: results})
   })
})


app.post('/show', (req,res) => {
    db.collection('data').insertOne({masterData: req.body}, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvamento no banco concluído')
        res.redirect('/show')
    })
})

app.route('/edit/:id').get((req,res) => {
    var id = req.params.id
    var ObjectId = require('mongodb').ObjectId;

    console.log(id)
    console.log(ObjectId(id))
    db.collection('data').find(ObjectId(id)).toArray((err,result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', {data: result})
    })
}).post((req,res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname
    var ObjectId = require('mongodb').ObjectId;

    db.collection('data').updateOne({_id: ObjectId(id)}, {$set: {"masterData":{name: name, surname: surname}}},(err,result) => {
        if (err) return res.send(err)
        res.redirect('/show')
        console.log('Atualizado no Banco de Dados')
    })
})

app.route('/delete/:id').get((req,res) => {
    var id = req.params.id

    db.collection('data').deleteOne({'_id': ObjectId(id)}, (err,result) => {
        if (err) return res.send(500,err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/show')
    })
})
