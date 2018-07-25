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
let question = 0;

const getTrivia = show => {
  return show.trivia;
};

const showQuestion = data => {
  // Show the trivia div on the page
  $('.trivia').removeClass('hidden');
  // Add a question to the div - var question will increase when an
  // answer is submitted in order to then display the next question
  $('.question').text(data[question].q);
  showChoices(data);
};

const showChoices = data => {
  let choice = data[question];
  $.each(choice, (i, val) => {
    $('.answer-field' + i).text(val);
  });
};

$(document).ready(() => {
  $('.supernatural').on('click', e => {
    // Prevent Default Behavior
    e.preventDefault();
    let show = supernatural;
    // Get Correct Trivia Object
    let data = getTrivia(show);
    showQuestion(data);
  });

  $('.game-of-thrones').click(e => {
    // Prevent Default Behavior
    e.preventDefault();
    let show = gameOfThrones;
    // Get Correct Trivia Object
    let data = getTrivia(show);
    showQuestion(data);
  });

  $('.doctor-who').click(e => {
    // Prevent Default Behavior
    e.preventDefault();
    let show = doctorWho;
    // Get Correct Trivia Object
    let data = getTrivia(show);
    showQuestion(data);
  });
});
