document.addEventListener("DOMContentLoaded", function(event) { 

    //code for index.html
    var bodyEl = document.querySelector("#mainBody");
    var cocktailsBtnEl = document.querySelector("#cocktailsBtn");
    var cocktailShakerAudioEl = document.querySelector("#cocktailShakerAudio");
    var austinPowersBtnEl = document.querySelector("#austinPowersBtn");
    var yeahBabyAudioEl = document.querySelector("#yeahBabyAudio");
    var startQuizDivEl = document.querySelector("#startQuizDiv");
    var aTagEl = document.createElement("a");

    if (cocktailsBtnEl) {
        cocktailsBtnEl.addEventListener("click", function(){
            cocktailShakerAudioEl.play();
            bodyEl.setAttribute("class", "cocktailsBody");
            aTagEl.setAttribute("href", "cocktails.html");
            aTagEl.setAttribute("class", "btn btn-dark centerButton");
            aTagEl.setAttribute("role", "button");
            aTagEl.innerText = "Let's go!\nI'm thirty for questions!";
            startQuizDivEl.appendChild(aTagEl);

        });
    }

    if (austinPowersBtnEl) {
        austinPowersBtnEl.addEventListener("click", function(){
            yeahBabyAudioEl.play();
            bodyEl.setAttribute("class", "austinPowersBody");
            aTagEl.setAttribute("href", "austin-powers.html");
            aTagEl.setAttribute("class", "btn btn-dark centerButton");
            aTagEl.setAttribute("role", "button");
            aTagEl.innerText = "Groovy baby!\nLet's get shaggy!";
            startQuizDivEl.appendChild(aTagEl);
            
        });
    }

    //game timers
    var timeLeftEl = document.querySelector(".timeLeftDiv");
    var timeLeft = 70;

    function cocktailGameTimer() {
        var timerInterval = setInterval(function() {
            timeLeftEl.textContent = timeLeft;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerInterval);
                timeLeftEl.textContent = "Time's up!";
                timeLeft = 0;
                window.location.replace(`./high-scores.html?score=${timeLeft}&quiz=Cocktail`);
            }
        }, 1000);
    }

    function austinPowersGameTimer() {
        var timerInterval = setInterval(function() {
            timeLeftEl.textContent = timeLeft;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerInterval);
                timeLeftEl.textContent = "Time's up!";
                timeLeft = 0;
                window.location.replace(`./high-scores.html?score=${timeLeft}&quiz=AustinPowers`);
            }
        }, 1000);
    }
 
    //code for cocktails.html
    var cocktailQuestions = {
        "questions": [
            {
                "questionId": 1,
                "question": "Vodka, Kahlua, Half and Half:",
                "option": ["Black Russian", "Kahlua and Cream", "White Russian", "White Australian"],
                "correct": [false, false, true, false]
            },
            {
                "questionId": 2,
                "question": "Vodka, Sweet or Dry Vermouth, Olive Juice / Garnished with Olives:",
                "option": ["Gin Martini", "Manhattan", "Cosmopolitan", "Vodka Martini"],
                "correct": [false, false, false, true]
            },
            {
                "questionId": 3,
                "question": "Vodka, Gin, Tequila, Rum, Triple Sec, Sour Mix, Cola / Garnished with Lemon Wedge:",
                "option": ["Kitchen Sink", "Southern Sweetness", "Long Island Iced Tea", "Empty the Well"],
                "correct": [false, false, true, false]
            },
            {
                "questionId": 4,
                "question": "Gin, Vodka, Kina Lillet, Shaken (not Stirred) / Garnish with Olive or Lemon Twist:",
                "option": ["The Vesper", "Lemon Drop", "The Cypher", "Dry Martini"],
                "correct": [true, false, false, false]
            },
            {
                "questionId": 5,
                "question": "Muddled Mint Leaves, Simple Syrup, and Lime Juice, Rum, Club Soda / Garnish with Lime and Mint:",
                "option": ["Mint Julip", "Mojito", "Muddled Mintiness", "Doublemint"],
                "correct": [false, true, false, false]
            },
            {
                "questionId": 6,
                "question": "Tequila, Triple Sec, Sour Mix, Lime Juice, Simple Syrup / Salted Rim and Garnish with Lime Wedge:",
                "option": ["Green Death", "Sour Lemon", "Hangover", "Margarita"],
                "correct": [false, false, false, true]
            },
            {
                "questionId": 7,
                "question": "Gin, Simple Syrup, Club Soda, Lemon Juice / Garnish with Lemon and Cherry:",
                "option": ["Sparkling Lemon Water", "Tom Collins", "Rob Roy", "Gin Fizzled"],
                "correct": [false, true, false, false]
            }
        ]
    };

    var cocktailQuestionsDivEl = document.querySelector(".cocktailQuestionsDiv");
    var cocktailAnswersDivEl = document.querySelector(".cocktailAnswersDiv");
    var cocktailAnswersResultsDivEl = document.querySelector(".cocktailAnswersResultsDiv");
    var cocktailCorrectAudioEl = document.querySelector("#cocktailCorrectAudio");
    var cocktailIncorrectAudioEl = document.querySelector("#cocktailIncorrectAudio");
    var q = 0;
    if (cocktailQuestionsDivEl) {

        function displayCocktailQuestions(q) {

            cocktailQuestionsDivEl.innerText = cocktailQuestions.questions[q].question;
            cocktailQuestionsDivEl.append(document.createElement("br"));

            for (var i = 0; i < 4; i++) {
                var button = document.getElementById(i);
                
                button.innerText = cocktailQuestions.questions[q].option[i];
                cocktailAnswersDivEl.replaceChild(button, button);
                
                var buttonEls = document.querySelectorAll("button");
                buttonEls[button.id].addEventListener("click", checkAnswersClickEvent);

                //buttonEls[button.id].removeEventListener("click", checkAnswersClickEvent);

            } //end loop -- for (var i = 0; i < 4; i++) 

        } //end -- function displayCocktailQuestions(q)
        
        if (q === 0) {
            cocktailGameTimer();
            displayCocktailQuestions(q);
         } 
    } // end -- if (cocktailQuestionsDivEl)

    function checkAnswersClickEvent() {

        if (cocktailQuestions.questions[q].correct[this.id]) {
            //won't play on first question???
            cocktailCorrectAudioEl.play();
            cocktailAnswersResultsDivEl.textContent = "Correct!";
        } else {
            cocktailIncorrectAudioEl.play();
            cocktailAnswersResultsDivEl.textContent = "Incorrect!";
            timeLeft = timeLeft - 4;
            timeLeftEl.textContent = timeLeft;
        }

        q++;

        setTimeout(function(){
            cocktailAnswersResultsDivEl.innerText = "";
        },
        1000);

        if (q < 7 && q != 0) {
            displayCocktailQuestions(q);
        } else if (q === 7) {
            var finalScore = timeLeftEl.textContent;
            window.location.replace(`./high-scores.html?score=${finalScore}&quiz=Cocktail`);
        }
    }

    //code for austin-powers.html
    var austinPowersQuestions = {
        "questions": [
            {
                "questionId": 1,
                "question": "Who portrays Austin Powers, International Man of Mystery?",
                "option": ["Robert Wagner", "Mike Myers", "Will Farrell", "Seth Green"],
                "correct": [false, true, false, false]
            },
            {
                "questionId": 2,
                "question": "What is the name of the female character who is German and yells a lot?",
                "option": ["Frau Farbissina", "Vanessa Kensington", "Frau Blecher", "Clara Smith"],
                "correct": [true, false, false, false]
            },
            {
                "questionId": 3,
                "question": "What is the name of Dr. Evil's cat?",
                "option": ["Felix", "Mr. Bigglesworth", "Ralph", "Scott"],
                "correct": [false, true, false, false]
            },
            {
                "questionId": 4,
                "question": "What is the music that plays when the Fembots kill the security guards?",
                "option": ["What the World Needs Now Is Love", "I'm A Believer", "Wild Thing", "These Boots Are Made For Walkin'"],
                "correct": [false, false, false, true]
            },
            {
                "questionId": 5,
                "question": "The film plays homage to other movies and TV series. The shots of dancing girls in bikinis and body paint between scenes are taken from what 1960s television show?",
                "option": ["Adam Adamant Lives!", "Dr. Who", "Rowan & Martin's Laugh-In", "The Sonny & Cher Comedy Hour"],
                "correct": [false, false, true, false]
            },
            {
                "questionId": 6,
                "question": "What is the name of Dr. Evil's son?",
                "option": ["Scott", "Evil-er Jr", "Charles", "Knievel"],
                "correct": [true, false, false, false]
            },
            {
                "questionId": 7,
                "question": "Vanessa likes Austin Powers, but is able to resist him mainly because of his what?",
                "option": ["Chest Hair", "Poochy Stomach", "Yellowed Teeth", "Accent"],
                "correct": [false, false, true, false]
            }
        ]
    };

    var austinPowersQuestionsDivEl = document.querySelector(".austinPowersQuestionsDiv");
    var austinPowersAnswersDivEl = document.querySelector(".austinPowersAnswersDiv");
    var austinPowersAnswersResultsDivEl = document.querySelector(".austinPowersAnswersResultsDiv");
    var austinPowersCorrectAudioEl = document.querySelector("#austinPowersCorrectAudio");
    var austinPowersIncorrectAudioEl = document.querySelector("#austinPowersIncorrectAudio");
    var u = 0;
    if (austinPowersQuestionsDivEl) {

        function displayAustinPowersQuestions(u) {

            austinPowersQuestionsDivEl.innerText = austinPowersQuestions.questions[u].question;
            austinPowersQuestionsDivEl.append(document.createElement("br"));

            for (var i = 0; i < 4; i++) {
                var button = document.getElementById(i);
                
                button.innerText = austinPowersQuestions.questions[u].option[i];
                austinPowersAnswersDivEl.replaceChild(button, button);
                
                var buttonEls = document.querySelectorAll("button");
                buttonEls[button.id].addEventListener("click", checkAustinPowersAnswersClickEvent);

                //buttonEls[button.id].removeEventListener("click", checkAnswersClickEvent);

            } //end loop -- for (var i = 0; i < 4; i++) 

        } //end -- function displayAustinPowersQuestions(u)
        
        if (u === 0) {
            austinPowersGameTimer();
            displayAustinPowersQuestions(u);
         } 
    } // end -- if (austinPowersQuestionsDivEl)

    function checkAustinPowersAnswersClickEvent() {

        if (austinPowersQuestions.questions[u].correct[this.id]) {
            //won't play on first question???
            austinPowersCorrectAudioEl.play();
            austinPowersAnswersResultsDivEl.textContent = "Correct!";
        } else {
            austinPowersIncorrectAudioEl.play();
            austinPowersAnswersResultsDivEl.textContent = "Incorrect!";
            timeLeft = timeLeft - 4;
            timeLeftEl.textContent = timeLeft;
        }

        u++;

        setTimeout(function(){
            austinPowersAnswersResultsDivEl.innerText = "";
        },
        1000);

        if (u < 7 && u != 0) {
            displayAustinPowersQuestions(u);
        } else if (u === 7) {
            var finalScore = timeLeftEl.textContent;
            window.location.replace(`./high-scores.html?score=${finalScore}&quiz=AustinPowers`);
        }
    }

    //code for high-scores.html
    var highScoresResultsDivEl = document.querySelector("#results");
    var highScoreDivEl = document.querySelector("#currentScore");
    var quizTypeDivEl = document.querySelector("#quizType");
    var clearScoreButtonEl = document.querySelector("#clearScoresBtn");

    if (highScoresResultsDivEl) {
        function showResults(score, quiz) {

            if (score >= 60) {
                highScoresResultsDivEl.innerHTML = `Great Job!! 😀 Your final score is ${score}.`;
            } else 
            if (score < 60 && score >= 50) {
                highScoresResultsDivEl.innerHTML = `Good Job! 🙂 Your final score is ${score}.`;
            } else 
            if (score < 50 && score >= 30) {
                highScoresResultsDivEl.innerHTML = `Your final score is ${score}. 😏 Don't quit your day job.`;
            } else
            if (score < 30 && score >= 20) {
                highScoresResultsDivEl.innerHTML = `Your final score is ${score}. 😬 You should try again.`;
            } else 
            if (score < 20) {
                highScoresResultsDivEl.innerHTML = `Your final score is ${score}. 🤦‍♀️ Just enter someone else's intials.`;
            }
            highScoreDivEl.value = score;
            quizTypeDivEl.value = quiz;
        }
        var urlParams = new URLSearchParams(window.location.search);
        scoreOutput = urlParams.get("score");
        quizType = urlParams.get("quiz");
        if (urlParams.has("score")){
            showResults(scoreOutput, quizType);
        } else {
            document.querySelector("#enterYourInitials").remove();
            document.querySelector("#enterInitials").remove();
            document.querySelector("#highScoresH3").remove();
            document.querySelector("#resultsHeading").textContent = "High Scores";
        }
    }

    var highScoreSubmitButtonDivEl = document.querySelector("#submitButton");
    var highScoreInitialsFormEl = document.querySelector("#initials");
    var highScoreFormEl = document.querySelector("#enterInitials");

    if (highScoreSubmitButtonDivEl) {
        
        highScoreSubmitButtonDivEl.addEventListener("click", submitScore);

        function submitScore(event) {
            event.preventDefault();
            var getInitials = [];
            var getScore = [];
            var getQuiz = [];

            getInitials = JSON.parse(localStorage.getItem("initials"));
            getScore = JSON.parse(localStorage.getItem("score"));
            getQuiz = JSON.parse(localStorage.getItem("quiz"));

            if (getScore && getQuiz) {
                getInitials = `${getInitials},${highScoreInitialsFormEl.value.replace(",","")}`;
                getScore = `${getScore},${highScoreDivEl.value}`;
                getQuiz = `${getQuiz},${quizType}`;
            } else {
                getInitials = `${highScoreInitialsFormEl.value}`;
                getScore = `${highScoreDivEl.value}`;
                getQuiz = `${quizType}`;
            }

            localStorage.setItem("initials", JSON.stringify(getInitials));
            localStorage.setItem("score", JSON.stringify(getScore));
            localStorage.setItem("quiz", JSON.stringify(getQuiz));

            highScoreFormEl.remove();
            document.querySelector("#enterYourInitials").textContent = "";
            showHighScores(true);
        }
    }

    var highScoreDisplayDivEl = document.querySelector("#highScoreDisplay");
    var highScoresTableDivEl = document.querySelector("#scoresTable");
    
    if (highScoreDisplayDivEl) {

        function showHighScores(onSubmit) {

            var getInitials = [];
            var getScore = [];
            var getQuiz = [];

            getInitials = localStorage.getItem("initials");
            getScore = localStorage.getItem("score");
            getQuiz = localStorage.getItem("quiz");

            if (getScore && getQuiz) {

                getInitials = JSON.parse(localStorage.getItem("initials")).split(",");
                getScore = JSON.parse(localStorage.getItem("score")).split(",");
                getQuiz = JSON.parse(localStorage.getItem("quiz")).split(",");
                
                if (onSubmit && getInitials.length > 1) {
                    for (var j = 0; j < getInitials.length - 1; j++) {
                        document.getElementById(j).remove();
                    }
                }

                for (var i = getInitials.length-1; i > -1; i--) {
                    var writeRow = document.createElement("tr");
                    var writeInitials = document.createElement("td");
                    var writeScore = document.createElement("td");
                    var writeQuiz = document.createElement("td");

                    writeRow.setAttribute("id", i);
                    highScoresTableDivEl.append(writeRow);
                    var highScoresResultsTableRowsDivEl = document.getElementById(i);

                    highScoresResultsTableRowsDivEl.append(writeInitials);
                    writeInitials.textContent = getInitials[i];

                    highScoresResultsTableRowsDivEl.append(writeScore);
                    writeScore.textContent = getScore[i];
                    
                    highScoresResultsTableRowsDivEl.append(writeQuiz);
                    writeQuiz.textContent = getQuiz[i];
                }
            } 
        }
        showHighScores(false);
    }

    if (clearScoreButtonEl) {
        clearScoreButtonEl.addEventListener("click", function(){
            var getInitials = localStorage.getItem("initials");
            getInitialsArray = JSON.parse(getInitials).split(",");
            var getScore = localStorage.getItem("score");
            var getQuiz = localStorage.getItem("quiz");

            if (getInitials) {
                localStorage.removeItem("initials");
            }
            if (getScore) {
                localStorage.removeItem("score");
            }
            if (getQuiz) {
                localStorage.removeItem("quiz");
            }
            for (var i = 0; i < getInitialsArray.length; i++) {
                console.log(i);
                document.getElementById(i).remove();
            }

        });
        
    }
});