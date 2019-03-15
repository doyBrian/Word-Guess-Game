# Word-Guess-Game
Word Guess Game using Javascript

### Overview

In this project, l have created a game that will run in the browser, and feature dynamically updated HTML and CSS powered by JavaScript code.

### Deployed Site Link
https://doybrian.github.io/Word-Guess-Game/

## How It Works

1. Star Wars theme was chosen for this game! Words, intro, background music and sound effects are all related to the franchise. This is due to the popularity of the franchise though I can't say that I am a fanatic.

2. Before the page loads, user/player will be asked for Name.

3. After name is entered, intro music will autoplay (using iframe to bypass Chrome restrictions). Page will have a personal greeting using player entered name. Instructions will be displayed and a Play button to start the game. It will be indicated that the player can only miss 10 times in their guess.

4. Once play button is pressed, the intro music is stopped and a new background music will loop play during the game. A word will be randomly picked by the computer from a pre-declared set of words (array of strings) saved into a seaparate variable. The code will run such that it will create an array that will replicate the size of the randomly picked word and fill that array with '_'. This then will be displayed on the main screen, along with the player's name on the top right section, wins and losses tracker and number of lives left at start the game.

* If the word is `madonna`, it will be displayed like this when the game starts: `_ _ _ _ _ _ _`.

5. An exit option is given by pressing ESC key. The game will end playing a sound effect with a message and clear the display. Otherwise, the game will keep listening for a key press event from the user. 

6. When a key is pressed (value of which is converted to uppercase just for aesthetic purposes), it will check first if the entry is an alphabet character by checking it against a pre-declared variable containing all the (uppercase) letters. If it is not an alpha character, it will return an Invalid message and a sound effect. Otherwise, the game will continue checking until a letter is pressed.

7. For every letter pressed, it will be checked aginst the temp word holder through a for loop. If a match is found, the counter will be used as the same index to that letter into the temporary array filled with "_" (also with the loop, it will ensure that a repeated letter in the word will be covered in the check), filling the array with the correct letters guessed (a sound also goes into effect for each correct guess).

* As the user guesses the correct letters, it will display as such : `m a d o _  _ a`.

8. Letters Already Guessed will be displayed as reference. There is a check in place to make sure that it won't count against player if letter typed was already used or guessed previously. A message will pop up to indicate this.

9. For every letter guessed incorrectly, Lives will be decremented: (# of guesses remaining for the user). If it gets to zero, this will result to a loss (a sound effect will play) and increment Losses tracker.

10. If the user guesses the word right, a different sound effect will play and wins score gets incremented.

11. After the user wins/loses the game will automatically choose another word and make the user play it until game is voluntarily exited by pressing ESC.

##### Word Guess Game Extra features for Homework Bonus

1. Play a sound or song when the user guesses their word correctly.
* Multiple sound effects have been incorporated in the game: intro song, background music during game, sound effects for when user exits the game, guesses letters correctly, guesses the word correctly and incorrectly, types an invalid (non-alphabet key) and when the letter has been previously guessed already.
2. Write some stylish CSS rules to make a design that fits your game's theme.
    * Researched some samples of Bootstrap layouts that appeal to me and found this source https://mdbootstrap.com/docs/jquery/css/background-image/
    It uses full background image that uses complex CSS styling by adjusting the rgb gradient and making the layer look transparent and blends well with the background image. I was able to use a little bit of the code and applied it to my layout.
