// OBJETOS: crear Películas
class Pelicula {
    constructor (nombre, genero, musica, foto, trama, fx) {
        this.nombre = nombre,
        this.genero = genero,
        this.musica = musica,
        this.foto = foto,
        this.trama = trama,
        this.fx = fx
    }
    datosPeli() {
            console.log("La película \"" + this.nombre + "\" es una película de " + this.genero + ".");
            console.log("El equipo de Cine a las Piñas opina que los diferentes elementos de esta película tienen la siguiente importancia para que esta película sea lo que es:\n- Musica: " + this.musica + "\n- Fotografía: " + this.foto + "\n- Trama: " + this.trama + "\n- Efectos especiales: " + this.fx);
    }
}

// Estos datos estarán cargados en la paltaforma de antemano y son diferentes dependiendo de cada película
const datosEp1 = new Pelicula ("El CLub de la Pelea", "suspenso y muertos", 0, 2, 5, 1)
const datosEp2 = new Pelicula ("La dama y el Vagabundo", "animacion", 2, 4, 0, 5)
const datosEp3 = new Pelicula ("El Aura", "suspenso", 5, 3, 5, 0)
const datosEp4 = new Pelicula ("La Trilogía Matrix", "ciencia ficción", 1, 2, 5, 5)
const datosEp5 = new Pelicula ("Mi vecino Totoro", "animación japonesa", 3, 3, 5, 0)
const datosEp6 = new Pelicula ("El CLub de la Pelea", "accion", 3, 4, 5, 2)


// ARMO ARRAY DE PELÍCULAS
const peliculasTodas = [datosEp1, datosEp2, datosEp3, datosEp4, datosEp5, datosEp6];

// FUNCIÓN PARA VER LOS DATOS DE TODAS LAS PELICULAS
function verTodas() {
    for (pelis of peliculasTodas) {
        pelis.datosPeli();
    }
}

function empezar(episodio) {

    // Selecciono qué objeto (Película) se usará para la comparación dependiendo del parámetro enviado en la function empezar() desde el HTML
    switch (episodio) {
        case "ep1":
            var peli = datosEp1;
            break;
        case "ep2":
            var peli = datosEp2;
            break;
        case "ep3":
            var peli = datosEp3;
            break;
        case "ep4":
            var peli = datosEp4;
            break;
        case "ep5":
            var peli = datosEp5;
            break;
        case "ep6":
            var peli = datosEp6;
            break;
    }
    
    // OBJETO: crear User
    class User {
        constructor (nombre, genero, musica, foto, trama, fx) {
            this.nombre = nombre,
            this.genero = genero.toLowerCase(),
            this.musica = musica,
            this.foto = foto,
            this.trama = trama,
            this.fx = fx
        }
            datosUser() {
                console.log("Hola " + this.nombre + ", al parecer las películas de " + peli.genero + " " + this.genero + " te gustan.");
                console.log("La importancia que le das a los diferentes elementos de una película son:\n- Musica: " + this.musica + "\n- Fotografía: " + this.foto + "\n- Trama: " + this.trama + "\n- Efectos especiales: " + this.fx);
        }
    }
    
    // SE PIDEN LOS DATOS DEL USUARIO
    const nombre = prompt("Para empezar, por favor ingresá tu nombre:");
    const generoUser = prompt( nombre + ", ¿te gustan las pelis de " + peli.genero + "?\n(Escribí Si o No por favor)");
    const musicaUser = parseInt(prompt("Para vos: ¿Cuán importante es la Música de una película?\nDel 0 al 5 por favor."));
    const fotoUser = parseInt(prompt("¿Cuán importante es la Fotografía de una película?\nDel 0 al 5 por favor."));
    const tramaUser =parseInt(prompt("¿Cuán importante es la Trama de una película?\nDel 0 al 5 por favor."));
    const fxUser = parseInt(prompt("¿Cuán importante son los Efectos Especiales de una película?\nDel 0 al 5 por favor."));

    // CREAR - OBJETO "User"
    const user1 = new User (nombre, generoUser, musicaUser, fotoUser, tramaUser, fxUser);

    user1.datosUser();

    
    // FUNCIONES

    // comprobación de si al usuario le gusta el género de la Película
    function comparacionGenero(genero, respUser) {
        var resultadoGenero = nombre + ", probablemente no te guste esta peli, ya que es una película de " + genero + ".";
        if (respUser == "si" || respUser == "sí"){
            resultadoGenero = nombre + ", venimos bien! Esta es una película de " + genero + ".";
        }
        console.log(resultadoGenero);
    }

    // calculo de diferencia de puntuación según categoría
    function diferenciaEnCategoria(categoria, valorPeli, valorUser) {
        let resultado = valorPeli - valorUser;
        if (valorUser > valorPeli){
            resultado = valorUser - valorPeli;
        }
        console.log("La diferencia de " + categoria + " es de : " + resultado + " punto/s.");
        return resultado;
    }

    // calculo de diferencia total
    function calcularDiferencia() {
        var diferenciaTotal = diferenciaMusica + diferenciaFoto + diferenciaTrama + diferenciaFx
        console.log("La diferencia total es de: " + diferenciaTotal + " puntos.")
        return diferenciaTotal
    }

    // calculo de la probabilidad de que le guste la película según la diferencia total
    function probabilidad(diferencia) {
        var porcentajeDiferencia = diferencia * 100 / 20;
        var probabilidadOk = 100 - porcentajeDiferencia;
        console.log(nombre + ", la probabilidad de que la película te guste es de: " + probabilidadOk + "%")
    }

    // SE EJECUTAN LAS FUNCIONES

    peli.datosPeli();
    comparacionGenero(peli.genero, user1.genero)

    diferenciaMusica = diferenciaEnCategoria("musica", peli.musica, user1.musica)
    diferenciaFoto = diferenciaEnCategoria("fotografia", peli.foto, user1.foto)
    diferenciaTrama = diferenciaEnCategoria("trama", peli.trama, user1.trama)
    diferenciaFx = diferenciaEnCategoria("fx", peli.fx, user1.fx)
    
    let diferencia = calcularDiferencia();
    probabilidad(diferencia);
}