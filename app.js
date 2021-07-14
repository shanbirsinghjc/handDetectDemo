function populate(){
	if(quiz.isEnded()){
		showScores();
	}
	else{
		var element=document.getElementById("question");
		element.innerHTML=quiz.getQuestionIndex().text;

		var choices=quiz.getQuestionIndex().choices;
		for(var i=0;i<choices.length;i++)
		{
			var element = document.getElementById("choice"+i);
			element.innerHTML=choices[i];
			guess("btn"+i,choices[i]);
		}
		showProgress();
	}
};

function guess(id,guess){
	//console.log(id,guess);
	var button = document.getElementById(id);
	button.onclick=function(){
		//console.log(button.id);
		quiz.guess(guess);
		populate();
	}
};

function showProgress(){
	var currentQuestionNumber=quiz.questionIndex+1;
	var element = document.getElementById("progress");
	element.innerHTML="Question "+currentQuestionNumber +" of "+quiz.questions.length;

};

function showScores()
{
	var gameOverHtml="<h1> Result of the quiz..</h1>"
	gameOverHtml+="<h2 id='score'>Your Score is :  "+quiz.score+"</h2>";
	var element=document.getElementById("quiz");
	element.innerHTML=gameOverHtml;


};

var questions=[
	new Question("Hagrid collected the Philosopher's Stone to take to Hogwarts. Where from?",["Hog's head","Ollivanders","Gringotts","The Leaky Cauldron"],"Gringotts"),
	new Question("Who first mentioned the name Nicolas Flamel to Harry, Ron and Hermione?",["Draco Malfoy","Professor Binns","Hagrid","Professor McGonagal"],"Hagrid"),
	new Question("According to Quirrell, why did Snape dislike Harry so much?",["Snape hated Harrys attitude","Snape and Harry's father loathed each other","Snape and Harry's mother loathed each other","Snape hated all Gryffindors"],"Snape and Harry's father loathed each other"),
	new Question("Where did Harry first overhear Snape talking about something with three heads?",["The Potions Classroom","The Forbidden Forest","Hedwig","The staff room"],"The staff room"),
	new Question("How did Hermione manage to stop Quirrell jinxing Harry`s broom, even though she thought it was Snape?",["A","B","C","D"],"A"),
	new Question("Why was the Philosophers Stone valuable to Voldemort?",["A","B","C","D"],"B"),
	new Question("Which of the following things would calm Fluffy?",["A","B","C","D"],"C"),
	new Question("How did Harry know which winged key to catch to open the next door?",["A","B","C","D"],"D"),
	new Question("Which chess piece did Ron take the place of on McGonagall’s giant chess set?",["A","B","C","D"],"D"),
	new Question("Why couldn’t Quirrell, unlike Harry, extract the Philosopher’s Stone from the Mirror of Erised?",["A","B","C","D"],"A")
];
var quiz=new Quiz(questions);
populate();


const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
var Thumb = false;
var Index = false;
var Middle = false;
var Ring = false;
var Little = false;
var highlightColor = "Red";
var normalBtnColor = "Grey";


function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
	  //console.log(landmarks[8].x);
	  /*if (landmarks[4][3] == "Right" && landmarks[4][1] > landmarks[3][1])
	  {       //Right Thumb
		Thumb = true;
	  }
	  else if (landmarks[4][3] == "Left" && landmarks[4][1] < landmarks[3][1])
	  {       //Left Thumb
        Thumb = true;
	  }
	  else
	  {
		Thumb = false;
	  }*/
	  
      if( landmarks[8].y < landmarks[6].y)
	  {       //Index finger 
		Index = true;
	  }
	  else
	  {
		Index = false;
	  }
	  
	  if( landmarks[12].y < landmarks[10].y)
	  {       //Middle finger 
		Middle = true;
	  }
	  else
	  {
		Middle = false;
	  }
	  
	  if( landmarks[16].y < landmarks[14].y)
	  {       //Ring finger 
		Ring = true;
	  }
	  else
	  {
		Ring = false;
	  }
	  
	  if( landmarks[20].y < landmarks[18].y)
	  {       //Little finger 
		Little = true;
	  }
	  else
	  {
		Little = false;
	  }
	  
	  if(Index && Middle && Ring && Little)
	  {
		document. getElementById('btn0'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn1'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn2'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn3'). style. backgroundColor = highlightColor;
	  }
	  else if(Index && Middle && Ring && !Little)
	  {
		document. getElementById('btn0'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn1'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn2'). style. backgroundColor = highlightColor;
		document. getElementById('btn3'). style. backgroundColor = normalBtnColor;
	  }
	  else if(Index && Middle && !Ring && !Little)
	  {
		document. getElementById('btn0'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn1'). style. backgroundColor = highlightColor;
		document. getElementById('btn2'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn3'). style. backgroundColor = normalBtnColor;
	  }
	  else if(Index && !Middle && !Ring && !Little)
	  {
		document. getElementById('btn0'). style. backgroundColor = highlightColor;
		document. getElementById('btn1'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn2'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn3'). style. backgroundColor = normalBtnColor;
	  }
	  else
	  {
		document. getElementById('btn0'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn1'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn2'). style. backgroundColor = normalBtnColor;
		document. getElementById('btn3'). style. backgroundColor = normalBtnColor;
	  }
	  
	  //console.log(Thumb);
	  console.log(Index,Middle,Ring,Little);
	  
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

/*const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
*/

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: videoElement.width,
  height: videoElement.height
});
camera.start();