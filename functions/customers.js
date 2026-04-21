const customers = [];

// GET - get all customers
exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(customers)
      };
    }
    
    // POST - add new customer
    if (event.httpMethod === 'POST') {
      const customer = JSON.parse(event.body);
      customer.id = customers.length + 1;
      customers.push(customer);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(customer)
      };
    }
    
    // PUT - update customer
    if (event.httpMethod === 'PUT') {
      const updatedCustomer = JSON.parse(event.body);
      const index = customers.findIndex(c => c.id === updatedCustomer.id);
      
      if (index !== -1) {
        customers[index] = updatedCustomer;
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(updatedCustomer)
        };
      }
      
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Customer not found' })
      };
    }
    
    // DELETE - delete customer
    if (event.httpMethod === 'DELETE') {
      const id = parseInt(event.pathParameters.id);
      const index = customers.findIndex(c => c.id === id);
      
      if (index !== -1) {
        customers.splice(index, 1);
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ success: true })
        };
      }
      
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Customer not found' })
      };
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
