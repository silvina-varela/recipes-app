![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Food

<p align="right">
  <img height="200" src="./cooking.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

#### Tecnologías utilizadas

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

## Frontend

Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: deben armar una landing page con

- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: debe contener

- [ ] Input de búsqueda para encontrar recetas por nombre
- [ ] Área donde se verá el listado de recetas. Deberá mostrar su:
  - Imagen
  - Nombre
  - Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
- [ ] Botones/Opciones para filtrar por por tipo de dieta
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por health score (nivel de comida saludable).
- [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.

__IMPORTANTE__: Dentro de la Ruta Principal se deben mostrar tanto las recetas traidas desde la API como así también las de la base de datos. Debido a que en la API existen alrededor de 5 mil recetas, por cuestiones de performance pueden tomar la simplificación de obtener y paginar las primeras 100.

__Ruta de detalle de receta__: debe contener

- [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
- [ ] Resumen del plato
- [ ] Nivel de "comida saludable" (health score)
- [ ] Paso a paso

__Ruta de creación de recetas__: debe contener

- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Resumen del plato
  - Nivel de "comida saludable" (health score)
  - Paso a paso
- [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
- [ ] Botón/Opción para crear una nueva receta

> Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. Por ejemplo: Que el nombre de la receta no pueda contener símbolos, que el health score no pueda exceder determinado valor, etc.

## Base de datos

El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterisco deben ser obligatorias):

- [ ] Receta con las siguientes propiedades:
  - ID: *
  - Nombre *
  - Resumen del plato *
  - Nivel de "comida saludable" (health score)
  - Paso a paso
- [ ] Tipo de dieta con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades debe ser de muchos a muchos ya que una receta puede ser parte de varios tipos de dieta en simultaneo y, a su vez, un tipo de dieta puede contener múltiples recetas distintas. Un ejemplo tomado de la API sería el `Strawberry Mango Green Tea Limeade` que es vegetariano, vegano y apto para celíacos, todo al mismo tiempo. Pero a su vez existen otras recetas para vegetarianos.

__IMPORTANTE__: Pensar como modelar los IDs de las recetas en la base de datos. Existen distintas formas correctas de hacerlo pero tener en cuenta que cuando hagamos click en alguna receta, esta puede provenir de la API o de la Base de Datos por lo que cuando muestre su detalle no debería haber ambigüedad en cual se debería mostrar. Por ejemplo si en la API la receta `Strawberry Mango Green Tea Limeade` tiene id = 1 y en nuestra base de datos creamos una nueva receta `Medialunas de Manteca` con id = 1, ver la forma de diferenciarlas cuando querramos acceder al detalle de la misma.

## Backend

Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

__IMPORTANTE__: No está permitido utilizar los filtrados, ordenamientos y paginados brindados por la API externa, todas estas funcionalidades tienen que implementarlas ustedes.

- [ ] __GET /recipes?name="..."__:
  - Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
  - Si no existe ninguna receta mostrar un mensaje adecuado
- [ ] __GET /recipes/{idReceta}__:
  - Obtener el detalle de una receta en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de receta
  - Incluir los tipos de dieta asociados
- [ ] __POST /recipes__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  - Crea una receta en la base de datos relacionada con sus tipos de dietas.
- [ ] __GET /diets__:
  - Obtener todos los tipos de dieta posibles
  - En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular [acá](https://spoonacular.com/food-api/docs#Diets)

## Testing

- [ ] Al menos tener un componente del frontend con sus tests respectivos
- [ ] Al menos tener una ruta del backend con sus tests respectivos
- [ ] Al menos tener un modelo de la base de datos con sus tests respectivos
