import { environment } from './environments.js';
import { productinkConnect } from './controller/product.controller.js';
import { userLinkConnection } from './controller/user.controller.js';
import Mongoose from 'mongoose';
import Express, { urlencoded } from 'express';

const app = Express();
// this will send the request as an express json file
app.use(Express.json());
app.use(urlencoded({extended:true}))

app.use('/api/products', productinkConnect);
app.use('/api/user', userLinkConnection);

Mongoose.connect(`mongodb+srv://${environment.mongodb.username}:${environment.mongodb.password}@ecommercetest.oasiffg.mongodb.net/?retryWrites=true&w=majority&appName=ecommerceTest`)
.then(()=>{
    console.log('database connected');
    app.listen(3000,()=> console.log('server running'));
})