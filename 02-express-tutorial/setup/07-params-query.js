const { application, query } = require('express')
const { products } = require('../data')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send(
`        <div>
            <h3>Homepage.</h3>
            <a href='/api/products'>Products</a>
        </div>`
    )
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map(product => {
        const {id, name, image} = product
        return {id, name, image}
    })
    res.status(200).json(newProducts)
})

app.get('/api/product/:id', ({ params: { id }}, res) => {
    const singleProduct = products.find(product => product.id === Number(id))
    
    if (singleProduct) {
        res.status(200).json(singleProduct)
    } else {
        res.status(404).json({message: 'Product not found!'})
    }
})



app.listen(2003)