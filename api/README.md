# Api Asos with el bra-i-am

La carpeta controllers solamente contiene la request a categories.

En models se encuentran la Category y Product, los modelos definidos por bra.

En `routes/routers` se encuentran los `getters` para las categories y y products.

## Actualizaciones del commit `17d3624`

CRUD del Producto completo. La idea es que el id que hace falta para referenciar el producto venga desde el front, pensamos la idea con una función que cree un UUIDV4. Al menos para el primer Sprint.

El carrito sigue sin funcionar :carita_triste:

## Datos para el .env ==> KENNETH

Crear un archivo `.env` adentro de la carpeta api

```
DB_USER="NOMBRE DE USUARIO POSGRES"
DB_PASSWORD="NOMBRE DE LA CLAVE DE POSGRES"
DB_HOST=localhost
DB_NAME=ecommerce
SECRET=facherito
PORT=3001
USER_GOOGLE="ejemplo@gmail.com"
PASS_GOOGLE="CLAVE DE GOOGLE GENERADA"==> OJO NO LA CLAVE DE TU CORREO QUE INGRESAS POR LOGIN
```

Para saber como obtener su clave generada [Ingrese aqui](https://www.youtube.com/watch?v=KjheexBLY4A) de el min 1:17 hasta el min 3.18 la contrasenia generada para aplicacion sera la que se podra usar en el archivo .env PASS_GOOGLE="Contrasenia".
