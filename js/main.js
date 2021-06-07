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
let handStatus; // null, 'P', 'D', 'T', 'PBJ', 'DBJ'
let bankroll; 
let bet; 

/*----- cached element references -----*/
const betEl = document.getElementById('bet');
const hitEl = document.getElementById('hit');
const standEl = document.getElementById('stand');
const doubleEl = document.getElementById('double');
const dealerScore = document.getElementById('dealer-score');
const playerScore = document.getElementById('player-score ');
const dlrHand = document.getElementById('dlr');
const plrHand = document.getElementById('plr');
const totalBetEl = document.getElementById('betamt');
const bankrollEl = document.getElementById('bankroll');
const messageEl = document.getElementById('msg');
const deckEl = document.getElementById('deck');

/*----- event listeners -----*/
document.getElementById('bet').addEventListener('click', handleUpdateBet);
document.getElementById('hit').addEventListener('click', handleHit);
document.getElementById('stand').addEventListener('click', handleHit);
document.getElementById('double').addEventListener('click', handleDoubleDown);
document.getElementById('deal').addEventListener('click', handleDeal);

/*----- functions -----*/
init(); 

function init() {
  playerHand = [];
  dealerHand = []; 
  handStatus = null;
  bankroll = 500;
  bet = 0;
  render(); 
}

function render() {
  renderCards();
  renderMoney(); 
  renderControls();
}

function renderCards(deck, container) {
  container.innerHTML = '';
  let cardHtml = '';
  buildMasterDeck.forEach(function(card) {
    cardsHtml += `<div id='deck ${card.face}"></div>`;

  });
  
}

function renderMoney() {
  totalBetEl.textContent = bet; 
  bankrollEl.textContent = bankroll; 
}

function renderControls() {

}
  

// return best value of hand 
function computeHand(hand) { 
  let sum = 0;
  let aceCount = 0; 
  hand.forEach(function(card) {
    if (card.face.includes('A')) aceCount++; 
    sum += card.value; 
  });
  while (sum > 21 && aceCount) {
    sum -= 10; 
    aceCount--; 
  }
  return sum; 
}

function handleDeal() {
  // TODO: initialize playerHand and dealerHand with two card objects from the shuffled deck
  handStatus = null;  // or whatever state variable is being used to track the status of the hand
  deck = getNewShuffledDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  let pTotal = computeHand(playerHand);
  let dTotal = computeHand(dealerHand);
  // Check if blackjack exists 
  if (pTotal === 21 && dTotal === 21) {
    handStatus = "T";  // hand is a tie
  } else if (pTotal === 21) {
    handStatus = "PBJ";  // Player wins with blackjack
  } else if (dTotal === 21) {
    handStatus = "DBJ";  // Dealer wins with blackjack
  } 
  // TODO: If handStats is not null, update bankroll (use a dedicated function for this)
  render();
}

function handleUpdateBet(evt) {
  totalBet = 0; 
  if (betEl.click) {
    ChipsCount - 5 && totalBet + 5;
  }
  if (gameStatus = null) {
    betEl.style.visibility = hidden; 
  }
}

function handleHit(evt) {

}
 

function handleDoubleDown(evt) {
  
  
}

function handleStand(evt) {

}



function dealerTurn() {
  
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

