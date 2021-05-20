function empezar() {

    // PEDIMOS NOMBRE PARA PODER COMUNICARNOS CON EL USUARIO
    const nombre = prompt("Para empezar, por favor ingresá tu nombre:");
    alert("Buenas buenas " + nombre + ", emprecemos!");

    // FUNCIONES
    // comprobación de si al usuario le gusta el género de la Película
    function comparacionGenero(genero, datoUser) {
        var resultadoGenero = nombre + ", probablemente no te guste esta peli, ya que es una película de " + genero;
        if (datoUser == "Si" || datoUser == "SI" || datoUser == "si"){
            resultadoGenero = nombre + ", venimos bien! Esta es una película de " + genero ;
        }
        console.log(resultadoGenero);
    }

    //  ¡calculo de diferencia de puntuación según categoría
    function diferenciaEnCategoria(categoria, datoCALP, datoUser) {
        let resultado = datoCALP - datoUser;
        if (resultado < 0){
            resultado = resultado * -1;
        }
        console.log("La diferencia de " + categoria + " es: " + resultado);
        return resultado;
    }

    // calculo de diferencia total
    function calcularDiferencia() {
        var diferenciaTotal = diferenciaMusica + diferenciaFoto + diferenciaTrama + diferenciaFx
        console.log("La diferencia total es de: " + diferenciaTotal)
        return diferenciaTotal
    }

    // calculo de la probabilidad de que le guste la película según la diferencia
    function probabilidad(diferencia) {
        var porcentajeDiferencia = diferencia * 100 / 20;
        var probabilidadOk = 100 - porcentajeDiferencia;
        console.log(nombre + ", la probabilidad de que la película te guste es de: " + probabilidadOk + "%")
    }

    // SE INTRODUCEN LOS DATOS DE LA PELÍCULA  ("CALP" son las iniciales de "Cine a las Piñas")
    var generoPeli = "acción"
    var musicaCALP = 5;
    var fotoCALP = 5;
    var tramaCALP = 5;
    var fxCALP = 5;

    // SE PIDEN LOS CRITERIOS DEL USUARIO
    var generoUser = prompt("¿Te gustan las pelis de " + generoPeli + "?\n(Escribí Si o No por favor)");
    var musicaUser = parseInt(prompt("Para vos: ¿Cuán importante es la Música de una película?\nDel 0 al 5 por favor."));
    var fotoUser = parseInt(prompt("¿Cuán importante es la Fotografía de una película?\nDel 0 al 5 por favor."));
    var tramaUser =parseInt(prompt("¿Cuán importante es la Trama de una película?\nDel 0 al 5 por favor."));
    var fxUser = parseInt(prompt("¿Cuán importante son los Efectos Especiales de una película?\nDel 0 al 5 por favor."));

    // SE EJECUTAN LAS FUNCIONES

    diferenciaGenero = comparacionGenero(generoPeli, generoUser)
    diferenciaMusica = diferenciaEnCategoria("musica", musicaCALP, musicaUser)
    diferenciaFoto = diferenciaEnCategoria("fotografia", fotoCALP, fotoUser)
    diferenciaTrama = diferenciaEnCategoria("trama", tramaCALP, tramaUser)
    diferenciaFx = diferenciaEnCategoria("fx", fxCALP, fxUser)
    
    let diferencia = calcularDiferencia();
    probabilidad(diferencia);


}