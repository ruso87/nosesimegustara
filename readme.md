# Cine a las Piñas - Podcast | ¿Me gustará esta peli? (Calculador)

Este calculador busca ayudar al usuario a saber si una película le gustará o no a partir de ciertos parámetros.

## Sobre el Podcast

El Podcast _"Cine a las Piñas"_, es un programa que trata de cine, humor y análisis entre amigos. Sobre todas las cosas busca entretener al oyente y hacerlo sentir parte de una mesa de amigos que hablan descontracturadamente y sin tapujos sobre películas que nos rodean y nos rodearon desde siempre.
Este calculador formará parte del sitio desarrollado para [Cine a las Piñas](https://ruso87.github.io/proyecto-coder/)

### Como funciona

**· Sistema**

Antes de empezar, la gente de _"Cine a las Piñas"_ marca a qué género pertenece cada película:
* Comedia
* Drama
* Accion
* Etc

Luego se evalúa la importancia de 4 componentes de la película y se les otorga una puntuación de 0 a 10 a cada uno de estos:
* Música
* Fotografía
* Trama
* Efectos Especiales

**· Usuario**

El usuario puede elegir diferentes opciones:
1. Elegir una película para ver si le gusta.
2. Ver las evaluaciones de todas las películas.
3. Ver un listado de las películas ofrecidas, ordenadas por un criterio de su elección.

Si el usuario quiere ver si una película le gustará, el primer lugar, se le pide que diga si le gustan las películas del género al que pertenece la película.

Luego se le pide al usuario que valore la importancia que le da a cada uno de los componentes antes evaluados por _Cine a las Piñas_ y se calcula la diferencia entre ambos puntajes en cada categoría. Eso nos dirá cuanto coincide el gusto del Usuario con la película.

Una vez comparados todos los datos, contamos con 4 posibles respuestas:

* El genero coincide con el gusto del usuario y la coincidencia en mayor a 50% : ¡Puede ser buena!
* El genero coincide con el gusto del usuario y la coincidencia en menor a 50% : ¡Está peleado!
* El genero no coincide con el gusto del usuario y la coincidencia en mayor a 50% : ¡Está dificil!
* El genero no coincide con el gusto del usuario y la coincidencia en menor a 50% : ¡Olvídalo!

**· Comparación de puntajes: ejemplo**

* si CALP valoró con un "10" la importancia de la Música de una película pero al usuario le importa "0" la Música. **Hay "10" de diferencia.**
* si CALP valoró con un "6" la importancia de la Fotografía de una película y al usuario le importa "6" la Fotografía. **Hay "" de diferencia.**
* si CALP valoró con un "8" la importancia de la Trama de una película y al usuario le importa "8" la Trama. **Hay "0" de diferencia.**
* si CALP valoró con un "0" la importancia de los Efectos Especiales de una película y al usuario le importa "6" los Efectos Especiales. **Hay "6" de diferencia.**

**10 + 0 + 0 + 6 = 16**

La diferencia máxima será de "40" ("10" por cada componente evaluado).
Por lo tanto en este ejemplo hay una diferencia del 40% (16 de 40) y por ende una coincidencia del 60%.

El usuario será notificado de dicho nivel de coincidencia como se señaló más arriba.

**· IMDb**

Cómo dato de color, en la respuesta final, le mostramos al usuario el puntaje que el portal IMDb (Internet Movie Database) le otorga a la película. Este puntaje se trae a travez de una API generada por el portal especializado "The Movie Database" [https://www.themoviedb.org/](https://www.themoviedb.org/?language=es).
Si este puntaje no puede ser adquirido, se mostrará una respuesta sin este dato.

**· Comparación de Géneros**

Con el fin de no sobrecargar al usuario con preguntas, cuando este elija una película al comienzo, solo se preguntará si le gusta el género de la película seleccionada. Este dato se guardará en sessionStorage dentro de un objeto con los datos del usuario.
Al elegir una segunda película revisamos el Storage para ver si el género de dicha película ya fue comparado anteriormente. Si no lo fue, preguntaremos por el nuevo género y lo guardaremos dentro del objeto con los datos del usuario.
Esto se repetirá cada vez que se quiera comparar una película con un genero que no se ha comparado antes. Si ya fue comparado se harán los cálculos con los valores almacenados y se mostrará una respuesta al usuario.

**· Limpieza de datos**

Al haber datos del usuario almacenados en storage habilitaremos un botón que borrará dichos datos y refrescará la página automáticamente para comenzar de nuevo. Al hacer click en dicho botón, también se generará un dato en sesiónStorage para que al cargarse la página mostremos un modal informando al usuario que los datos se borraron correctamente.

### Lenguajes utilizados

* **HTML5**
* **CSS3**
* **JavaScript**

### Datos

* **Alumno:** _Andrés Hernández_
* **Profesor:** _Laura Gonzalez Martin_
* **Tutora:** _María Florencia Martinez_
* **Curso:** _Javascript_
* **Camada:** _16760_

## Autor

* **Andrés Hernández** - [ruso87](https://github.com/ruso87)
