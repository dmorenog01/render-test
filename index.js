const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]
app.get('/api/notes/', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note === undefined) {
        response.statusMessage = "No such note exists!"
        response.status(404).json({message: "No such note exists!"})
    }
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter((n) => n.id !== id)
    response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max( ...notes.map((n) => n.id )) : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({message: "Content is missing."})
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  console.log(note)
  notes = notes.concat(note)
  return response.json(note)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
