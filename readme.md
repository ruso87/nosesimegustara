# Cine a las Piñas - Podcast | ¿Me gustará esta peli? (Calculador)

Este calculador busca ayudar al usuario a saber si una película le gustará o no a partir de ciertos parámetros.

## Sobre el Podcast

El Podcast _"Cine a las Piñas"_, es un programa que trata de cine, humor y análisis entre amigos. Sobre todas las cosas busca entretener al oyente y hacerlo sentir parte de una mesa de amigos que hablan descontracturadamente y sin tapujos sobre películas que nos rodean y nos rodearon desde siempre.
Este calculador formará parte del sitio desarrollado para [Cine a las Piñas](https://ruso87.github.io/proyecto-coder/)

### Como funciona

**Sistema**

Antes de empezar, la gente de _"Cine a las Piñas"_ marca a qué género pertenece cada película:
* Comedia
* Drama
* Accion
* Etc

Luego se evalúa la importancia de diferentes componentes de la película y se les otorga una puntuación de 0 a 5 a cada uno de estos:
* Música
* Fotografía
* Trama
* Efectos Especiales

**Usuario**

A continuación se le pide al usuario que diga si le gustan las películas del género al que pertenece la película.
* Si el gusto del usuario no coincide con el género de la película, se le avisará que esa película es de determinado género y que probablemente no vaya a gustarle.
* Si el gusto coincide se le avisará que la peli concide con sus gustos!

Luego se le pide al usuario que valore la importancia que le da a cada uno de los componentes antes evaluados por _Cine a las Piñas_ y se calcula la diferencia entre ambos puntajes en cada categoría. Eso nos dirá cuanto coincide el gusto del Usuario con la película.

**Ejemplo**

* si CALP valoró con un "5" la importancia de la Música de una película pero al usuario le importa "0" la Música. **Hay "5" de diferencia.**
* si CALP valoró con un "3" la importancia de la Fotografía de una película y al usuario le importa "3" la Fotografía. **Hay "0" de diferencia.**
* si CALP valoró con un "5" la importancia de la Trama de una película y al usuario le importa "5" la Trama. **Hay "0" de diferencia.**
* si CALP valoró con un "0" la importancia de los Efectos Especiales de una película y al usuario le importa "3" los Efectos Especiales. **Hay "3" de diferencia.**

**5 + 0 + 0 + 3 = 8**

La diferencia máxima será de "20" ("5" por cada Elemento evaluado).
Por lo tanto en este ejemplo hay una diferencia del 40% (8 de 20) y por ende una coincidencia del 60%.

El usuario será notificado de dicho nivel de coincidencia como "Probabilidad de que le guste la película".


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
