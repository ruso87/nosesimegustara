function empezar() {
    let nombre = prompt("Para empezar, por favor ingresá tu nombre:");
    alert("Buenas buenas " + nombre + ", emprecemos!");

    //CALP son las iniciales de "Cine a las Piñas"

    function diferenciaEnCategoria(categoria, datoCALP, datoUser) {
        let resultado = datoCALP - datoUser;
        if (resultado < 0){
            resultado = resultado * -1;
        }
        console.log("La diferencia de " + categoria + " es: " + resultado);
        return resultado;
    }



    var humorCALP = 2;
    var emocionCALP = 0;
    var accionCALP = 3;
    var musicaCALP = 5;
    var fotoCALP = 4;
    var tramaCALP = 5;
    var fxCALP = 1;

    var humorUser = parseInt(prompt("Del 0 al 5:\n¿Cuanto te gustan las pelis de Humor?"));
    var emocionUser = parseInt(prompt("Del 0 al 5:\n¿Cuanto te gustan las pelis Emotivas?"));
    var accionUser = parseInt(prompt("Del 0 al 5:\n¿Cuanto te gustan las pelis de Acción?"));
    var musicaUser = parseInt(prompt("Del 0 al 5:\n¿Cuanto te interesa la Música de una película?"));
    var fotoUser = parseInt(prompt("Del 0 al 5:\n¿Cuanto te interesa la Fotografía de una película?"));
    var tramaUser =parseInt(prompt("Del 0 al 5:\n¿Cuanto te interesa la Trama de una película?"));
    var fxUser = parseInt(prompt("Del 0 al 5:\n¿Cuanto te interesan los Efectos Especiales de una película?"));

    diferenciaHumor = diferenciaEnCategoria("humor", humorCALP, humorUser)
    diferenciaEmocion = diferenciaEnCategoria("emocion", emocionCALP, emocionUser)
    diferenciaAccion = diferenciaEnCategoria("accion", accionCALP, accionUser)
    diferenciaMusica = diferenciaEnCategoria("musica", musicaCALP, musicaUser)
    diferenciaFoto = diferenciaEnCategoria("fotografia", fotoCALP, fotoUser)
    diferenciaTrama = diferenciaEnCategoria("trama", tramaCALP, tramaUser)
    diferenciaFx = diferenciaEnCategoria("fx", fxCALP, fxUser)

    var diferenciaTotal = diferenciaHumor + diferenciaEmocion + diferenciaAccion + diferenciaMusica + diferenciaFoto + diferenciaTrama + diferenciaFx

    console.log("La diferencia total es de: " + diferenciaTotal)

    var porcentaje = (diferenciaTotal) => {
        diferenciaTotal * 100 / 30;
    }
    console.log("La porcentaje de diferencia es de: " + porcentaje + "% ")


}