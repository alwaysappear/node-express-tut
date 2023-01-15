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

app.get('/api/product/:id', ({ params: { id }}, res) => {
    const singleProduct = products.find(product => product.id === Number(id))
    
    if (singleProduct) {
        res.status(200).json(singleProduct)
    } else {
        res.status(404).json({message: 'Product not found!'})
    }
})

app.get('/api/products', ({
    query: {
        search,
        limit
    }
}, res) => {
    let newProducts = products.map(({ id, name, image }) => ({ id, name,image }))

    if (limit) {
        newProducts = newProducts.slice(0, Number(limit))
    }

    if (search) {
        newProducts = newProducts.filter(product => {
            return product.name.startsWith(search)
        })
    }

    if (newProducts.length < 1) {
        res.status(200).json({success: true, data: []})
    } else {
        res.status(200).json(newProducts)
    }

})

app.listen(2003)