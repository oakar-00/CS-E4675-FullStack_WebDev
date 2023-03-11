const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://oakar:${password}@phonebookfullstackclust.vxjbk0d.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  // id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model("Person", phonebookSchema)

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    // id: Math.round(Math.random() * 100000),
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(() => {
    console.log(`${person.name} saved!`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:")
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

// const person = new Person({
// 	id: 0,
// 	name: "Hello",
// 	number: "132456789",
// });

// person.save().then((result) => {
// 	console.log("contact saved!");
// 	mongoose.connection.close();
// });
