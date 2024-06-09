import Express, { urlencoded } from 'express';
import Mongoose from 'mongoose';
import Cors from 'cors';
import { annoucementModel} from './models/announcement.model.js'
import { environment } from './environments.js';
import http from 'http';
import {Socket} from 'socket.io';


import { productinkConnect } from './controller/product.controller.js';
import { userLinkConnection } from './controller/user.controller.js';
import { cartLinkConnection } from './controller/cart.controller.js'
import { roleLinkConnection } from './controller/role.controller.js';
import { inventoryLinkConnection  } from './controller/inventory.controller.js';
import { homeManagementLinkConnection } from './controller/home-management.control.js';
import { chatLinkConnection } from './controller/chat.controller.js';
const app = Express();
// this will send the request as an express json file
app.use(Express.json());
//enable the use of url requests
app.use(urlencoded({extended:true}));
app.use(Cors({
    origin:'*',
}))

// const httpServer = new http.createServer(app);
// const io = new Socket.(httpServer, {
//   cors: {origin : '*'}
// });
// new Socket.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('message', (message) => {
//         console.log(message);
//         io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
//     });

//     socket.on('disconnect', () => {
//         console.log('a user disconnected!');
//     });
// });

app.use('/api/products', productinkConnect);
app.use('/api/user', userLinkConnection);
app.use('/api/cart', cartLinkConnection);
app.use('/api/role',roleLinkConnection);
app.use('/api/inventory', inventoryLinkConnection);
app.use('/api/home-management', homeManagementLinkConnection);
app.use('/api/chat', chatLinkConnection);

app.get('/api/status',async (req,res)=>{
    const ann = await annoucementModel.find();
    return res.send(ann);
})
app.post('/api/status/add',async (req,res)=>{
    const ann = await annoucementModel.create(req.body);
    return res.send({message:'add',ann});
})

Mongoose.connect(`mongodb+srv://${environment.mongodb.username}:${environment.mongodb.password}@ecommercetest.oasiffg.mongodb.net/?retryWrites=true&w=majority&appName=ecommerceTest`)
.then(()=>{
    console.log('database connected');
    app.listen(3000,()=> console.log('server running'));
}).catch((error)=>{
    // console.log(error);
    console.log('failed to connect');
})