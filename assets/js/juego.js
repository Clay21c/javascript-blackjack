let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
  puntosComputadora = 0;
// Referencias Html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHtml = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputador = document.querySelector('#computadora-cartas');

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
    for (let tipo of tipos) {
      for (let especial of especiales) {
        deck.push(especial + tipo);
      }
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

crearDeck();
// funcion pedir carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }
  const carta = deck.pop();

  return carta;
};

pedirCarta();
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
};

// Turno de la computadora

const turnoComputadora = (puntosminimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHtml[1].innerText = puntosComputadora;

    // images
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasComputador.append(imgCarta);
    imgCarta.classList.add('carta');
    if (puntosminimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosminimos && puntosminimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosminimos) {
      alert('Nadie Gana');
    } else if (puntosminimos > 21) {
      alert('computadora Ganas');
    } else if (puntosComputadora > 21) {
      alert('Jugador Gana');
    } else {
      alert('Computadora Gana');
    }
  }, 10);
};

const valor = valorCarta(pedirCarta());

btnPedir.addEventListener('click', () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHtml[0].innerText = puntosJugador;

  // images
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugador.append(imgCarta);
  imgCarta.classList.add('carta');

  if (puntosJugador > 21) {
    console.warn('lo siento, perdiste');
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn('Ganaste');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
  }
});
btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
  deck = [];
  deck = crearDeck();

  puntosJugador = 0;
  puntosComputadora = 0;
  puntosHtml[0].innerText = 0;
  puntosHtml[1].innerText = 0;
  divCartasComputador.innerHTML = '';
  divCartasJugador.innerHTML = '';

  btnDetener.disabled = false;
  btnPedir.disabled = false;
});
