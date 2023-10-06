const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Phonebook:${password}@phonebook.vtcp2i5.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: Number, 
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
  mongoose
    .connect(url)
    .then(() => {
      Person
        .find({})
        .then(persons => {
          persons.forEach(person => {
            console.log(person)
            return mongoose.connection.close()
          })
        })
    })
    .catch((err) => console.log(err))
  return
}

mongoose
  .connect(url)
  .then(() => {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })

    return person.save()
  })

  .then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    return mongoose.connection.close()
  })

  .catch((err) => console.log(err))