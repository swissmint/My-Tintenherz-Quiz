const questions = [
	{
		question: "In kapitel damals wer fällt aus dem buch als...?",
		answers: [
			{	text: "...Capricorn,Basta und Meggie", correct:false},
            {	text: "...Staubfinger,Basta und Capricorn", correct:true},
			{	text: "...Staubfinger,Mo und Capricorn", correct:false},
            {	text: "...Basta,Capicorn und Gwin", correct:true},
		]
	},
	{
		question: "Und wer wurde in das Buch herein genommen...?",
		answers: [
			{	text: "...Meggies Mutter,Gwin und Capricorn", correct:false},
			{	text: "...ich ,Elinor und Capricorn", correct:false},
			{	text: "...zwei schwarze Katzen und Meggies Mutter", correct:true},
			{	text: "...Meggies Mutter,und Mo", correct:false},
		]
	},
	    {
		question: "Ist Meggies Mutter tot...?",
		answers: [
			{	text: "ja", correct:false},
			{	text: "nein", correct:true},
			{	text: "nein ich bin gestorben", correct:false},
			{	text: "gute frage", correct:false},
		]
	},
    {
		question: "In kapitel Ein böser tausch was hat in der nacht passiert...?",
		answers: [
			{	text: "...Es würde das falsche buch genommen von Capricorn", correct:true},
			{	text: "...Es würde das echte Tintenherz wegenommen von Capricorn ", correct:false},
			{	text: "...Es würde Mo fest genommen", correct:false},
			{	text: "...Es würde mich fest genommen", correct:false},
		]
	},
    {
		question: "Um _____ starte ich das Feueralarm?",
		answers: [
			{	text: "3 uhr", correct:false},
			{	text: "9 uhr", correct:true},
			{	text: "7 uhr", correct:false},
			{	text: "34 uhr", correct:false},
		]
	},
    {
		question: 'In kapitel " Capricorn Dorf" welcher Geschichten magt Capricorn...?',
		answers: [
			{	text: "...Fröhliche Geschichten mit keine blut", correct:false},
			{	text: "...sehr Mänliche Geschichten mit schwere arbeit,schweis und blut", correct:false},
			{	text: "...ein Youtube kanal über Capricorn", correct:false},
			{	text: "...sehr schreckliche Geschichten über mord", correct:true},
		]
	},
    {
		question: "in Kapitel Der Verratene veräter was haben Capricorn hauptsachlich was angezündet..?",
		answers: [
			{	text: "...Die haben die Kirche angezündet", correct:false},
			{	text: "...Die haben falsche Buch angezündet", correct:false},
			{	text: "...Die haben Tintenherz herz angezündet", correct:true},
			{	text: "...Die haben mich angezündet", correct:false},
		]
	},

    {
		question: "Hat Elinor Feuer gern?",
		answers: [
			{	text: "ja", correct:false},
			{	text: "verleicht", correct:false},
			{	text: "nein", correct:true},
			{	text: "jein🤔", correct:false},
		]
	},

    {
		question: "In Kapitel 8 in welcher richtung haben die gefahren...?",
		answers: [
			{	text: "...in der richtung nördlich", correct:false},
			{	text: "...in der richtung östlich", correct:false},
			{	text: "...in der richtung südlich", correct:true},
			{	text: "...oder in der richtung westlich", correct:false},
		]
	},
    {
		question: "letzte",
		answers: [
			{	text: "frage", correct:false},
			{	text: "frage", correct:false},
			{	text: "frage", correct:false},
			{	text: "frage", correct:true},
		]
	},
	
];



const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;
var clicksound;

function mincraftbutton() {
    clicksound = new Audio("mincraftbuttonsound.mp4");
    clicksound.play();
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
    questionElement.innerHTML = `Du hast ${score} richtige von ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
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