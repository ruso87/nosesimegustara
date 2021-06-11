
// IMPRIMO TODAS LAS PELICULAS EN EL HTML
for (const pelicula of peliculasTodas) {
    let linkPeli = document.createElement("div");
    linkPeli.innerHTML = `<a onclick="empezar('${pelicula.id}')" data-toggle="modal" data-target="#modalPreguntas">
						<img src="${pelicula.imagen}" alt="Capítulo ${pelicula.progridama} - ${pelicula.nombre}">
						<h4>Capítulo ${pelicula.id} - ${pelicula.nombre}</h4>
				    	</a>
				    	<a onclick="empezar('${pelicula.id}')" class="btn" data-toggle="modal" data-target="#modalPreguntas">¿ME GUSTARÁ?</i></a>`;
    document.getElementById("grillaPelis").appendChild(linkPeli);
}

// AGREGO EVENTO PARA VER TODAS LAS PELICULAS
let verPelisList = document.getElementById("verTodas")
verPelisList.onclick = () => { verTodas();};

// FUNCIÓN PARA VER LOS DATOS DE TODAS LAS PELICULAS
function verTodas() {
    var element = document.getElementById("listaTodas");
    if(element.classList.contains("d-block")){
        element.classList.remove("d-block");
    }else{
        element.classList.add("d-block");
        if(element.classList.contains("check")){
            // no hacer nada
        }else{
            // crear el listado de pelis
            for (pelis of peliculasTodas) {
                pelis.datosPeli();
            }
        element.classList.add("check");
        }
    }
}

// FUNCIÓNES PARA ORDENAR LAS PELICULAS POR SUS CARACTERÍSTICAS
function ordenarPorMusica() {
    const ordenMusica = peliculasTodas.sort((a, b) => b.musica - a.musica);
    console.log (`El orden de las películas listadas, según la importancia de su Música es: ${ordenMusica.map(el => el.nombre).join(", ")}`);
}
function ordenarPorFoto() {
    const ordenFoto = peliculasTodas.sort((a, b) => b.foto - a.foto);
    console.log (`El orden de las películas listadas, según la importancia de su Fotografía es: ${ordenFoto.map(el => el.nombre).join(", ")}`);
}
function ordenarPorTrama() {
    const ordenTrama = peliculasTodas.sort((a, b) => b.trama - a.trama);
    console.log (`El orden de las películas listadas, según la importancia de su Trama es: ${ordenTrama.map(el => el.nombre).join(", ")}`);
}
function ordenarPorFx() {
    const ordenFx = peliculasTodas.sort((a, b) => b.fx - a.fx);
    console.log (`El orden de las películas listadas, según la importancia de sus Efectos Especiales es: ${ordenFx.map(el => el.nombre).join(", ")}`);
}


