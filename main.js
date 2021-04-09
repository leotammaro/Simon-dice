const $colores = document.getElementsByClassName('colores');
const colores = [...$colores];
const perdedor = document.querySelector(".perder");
let coloresElegidosPorMaquina = [];
let ronda=0;

function jugadorEligeColor(){
    let colorSeleccionado;
    colores.forEach(color=>{
        color.addEventListener("click",()=>{
            colorSeleccionado = color.classList[2]
            color.style.opacity = 1;
            setTimeout(() => {
                color.style.opacity =0.3;
            }, 500);
            ronda++;
            console.log(ronda)
            if(colorSeleccionado !== coloresElegidosPorMaquina[ronda-1].classList[2]){
                color.style.opacity =0.3;
                ronda=0;
                mostrarCartelPerdedor();
            }
            else if(colorSeleccionado == coloresElegidosPorMaquina[ronda-1].classList[2] && ronda==coloresElegidosPorMaquina.length){
                mostrarColoresElegidosPorMaquina();
                ronda=0;
            }
            
        })
    })
}

function maquinaGeneraColorAleatorio(){
    let indiceAleatorio = Math.floor(Math.random()*colores.length);
    coloresElegidosPorMaquina.push(colores[indiceAleatorio]);
}

function mostrarColoresElegidosPorMaquina(){
    bloquearElegirColorAlJugador();
    maquinaGeneraColorAleatorio();
    coloresElegidosPorMaquina.forEach((color,index)=>{
        let MOSTRAR_INDICE = (index+1)*1000;
        setTimeout(() => {
            color.style.opacity =1;
        }, MOSTRAR_INDICE);
        setTimeout(() => {
            color.style.opacity =0.3;
        }, MOSTRAR_INDICE+500);
        setTimeout(() => {
            jugadorPuedeElegirColores();
        }, coloresElegidosPorMaquina.length*1000);
    })
}

jugadorEligeColor();

function comenzarAjugar(){
    mostrarColoresElegidosPorMaquina();
}
comenzarAjugar();

function bloquearElegirColorAlJugador(){
    colores.forEach(color=>{
        color.style.pointerEvents = "none";
    })
}

function jugadorPuedeElegirColores(){
    colores.forEach(color=>{
        color.style.pointerEvents = "auto";
    })
}

function mostrarCartelPerdedor(){
    perdedor.style.display = "flex";
    colores.forEach(color=>{
        color.style.display="none";
    })
}

function reiniciarJuego(){
    perdedor.style.display="none";
    colores.forEach(color=>{
        color.style.display="flex";
    })
    coloresElegidosPorMaquina =[];
    comenzarAjugar();
}
