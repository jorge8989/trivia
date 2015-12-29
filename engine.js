var triviaObject = {
      maiores: [
        'Edema agudo de pulmão',
        'Disneia paroxística noturna',
        'Cardiomegalia',
        'Ingurgitação jugular',
        'Refluxo hepatojugular',
        'B3 (terceira bulha)',
        'PVC > 16',
        'Perda de > 4,5 kg após o tratamento'
      ],
      menores: [
        'Edema bimaleolar',
        'Hepatomegalia',
        'Disneia aos esforços',
        'Derrame pleural',
        'FC > 120',
        'Tosse noturna'
      ]
    }
    
function playGame() {
  var timer;
  var points = 0;
  var elements = triviaObject.maiores.concat(triviaObject.menores);
  var totalElements = elements.length
  var showedElements = [];
  
  function init() {
    $("#results").hide();
    showQuestion();
    handleEvents();
  }
    
  function generateRandNumber(limit) {
    return Math.floor((Math.random() * limit) + 1)
  }
     
  function startTimer(limit) {
    clearInterval(timer)
    var secondsPassed = 0;
    function countDown() {
    secondsPassed++
    $("#timer").text(limit - secondsPassed);
      if (secondsPassed == limit) {
        clearInterval(timer);
        nextQuestion();
      }
    }
    $("#timer").text(limit - secondsPassed);
    timer = setInterval(function() {
      countDown();
    }, 1000)
  }
     
    function showQuestion() {
       startTimer(5);
       var elementToShow;
       function chooseElement() {
         elementToShow = elements[generateRandNumber(elements.length) - 1];
       }
       chooseElement()
       while (showedElements.indexOf(elementToShow) != -1) {
         chooseElement();
       }
       if (showedElements.indexOf(elementToShow) == -1) {
         showedElements.push(elementToShow);
       };
       $("#element-to-show").text(elementToShow);
     };
     
  function analizeAnswer(answer) {
    if (triviaObject[answer].indexOf(showedElements[showedElements.length - 1]) != -1) {
      points++;
    }
  }
     
  function nextQuestion() {
    if (showedElements.length != totalElements) {
      showQuestion();
    } else {
      endGame();
    }
  }
     
  function endGame() {
    clearInterval(timer);
    $("#timer").empty();
    $("#playground").hide();
    $("#results").show();
    $("#score").text('você acertou '+points+' de '+totalElements);
  }
     
   function handleEvents() {
     $(".choose-answer").on("click", function() {
       analizeAnswer($(this).html());
       nextQuestion();
     });
   }   
  
  init();
       
}

$(function() {
  var game = new playGame();
})
