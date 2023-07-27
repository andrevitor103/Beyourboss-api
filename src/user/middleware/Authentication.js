const req = require("express/lib/request");
const jwt = require("jsonwebtoken");

 function isAuthentication(request, response, next)
{
    const token = request.get('Authorization');

    if(!token)
    {
        return response.statuss(400).json({ error: 'Usuário não autorizado' });
    }
    //Bearer ada12ad12ad1ad21ad
    const [schema, valueToken] = token.split(' ');

    if(!schema || !valueToken || !/^Bearer$/i.test(schema))
    {
        return response.status(400).json({ error: 'Token não está no formato correto' });
    }

    jwt.verify(valueToken, '0e5946cf15261bd704b42d86c2a59ff6  -', (error, decoded) => {
        if(error)
        {
            return response.status(400).json({ error: 'Token inválido' });
        }
        request.user = decoded.id;
        return next();
    });
}

module.exports = { isAuthentication };