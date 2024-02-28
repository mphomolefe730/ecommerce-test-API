import Express, { urlencoded } from 'express';
import Mongoose from 'mongoose';
import { environment } from './environments.js';
import { productinkConnect } from './controller/product.controller.js';
import { userLinkConnection } from './controller/user.controller.js';
import { cartLinkConnection } from './controller/cart.controller.js'
import { roleLinkConnection } from './controller/role.controller.js';
import { inventoryLinkConnection  } from './controller/inventory.controller.js';

const app = Express();
// this will send the request as an express json file
app.use(Express.json());
//enable the use of url requests
app.use(urlencoded({extended:true}))

app.use('/api/products', productinkConnect);
app.use('/api/user', userLinkConnection);
app.use('/api/cart', cartLinkConnection);
app.use('/api/role',roleLinkConnection);
app.use('/api/inventory', inventoryLinkConnection);

Mongoose.connect(`mongodb+srv://${environment.mongodb.username}:${environment.mongodb.password}@ecommercetest.oasiffg.mongodb.net/?retryWrites=true&w=majority&appName=ecommerceTest`)
.then(()=>{
    console.log('database connected');
    app.listen(3000,()=> console.log('server running'));
})