var triviaObject = 
  { title: 'Critérios de Framinghan',
    question: 'O seguinte sinal/sintoma, a quais critérios pertence?',
    elements: [
      { name: 'maiores',
        sub_elements: [
        'Edema agudo de pulmão',
        'Disneia paroxística noturna',
        'Cardiomegalia',
        'Ingurgitação jugular',
        'Refluxo hepatojugular',
        'B3 (terceira bulha)',
        'PVC > 16',
        'Perda de > 4,5 kg após o tratamento'
      ]},
      { name: 'menores',
        sub_elements: [
        'Edema bimaleolar',
        'Hepatomegalia',
        'Disneia aos esforços',
        'Derrame pleural',
        'FC > 120',
        'Tosse noturna'
        ]
      }
    ],
    time_limit: 5
  }
    
function trivia() {
  var timer;
  var points = 0;
  var elements = triviaObject.elements;
  var timeLimit = triviaObject.time_limit;
  var subElements = []
  elements.forEach(function(element) {
    subElements = subElements.concat(element.sub_elements)
  })
  var totalSubElements = subElements.length
  var showedSubElements = [];
  var _buttons_tpl = _.template($("#buttons-tpl").html());
  
  function init() {
    $("#results").hide();
    putTitleAndQuestion();
    renderButtons()
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
  
  function putTitleAndQuestion() {
    $("#game-title").text(triviaObject.title)
    $("#game-question").text(triviaObject.question)
  }  
  function renderButtons() {
    $("#buttons-container").html(_buttons_tpl(triviaObject))
  }
  function showQuestion() {
    startTimer(timeLimit);
    var subElementToShow;
    function chooseSubElement() {
     subElementToShow = subElements[generateRandNumber(subElements.length) - 1];
    }
    chooseSubElement()
    while (showedSubElements.indexOf(subElementToShow) != -1) {
     chooseSubElement();
    }
    if (showedSubElements.indexOf(subElementToShow) == -1) {
     showedSubElements.push(subElementToShow);
    };
    $("#element-to-show").text(subElementToShow);
  }
  
  function find_element_by_name(name) {
    var foundElement;
    elements.forEach(function(element) {
      if (element.name == name) {
        foundElement = element;
      }
    })
    return foundElement;
  }
     
  function analizeAnswer(answer) {
    var element = find_element_by_name(answer)
    if (element.sub_elements
      .indexOf(showedSubElements[showedSubElements.length - 1]) != -1) {
      points++;
    }
  }
     
  function nextQuestion() {
    if (showedSubElements.length != totalSubElements) {
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
    $("#score").text('você acertou '+points+' de '+totalSubElements);
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
  var myTrivia = new trivia();
})
