const questions = [
	{
		question: 'In Kapitel "Damals":Wer fällt aus dem 📕Buch...?',
		answers: [
			{	text: "...Capricorn,Basta und Meggie", correct:false},
            		{	text: "...Staubfinger,Basta und Capricorn", correct:true},
			{	text: "...Staubfinger,Mo und Capricorn", correct:false},
            		{	text: "...Basta,Capicorn und 🐿️Gwin", correct:true},
		]
	},
	{
		question: "Und wer wurde in das 📕Buch herein genommen...?",
		answers: [
			{	text: "...Meggies Mutter,🐿️Gwin und Capricorn", correct:false},
			{	text: "...ich ,Elinor und Capricorn", correct:false},
			{	text: "...zwei schwarze Katzen 🐈‍⬛🐈‍⬛ und Meggies Mutter", correct:true},
			{	text: "...Meggies Mutter,und Mo", correct:false},
		]
	},
    {
		question: 'In Kapitel "Ein böser Tausch": Was ist in der 🌙Nacht passiert...?',
		answers: [
			{	text: "...Es wurde das falsche 📙Buch von Capricorn genommen", correct:true},
			{	text: "...Es wurde das echte 📕Tintenherz von Capricorn wegenommen", correct:false},
			{	text: "...Mo wurde fest genommen", correct:false},
			{	text: "...Ich wurde fest genommen", correct:false},
		]
	},
    {
		question: "Um wie viel Uhr start das 🔥⏰Feueralarm?",
		answers: [
			{	text: "3 uhr", correct:false},
			{	text: "9 uhr", correct:true},
			{	text: "7 uhr", correct:false},
			{	text: "34 uhr", correct:false},
		]
	},
    {
		question: 'In Kapitel "Capricorn Dorf":Welcher Geschichten mag 🦄Capricorn...?',
		answers: [
			{	text: "...Fröhliche Geschichten ohne Blut", correct:false},
			{	text: "...sehr männliche Geschichten mit schwere arbeit,💦Schweiss und 🩸Blut", correct:false},
			{	text: "...ein Youtube Kanal über Capricorn", correct:false},
			{	text: "...sehr schreckliche Geschichten über 🧛Mord", correct:true},
		]
	},
    {
		question: 'Im Kapitel "Der Verratene Veräter": Was hat 🦄Capricorn hauptsachlich 🔥🪵angezündet..?',
		answers: [
			{	text: "...er hat die ⛪Kirche angezündet", correct:false},
			{	text: "...er hat das falsche 📙Buch angezündet", correct:false},
			{	text: "...er hat -📕Tintenherz angezündet", correct:true},
			{	text: "...er hat mich angezündet", correct:false},
		]
	},

    {
		question: "Hat Elinor 🔥Feuer gern...?",
		answers: [
			{	text: "...ja", correct:false},
			{	text: "...vielleicht", correct:false},
			{	text: "...nein", correct:true},
			{	text: "...jein🤔", correct:false},
		]
	},

    {
		question: "In Kapitel 8:In welche Richtung fahren🚘 sie...?",
		answers: [
			{	text: "...in Richtung  ⬆️Norden", correct:false},
			{	text: "...in Richtung  ➡️Osten", correct:false},
			{	text: "...in Richtung   ⬇️Süden", correct:true},
			{	text: "...oder in Richtung  ⬅️Westen", correct:false},
		]
	},
    {
		question: "hat 🐿️Gwin Hörner",
		answers: [
			{	text: "vielleicht", correct:false},
			{	text: "nein", correct:false},
			{	text: "ja ", correct:true},
			{	text: "👽", correct:false},
		]
	},
	{
		question: 'In Kapitel "Damals":Wer las Meggies 👩‍🦰Mutter vor...?',
		answers: [
			{	text: "...Elinor", correct:false},
			{	text: "...Mo", correct:true},
			{	text: "...Ich", correct:false},
			{	text: "...Meggie", correct:false},
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