/*
 * Script for index.html
 */

/*

load page

Show three buttons

Depending on button picked, will grab different sets of questions:
$('.supernatural') / trivia.supernatural[i].q/a/b/c/d
$('.game-of-thrones') / trivia.gameOfThrones[i].q/a/b/c/d
$('.doctor-who') / trivia.doctorWho[i].q/a/b/c/d




*/
let show;
let data;
let question = 0;
let results = [];

const getTrivia = () => {
  // Pull the correct trivia object
  return show.trivia;
};

const showQuestion = () => {
  // Show the trivia div on the page
  $('.trivia').removeClass('hidden');
  // Add a question to the div - var question will increase when an
  // answer is submitted in order to then display the next question
  $('.question').text(data[question].question);
  showChoices(data);
};

const showChoices = () => {
  // Pull the answer set based on the question
  let choice = data[question].answers;
  // Assign a single answer choice per input
  $.each(choice, (i, val) => {
    $('.answer-field' + i).text(val);
  });
};

const checkUserAnswer = answer => {
  // Pull the correct answer for the question
  let correct = data[question].correctAnswer;
  // Compare the users answer to the correct answer and push the resulting
  // info to an array
  if (answer === correct) {
    results.push({
      question: question,
      response: answer,
      correct: true
    });
  } else {
    results.push({
      question: question,
      response: answer,
      correct: false
    });
  }
  showNextQuestion();
};

const showNextQuestion = () => {
  question++;
  showQuestion();
};

$(document).ready(() => {
  // When button for "Supernatural" Quiz is clicked
  $('.supernatural').click(e => {
    // Prevent Default Behavior
    e.preventDefault();
    show = supernatural;
    // Get Correct Trivia Object
    data = getTrivia();
    showQuestion();
  });

  // When button for "Game of Thrones" Quiz is clicked
  $('.game-of-thrones').click(e => {
    // Prevent Default Behavior
    e.preventDefault();
    show = gameOfThrones;
    // Get Correct Trivia Object
    data = getTrivia(show);
    showQuestion(data);
  });

  // When button for "Doctor Who" Quiz is clicked
  $('.doctor-who').click(e => {
    // Prevent Default Behavior
    e.preventDefault();
    show = doctorWho;
    // Get Correct Trivia Object
    data = getTrivia(show);
    showQuestion(data);
  });

  // When "Submit" button on a question is clicked
  $('.submit').click(e => {
    // Prevent Defualt Form Submit Behavior
    e.preventDefault();
    // Assign selected answer to variable
    let userAnswer = $('input[name=answer-field]:checked').val();
    console.log(userAnswer);
    checkUserAnswer(userAnswer);
  });
});
