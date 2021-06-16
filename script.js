// IMPRIMO TODAS LAS PELICULAS EN EL HTML
for (const pelicula of peliculasTodas) {
    let linkPeli = document.createElement("div");
    linkPeli.innerHTML = `<a onclick="empezar('${pelicula.id}')">
						<img src="${pelicula.imagen}" alt="Capítulo ${pelicula.progridama} - ${pelicula.nombre}">
						<h4>Capítulo ${pelicula.id} - ${pelicula.nombre}</h4>
				    	</a>
				    	<a onclick="empezar('${pelicula.id}')" class="btn">¿ME GUSTARÁ?</i></a>`;
    document.getElementById("grillaPelis").appendChild(linkPeli);
}

// AGREGO EVENTO PARA VER: LISTADO DE PELICULAS
let verPelisList = document.getElementById("verTodas")
verPelisList.onclick = () => { verTodas();};

// LISTADO DE PELICULAS ORDENADAS
var verOrdenPelis = document.getElementsByClassName("btnOrden")
verOrdenPelis[0].onclick = () => { ordenarLista('Música');}
verOrdenPelis[1].onclick = () => { ordenarLista('Foto');}
verOrdenPelis[2].onclick = () => { ordenarLista('Trama');}
verOrdenPelis[3].onclick = () => { ordenarLista('Fx');}


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

// FUNCION PARA VER LISTADOS DE PELICULAS ORDENADAS
function ordenarLista(orden) {
    switch (orden) {
        case "Música":
            var ordenElegido = peliculasTodas.sort((a, b) => b.musica - a.musica);
            ordenElegido = ordenElegido.map(el => el.nombre).join(", ");
            var btnOrden = verOrdenPelis[0]
            break;
        case "Foto":
            var ordenElegido = peliculasTodas.sort((a, b) => b.foto - a.foto);
            ordenElegido = ordenElegido.map(el => el.nombre).join(", ");
            var btnOrden = verOrdenPelis[1]
            break;
        case "Trama":
            var ordenElegido = peliculasTodas.sort((a, b) => b.trama - a.trama);
            ordenElegido = ordenElegido.map(el => el.nombre).join(", ");
            var btnOrden = verOrdenPelis[2]
            break;
        case "Fx":
            var ordenElegido = peliculasTodas.sort((a, b) => b.fx - a.fx);
            ordenElegido = ordenElegido.map(el => el.nombre).join(", ");
            var btnOrden = verOrdenPelis[3]
            break;
        default:
            console.log("¿Que criterio usaremos para ordenar las películas?");
            break;
    }

    var element = document.getElementById("listaOrden");
    element.innerHTML = `<h4>El orden de las películas listadas, según la importancia de su ${orden} es:</h4> <p>${ordenElegido}</p>`

    if(btnOrden.classList.contains("check") && element.classList.contains("d-block")){
        btnOrden.classList.remove("check");
        element.classList.remove("d-block");
    }else{
        for (btn of verOrdenPelis) {
            btn.classList.remove("check");
        }
        btnOrden.classList.add("check");
        element.classList.add("d-block");
    }
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
    
    if(sessionStorage.getItem('calpDatoUser') != null) {
        var userSaved = sessionStorage.getItem('calpDatoUser')
        userSaved = JSON.parse(userSaved);

        var grabado = sessionStorage.getItem(peli.genero);
        
        if(grabado != null){
            userSaved.genero = grabado;
            newGenero();
        }else {

            document.getElementById("preguntaGeneroSola").innerHTML = `¿Te gustan las peliculas de <strong>${peli.genero}</strong>?`

            $('#modalGenero').modal('show');

            let radiosSolos = document.getElementsByName("radioGeneroSolo");
            radiosSolos[0].onclick = () => { btnEnable();};
            radiosSolos[1].onclick = () => { btnEnable();};
            
            function btnEnable(){
                    document.getElementById("submitBtnSolo").disabled = false;
            };
    
            const formGenero = document.getElementById("formGenero");
            formGenero.addEventListener("submit", submitGenero);

            function submitGenero(e){
                e.preventDefault();

                let generoNew = document.querySelector('input[name="radioGeneroSolo"]:checked').value;
                userSaved.genero = generoNew;
                sessionStorage.setItem(peli.genero, userSaved.genero);
                newGenero();
                $('#modalGenero').modal('toggle');

            }
        }

        function newGenero(){
            // comprobación de si al usuario le gusta el género de la Película
            function comparacionGenero(nombrePeli, genero, respUser) {
                var resultadoGenero = `${userSaved.nombre}, probablemente ${nombrePeli} no te guste <br> porque es de ${genero}.`;
                if (respUser == "si"){
                    resultadoGenero = `${userSaved.nombre}, en un principio venimos bien!<br> ${nombrePeli} es una película de ${genero}.`;
                }
                return resultadoGenero
            }
            let generoComparado = comparacionGenero(peli.nombre, peli.genero, userSaved.genero)


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
                var porcentajeDiferencia = diferencia * 100 / 20;
                var probabilidadOk = 100 - porcentajeDiferencia;
                probabilidadOk = `Según las preferencias indicadas, la probabilidad de que la película te guste es de: ${probabilidadOk}%`
                return probabilidadOk;
            }

            // SE EJECUTAN LAS FUNCIONES
            let diferenciaMusica = diferenciaEnCategoria(peli.musica, userSaved.musica)
            let diferenciaFoto = diferenciaEnCategoria(peli.foto, userSaved.foto)
            let diferenciaTrama = diferenciaEnCategoria(peli.trama, userSaved.trama)
            let diferenciaFx = diferenciaEnCategoria(peli.fx, userSaved.fx)
            let respuestaProbabilidad = probabilidad();

            let rta = document.getElementById("rta");
            rta.innerHTML = `<p>${generoComparado}</p><p>${respuestaProbabilidad}</p>`

            $('#modalRespuesta').modal('show');
        }

    }else{

        $('#modalPreguntas').modal('toggle');


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

            // SE ALMACENAN LOS DATOS EN LOCAL STORAGE 
            sessionStorage.setItem('calpDatoUser', JSON.stringify(user1));
            sessionStorage.setItem(peli.genero, generoUser);
            
            // comprobación de si al usuario le gusta el género de la Película
            function comparacionGenero(nombrePeli, genero, respUser) {
                var resultadoGenero = `${user1.nombre}, probablemente ${nombrePeli} no te guste <br> porque es de ${genero}.`;
                if (respUser == "si"){
                    resultadoGenero = `${user1.nombre}, en un principio venimos bien!<br> ${nombrePeli} es una película de ${genero}.`;
                }
                return resultadoGenero
            }
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
                var porcentajeDiferencia = diferencia * 100 / 20;
                var probabilidadOk = 100 - porcentajeDiferencia;
                probabilidadOk = `Según las preferencias indicadas, la probabilidad de que la película te guste es de: ${probabilidadOk}%`
                return probabilidadOk;
            }

            // SE EJECUTAN LAS FUNCIONES
            let generoComparado = comparacionGenero(peli.nombre, peli.genero, user1.genero)
            let diferenciaMusica = diferenciaEnCategoria(peli.musica, user1.musica)
            let diferenciaFoto = diferenciaEnCategoria(peli.foto, user1.foto)
            let diferenciaTrama = diferenciaEnCategoria(peli.trama, user1.trama)
            let diferenciaFx = diferenciaEnCategoria(peli.fx, user1.fx)
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
}


