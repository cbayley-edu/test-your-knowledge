document.addEventListener("DOMContentLoaded", function(event) { 

    //code for index.html
    var bodyEl = document.querySelector("#mainBody");
    var cocktailsBtnEl = document.querySelector("#cocktailsBtn");
    var cocktailShakerAudioEl = document.querySelector("#cocktailShakerAudio");
    var austinPowersBtnEl = document.querySelector("#austinPowersBtn");
    var yeahBabyAudioEl = document.querySelector("#yeahBabyAudio");
    var startQuizDivEl = document.querySelector("#startQuizDiv");
    var aTagEl = document.createElement("a");
    var brEl = document.createElement("br");
    var hrEl = document.createElement("hr");

    if (cocktailsBtnEl) {
        cocktailsBtnEl.addEventListener("click", function(){
            //cocktailShakerAudioEl.play();
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
            //yeahBabyAudioEl.play();
            bodyEl.setAttribute("class", "austinPowersBody");
            aTagEl.setAttribute("href", "austin-powers.html");
            aTagEl.setAttribute("class", "btn btn-dark centerButton");
            aTagEl.setAttribute("role", "button");
            aTagEl.innerText = "Groovy baby!\nLet's get shaggy!";
            startQuizDivEl.appendChild(aTagEl);
            
        });
    }

    //common code for cocktails.html and austin-powers.html
    var timeLeftEl = document.querySelector(".timeLeftDiv");
    var deduct = 0;
    function setTime(deduct) {
        var timeLeft = 71;

        var timerInterval = setInterval(function() {
            timeLeft--;
            timeLeft = timeLeft - deduct;
            timeLeftEl.textContent = timeLeft;

            if (timeLeft === 0) {
                timeLeftEl.textContent = "Time's up!";
                clearInterval(timerInterval);
            }

        }, 1000);
    };

    if (timeLeftEl) {
    setTime(deduct);
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
                button.setAttribute("class", "btn btn-info");
                button.setAttribute("id", i);
                button.innerText = cocktailQuestions.questions[q].option[i];
                cocktailAnswersDivEl.replaceChild(button, button);

                var buttonEls = document.querySelectorAll("button");
                buttonEls[button.id].addEventListener("click", function() {

                    if (cocktailQuestions.questions[q].correct[this.id]) {
                        //won't play on first question???
                        //cocktailCorrectAudioEl.play();
                        cocktailAnswersResultsDivEl.textContent = "Correct!";
                        cocktailCorrectAudioEl.play();
                    } else {
                        cocktailIncorrectAudioEl.play();
                        cocktailAnswersResultsDivEl.innerText = "Incorrect!";
                    }

                    q++;

                    setTimeout(function(){

                        cocktailAnswersResultsDivEl.innerText = "";
                    },
                    1000);

                    displayCocktailQuestions(q);
                });
            }
        } //end function
        if (q === 0) {
            displayCocktailQuestions(q);
        }
    }


    //cocktailQuestionsDivEl.setAttribute("class", "btn btn-dark centerButton");
    //cocktailQuestionsDivEl.setAttribute("role", "button");
    //cocktailQuestionsDivEl.innerText = "Groovy baby!\nLet's get shaggy!";



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




    //code for high-scores.html


});