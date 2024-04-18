const mongoose = require('mongoose');

const getConnection = async () => {

    try {

        const url = 'mongodb://UsuarioMateo:UQz3plmeXOFQhVBF@ac-glaefef-shard-00-00.kawblxq.mongodb.net:27017,ac-glaefef-shard-00-01.kawblxq.mongodb.net:27017,ac-glaefef-shard-00-02.kawblxq.mongodb.net:27017/?ssl=true&replicaSet=atlas-xfmscu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=bdTarea'
    await mongoose.connect(url)

    console.log('Conexion exitosa');

    } catch(error) {
        console.log(error)
    }

    
}

module.exports = {
    getConnection, 
}

