#Black Jack

1. /* ------constants------*/
    1. Define a constant with two objects(dealer, player)
    2. Define the suits of the card('spade', 'heart', 'club' 'diamond')
    3. Define the 12 cards in the deck.
    4. Define the master deck of card used to create shuffled deck

2. /* ------app's state (variables)
    1. Use a variable to track what cards the dealer and player have.
    2. Use a variable to track if the dealer and player wants to hit or stand. 
    3. Use a winner variable to represent three possibilities- dealer win, player win, or tie.
    4. Use a variable to define how much chips you have left. 

3. Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
    1. Store the deck of card that will be used.
    2. Store the buttons(bet, hit, double, stand, and play again).

4. Upon loading the app should:
    1. Initialize the state variable.
    2. Initialize to a newly shuffled deck of card.
    3. Initialize winnier to null that the game is still ongoing. 
    4. Initialize for player to place a bet.
    5. Initialize the deck to pass out the cards to the dealer and the player. 
    6. Render a message for the player to hit, double, or stand.
    7. Render a message for the dealer to hit or stand.
    8. Render a message for game result if player win, lose or tie.

5. Handling the click event
    1. Handle the player clicking on the chips and how much chips are remaining. 
    2. Handle the player clicking on the hit button, if clicked on hit button, generate a random card from the deck and calculate if player is busted or not. If not, give the player the option of hit or stand and keep on repeating this step until the player is busted or hit the stand button. 
    3. Handle the player clicking on the double button, if the double button is clicked on, subtract the amount of the chips betted from the chips remaining amount. 
    4. Handle the player clicking on the stand button.
    5. If the player stands, it's the dealer's turn to hit or stand. 

6. Handle player click on the play again button
    1. return to step 4. 
