// GRABO TODAS LAS PELICULAS EN EL DIV #grillaPelis
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

// cuando la página está cargada
$(document).ready(function () {

    // imprimo las Peliculas
    $("#grillaPelis").fadeIn(1000);

    // reviso si ya tengo datos guardados del Usuario y si es así, muestro el botón para poder borrar los Datos y empezar de nuevo
    if(sessionStorage.getItem('calpDatoUser') != null) {
        $("#limpiarDatos").show();
    }

    // reviso si tengo reloadAfterPageLoad en sessionStorage (este se genera al presionar el botón de limpiar datos, antes de refrescar la página)
    if (sessionStorage.getItem('reloadAfterPageLoad')) {
        sessionStorage.removeItem('reloadAfterPageLoad');
        $('#modalDatosClear').modal('toggle');
        $("#limpiarDatos").hide();
    }
});

// evento: Limpiar datos del usuario
$("#limpiarDatos").click(function () {
    sessionStorage.clear();
    sessionStorage.reloadAfterPageLoad = true;
    window.scrollTo(0, 0);
    window.location.reload();
}
);

// evento: reiniciar si se cierra el modal de preguntas principal
$(".closePreguntas").click(function () {
    window.location.reload();
}
);

// evento: Mostrar modal "Como funciona"
$("#comoFunciona").click(function () {
    $('#modalComoFunciona').modal('toggle');
});

// evento: VER LISTADO DE TODAS LAS PELICULAS
$("#verTodas").click(verTodas);

// función: VER LISTADO DE TODAS LAS PELICULAS
function verTodas() {
    if($("#listaTodas").hasClass("check")){
        $("#listaTodas").slideToggle("slow");
        if($(".divInfo").hasClass("d-flex")){
            $(".divInfo").removeClass("d-flex");
        }else{
            $(".divInfo").addClass("d-flex");
        }
    }else{
        for (pelis of peliculasTodas) {
            pelis.datosPeli();
        }
        $("#listaTodas").addClass("check");
        $("#listaTodas").slideToggle("slow");
        $(".divInfo").addClass("d-flex");
    }
}

// eventos: VER PELIS ORDENADAS
var verOrdenPelis = $(".btnOrden");
verOrdenPelis[0].onclick = () => { ordenarLista('Música');}
verOrdenPelis[1].onclick = () => { ordenarLista('Foto');}
verOrdenPelis[2].onclick = () => { ordenarLista('Trama');}
verOrdenPelis[3].onclick = () => { ordenarLista('Fx');}

// función: VER PELIS ORDENADAS
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

// FUNCIÓN PRINCIPAL

