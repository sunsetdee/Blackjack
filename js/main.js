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
let pTotal, dTotal; 
let handStatus; // null, 'P', 'D', 'T', 'PBJ', 'DBJ'
let bankroll;     
let bet; 

/*----- cached element references -----*/
const dealEl = document.getElementById('deal');
const hitEl = document.getElementById('hit');
const standEl = document.getElementById('stand');
const doubleEl = document.getElementById('double');
const dTotalEl = document.querySelector('#dealer-score > span');
const pTotalEl = document.querySelector('#player-score > span');
const dlrHandEl = document.getElementById('dhand');
const plrHandEl = document.getElementById('phand');
const totalBetEl = document.getElementById('betamt');
const bankrollEl = document.getElementById('bankroll');
const messageEl = document.getElementById('msg');
const deckEl = document.getElementById('deck');
const betControlsEl = document.getElementById('bet-controls');
const gameControlsEl = document.getElementById('game-controls');
const audio = document.getElementById('dealaudio');
const winAudio = document.getElementById('winaudio');
const loseAudio = document.getElementById('loseaudio'); 
const pBlackjack = document.getElementById('playerblackjack');


/*----- event listeners -----*/
betControlsEl.addEventListener('click', handleUpdateBet);
document.getElementById('hit').addEventListener('click', handleHit);
document.getElementById('stand').addEventListener('click', handleStand);
document.getElementById('double').addEventListener('click', handleDoubleDown);
dealEl.addEventListener('click', handleDeal);

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
  renderMessage();
}

function renderCards() {
  let cardsHtmlP = '';
  playerHand.forEach(function(card) {
    cardsHtmlP += `<div class="card ${card.face}"></div>`;
  });
  plrHandEl.innerHTML = cardsHtmlP;
  pTotalEl.textContent = pTotal; 
  let cardsHtmlD = '';
  dealerHand.forEach(function(card, idx) {
    cardsHtmlD += `<div class="card ${idx === 0 && !handStatus ? 'back' : card.face}"></div>`;
  });
  dlrHandEl.innerHTML = cardsHtmlD; 
  dTotalEl.textContent = handStatus ? dTotal : '?'; 
}

function renderMoney() {
  totalBetEl.textContent = bet; 
  bankrollEl.textContent = bankroll; 
}

function renderControls() {
  let showBetControls = !playerHand.length || handStatus;
  gameControlsEl.style.display = !showBetControls ? 'flex' : 'none'; 
  betControlsEl.style.display = showBetControls ? 'flex' : 'none'; 
  doubleEl.disabled = playerHand.length !== 2 || bankroll < bet;
  dealEl.disabled = bet < 1; 
}

function renderMessage() {
  if (handStatus === 'T') {
    messageEl.textContent = 'You Push';
  } else if (handStatus === 'P') {
    messageEl.textContent = 'You Win!';
  } else if (handStatus === 'D') {
    messageEl.textContent = 'You Lose'; 
  } else if (handStatus === 'PBJ') {
    messageEl.textContent = 'You Have Blackjack!!';
  } else if (handStatus === 'DBJ') {
    messageEl.textContent = "Dealer Has Blackjack";
  } else {
    messageEl.textContent = 'Good Luck'; 
  }
  
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
  pTotal = computeHand(playerHand);
  dTotal = computeHand(dealerHand);
  // Check if blackjack exists 
  if (pTotal === 21 && dTotal === 21) {
    handStatus = "T";  // hand is a tie
    bankroll += bet; 
    bet = 0; 
  } else if (pTotal === 21) {
    handStatus = "PBJ";  // Player wins with blackjack
    bankroll += bet + bet * 1.5; 
    bet = 0; 
    pBlackjack.play(); 
  } else if (dTotal === 21) {
    handStatus = "DBJ";  // Dealer wins with blackjack
    bet = 0; 
    loseAudio.play();
  } 
  audio.play();
  render();
}

function handleUpdateBet(evt) {
  let amt = evt.target.textContent;
  if (amt === 'Deal') return; 
  amt = parseInt(amt.replace('$', '')); 
  if (amt > bankroll) return; 
  if (evt.shiftKey && bet >= amt) {
    amt *= -1;
  } else if (evt.shiftKey && bet < amt) {
    return; 
  }
  bet += amt; 
  bankroll -= amt; 
  render();
}

function handleHit(evt) {
  playerHand.push(deck.pop());
  pTotal = computeHand(playerHand);
  if (pTotal > 21) {
    handStatus = 'D'; 
    bet = 0;
    loseAudio.play();
  }
  render(); 
}
 

function handleDoubleDown() {
  bankroll -= bet; 
  bet *= 2;
  handleHit(); 
  if (pTotal <= 21) handleStand(); 
}

function handleStand() {
  dealerTurn(); 
  if (dTotal > 21 || pTotal > dTotal) {
    handStatus = 'P';
    bankroll += bet * 2;
    bet = 0; 
    winAudio.play(); 
  } else if (pTotal === dTotal) {
    handStatus = 'T';
    bankroll += bet;
    bet = 0;
  } else {
    handStatus = 'D';
    bet = 0;
    loseAudio.play();
  } 
  render(); 
}

function dealerTurn() {
  while (dTotal < 17) {
    dealerHand.push(deck.pop());
    dTotal = computeHand(dealerHand);
  }
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

