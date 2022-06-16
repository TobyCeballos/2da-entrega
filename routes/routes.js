const express = require('express');
const { Router } = express
const contenedor = require('../classes/containerProds.js');
const prods = new Router();
const errObj = { error: 'Producto no encontrado' };
const err401 = { error: 'No estás autorizado para acceder a ésta URL'}

const admin = true;

prods.get('/', async (req, res) => {
    const objetos = await contenedor.getProds()
    res.send(objetos)
});


prods.post('/', async (req, res) => {
    
    const add = await contenedor.saveProds(req.body)
    
    if (admin != true) {
        res.send(err401)
    } else {
        res.send(add)
    }
})


prods.get('/:id', async (req, res) => {
    const id = req.params.id
    const objetos = await contenedor.getProdById(id)
    res.send(objetos)
})

prods.delete('/:id', async (req, res) => {
    const idDelete = req.params.id
    const deleteId = await contenedor.deleteById(idDelete)
    res.send(deleteId)
})

prods.put('/:id', async (req, res) => {
    const ids = req.params.id;
    const {name, description, price, stock, thumbnail} = req.body;
    const updatedObj = await contenedor.updateById(ids, {name, description, price, stock, thumbnail});
    res.send(updatedObj)
})


module.exports = prods