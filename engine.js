
function trivia(data) {
  var timer;
  var points = 0;
  var elements = data.elements;
  var timeLimit = data.time_limit;
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
    $("#game-title").text(data.title)
    $("#game-question").text(data.question)
  }  
  function renderButtons() {
    $("#buttons-container").html(_buttons_tpl(data))
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
    
    showedSubElements.push(subElementToShow);
    $("#element-to-show").text(subElementToShow.content);
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
    nextQuestion();
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
    });
  }   
  
  init();
       
}

$(function() { 
  $.ajax({
    url: 'json.txt',
    dataType: 'json',
    success: trivia 
  })
})
