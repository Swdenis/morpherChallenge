const express = require('express')
const Sequelize = require('sequelize')
const app = express()
const port = 3002
app.use(express.json());

const sequelize = new Sequelize('postgres://admin:secret@localhost:5432/number')

sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

const createQuery = "CREATE DATABASE number WITH  OWNER = admin ENCODING = 'UTF8' TABLESPACE = pg_default CONNECTION LIMIT = -1;"

// sequelize.query(createQuery)
//     .then(() => console.log("DB created"))
//     .catch(err => console.log("error creating DB", err))

const Number = sequelize.define("number", {
// attributes
value: {
type: Sequelize.INTEGER,
defaultValue: 0
},
}, {
timestamps: false,
tableName: "number"
});

// Note: using `force: true` will drop the table if it already exists

(async ()=>{
    await Number.sync({force: true});
    // Table created
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
    res.json({ number: incrementResult }) // Returns the new number that is created in the database
    } catch(error) {
    console.error(error)
    }
    })
  
app.post('/number/reset', async (req, res) => {
  try {
    let currentValue = await Number.findByPk(1)
    currentValue.value = 0
    currentValue.save()
    res.json({ number: currentValue }) // Returns the new number that is created in the database
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