function empezar(episodio) {
    
    // Selecciono qué objeto (Película) se usará para la comparación dependiendo del parámetro enviado en la function empezar() desde el HTML
    switch (episodio) {
        case "01":
            var peli = datosEp1;
            break;
        case "02":
            var peli = datosEp2;
            break;
        case "03":
            var peli = datosEp3;
            break;
        case "04":
            var peli = datosEp4;
            break;
        case "05":
            var peli = datosEp5;
            break;
        case "06":
            var peli = datosEp6;
            break;
        default:
            console.log("Oh oh... algo salió mal. Por favor elegí otra película");
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
    }

    // CREO TITULO Y PREGUNTA EN EL FORMULARIO
    document.getElementById("titleForm").innerHTML = `Ok! Veamos si<br><strong>${peli.nombre}</strong><br>te gustará!`
    document.getElementById("preguntaGenero").innerHTML = `¿Te gustan las peliculas de <strong>${peli.genero}</strong>?`

    // VALIDO LOS CAMPOS CON EVENTOS PARA HABILITAR Y DESABILITAR EL SUBMIT con una función 
    let inputNombre = document.getElementById("nombreUser");
    inputNombre.onkeyup = () => { btnEnable();};
    // AGREGO UN EVENTO A LOS RADIOS
    let radios = document.getElementsByName("radioGenero");
    radios[0].onclick = () => { btnEnable();};
    radios[1].onclick = () => { btnEnable();};
    
    // agrego un if para que se valide que el nombre no esté vacío y que algún radio esté clickeado
    function btnEnable(){
        if(inputNombre.value != "" && (radios[0].checked || radios[1].checked)){
            document.getElementById("submitBtn").disabled = false;
        }else{
            document.getElementById("submitBtn").disabled = true;
        }
    };

    const formUser = document.getElementById("formUser");
    formUser.addEventListener("submit", submitUser);

    // FORM
    function submitUser(e){
        // SE IMPIDE EL ENVÍO DE FORM
        e.preventDefault();

        // SE ACCEDE A LOS DATOS DEL USUARIO DEL FORM
        const nombre = document.getElementById("nombreUser").value;
        const generoUser = document.querySelector('input[name="radioGenero"]:checked').value;
        const musicaUser = document.getElementById("datoMusica").value;
        const fotoUser = document.getElementById("datoFotografia").value;
        const tramaUser = document.getElementById("datoTrama").value;
        const fxUser = document.getElementById("datoFx").value;
        const user1 = new User (nombre, generoUser, musicaUser, fotoUser, tramaUser, fxUser);

        // SE ALMACENAN LOS DATOS EN LOCAL STORAGE PARA 
        const userJSON = JSON.stringify(user1);
        localStorage.setItem('calpDatoUser', userJSON);
        
        // comprobación de si al usuario le gusta el género de la Película
        function comparacionGenero(nombrePeli, genero, respUser) {
            var resultadoGenero = `${nombre}, probablemente ${nombrePeli} no te guste <br> porque es de ${genero}.`;
            if (respUser == "si"){
                resultadoGenero = `${nombre}, en un principio venimos bien!<br> ${nombrePeli} es una película de ${genero}.`;
            }
            console.log(resultadoGenero);
            return resultadoGenero
            }

        // calculo de diferencia de puntuación según categoría
        function diferenciaEnCategoria(categoria, valorPeli, valorUser) {
            let resultado = valorPeli - valorUser;
            if (valorUser > valorPeli){
                resultado = valorUser - valorPeli;
            }
            console.log(`La diferencia de ${categoria} es de: ${resultado} punto/s.`);
            return resultado;
        }

        // calculo de diferencia total
        function calcularDiferencia() {
            var diferenciaTotal = diferenciaMusica + diferenciaFoto + diferenciaTrama + diferenciaFx
            console.log(`La diferencia total es de: ${diferenciaTotal} puntos.`)
            return diferenciaTotal;
        }

        // calculo de la probabilidad de que le guste la película según la diferencia total
        function probabilidad(diferencia) {
            var porcentajeDiferencia = diferencia * 100 / 20;
            var probabilidadOk = 100 - porcentajeDiferencia;
            probabilidadOk = `Según las preferencias indicadas, la probabilidad de que la película te guste es de: ${probabilidadOk}%`
            console.log(probabilidadOk)
            return probabilidadOk;
        }

        // SE EJECUTAN LAS FUNCIONES
        let generoComparado = comparacionGenero(peli.nombre, peli.genero, user1.genero)
        let diferenciaMusica = diferenciaEnCategoria("musica", peli.musica, user1.musica)
        let diferenciaFoto = diferenciaEnCategoria("fotografia", peli.foto, user1.foto)
        let diferenciaTrama = diferenciaEnCategoria("trama", peli.trama, user1.trama)
        let diferenciaFx = diferenciaEnCategoria("fx", peli.fx, user1.fx)
        let diferencia = calcularDiferencia();
        let respuestaProbabilidad = probabilidad(diferencia);

        // SE ARMA LA RESPUESTA EN EL MODAL 
        let rta = document.getElementById("rta");
        rta.innerHTML = `<p>${generoComparado}</p><p>${respuestaProbabilidad}</p>`


        // ME APOYO EN BOOTSTRAP PARA CERRAR UN MODAL y ABRIR EL OTRO
        $('#modalPreguntas').modal('toggle');
        $('#modalRespuesta').modal('show');

    }
}


