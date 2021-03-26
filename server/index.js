const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const port = process.env.PORT || 5000;
var cors = require('cors')
app.use(express.json())
app.use(cors())

const sequelize = new Sequelize('postgres://admin:secret@localhost:5432/number')

sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

const Number = sequelize.define("number", {
value: {
type: Sequelize.INTEGER,
defaultValue: 0
},
}, {
timestamps: false,
tableName: "number"
});


(async ()=>{
    await Number.sync({force: true});
    await Number.create({
      value: 0
    });
})();

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.post('/number', async (req, res) => {
    try {
    let currentValue = await Number.findByPk(1)
    const incrementResult = await currentValue.increment('value');
    incrementResult.save()
    res.json({ number: incrementResult })
    } catch(error) {
    console.error(error)
    }
    })
  
app.post('/number/reset', async (req, res) => {
  try {
    let currentValue = await Number.findByPk(1)
    currentValue.value = 0
    currentValue.save()
    res.json({ number: currentValue })
    } catch(error) {
    console.error(error)
    }
    })

app.get('/number', async (req, res) => {
try {
const number = await Number.findByPk(1)
res.json({ number })
} catch(error) {
console.error(error)
}
})

app.listen(port, () => console.log(`App listening on port ${port}!`))