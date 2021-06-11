// OBJETOS: crear Películas
class Pelicula {
    constructor (id, imagen, nombre, genero, musica, foto, trama, fx) {
        this.id = id,
        this.imagen = imagen,
        this.nombre = nombre,
        this.genero = genero,
        this.musica = musica,
        this.foto = foto,
        this.trama = trama,
        this.fx = fx
    }
    datosPeli() {
            let nomYGen = `La película \"${this.nombre}\" es una película de ${this.genero}.`;
            let valorizaciones = `Valoración del equipo de Cine a las Piñas: Musica: ${this.musica}, Fotografía: ${this.foto}, Trama: ${this.trama}, Efectos especiales: ${this.fx}`;
            console.log(nomYGen);
            console.log(valorizaciones);
            let listaTodas = document.getElementById("listaTodas");
            let PeliListTit = document.createElement("h4");
            PeliListTit.innerText = nomYGen;
            let peliListGen = document.createElement("p");
            peliListGen.innerText = valorizaciones;
            listaTodas.appendChild(PeliListTit);
            listaTodas.appendChild(peliListGen);
    }
}

// Estos datos estarán cargados en la paltaforma de antemano y son diferentes dependiendo de cada película
const datosEp1 = new Pelicula ("01", "media/programas/00-sexto-550.jpg", "Sexto Sentido", "suspenso y muertos", 0, 2, 5, 1);
const datosEp2 = new Pelicula ("02", "media/programas/01-dama-y-vag-550.jpg", "La dama y el Vagabundo", "animacion", 2, 4, 0, 5);
const datosEp3 = new Pelicula ("03", "media/programas/02-aura-550.jpg", "El Aura", "suspenso", 5, 3, 5, 0);
const datosEp4 = new Pelicula ("04", "media/programas/03-matrix-550.jpg", "La Trilogía Matrix", "ciencia ficción", 1, 2, 5, 5);
const datosEp5 = new Pelicula ("05", "media/programas/04-totoro-550.jpg", "Mi vecino Totoro", "animación japonesa", 3, 3, 5, 0);
const datosEp6 = new Pelicula ("06", "media/programas/05-pelea-550.jpg", "El Club de la Pelea", "accion", 3, 4, 5, 2);

// ARMO ARRAY DE PELÍCULAS
const peliculasTodas = [];
peliculasTodas.push(datosEp1);
peliculasTodas.push(datosEp2);
peliculasTodas.push(datosEp3);
peliculasTodas.push(datosEp4);
peliculasTodas.push(datosEp5);
peliculasTodas.push(datosEp6);