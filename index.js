const express = require('express')
const app = express()
const path = require('path')
const port = 80

app.use(express.static(path.resolve(__dirname, './src'),{
    extensions:['js','html']
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))