function empezar(episodio) {

    // Selecciono qué objeto (Película) se usará para la comparación dependiendo del "id" del objeto
    var peli = peliculasTodas.find(elemento => elemento.id === episodio);

    // reviso si ya tengo datos guardados del Usuario
    if(sessionStorage.getItem('calpDatoUser') != null) {

        // si hay algo guardado, traigo el objeto del Usuario 
        var userStored = sessionStorage.getItem('calpDatoUser')
        userStored = JSON.parse(userStored);
        
        // reviso si el genero ya fue comparado anteriormente buscando entre las propiedades del objeto y ejecuto la comparación
        if(`${peli.genero}` in userStored){
            let valorStored = userStored[`${peli.genero}`];
            newGenero(valorStored);
        }else{
            // si no hay nada guardado, pregunto por el nuevo genero a comparar
            $("#preguntaGeneroSola").html(`¿Te gustan las peliculas de <strong>${peli.genero}</strong>?`);

            $('#modalGenero').modal('show');

            // al clickear el radio habilito el botón Submit y almaceno el dato del genero en el objeto del usuario "userStored"
            let radiosSolos = $('input[name="radioGeneroSolo"]');
            radiosSolos[0].onclick = () => { radioClicked("si")};
            radiosSolos[1].onclick = () => { radioClicked("no")};
           
            function radioClicked(valor) {
                document.getElementById("submitBtnSolo").disabled = false;
                userStored[`${peli.genero}`] = valor;
            }
            
            $("#formGenero").submit(submitGenero);

            function submitGenero(e){
                // onsubmit se impide el envío del Frm
                e.preventDefault();

                // traigo el volor del Radio y almaceno el usuario en sessionStorage
                let valorNew = $('input[name="radioGeneroSolo"]:checked').val();
                sessionStorage.setItem('calpDatoUser', JSON.stringify(userStored));
                
                // y ejecuto la comparación 
                newGenero(valorNew);

                // reseteo los campos del Form para a próxima comparación
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
                                            <p><strong>¡Está peleado!</strong></p>
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
                                            <p>En palabras de una filósofa argentina:<br>Lo dejo a tu criterio.</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        }
            
                    } else {
                        // si no puedo traer el dato IMDb, solo imprimo los otros datos
                        if (respUser == "si" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${userStored.nombre}</h2>
                                            <p><strong>¡Está peleado!</strong></p>
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
                                            <p>En palabras de una filósofa argentina:<br>Lo dejo a tu criterio.</p>`);
                        }
                    }
                });
            }
            
            // SE EJECUTAN LAS FUNCIONES DE COMPARACIÓN y TRAER DATOS IMDb
            let diferenciaMusica = diferenciaEnCategoria(peli.musica, userStored.musica)
            let diferenciaFoto = diferenciaEnCategoria(peli.foto, userStored.foto)
            let diferenciaTrama = diferenciaEnCategoria(peli.trama, userStored.trama)
            let diferenciaFx = diferenciaEnCategoria(peli.fx, userStored.fx)
            let respuestaProbabilidad = probabilidad();
            traerPuntaje(peli.genero, respGenero, respuestaProbabilidad);

            $('#modalRespuesta').modal('show');
        }

    }else{
    // si NO tengo datos guardados del Usuario muestro modal para que completen
    
        $('#modalPreguntas').modal('toggle');

        // armo Título y Consulta en el fomrulario
        $("#titleForm").html(`Ok! Veamos si<br><strong>${peli.nombre}</strong><br>te gustará!`);
        $("#preguntaGenero").html(`¿Te gustan las peliculas de <strong>${peli.genero}</strong>?`);

        // función: validar que el nombre no esté vacío y que algún radio esté clickeado para habilitar botón de Submit
        function btnEnable(){
            if($("#nombreUser").val() != "" && (radios[0].checked || radios[1].checked)){
                document.getElementById("submitBtn").disabled = false;
            }else{
                document.getElementById("submitBtn").disabled = true;
            }
        };

        // evento: Validar que nombre tenga algo escrito
        $("#nombreUser").on('keyup', btnEnable);

        // evento: Validar que algún radio haya sido clickeado
        let radios = $('input[name="radioGenero"]');
        radios[0].onclick = () => { btnEnable();};
        radios[1].onclick = () => { btnEnable();};
        

        $("#formUser").submit(submitUser);

        function submitUser(e){
            // onsubmit se impide el envío del Frm
            e.preventDefault();

            // creo el usuario con un Constructor
            class User {
                constructor (nombre, musica, foto, trama, fx) {
                    this.nombre = nombre,
                    this.musica = musica,
                    this.foto = foto,
                    this.trama = trama,
                    this.fx = fx
                }
            }
            // accedo a los datos del formulario y armo el objeto
            const nombre = $("#nombreUser").val();
            const generoUser = $('input[name="radioGenero"]:checked').val();
            const musicaUser = $("#datoMusica").val();
            const fotoUser = $("#datoFotografia").val();
            const tramaUser = $("#datoTrama").val();
            const fxUser = $("#datoFx").val();
            const usuario = new User (nombre, musicaUser, fotoUser, tramaUser, fxUser);
            usuario[`${peli.genero}`] = generoUser;

            // almaceno los datos en sessionStorage para más utilizarlos más adelante y por si se actualza la página por error 
            sessionStorage.setItem('calpDatoUser', JSON.stringify(usuario));

            // muestro el botón para poder borrar los Datos y empezar de nuevo
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
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${usuario.nombre}</h2>
                                            <p><strong>¡Está peleado!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que puede que te guste.</p>
                                            <p>Pero tengamos en cuenta que la probabilidad de eso es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Quizás se le puede dar una chance...<br>pero no prometo nada.</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "si" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${usuario.nombre}</h2>
                                            <p><strong>¡Puede ser buena!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>¡${peli.nombre} parece ser una película para vos!</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "no" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${usuario.nombre}</h2>
                                            <p><strong>¡Olvídalo!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>NO verla puede ser una buena opción a veces..</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        } else if (respUser == "no" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${usuario.nombre}</h2>
                                            <p><strong>¡Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que si esto es determinante, ni le demos una chance.</p>
                                            <p>Por otro lado, coincide con tus gustos en:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>En palabras de una filósofa argentina:<br>Lo dejo a tu criterio.</p>
                                            <p><br>Dato de color:<br>el puntaje que le da IMDb a la película es ${resultado.vote_average}</p>`);
                        }
            
                    } else {
            
                        if (respUser == "si" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${usuario.nombre}</h2>
                                            <p><strong>¡Está peleado!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que puede que te guste.</p>
                                            <p>Igual tengamos en cuenta que la probabilidad de eso es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Se le puede dar una chance...<br>pero no prometo nada.</p>`);
                        } else if (respUser == "si" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${usuario.nombre}</h2>
                                            <p><strong>¡Puede ser buena!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>Claramente ${peli.nombre} es una película que puede gustarte!</p>`);
                        } else if (respUser == "no" && probabilidad <= 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${usuario.nombre}</h2>
                                            <p><strong>¡Olvídalo!</strong></p>
                                            <p>Además de que la película es de ${generoComparado},<br>la probabilidad de que te guste es:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>NO verla puede ser una buena opción.</p>`);
                        } else if (respUser == "no" && probabilidad > 50){
                            $("#rta").html(`<h2>${peli.nombre}<span>vs.</span>${usuario.nombre}</h2>
                                            <p><strong>¡Está dificil!</strong></p>
                                            <p>Por un lado, la película es de ${generoComparado},<br>por lo que si esto es determinante, ni le demos una chance.</p>
                                            <p>Por otro lado, coincide con tus gustos en:</p>
                                            <h2>${probabilidad}%</h2>
                                            <p>En palabras de una filósofa argentina:<br>Lo dejo a tu criterio.</p>`);
                        }
                    }

                });
            }

            // SE EJECUTAN LAS FUNCIONES
            let diferenciaMusica = diferenciaEnCategoria(peli.musica, usuario.musica)
            let diferenciaFoto = diferenciaEnCategoria(peli.foto, usuario.foto)
            let diferenciaTrama = diferenciaEnCategoria(peli.trama, usuario.trama)
            let diferenciaFx = diferenciaEnCategoria(peli.fx, usuario.fx)
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

// evento y Función : efecto en logo 
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



