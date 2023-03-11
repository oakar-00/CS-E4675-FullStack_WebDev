require("dotenv").config()
const express = require("express")
const app = express()

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(express.static("build"))
app.use(express.json())
app.use(requestLogger)

var morgan = require("morgan")

morgan.token("body", (req) => JSON.stringify(req.body))
app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :body")
)

const cors = require("cors")
app.use(cors())

const Person = require("./models/person")

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person
    .save()
    .then(() => {
      console.log(`${person.name} saved!`)
      response.json(person)
    })
    .catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  console.log(id)
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(400).send({ error: "malformatted id" })
    })
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.get("/info", (request, response) => {
  const date = Date()

  response.end(
    `Phonebook has info for ${Person.length + 1} people.\n\n${date}`
  )
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ errMessage: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

console.log("Hello World!")
