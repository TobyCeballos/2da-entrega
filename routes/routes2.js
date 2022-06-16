// CARTS
const express = require("express")
const { Router } = express
const contenedor = require('../classes/containerProds.js');
const container = require('../classes/containerCarts');
const carts = new Router()

carts.get('/', async (req, res) => {
    const carros = await container.getAllCarts()
    res.send( carros );
});

carts.post('/', async (req, res) => {
    container.create().then(resp => res.send(resp))
})

carts.get('/:id', async (req, res) => {
    const id = req.params.id
    const carro = await container.getCartById(id)
    res.send(carro)
})

carts.delete('/:id', async (req, res) => {
    const id = req.params.id
    const deleteCart = await container.deleteCartByID(id)
    if(isNaN(id)) {
        res.send('El valor ingresado no es un numero')
    } else {
        res.send(deleteCart)
    }
})

carts.get('/:id/productos', async (req, res) => {
    const id = req.params.id
    const idProd = await container.getByIdProds(id)
    res.send(idProd)
})

carts.post('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    contenedor.getProdById(id_prod)
        .then(resp => {
            container.saveById(resp, id,id_prod).then(respuesta => res.send(respuesta))
        })
})

carts.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    const updCartId = await container.updateById(id, id_prod)
    res.send(updCartId)
})

module.exports = carts