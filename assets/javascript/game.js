        let guesses = 10;
        let wins = 0;
        let losses = 0;
        var i; //index counter

        var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var hangman_words = [ 
            "SITH", "JEDI", "CHEWBACCA", "FORCE", "DROID", "RESISTANCE", "EWOK",
            "NERFHERDER", "DEATHSTAR", "STORMTROOPER", 'PADAWAN', "YODA", "REPUBLIC",
            "SKYWALKER", "WOOKIE", "GALAXY", "DESTROYER", "LIGHTSABER", "JABBA"];
        var congratulations = ["Power! Unlimited power!", "The Force will be with you. Always!", "There’s always a bigger fish!", "You are the Chosen One!", 
                                "So this is how liberty dies. With thunderous applause!", "I’m one with the Force. The Force is with me!"];
        var wrong = ["Help me Obi-Wan Kenobi. You’re my only hope!", "I find your lack of faith disturbing!", "I sense much fear in you!",
                    "Now, young Skywalker, you will die!", "Why, you stuck-up, half-witted, scruffy-looking nerf herder!", "Do. Or do not. There is no try!"];
        var random_status;
        var random_word = hangman_words[Math.floor(Math.random() * hangman_words.length)];
        var char_counter = random_word.length;
        var temp_word_storage = new Array(char_counter);
        var flag = false;
        var got_right = 0;
        var letters_picked_index = 0;
        var letters_picked = new Array(char_counter + 10);
        var bg_music;
        var sound_effect;


        for (let i = 0; i < char_counter; i++) {
            temp_word_storage[i] = '_';
            
        }
   
        var player_name = prompt("Hello! Please enter player's name: ");
        document.querySelector("#statement").innerHTML = "Welcome " + player_name + "!";
        document.getElementById("instructions").innerHTML = "The rules are plain and simple. Guess the word by typing in a letter. You can miss a total of ten times to spell the word. Otherwise, you lose! Hint: These are Star Wars-themed words. Press play to start. May the force be with you!";
        
        document.getElementById("myBtn").addEventListener("click", function() {
            document.getElementById("myBtn").style.visibility = "hidden";
            document.getElementById("instructions").innerHTML = "";
            document.getElementById("iframeAudio").remove();
            document.getElementById("playAudio").remove(); 
            bg_music = document.getElementById("myAudio");
            bg_music.loop = true;
            bg_music.play();
            start_game();
        });

        //functions

        function start_game() {
            display_screen();

            document.onkeyup = function(event) {            
            var userInput = event.key.toUpperCase();
            document.querySelector("#status").innerHTML = '';   //clear previous status messages

            if (userInput != "ESCAPE") {

                if (alphabets.indexOf(userInput) >= 0) { //checks if user typed in alpha characters
                        //checks if letter is in the random picked word
                        for (let i = 0; i < char_counter; i++) {
                            if (userInput === random_word.charAt(i)) { //if it is
                                sound_effect = new sound("./assets/audio/Right.mp3");
                                sound_effect.play();
                                temp_word_storage[i] = userInput;      //store letter in temp word holder
                                flag = true;                           //flag if guessed right
                                got_right++;                          //increment count of letters matched in word
                                }        
                            }
                        //store letters already picked in a holder
                        if (letters_picked.length != 0) {                           //if there are letters in holder
                            if (letters_picked.indexOf(userInput) < 0) {            //check if it is already stored
                                letters_picked[letters_picked_index] = userInput; //if not, then store it
                                letters_picked_index++;                           //increment index for next letter
                            } else {                                                //if letter already guessed, print message
                                document.querySelector("#status").innerHTML = "That letter has already been guessed!";
                                flag = true;                                        //flag true so it doesnt count against guesses left
                            }
                                            
                        } else {                                                    //if letter guessed holder is empty
                            letters_picked[letters_picked_index] = userInput;     //store first guessed letter
                            letters_picked_index++;                               //then increment index
                            }
                        

                        if (!flag)                                                  //if not guessed right, lose turn
                            guesses--;

                        if (got_right === char_counter) {                          //if letters guessed match number of characters in words
                            won();                                                   //call won function                                       //display message, start new game
                            start_newgame();                                                   
                        } 

                        if (guesses === 0) {                                   //if used up all guesses
                            lost();                                              //call lost function                                       //display message, start new game
                            start_newgame();
                        }                                         
                                                                            

                        flag = false; //reset flag 
                        soundflag = true;                     

                        display_screen();
                } else {                       //if user input is not alpha character 
                        sound_effect = new sound("./assets/audio/Invalid.mp3");
                        sound_effect.play();
                       document.querySelector("#status").innerHTML = "Invalid entry. Try again!";                                                   
                    }
            }                                                                        //print invalid entry message
            else 
                end_game();
            };
        }

        // removes display to stop game
        function end_game () {
            bg_music.loop = false;
            bg_music.play();
            sound_effect = new sound("./assets/audio/Exit.mp3");
            sound_effect.play();
            document.querySelector("#display").innerHTML = '';
            document.querySelector("#letters").innerHTML = '';
            document.querySelector("#status").innerHTML = "You have exited the game. Play again soon.";
        }
        
        // resets values
        function start_newgame() {
        guesses = 10;
        random_word = hangman_words[Math.floor(Math.random() * hangman_words.length)];
        char_counter = random_word.length;
        temp_word_storage = new Array(char_counter);
        got_right = 0;
        letters_picked = [];
        letters_picked_index = 0;

        for (let i = 0; i < char_counter; i++) {
            temp_word_storage[i] = '_';
            }
        }

        //display screen
        function display_screen (){
            document.querySelector("#players-name").innerHTML = "Player:  " + player_name;
            document.querySelector("#guesses-left").innerHTML = "Lives: " + guesses;
            document.querySelector("#wins").innerHTML = "Wins: " + wins;
            document.querySelector("#losses").innerHTML = "Losses: " + losses;
            document.querySelector("#statement").innerHTML = "Press Escape to exit the game";
            var temp_word = temp_word_storage.join(" ");
            document.querySelector("#display").innerHTML = temp_word;
            document.querySelector("#letters").innerHTML = "Letters already guessed: " + letters_picked.join(" ");
        }

        function won(){
            sound_effect = new sound("./assets/audio/Winner.mp3");
            sound_effect.play();
            random_status = congratulations[Math.floor(Math.random() * congratulations.length)];
            document.querySelector("#status").innerHTML = '"' + random_status + '"'; 
            wins++;                                                                 //increment win, print message
        }

        function lost() {
            sound_effect = new sound("./assets/audio/Loser.mp3");
            sound_effect.play();
            random_status = wrong[Math.floor(Math.random() * wrong.length)];
            document.querySelector("#status").innerHTML = '"' + random_status + '"';
            losses++;                                               //increment losses tracker, print message
        }

        //help with sound
        function sound(src) {
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function(){
            this.sound.play();
            }
            this.stop = function(){
            this.sound.pause();
            }
        }