let tiempo = 0;
let intervaloTiempo;

document.querySelector('button[type=button]').onclick = comenzarJuego;

function comenzarJuego() {
    reiniciarEstado()
    intervaloTiempo = setInterval(actualizarTiempo, 1000);
    actualizarEstado('Desvela las casillas para encontrar parejas')
    randomizarPosicionPokemon()
}
function reiniciarEstado(){
    const $pokemones = document.querySelectorAll('.pokemon-espacio')
    $pokemones.forEach(pokemon => {
        pokemon.innerHTML = ''; 
    });
    const $iconos = document.querySelectorAll('.icon-pregunta')
    $iconos.forEach(icono =>{
        icono.classList.remove('oculto')
    })
    const $intento =  document.querySelector('#intento')
    $intento.textContent = '-'
    const tiempoInicial = document.querySelector('#tiempo');
    tiempoInicial.textContent = '-'
     pokemonSeleccionados = [];
     elementosPokemons =[];
     cartaSeleccionadas = [];
     pareja=0;
     tiempo = 0;
     intento= 0;
     listaNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
}

function actualizarTiempo() {
    const tiempoInicial = document.querySelector('#tiempo');
    tiempo++;

    tiempoInicial.textContent = tiempo;
}


let listaNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function obtenerNumeroAleatorio() {
    let indice = Math.floor(Math.random() * listaNumeros.length);
    let numeroAleatorio = listaNumeros[indice];
    listaNumeros.splice(indice, 1);
    return numeroAleatorio;
}
function randomizarPosicionPokemon(){
    const espacio = document.querySelectorAll('.pokemon-espacio')
    espacio.forEach(
        function(espacioPokemon){
            let numero = obtenerNumeroAleatorio();
            let img = document.createElement('img')
            img.src = 'imagenes/' + numero + '.png';
            if(numero===0 || numero === 8){
                img.setAttribute('name', 'pokemon1');
            }else if(numero===1 || numero === 9){
                img.setAttribute('name', 'pokemon2');
            }else if(numero===2 || numero === 10){
                img.setAttribute('name', 'pokemon3');
            }else if(numero===3 || numero === 11){
                img.setAttribute('name', 'pokemon4');
            }else if(numero===4 || numero === 12){
                img.setAttribute('name', 'pokemon5');
            }else if(numero===5 || numero === 13){
                img.setAttribute('name', 'pokemon6');
            }else if(numero===6 || numero === 14){
                img.setAttribute('name', 'pokemon7');
            }else if(numero===7 || numero === 15){
                img.setAttribute('name', 'pokemon8');
            }
            img.classList.add('pokemon')
            img.classList.add('oculto')
            espacioPokemon.appendChild(img)
        }
    );
}


const iconosPregunta = document.querySelectorAll('.icon-pregunta');

iconosPregunta.forEach(function(icono){
    icono.addEventListener('click', function() {
        mostrarPokemon(icono);
    });
});
let intento =0;
let pokemonSeleccionados = [];
let elementosPokemons =[];
let cartaSeleccionadas = [];
let pareja=0
function mostrarPokemon($pokemon) {

    cartaSeleccionadas.push($pokemon)
    $pokemon.classList.add('oculto');
    const carta = $pokemon.closest('.carta');
    const imagenPokemon = carta.querySelector('.pokemon');
    elementosPokemons.push(imagenPokemon)
    imagenPokemon.classList.remove('oculto');
    const namePokemon = imagenPokemon.getAttribute('name')
    if(pokemonSeleccionados.length<1){
        pokemonSeleccionados.push(namePokemon)
    }else{
        if(namePokemon != pokemonSeleccionados[0]){
            setTimeout(function(){
                cartaSeleccionadas[0].classList.remove('oculto')
                elementosPokemons[0].classList.add('oculto');
                $pokemon.classList.remove('oculto');
                imagenPokemon.classList.add('oculto');
                cartaSeleccionadas = [];
                elementosPokemons = [];
            },1000)
            pokemonSeleccionados = [];

        }else{
            cartaSeleccionadas = [];
            elementosPokemons = []; 
            pokemonSeleccionados = [];
            pareja++
        }
        intento++;
          contadorIntento()
    }
    ganar();
}
function ganar(){
    if(pareja >= 8){
        actualizarEstado('Ganaste! Aprieta empezar para volver a jugar',true)
        detenerIntervalo();
    }

}
function contadorIntento(){
   const $intento =  document.querySelector('#intento')
   $intento.textContent = intento
}
function actualizarEstado(estado,error=false){
    const $estado = document.querySelector('#estado')
    $estado.textContent = estado
    if(error){
        $estado.classList.remove('alert-primary');
        $estado.classList.add('alert-danger');
    }else{
        $estado.classList.remove('alert-danger');
        $estado.classList.add('alert-primary');
    }
}

function detenerIntervalo() {
    clearInterval(intervaloTiempo);
}