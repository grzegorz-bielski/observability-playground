import express from "express"
import { countAllRequests } from "./monitoring"

const port = Number.parseInt(process.env.PORT ?? "8080", 10)

express()
  //   .use(countAllRequests())
  .get("/todo", (req, res) => {
    res.json({ done: false, value: "kek" })
  })
  .listen(port, () => console.log(`Listening on port ${port}`))
