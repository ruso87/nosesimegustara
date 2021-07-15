// IMPRIMO TODAS LAS PELICULAS EN EL HTML
for (const pelicula of peliculasTodas) {
    $("#grillaPelis").append(
        `<div>
            <a onclick="empezar('${pelicula.id}')">
                <div class="linkData">
                    <div class="divInfo">
                        <p>Música: <span>${pelicula.musica}</span></p>
                        <p>Fotografía: <span>${pelicula.foto}</span></p>
                        <p>Trama: <span>${pelicula.trama}</span></p>
                        <p>Fx: <span>${pelicula.fx}</span></p>
                    </div>
                    <img src="${pelicula.imagen}" alt="Capítulo ${pelicula.progridama} - ${pelicula.nombre}">
                </div>
                <h4>Capítulo ${pelicula.id} - ${pelicula.nombre}</h4>
            </a>
            <a onclick="empezar('${pelicula.id}')" class="btn">¿ME GUSTARÁ?</i></a>
        </div>`
    );
}

// AGREGO EVENTO PARA VER: LISTADO DE PELICULAS
$("#verTodas").click(verTodas);

// LISTADO DE PELICULAS ORDENADAS
var verOrdenPelis = $(".btnOrden");
verOrdenPelis[0].onclick = () => { ordenarLista('Música');}
verOrdenPelis[1].onclick = () => { ordenarLista('Foto');}
verOrdenPelis[2].onclick = () => { ordenarLista('Trama');}
verOrdenPelis[3].onclick = () => { ordenarLista('Fx');}


// FUNCIÓN PARA VER LOS DATOS DE TODAS LAS PELICULAS
function verTodas() {
    if($("#listaTodas").hasClass("check")){
        $("#listaTodas").slideToggle("slow");
        if($(".divInfo").hasClass("d-flex")){
            $(".divInfo").removeClass("d-flex");
        }else{
            $(".divInfo").addClass("d-flex");
        }
    }else{
        // crear el listado de pelis
        for (pelis of peliculasTodas) {
            pelis.datosPeli();
        }
        $("#listaTodas").addClass("check");
        $("#listaTodas").slideToggle("slow");
        $(".divInfo").addClass("d-flex");
    }
}

// FUNCION PARA VER LISTADOS DE PELICULAS ORDENADAS
function ordenarLista(orden) {
    switch (orden) {
        case "Música":
            var ordenElegido = peliculasTodas.sort((a, b) => b.musica - a.musica);
            ordenElegido = ordenElegido.map(el => el.nombre).join("</li><li>");
            var btnOrden = verOrdenPelis[0]
            break;
        case "Foto":
            var ordenElegido = peliculasTodas.sort((a, b) => b.foto - a.foto);
            ordenElegido = ordenElegido.map(el => el.nombre).join("</li><li>");
            var btnOrden = verOrdenPelis[1]
            break;
        case "Trama":
            var ordenElegido = peliculasTodas.sort((a, b) => b.trama - a.trama);
            ordenElegido = ordenElegido.map(el => el.nombre).join("</li><li>");
            var btnOrden = verOrdenPelis[2]
            break;
        case "Fx":
            var ordenElegido = peliculasTodas.sort((a, b) => b.fx - a.fx);
            ordenElegido = ordenElegido.map(el => el.nombre).join("</li><li>");
            var btnOrden = verOrdenPelis[3]
            break;
        default:
            console.log("¿Que criterio usaremos para ordenar las películas?");
            break;
    }

    $("#listaOrden").html(`<h4>El orden de las películas listadas, según la importancia de su ${orden} es:</h4> <ol><li>${ordenElegido}</li></ol>`);

    if($(btnOrden).hasClass("check") && $("#listaOrden").hasClass("listaAbierta")){
        $(btnOrden).remove("check");
        $("#listaOrden").slideToggle("slow");
        $("#listaOrden").removeClass("listaAbierta");
    }else if($("#listaOrden").hasClass("listaAbierta")){
        for (btn of verOrdenPelis) {
            btn.classList.remove("check");
        }
        $(btnOrden).addClass("check");
    }else{
        for (btn of verOrdenPelis) {
            btn.classList.remove("check");
        }
        $(btnOrden).addClass("check");
        $("#listaOrden").slideToggle("slow");
        $("#listaOrden").addClass("listaAbierta");
    }
}

