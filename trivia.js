
var questions = [{
    question: "What is the name of Sora's home?",
    choices: [ "Destiny Islands", "The Islands of Destiny", "Kingdom Islands","Disney Islands"],
    correctAnswer: 0
  },
  {
    question: "Which of the princesses of heart will you find in the library at Hollow Bastion?",
    choices: [ "Belle", "Alice", "Jasmine", "Kairi"],
    correctAnswer: 0
  },
  {
    question: "What color is the paopu fruit?",
    choices: ["red", "green", "gold/yellow", "purple"],
    correctAnswer: 2
  },
  {
    question: "What kid celeb is the voice behind Sora?",
    choices: ["Daveigh Chase", "Lil Romeo", "Haley Joel Osment","Jake Lloyd "],
    correctAnswer: 2
  },
  {
    question: "Kingdom Hearts' theme song, Simple and Clean, is sung by what famous Japanese pop star?",
    images:["../summons.jpg"],
    choices: ["Yoko Ono","Hitoshi Ohori", "Utada Hikaru", "Chiharu Minekawa"],
    correctAnswer: 2
  },
  {
    question: "What is the first summon you get in KH1?",
    images:["../summons.jpg"],
    choices: [" Genie", "Simba", "TinkerBell", "Mushu"],
    correctAnswer: 1,
    
  },
  {
    question: "What number in the Organization is Roxas?",
    choices: [" 50", "1", "13", "10"],
    correctAnswer: 2
  },
  {
    question: "What did Riku say before Sora, Donald, and Goofy closed the door in the end of KH1?",
    choices: ["Take care of her", "Press F to pay respects" ,"The cake is a lie", "Im sorry"],
    correctAnswer: 0
  },
  {
    question: "Which of the following worlds appears in Kingdom Hearts 1, but not Kingdom Hearts 2?",
    choices: [" Agrabah", "Pride Lands", "Atlantica",  "Deep Jungle"],
    correctAnswer: 3
  },
  {
    question: "The name's _____. Got it memorized? Whose name should you have memorized?",
    choices: [" Donald", "Ansem", "Riku", "Axel"],
    correctAnswer: 3
  }
];

  var currentQuestion = 0;
  var correctAnswers = 0;
  var gameover = false;
  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;
  
  $(document).ready(function () {
  
      displayCurrentQuestion();
      $(this).find(".pickone").hide();
      $(this).find(".nextButton").on("click", function () {
          if (!gameover) {
  
              value = $("input[type='radio']:checked").val();
  
              if (value == undefined) {
                  $(document).find(".pickone").text("Please pick an answer");
                  $(document).find(".pickone").show();
              } else {
                  
                  $(document).find(".pickone").hide();
  
                  if (value == questions[currentQuestion].correctAnswer) {
                      correctAnswers++;
                  }
  
                  currentQuestion++; 
                  if (currentQuestion < questions.length) {
                      displayCurrentQuestion();
                  } else {
                      displayScore();
            
                      $(document).find(".nextButton").text("Play Again?");
                      gameover = true;
                  }
              }
          } else { 
              gameover = false;
              $(document).find(".nextButton").text("Next Question");
              resetQuiz();
              displayCurrentQuestion();
              hideScore();
          }
      });
  
  }); 

  function displayCurrentQuestion() {
  
      var question = questions[currentQuestion].question;
      var questionClass = $(document).find(".quizContainer > .question");
      var choiceList = $(document).find(".quizContainer > .choiceList");
      var numChoices = questions[currentQuestion].choices.length;
  

      $(questionClass).text(question);
  
      $(choiceList).find("li").remove();
  
      var choice;
      for (i = 0; i < numChoices; i++) {
          choice = questions[currentQuestion].choices[i];
          $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
      }
  }
  
  function resetQuiz() {
      currentQuestion = 0;
      correctAnswers = 0;
      hideScore();
  }
  function displayScore() {
      $(document).find(".quizContainer > .result").text("Your Score is : " + correctAnswers + " out of: " + questions.length);
      $(document).find(".quizContainer > .result").show();
  }  
  function hideScore() {
      $(document).find(".result").hide();
  }
