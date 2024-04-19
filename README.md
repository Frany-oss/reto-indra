# Documentacion
Reto tecnico de Indra. Arquitectura con API Gateway, lambdas y DynamoDB. Se utiliza el api de Star Wars (swapi)


## Configuracion inicial
```bash
git clone https://github.com/Frany-oss/reto-indra.git
```
```bash
cd reto-indra
```
### Instalar las dependencias necesarias
```bash
npm install
```

## Desplegar a AWS
Prerequisitos:
- AWS account
- Node.js
- AWS CLI configurado

### Desplegar
```bash
serverless deploy
```
NOTA: Configurar de ser necesario a como este su AWS (por ejemplo la region de su eleccion)

## Endpoints Desplegados
### Endpoints:
- POST (Personaje de Star Wars) - https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/character
- GET (Obtener personaje por ID) - https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/character/{id}
- GET (Obtener todos los personajes) - https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/characters
- GET (Obtener todos los personajes de la api swapi) - https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/swapi/characters
- DELETE (Eliminar personaje por ID) - https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/character/{id}

### Ejemplo de uso
####  POST (Personaje de Star Wars)

```bash
curl -H 'Content-Type: application/json' \
      -X POST \
        https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/character \
        -d '{
      "name": "Obi-wan Kenobi",
      "height": "182",
      "mass": "77",
      "hair_color": "auburn, white",
      "skin_color": "fair",
      "eye_color": "blue-gray",
      "birth_year": "57BBY",
      "gender": "male"
    }'
```
NOTA: En la base de datos, los campos se guardaran en español

#### GET (Obtener personaje por ID)
```bash
curl https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/character/{edae2d3e-dc82-4cf3-8678-92d4896bcdde}
```

#### GET (Obtener todos los personajes)
```bash
curl https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/characters
```

#### GET (Obtener todos los personajes de la api swapi)
```bash
curl https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/swapi/characters
```

#### DELETE (Eliminar personaje por ID)
```bash
curl -X https://2mbdl42de8.execute-api.us-east-1.amazonaws.com/dev/character/{edae2d3e-dc82-4cf3-8678-92d4896bcdde}
```

## Unit Tests
Se han realizado un total de 8 pruebas unitarias, testeando no solo el correcto funcionamiento de los lambdas, sino tambien si devuelven los errores que se esperan.
```bash
npm test
```



