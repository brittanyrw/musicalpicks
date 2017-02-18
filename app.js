var state = {
  current: 0,
  questions: [
    {
      currentChoice: 0,
      text: "Who will you be watching the movie with?",
      choices: [
        {
          title: "My Entire Family",
          genre: 10751,
        },{
          title: "Signifigant Other",
          genre: 10749,
        },{
          title: "My BFFs",
          genre: 35,
        },{
          title: "Me, Myself & I",
          genre: 18,        
        },{
          title: "My Pet",
          genre: 16,         
        }
      ],
      image: "imgs/dressingroom.svg",
      alt: "theatre dressing room illustration",
      progress: "imgs/quiz-progress-one.svg",
    },
    {
      text: "Are you looking for the real deal or make believe?",
      choices: [
        {
          title: "100% based on fact",
          genre: 36,
        },{
          title: "Complete fantasy",
          genre: 14,
        }
      ],
      image: "imgs/dressingroom.svg",
      alt: "theatre dressing room illustration",
      progress: "imgs/quiz-progress-two.svg",
    },
    {
      text: "Do you like being scared?",
      choices: [
        {
          title: "Yes! The more terrifying the better.",
          genre: 28,
        },{
          title: "I prefer suspense over jump scares.",
          genre: 18,
        },{
          title: "No, only happy stories for me.",
          genre: 12,
        }
      ],
      image: "imgs/dressingroom.svg",
      alt: "theatre dressing room illustration",
      progress: "imgs/quiz-progress-three.svg",
    },
    {
      text: "How do you feel about comedy?",
      choices: [
        {
          title: "If it's not funny, it's not worth watching.",
          genre: 35,
        },{
          title: "Relationship centered movies are better",
          genre: 10749,
        },{
          title: "I prefer something more serious.",
          genre: 18,
        },{
          title: "I avoid comedy.",
          genre: 12,
        }
      ],
      image: "imgs/dressingroom.svg",
      alt: "theatre dressing room illustration",
      progress: "imgs/quiz-progress-four.svg",
    },
     {
      text: "From the musical lyrics below, which do you like the most?",
      choices: [
        {
          title: "At least out loud, I won't say I'm in love (Herules)",
          genre: 10749,
        },{
          title: "We're Cheetah Girls, Cheetah Sisters! (Cheetah Girls)",
          genre: 10751,
        },{
          title: "Can't we be seventeen? That's all I want to do. (Heathers)",
          genre: 12,
        },{
          title: "I am not throwing away my shot! (Hamilton)",
          genre: 36,
        }
      ],
      image: "imgs/dressingroom.svg",
      alt: "theatre dressing room illustration",
      progress: "imgs/quiz-progress-five.svg",
    },   
  ],
};

var categories = {
  genres: [
    {
      id: 28,
      name: "Action",
      score: 0,
    },{
      id: 12,
      name: "Adventure",
      score: 0,
    },{
      id: 16,
      name: "Animation",
      score: 0,
    },{
      id: 35,
      name: "Comedy",
      score: 0,
    },{
      id: 80,
      name: "Crime",
      score: 0,
    },{
      id: 99,
      name: "Documentary",
      score: 0,
    },{
      id: 18,
      name: "Drama",
      score: 0,
    },{
      id: 10751,
      name: "Family",
      score: 0,      
    },{
      id: 14,
      name: "Fantasy",
      score: 0,  
    },{
      id: 36,
      name: "History",
      score: 0,  
    },{
      id: 27,
      name: "Horror",
      score: 0,  
    },{
      id: 10402,
      name: "Music",
      score: 0,  
    },{
      id: 9648,
      name: "Mystery",
      score: 0,  
    },{
      id: 10749,
      name: "Romance",
      score: 0,  
    },{
      id: 878,
      name: "Science Fiction",
      score: 0, 
    },{
      id: 10770,
      name: "TV Movie",
      score: 0, 
    },{
      id: 53,
      name: "Thriller",
      score: 0, 
    },{
      id: 10752,
      name: "War",
      score: 0, 
    },{
      id: 37,
      name: "Western",
      score: 0, 
    }
  ],
};


/*function getMusicalsFromApi(){
  var movieParams = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/discover/movie?with_keywords=4344&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=41c96271c1abb0093a43f5f46968c3fc",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

  $.ajax(movieParams).done(function (musicalsResponse) {
    displayMusicalsResults(musicalsResponse.results);
    console.log(musicalsResponse);
  });
}*/

function displayQuizQuestions(){
  var currentQuestion = state.current;
  $('.question').text(state.questions[state.current].text);
  $('.question-image').html('<img src="' + state.questions[state.current].image + '" alt="' + state.questions[state.current].imagealt + '">');
  $('.question-progress').html('<img src="' + state.questions[state.current].progress + '">');
  for (var i = 0; i < state.questions[state.current].choices.length; i++) {
    $(".choices").append('<li id="'+ state.questions[state.current].choices[i].genre +'">'+ state.questions[state.current].choices[i].title +'</li>');
  }
  state.current++;
}

function calculateGenreScores(){    
    $('.choices').on('click','li',function(){
      if($('.chosen').length==0){
        var genre = $(this).attr('id');
        $(this).addClass('chosen');
        for (var i = 0; i < categories.genres.length; i++) {
          if(categories.genres[i].id==genre){
            categories.genres[i].score++;
          }
        }
      }
      //console.log(categories.genres);
    });
  
}

var genresToMatch = [];

function checkGenreScores(){
  for (var i = 0; i < categories.genres.length; i++){
    if (genresToMatch.indexOf(categories.genres[i].id) == -1 && genresToMatch.length < 2) {
      if (categories.genres[i].score >= 1) {
      genresToMatch.push(categories.genres[i].id);
      }
    }
  }
}

function searchByGenre(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?with_keywords=4344&with_genres=" + genresToMatch.join("%2C%20") + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=41c96271c1abb0093a43f5f46968c3fc",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  $.ajax(settings).done(function (response) {
    displayMusicalsResults(response.results);
  });

}

function displayMusicalsResults(results){
  for (var i = 0; i < results.length; i++){
        $('.results-view').append( 
        '<a href="https://www.themoviedb.org/movie/' + results[i].id + '" class="result-link">' + 
        '<div class="result-item" style="background-image: url(\'https://image.tmdb.org/t/p/w1280/'  + results[i].poster_path + '\'">' + 
        '<p class="result-title">' + results[i].title + '</p>' + 
        '</div></a>' );
  }
}

$(document).ready(function() {
    $('.question-display').hide();
    $('.question-progress').hide();
    $('.question-image').hide();
    $('.results').hide();
    $('.additional-results').hide();
    $('.finish').hide();

    $('.start').click(function(event) { 
      event.preventDefault();
      $('.home-text-display, .header-img').hide();
      $('.home-image').hide();
      $('.question-display').show();
      $('.question-progress').show();
      $('.question-image').show();
      displayQuizQuestions();
      calculateGenreScores();
    });

    //continue to the next question and add scores to genres, after all questions show results screen
    $('.next').click(function(event){
      if ((state.current) != state.questions.length) {
        $('.choices').html('');
        displayQuizQuestions();
        checkGenreScores();
      } else {
        $('.finish').show();
      }
    });

    $('.finish').click(function(event){
      $('.question-display').hide();
      $('.question-progress').hide();
      $('.question-image').hide();
      searchByGenre();
      $('.header-img').show();
      $('.results').show();
      //displayMusicalsResults();
        });
    $('.restart').click(function(event){


    });

  });






