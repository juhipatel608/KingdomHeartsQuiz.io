
var triviaQuestions = [{
    question: "What is the name of Sora's home?",
    answerList: [ "Destiny Islands", "The Islands of Destiny", "Kingdom Islands","Disney Islands"],
    answer: 0
  },
  {
    question: " Which of these Disney villains do you NOT fight in the game??",
    answerList: [ "Clayton", "Malificent", "Ursula", "Gatson"],
    answer: 3
  },
  {
    question: "What color is the paopu fruit?",
    answerList: ["red", "green", "gold/yellow", "purple"],
    answer: 2
  },
  {
    question: "What kid celeb is the voice behind Sora?",
    answerList: ["Daveigh Chase", "Lil Romeo", "Haley Joel Osment","Jake Lloyd "],
    answer: 2
  },
  {
    question: "Kingdom Hearts' theme song, Simple and Clean, is sung by what famous Japanese pop star?",
    answerList: ["Yoko Ono","Hitoshi Ohori", "Utada Hikaru", "Chiharu Minekawa"],
    answer: 2
  },
  {
    question: "What is the first summon you get in KH1?",
    answerList: [" Genie", "Simba", "TinkerBell", "Mushu"],
    answer: 1,
    
  },
  {
    question: "What number in the Organization is Roxas?",
    answerList: [" 50", "1", "13", "10"],
    answer: 2
  },
  {
    question: "What did Riku say before Sora, Donald, and Goofy closed the door in the end of KH1?",
    answerList: ["Take care of her", "Press F to pay respects" ,"The cake is a lie", "Im sorry"],
    answer: 0
  },
  {
    question: "Which of the following worlds appears in Kingdom Hearts 1, but not Kingdom Hearts 2?",
    answerList: [" Agrabah", "Pride Lands", "Atlantica",  "Deep Jungle"],
    answer: 3
  },
  {
    question: "The name's _____. Got it memorized? Whose name should you have memorized?",
    answerList: [" Donald", "Ansem", "Riku", "Axel"],
    answer: 3
  }
];



var jpgArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; 
var rightAnswer; 
var wrongAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var picked;
var messages = {
	correct: "That's right!",
	incorrect: "That's wrong!",
	endTime: "Outta time!",
	finished: "Here are your results!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#rightAnswers').empty();
	$('#wrongAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	rightAnswer = 0;
	wrongAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
	answered = true;
	
	//show current question
	$('#currentQuestion').html('Question '+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//takes to answer page
	$('.thisChoice').on('click',function(){
		picked = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//counts down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears game page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#jpg').html('<img src = "images/'+ jpgArray[currentQuestion] +'.jpg" width = "400px">');
	
	//rounds up results
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	

	if((picked == rightAnswerIndex) && (answered == true)){
		rightAnswer++;
		$('#message').html(messages.correct);
	} else if((picked != rightAnswerIndex) && (answered == true)){
		wrongAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
}

function scoreboard(){
	$('#finalMessage').html(messages.finished);
	$('#rightAnswers').html("Correct Answers: " + rightAnswer);
	$('#wrongAnswers').html("Incorrect Answers: " + wrongAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');

	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#jpg').empty();
}
