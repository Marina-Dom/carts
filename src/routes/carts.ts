import { Router } from 'express';

const routes = Router();

const cart = [
    {id: 0, product: 'bike', price: 100, quantity: 1}, 
    {id: 1, product: 'computer', price: 200, quantity: 1}
];

// const getId = (req: Request): number => Number.parseInt(req.params.id);
// const getNextId = (items: any[]) => 
// items.reduce((prev, curr) => Math.max(prev.id, curr.id), {id: -1}) + 1;

let currentId = 1;

routes.get('/carts', (req, res) => {
    const maxPrice = Number.parseInt(req.query.maxPrice as string);
    const pageSize = Number.parseInt(req.query.pageSize as string);
    const prefix = req.query.prefix as string;

    let tempArray = cart;

    if (maxPrice) {
        tempArray = tempArray.filter((carts) => 
            carts.price <= maxPrice);
    }

    if (pageSize){
        if(pageSize < tempArray.length){
            tempArray = tempArray.slice(0, pageSize);
        }
    }

    if (prefix){
        tempArray = tempArray.filter((carts) => 
            carts.product.startsWith(prefix)
        );
    }

    res.status(200).json(tempArray);
});


//Get by ID
routes.get('/carts/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);

    const carts = cart.find(cartItem => {
        return cartItem.id === id;
    });

    if(carts){
        res.status(200);
        res.json(carts);
    } else {
        res.sendStatus(404);
    }
});

//Create A New Cart Object
routes.post('/carts', (req, res) => {
    let newCartItem = req.body;

    newCartItem.id = currentId;
    currentId++;

    cart.push(newCartItem);

    res.status(201);
    res.json(newCartItem);
});

//Update Cart Object
routes.put('/carts/:id', (req, res) => {
    let newCartItem = req.body;
    let id = Number.parseInt(req.params.id);

    let index = cart.findIndex((newCartItem) => {
        return newCartItem.id === id;
    });

    if(index > 0) {
        cart.splice(index, 1, newCartItem);

        res.status(200);
        res.json(newCartItem);
    } else {
        res.status(404).send();
    }

});

//Delete Cart Object
routes.delete('/carts/:id', (req, res) => {
    let id = Number.parseInt(req.params.id);

    const index = cart.findIndex((newCartItem) => {
        return newCartItem.id === id;
    });

    if (index >= 0){
        cart.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }   
});


export default routes;