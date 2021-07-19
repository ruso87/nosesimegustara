// OBJETOS: crear Películas
class Pelicula {
    constructor (id, imagen, nombre, genero, musica, foto, trama, fx, idImdb) {
        this.id = id,
        this.imagen = imagen,
        this.nombre = nombre,
        this.genero = genero,
        this.musica = musica,
        this.foto = foto,
        this.trama = trama,
        this.fx = fx,
        this.idImdb = idImdb
    }
    datosPeli() {
            let nomYGen = `La película \"${this.nombre}\" es una película de ${this.genero}.`;
            let valorizaciones = `Valoración del equipo de Cine a las Piñas: Musica: ${this.musica}, Fotografía: ${this.foto}, Trama: ${this.trama}, Efectos especiales: ${this.fx}`;
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
const datosEp1 = new Pelicula ("01", "media/programas/00-sexto-550.jpg", "Sexto Sentido", "suspenso", 2, 3, 10, 2, "tt0167404");
const datosEp2 = new Pelicula ("02", "media/programas/01-dama-y-vag-550.jpg", "La Dama y el Vagabundo", "animación", 2, 6, 4, 10, "tt8096832");
const datosEp3 = new Pelicula ("03", "media/programas/02-aura-550.jpg", "El Aura", "suspenso", 8, 7, 10, 0, "tt0420509");
const datosEp4 = new Pelicula ("04", "media/programas/03-matrix-550.jpg", "La Trilogía Matrix", "acción", 2, 4, 9, 10, "tt0133093");
const datosEp5 = new Pelicula ("05", "media/programas/04-totoro-550.jpg", "Mi vecino Totoro", "animación", 5, 6, 10, 2, "tt0096283");
const datosEp6 = new Pelicula ("06", "media/programas/05-pelea-550.jpg", "El Club de la Pelea", "acción", 8, 9, 9, 4, "tt0137523");
const datosEp7 = new Pelicula ("07", "media/programas/06-snyder-550.jpg", "La Liga de la Justicia - Snyder's Cut", "superheroes", 3, 7, 7, 9, "tt12361974");
const datosEp8 = new Pelicula ("08", "media/programas/07-7-de-chicago-550.jpg", "El Juicio de los 7 de Chicago", "drama", 2, 4, 10, 0, "tt1070874");
const datosEp9 = new Pelicula ("09", "media/programas/08-cuestion-tiempo-550.jpg", "Cuestión de Tiempo", "romance", 9, 3, 10, 2, "tt2194499");

// ARMO ARRAY DE PELÍCULAS
const peliculasTodas = [];
peliculasTodas.push(datosEp1);
peliculasTodas.push(datosEp2);
peliculasTodas.push(datosEp3);
peliculasTodas.push(datosEp4);
peliculasTodas.push(datosEp5);
peliculasTodas.push(datosEp6);
peliculasTodas.push(datosEp7);
peliculasTodas.push(datosEp8);
peliculasTodas.push(datosEp9);