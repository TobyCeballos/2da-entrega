const moment = require('moment');

const admin = require("firebase-admin");

const serviceAccount = require("../db/ecommerce-1324f-firebase-adminsdk-pjq7q-2741682600.json");
const { json } = require('express');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

class Carts {
    constructor() {
        this.collection = db.collection("carritos");
    }

    async getAllCarts() {
        try{
            const query = await this.collection.get();
            let fileExist = query.docs;

            if(fileExist.length >= 0){
                let objs = fileExist.map(doc =>({
                    id: doc.id,
                    ...doc.data()
                }))
                return objs
            }else{
                console.log("No se encontraron carritos")
            }
        }
        catch(err){
            return error;
        }
    }

    async create() {
        try {
            const objs = await this.getAllCarts();
            let newId = 1;
            if (objs.length > 0) {
                newId = objs[objs.length - 1].id + 1;
            }
            const doc = await this.collection.doc(newId.toString())
            let createCart = await doc.create({timestamp:  moment().format('YYYY-MM-DD HH:mm:ss'), id: newId});
            console.log(createCart);
            return createCart;
        } catch (error) {
            return error;
        }
    }

    async deleteCartByID(id) {
        try {
            const deleteCart = await this.collection.doc(id).delete();
            return `Carrito ${id} eliminado`;
        } catch (error) {
            return error;
        }
    }

    async getCartById(id) {
        try{
            const elementos = await this.getAllCarts()
            const elemento = elementos.find((e) => e.id === Number(id))
            return elemento
        } catch(err){
            return err;
        }
    }


    async getByIdProds(id) {
        try{
            const query = await this.collection.doc(id.toString()).collection('prod').get();
            let fileExist = query.docs;

            if(fileExist.length >= 0){
                let objs = fileExist.map(doc =>({
                    id: doc.id,
                    ...doc.data()
                }))
                return objs
            }else{
                console.log("No se encontraron productos")
            }
        } catch(err){
            return err;
        }
    }

    async saveById(object, idCart, idprod) {
        try{
            console.log(object)
            const hecho = await this.collection.doc(idCart.toString()).collection('prod').doc(idprod.toString()).set({productos: `${object}`}, {merge: true});
            return hecho;

        }
        catch(err){
            return error;
        }
    }

    async updateById(idc, idp) {
        try {
            const deleteCart = await this.collection.doc(idc.toString()).collection('prod').doc(idp.toString()).delete();
            return `Carrito ${id} eliminado ${deleteCart}`;
        } catch (error) {
            return error;
        }
    }
}

const carts = new Carts();

module.exports = carts