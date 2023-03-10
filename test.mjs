import { CONF } from './http_client.mjs'
import { UserUsecase } from './identity.mjs'
import { TicketProduct, Ticket, Order } from './order.mjs'


CONF.origin_ = 'https://testtmd67api.azurewebsites.net'
CONF.path_ = ''
CONF.debug_ = true
CONF.headers = {
    'X-CSRFTOKEN': 'Nx0OJjjv7rdKOz9R9zYPULhxSqvdiYaBhIAqzlyOZifVyGqxbxc4PI13RQyUZzIO',
    'Cookie': 'csrftoken=Nx0OJjjv7rdKOz9R9zYPULhxSqvdiYaBhIAqzlyOZifVyGqxbxc4PI13RQyUZzIO; sessionid=us2eacc2f4cr4ijiogrdptpuyjhbfgrc',
}


async function main() {
    let result = null;

    /*
        test Identity APIs
    */
    // I000. test user register
    result = await new UserUsecase().user_register(
        {
            email: 'fofx@outlook.com',
            password: 'cwb+123',
        }
    );
    console.log(result);

    // I001. test user login
    result = await new UserUsecase().user_login(
        {
            email: 'fofx@outlook.com',
            password: 'cwb+123',
        }
    );
    console.log(result);

    // I002. test get user profile
    result = await new UserUsecase().user_directory();
    console.log(result);


    /*
        test Order module APIs
    */
    // O001. test list ticket products
    result = await new TicketProduct().list(
        {
            params: {
                english_name: 'Early Bird 2 Day Pass',
                chinese_name: '',
            }
        }
    );
    console.log(result);


    // O002. test create an order
    const order_instance = await new Order().create(
        {
            "product_items": [
                {
                    "ticket_product": 1,
                    "quantity": 2
                },
                {
                    "ticket_product": 3,
                    "quantity": 1
                },
                {
                    "ticket_product": 5,
                    "quantity": 1
                }
            ]
        }
    );
    console.log(order_instance);

    // O003. test update this order
    result = await new Order().update(
        order_instance
    );
    console.log(result);

    // O004. retrieve this order
    result = await new Order().retrieve(
        { id: order_instance.id }
    );
    console.log(result);

    // O005. list 'draft' orders
    result = await new Order().list(
        {
            params: {
                state: 'draft'
            }
        }
    );
    console.log(result);


    // O006. test create an Ticket
    const ticket_instance = await new Ticket().create(
        {
            "first_name": "Yin",
            "last_name": "Long",
            "order": order_instance.id,
            "club": null,
            "ticket_products": [
                3,
                5
            ]
        }
    );
    console.log(order_instance);

    // O007. test update this ticket
    result = await new Ticket().update(
        ticket_instance
    );
    console.log(result);

    // O008. retrieve this ticket
    result = await new Ticket().retrieve(
        { id: ticket_instance.id }
    );
    console.log(result);

    // O009. list tickets by this order
    result = await new Ticket().list(
        {
            params: {
                order: order_instance.id
            }
        }
    );
    console.log(result);

    // O010. delete this ticket
    result = await new Ticket().delete(
        { id: ticket_instance.id }
    );
    console.log(result);

    // O011. delete this order
    result = await new Order().delete(
        { id: order_instance.id }
    );
    console.log(result);

}

main();
