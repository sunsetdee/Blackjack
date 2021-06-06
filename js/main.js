/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const players = {
    dealer: null,
    player: null, 
};
// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let deck;
let playerHand, dealerHand; 
let gameStatus; // null, 'P', 'D', 'T', 'PBJ', 'DBJ'
let playerWins;
let dealerWins;
/*----- cached element references -----*/
const betEl = document.getElementById('bet');
const hitEl = document.getElementById('hit');
const standEl = document.getElementById('stand');
const doubleEl = document.getElementById('double');
const replayEl = document.getElementById('replay'); 
const dealerScore = document.getElementById('dealer-score');
const playerScore = document.getElementById('player-score ');
const dlrHand = document.getElementById('dlr');
const plrHand = document.getElementById('plr');
const masterDk = document.getElementById('master-deck');
const chipsCount = document.getElementById('chips');
const message = document.getElementById('msg');
/*----- event listeners -----*/
document.getElementById('bet').addEventListener('click', handleBet);
document.getElementById('hit').addEventListener('click', handleHit);
document.getElementById('stand').addEventListener('click', handleHit);
document.getElementById('double').addEventListener('click', handleDouble);
document.getElementById('replay').addEventListener('click', handleDeal);

/*----- functions -----*/
function handleDeal() {
  gameStatus = null;
  deck = getNewShuffledDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  playerScore = computeHand(playerHand);
  dealerScore = computeHand(dealerHand);

  

  //todos 
};
handleDeal();

function handelChips() {
  chipsCount = 100; 
  if (betEl.click) chipsCount - 5; 

  // if player click the bet button, minus 5 from chipsCount
}

// return best value of hand 
function computeHand(hand) { 
  let playerValue = 0;
  if (ranks === 'A' && hand <= 11) {
    playerValue = 11;
  } else if (rank === 'A') {
    playerValue = 1;
  } else if (rank === 'J' || rank === 'Q' || rank === 'K') {
    playerValue = 10;
  } else if (playerHand === 21) {
    gameStatus = PBJ;
  } else (gameStatus = null);

  let dealerValue = 0;
  if (rank === 'A' && hand <= 11) {
    dealerValue = 11;
  } else if (rank === 'A') {
    dealerValue = 1;
  } else if (rank === 'J' || rank === 'Q' || rank === 'K') {
    dealerValue = 10; 
  } else if (delaerHand === 21) {
    gameStatus = DBJ;
  } else (gameStatus = null); 
}

function rendenButton() {
  while (hitEl.click) {
    playerHand = [deck.pop()];
  } if (playerValue > 21) {
    gameStatus = D 
  } else if 
}


function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

// don't use the code from 31 to 43
function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