$(document).ready(function() {
    $("#grillaPelis").fadeIn(1000);

    // reviso si ya tengo datos guardados del Usuario y si es así, muestro el botón para poder borrar los Datos y empezar de nuevo
    if(sessionStorage.getItem('calpDatoUser') != null) {
        $("#limpiarDatos").show();
    }

    if (sessionStorage.getItem('reloadAfterPageLoad')) {
        sessionStorage.removeItem('reloadAfterPageLoad');
        $('#modalDatosClear').modal('toggle');
        $("#limpiarDatos").hide();
    }

});

//evento para limpiar datos del usuario
$("#limpiarDatos").click( function () {
    sessionStorage.clear();
    sessionStorage.reloadAfterPageLoad = true;
    window.scrollTo(0, 0);
    window.location.reload();
} 
);

// AGREGO EVENTO PARA VER: LISTADO DE PELICULAS
$("#limpiarDatos").click(limpiarDatos);



// AGREGO EVENTO PARA VER: LISTADO DE PELICULAS
$("#comoFunciona").click(modalComo)

function modalComo() {
    $('#modalComoFunciona').modal('toggle');
};


function empezar(episodio) {
    // Selecciono qué objeto (Película) se usará para la comparación
    var peli = peliculasTodas.find(elemento => elemento.id === episodio);

    // reviso si ya tengo datos guardados del Usuario
    if(sessionStorage.getItem('calpDatoUser') != null) {

        //si hay algo guardado, traigo el objeto del Usuario 
        var userStored = sessionStorage.getItem('calpDatoUser')
        userStored = JSON.parse(userStored);
        
        // reviso si el genero ya fue comparado anteriormente buscando entre las propiedades y si ya existe hago la comparación de todos los datos, sino armo el pido saber por ese genero puntualmente y lo almaceno en el objeto del usuario como una nueva propiedad
        if(`${peli.genero}` in userStored){
            let valorStored = userStored[`${peli.genero}`];
            newGenero(valorStored);
        }else{
            $("#preguntaGeneroSola").html(`¿Te gustan las peliculas de <strong>${peli.genero}</strong>?`);

            $('#modalGenero').modal('show');

            let radiosSolos = $('input[name="radioGeneroSolo"]');
            radiosSolos[0].onclick = () => { radioClicked("si")};
            radiosSolos[1].onclick = () => { radioClicked("no")};
           
            function radioClicked(valor) {
                document.getElementById("submitBtnSolo").disabled = false;
                userStored[`${peli.genero}`] = valor;
            }
            
            $("#formGenero").submit(submitGenero);

            function submitGenero(e){
                e.preventDefault();

                let valorNew = $('input[name="radioGeneroSolo"]:checked').val();
                sessionStorage.setItem('calpDatoUser', JSON.stringify(userStored));
                
                newGenero(valorNew);

                //reseteo los campos del Form para a próxima comparación
                $('input[name="radioGeneroSolo"]')[0].checked = false;
                $('input[name="radioGeneroSolo"]')[1].checked = false;
                document.getElementById("submitBtnSolo").disabled = true;

                $('#modalGenero').modal('toggle');
            }
        }

        function newGenero(respGenero){

            // calculo de diferencia de puntuación según categoría
            function diferenciaEnCategoria(valorPeli, valorUser) {
                let resultado = valorPeli - valorUser;
                if (valorUser > valorPeli){
                    resultado = valorUser - valorPeli;
                }
                return resultado;
            }
            // calculo de la probabilidad de que le guste la película según la diferencia de gustos
            function probabilidad() {
                var diferencia = diferenciaMusica + diferenciaFoto + diferenciaTrama + diferenciaFx
                var porcentajeDiferencia = diferencia * 100 / 40;
                var probabilidadOk = 100 - porcentajeDiferencia;
                return probabilidadOk;
            }
            // traigo dato IMDb e imprimo los resultados
            function traerPuntaje(generoComparado, respUser, probabilidad) {
                $.get(`https://api.themoviedb.org/3/movie/${peli.idImdb}?api_key=4f82603cf8a9342399a9cf76a8c55033`).done(function(resultado, estado) {
                    if (estado == "success") {
            
                        if (respUser == "si" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>¡Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que puede que te guste.</p>
                                            <p>Pero tengamos en cuenta que la probabilidad de eso es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Quizás se le puede dar una chance...<br>pero no prometo nada.</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "si" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>¡Puede ser buena!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>¡${peli.nombre} parece ser una película para vos!</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "no" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>¡Olvídalo!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>NO verla puede ser una buena opción a veces..</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "no" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>¡Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que si esto es determinante, ni le demos una chance.</p>
                                            <p>Por otro lado, coincide con tus gustos en:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Vos sabrás si darle una chance o no.</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        }
            
                    } else {
            
                        if (respUser == "si" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que puede que te guste.</p>
                                            <p>Igual tengamos en cuenta que la probabilidad de eso es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Se le puede dar una chance...<br>pero no prometo nada.</p>`);
                        } else if (respUser == "si" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>¡Puede ser buena!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Claramente ${peli.nombre} es una película que puede gustarte!</p>`);
                        } else if (respUser == "no" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>¡Olvídalo!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>NO verla puede ser una buena opción.</p>`);
                        } else if (respUser == "no" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>¡Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que si esto es determinante, ni le demos una chance.</p>
                                            <p>Por otro lado, coincide con tus gustos en:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Vos sabrás si darle una chance o no.</p>`);
                        }
                    }
                });
            }
            
            // SE EJECUTAN LAS FUNCIONES
            let diferenciaMusica = diferenciaEnCategoria(peli.musica, userStored.musica)
            let diferenciaFoto = diferenciaEnCategoria(peli.foto, userStored.foto)
            let diferenciaTrama = diferenciaEnCategoria(peli.trama, userStored.trama)
            let diferenciaFx = diferenciaEnCategoria(peli.fx, userStored.fx)
            let respuestaProbabilidad = probabilidad();
            traerPuntaje(peli.genero, respGenero, respuestaProbabilidad);

            $('#modalRespuesta').modal('show');
        }

    }else{

        $('#modalPreguntas').modal('toggle');

        // CREO TITULO Y PREGUNTA EN EL FORMULARIO
        $("#titleForm").html(`Ok! Veamos si<br><strong>${peli.nombre}</strong><br>te gustará!`);
        $("#preguntaGenero").html(`¿Te gustan las peliculas de <strong>${peli.genero}</strong>?`);

        // VALIDO LOS CAMPOS CON EVENTOS PARA HABILITAR Y DESABILITAR EL SUBMIT con una función 
        $("#nombreUser").on('keyup', btnEnable);

        // AGREGO UN EVENTO A LOS RADIOS
        let radios = $('input[name="radioGenero"]');
        radios[0].onclick = () => { btnEnable();};
        radios[1].onclick = () => { btnEnable();};
        
        // agrego un if para que se valide que el nombre no esté vacío y que algún radio esté clickeado
        function btnEnable(){
            if($("#nombreUser").val() != "" && (radios[0].checked || radios[1].checked)){
                document.getElementById("submitBtn").disabled = false;
            }else{
                document.getElementById("submitBtn").disabled = true;
            }
        };

        $("#formUser").submit(submitUser);

        // FORM
        function submitUser(e){
            // SE IMPIDE EL ENVÍO DE FORM
            e.preventDefault();

            // OBJETO: crear Usuario
            class User {
                constructor (nombre, musica, foto, trama, fx) {
                    this.nombre = nombre,
                    this.musica = musica,
                    this.foto = foto,
                    this.trama = trama,
                    this.fx = fx
                }
            }
            // SE ACCEDE A LOS DATOS DEL USUARIO DEL FORM
            const nombre = $("#nombreUser").val();
            const generoUser = $('input[name="radioGenero"]:checked').val();
            const musicaUser = $("#datoMusica").val();
            const fotoUser = $("#datoFotografia").val();
            const tramaUser = $("#datoTrama").val();
            const fxUser = $("#datoFx").val();
            const user1 = new User (nombre, musicaUser, fotoUser, tramaUser, fxUser);
            user1[`${peli.genero}`] = generoUser;

            // SE ALMACENAN LOS DATOS EN LOCAL STORAGE 
            sessionStorage.setItem('calpDatoUser', JSON.stringify(user1));

            // habilito el botón para el reseteo de Datos
            $("#limpiarDatos").show();
            
            // calculo de diferencia de puntuación según categoría
            function diferenciaEnCategoria(valorPeli, valorUser) {
                let resultado = valorPeli - valorUser;
                if (valorUser > valorPeli){
                    resultado = valorUser - valorPeli;
                }
                return resultado;
            }
            // calculo de diferencia total
            function calcularDiferencia() {
                var diferenciaTotal = diferenciaMusica + diferenciaFoto + diferenciaTrama + diferenciaFx
                return diferenciaTotal;
            }
            // calculo de la probabilidad de que le guste la película según la diferencia total
            function probabilidad(diferencia) {
                var porcentajeDiferencia = diferencia * 100 / 40;
                var probabilidadOk = 100 - porcentajeDiferencia;
                return probabilidadOk;
            }
            // dato IMDB
            function traerPuntaje(generoComparado, respUser, probabilidad) {
                $.get(`https://api.themoviedb.org/3/movie/${peli.idImdb}?api_key=4f82603cf8a9342399a9cf76a8c55033`).done(function(resultado, estado) {

                    if (estado == "success") {
            
                        if (respUser == "si" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${user1.nombre}</h2>
                                            <p><strong>¡Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que puede que te guste.</p>
                                            <p>Pero tengamos en cuenta que la probabilidad de eso es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Quizás se le puede dar una chance...<br>pero no prometo nada.</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "si" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${user1.nombre}</h2>
                                            <p><strong>¡Puede ser buena!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>¡${peli.nombre} parece ser una película para vos!</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "no" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${user1.nombre}</h2>
                                            <p><strong>¡Olvídalo!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>NO verla puede ser una buena opción a veces..</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "no" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${user1.nombre}</h2>
                                            <p><strong>¡Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que si esto es determinante, ni le demos una chance.</p>
                                            <p>Por otro lado, coincide con tus gustos en:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Vos sabrás si darle una chance o no.</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        }
            
                    } else {
            
                        if (respUser == "si" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${user1.nombre}</h2>
                                            <p><strong>Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que puede que te guste.</p>
                                            <p>Igual tengamos en cuenta que la probabilidad de eso es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Se le puede dar una chance...<br>pero no prometo nada.</p>`);
                        } else if (respUser == "si" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${user1.nombre}</h2>
                                            <p><strong>¡Puede ser buena!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Claramente ${peli.nombre} es una película que puede gustarte!</p>`);
                        } else if (respUser == "no" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${user1.nombre}</h2>
                                            <p><strong>¡Olvídalo!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>NO verla puede ser una buena opción.</p>`);
                        } else if (respUser == "no" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${user1.nombre}</h2>
                                            <p><strong>¡Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que si esto es determinante, ni le demos una chance.</p>
                                            <p>Por otro lado, coincide con tus gustos en:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Vos sabrás si darle una chance o no.</p>`);
                        }
                    }

                });
            }

            // SE EJECUTAN LAS FUNCIONES
            let diferenciaMusica = diferenciaEnCategoria(peli.musica, user1.musica)
            let diferenciaFoto = diferenciaEnCategoria(peli.foto, user1.foto)
            let diferenciaTrama = diferenciaEnCategoria(peli.trama, user1.trama)
            let diferenciaFx = diferenciaEnCategoria(peli.fx, user1.fx)
            let diferencia = calcularDiferencia();
            let respuestaProbabilidad = probabilidad(diferencia);
            traerPuntaje(peli.genero, generoUser, respuestaProbabilidad);

            //reseteo los campos del Form
            $("#nombreUser").val('');
            $('input[name="radioGenero"]')[0].checked = false;
            $('input[name="radioGenero"]')[1].checked = false;
            // ME APOYO EN BOOTSTRAP PARA CERRAR UN MODAL y ABRIR EL OTRO
            $('#modalPreguntas').modal('toggle');
            $('#modalRespuesta').modal('show');
        }
    }
}

$("#logo").mouseover(function() {
    $("#logo").animate({opacity:0.1}, 100)
    .delay(100)
    .animate({opacity:1}, 100)
    .delay(100)
    .animate({opacity:0.1}, 100)
    .delay(100)
    .animate({opacity:1}, 100)
    .delay(400)
    .animate({opacity:0.1}, 100)
    .delay(100)
    .animate({opacity:1}, 100)
    .delay(100)
    .animate({opacity:0.1}, 100)
    .delay(100)
    .animate({opacity:1}, 100);
});



