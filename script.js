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
let quest = 0;
let answ = 1;

const getTrivia = show => {
  return show.trivia;
};

const showQuestion = data => {
  $('.trivia').removeClass('hidden');
  $('.question').text(data[quest].q);
  // console.log(data[quest][1]);
  $('label').text(data[quest][answ]);
  //   answ++;
};

$(document).ready(() => {
  $('.supernatural').on('click', e => {
    // Prevent Default Form Submit Behavior
    e.preventDefault();
    let show = supernatural;
    // Get Correct Trivia Object
    let data = getTrivia(show);
    showQuestion(data);
  });

  $('.game-of-thrones').click(e => {
    // Prevent Default Form Submit Behavior
    e.preventDefault();
    // Get Correct Trivia Object
    getTrivia(gameOfThrones);
  });

  $('.doctor-who').click(e => {
    // Prevent Default Form Submit Behavior
    e.preventDefault();
    // Get Correct Trivia Object
    getTrivia(doctorWho);
  });
});
