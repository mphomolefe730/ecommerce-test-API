const ecommerceLink = 'https://ecommerceconnect.co.za';
const customerService = 'https://ecommerceconnect.co.za/support';

export const welcomeEmail= (customerName)=>{
    return `
    <html>
        <body>
            <div>
                <div style="display:flex">
                    <img width="25px" src="https://firebasestorage.googleapis.com/v0/b/ecommerce-connect-c7850.appspot.com/o/ecommerce-assets%2FecommerceconnectLogo.svg?alt=media&token=c45c933b-6350-4e86-993f-259a44ecb434"/>    
                    <h3>Welcome to E-commerce Connect</h3>
                </div>
                <div style="border-radius: 12px;background: rgba(0,255,0,0.25);padding: 12px;">
                    <p> Hi ${customerName},<br/><br/>
                        Welcome to the E-commerce Connect family! We're thrilled to have you with us.
                        Thank you for choosing us. We're committed to providing you with exceptional products and outstanding customer service.
                        To get you started, here are a few quick links:
                    </p>
                    
                    <p> Explore our products: <button style="border: 0;background-color: rgba(0,0,0,1);margin-left: 2%;padding: 5px 15px;border-radius: 12px;color: white;"> <a style="text-decoration: none; color:white;" href="${ecommerceLink}" >HOME PAGE </a></button></p>
                    <p> Contact us: <button style="border: 0;background-color: rgba(0,0,0,1);margin-left: 2%;padding: 5px 15px;border-radius: 12px;color: white;"> <a style="text-decoration: none; color:white;" href="${customerService}" >SUPPORT PAGE </a></button> </p>

                    <p> If you have any questions or need assistance, please don't hesitate to reach out to our customer support team. We're always happy to help!</p>
                    <p>
                        Enjoy your shopping experience!<br/>
                        <br/>
                        Best regards,<br/>
                        E-commerce Connect Team
                    </p>
                </div>
            </div>
        </body>
    </html>
`
}