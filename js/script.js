/*
 * Script for index.html
 */

let show;
let data;
let question = 0;
let results = [];

const getTrivia = () => {
  // Pull the correct trivia object based on the show chosen
  return show.trivia;
};

const showQuestion = () => {
  // Show the trivia div on the page
  $('.jumbotron').addClass('hidden');
  $('.trivia').removeClass('hidden');
  updateProgressBar();
  // Add a question to the div - var question will increase when an
  // answer is submitted in order to then display the next question
  $('.question').text(data[question].question);
  showChoices(data);
};

const updateProgressBar = () => {
  // Update the progress bar to show progress in relation to 10 quiz questions
  $('.progress-bar').attr({
    'aria-valuenow': `${question}0`,
    style: `width: ${question}0%;`
  });
  $('.sr-only').text(`${question}0% Complete`);
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
  /* Compare the users answer to the correct answer and push the 
  resulting info to an array */
  answer === correct
    ? results.push({ question: question, response: answer, correct: true })
    : results.push({ question: question, response: answer, correct: false });
  showNextQuestion();
};

const showNextQuestion = () => {
  /* Checks to see what question was displayed 
  If any remaining questions, will start loop of show question,
  populate answers, etc. again */
  if (question < 9) {
    question++;
    showQuestion();
  } else {
    // If no remaining questions, will move on to scoring
    calculateScore();
  }
};

const calculateScore = () => {
  let numberCorrect = 0;
  // Loop through the results and tally the number of correct answers
  for (i = 0; i < results.length; i++) {
    results[i].correct && numberCorrect++;
  }
  showScore(numberCorrect);
};

const showScore = number => {
  // Hide trivia div
  $('.trivia').addClass('hidden');
  // Show show-score div
  $('.show-score').removeClass('hidden');
  // Update span to show number correct
  $('.number').text(number);
  // Move on to showResults function
  showResults();
};
const showResults = () => {
  // Show results div
  $('.results').removeClass('hidden');
  // Loop through results and fill in the DOM
  for (i = 0; i < results.length; i++) {
    $(`.user-answer${i}`).text(data[i].answers[parseInt(results[i].response)]);
    $(`.correct-answer${i}`).text(
      data[i].answers[parseInt(data[i].correctAnswer)]
    );
    results[i].correct
      ? $(`.q${i}`).addClass('alert-success')
      : $(`.q${i}`).addClass('alert-danger');
  }
};

$(document).ready(() => {
  // When button for "Supernatural" Quiz is clicked
  $('.supernatural').click(e => {
    // Prevent Default Behavior
    e.preventDefault();
    // Set show to equal the button clicked
    show = supernatural;
    // Get Correct Trivia Object
    data = getTrivia();
    // Send the trivia data to the showQuestion function to start the game
    showQuestion();
  });

  // When button for "Game of Thrones" Quiz is clicked
  $('.game-of-thrones').click(e => {
    // Prevent Default Behavior
    e.preventDefault();
    // Set show to equal the button clicked
    show = gameOfThrones;
    // Get Correct Trivia Object
    data = getTrivia(show);
    // Send the trivia data to the showQuestion function to start the game
    showQuestion(data);
  });

  // When button for "Doctor Who" Quiz is clicked
  $('.doctor-who').click(e => {
    // Prevent Default Behavior
    e.preventDefault();
    // Set show to equal the button clicked
    show = doctorWho;
    // Get Correct Trivia Object
    data = getTrivia(show);
    // Send the trivia data to the showQuestion function to start the game
    showQuestion(data);
  });

  // When "Submit" button on a question is clicked
  $('.submit').click(e => {
    // Prevent Defualt Form Submit Behavior
    e.preventDefault();
    // Send the users answer to the checkUserAnswer function to be checked and stored
    checkUserAnswer($('input[name=answer-field]:checked').val());
  });

  // When button with "refresh" class is clicked
  $('.refresh').click(e => {
    // Reload the page
    location.reload();
  });
});
