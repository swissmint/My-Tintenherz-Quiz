
/*
	{
		question: "ist Meggies Mutter tot?",
		answers: [
			{	text: "ja", correct:false},
			{	text: "nein", correct:false},
			{	text: "nein ich bin gestorben", correct:false},
			{	text: "gute frage", correct:false},
		]
	},
*/
const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;
var clicksound;



function mincraftbutton() {
    clicksound = new Audio("mincraftbuttonsound.mp4");
    clicksound.play();
	// nextbutton.addEventListener("click", mincraftbutton);
	// answerbutton.addEventListener("click", mincraftbutton);
}

function startquiz(){
	currentquestionindex = 0;
	score = 0; 
	nextbutton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
    resetstate();
	let currentquestion = questions[currentquestionindex];
	let questionno = currentquestionindex + 1;
	questionElement.innerHTML = questionno + ". " + currentquestion.question;

	currentquestion.answers.forEach(answer => {
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function resetstate(){
    nextbutton.style.display = "none";
    while(answerbutton.firstChild) {
            answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectanswer(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if (iscorrect) {
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showscore(){
    resetstate();
    
	if (score > 10) {
		questionElement.innerHTML = `Du hast ${score} richtige von ${questions.length}!`;
		nextbutton.innerHTML = "Play Again?";
		nextbutton.style.display = "block";
	}else {
		questionElement.innerHTML = `Du hast ${score} richtige von ${questions.length}!`;
		nextbutton.innerHTML = "Play Again?";
		nextbutton.style.display = "block";
	}
	
}


function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex < questions.length) {
        showQuestion();
    }else {
        showscore();
    }
}

nextbutton.addEventListener("click", () => {
    if(currentquestionindex < questions.length){
        handlenextbutton();
    }else {
        startquiz();
    }
});


startquiz();