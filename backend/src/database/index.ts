import {createConnection} from 'typeorm'

createConnection()
    .then(() => {
        console.log("conectado")
    })
    .catch((e) => {
        console.log(e)
});

