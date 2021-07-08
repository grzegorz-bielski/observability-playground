import express from 'express'


const port = Number.parseInt(process.env.PORT ?? "8080", 10)

const app = express()

app.get('/todo', (req, res) => {

    res.json({ done: false, value: "kek" })
})

app.listen(
    port,
    () => console.log(`Listening on port ${port}`)
)