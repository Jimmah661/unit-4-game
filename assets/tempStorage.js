var characterList = {
    yoda: {
        hp: 100,
        atk: 10,
        catk: 25,
        name: "Yoda",
        img: "<img class='portrait' src='./assets/images/yoda.jpg' />"
    },
    luke: {
        hp: 100,
        atk: 20,
        catk: 25,
        name: "Luke Skywalker",
        img: "<img class='portrait' src='./assets/images/luke.jpg' />"
    },
    maul: {
        hp: 100,
        atk: 30,
        catk: 25,
        name: "Darth Maul",
        img: "<img class='portrait' src='./assets/images/maul.jpg' />"
    },
    vader: {
        hp: 100,
        atk: 6,
        catk: 25,
        name: "Darth Vader",
        img: "<img class='portrait' src='./assets/images/vader.jpg' />"
    },
};

var playerStats;
var defenderStats = {
    hp: 0,
    atk: 0,
    catk: 0
};
var enemyStorage;
var smackDown = 0;
var gameActive = false;
var status;
var playerChosen = false;
var enemyChosen = false;

var playFunctions = {
    generate: function (x) {
        // function to create the character choice boxes
        for (i = 0; i < Object.keys(x).length; i++) {
            var ID = Object.keys(x)[i];
            var character = $("<div>");
            character.addClass("playerChoice");
            character.attr('ID', ID);
            character.append("<p>" + Object(x)[ID].name + "</p>");
            character.append(Object(x)[ID].img);
            character.append(Object(x)[ID].hp)
            $('#charChoice').append(character);
        }
    }
};

// I'll come back to the start screen later

// $("#gameStart").on('click', function () {

//     //hide start screen
//     $('#gameStart').hide();

//     //Show main play page
//     $('#playArea')show();

//     // Create  character choice boxes
//     playFunctions.generate(characterList);
// });

// Generate all the possible player choices
playFunctions.generate(characterList);

// beginnings of the character selection
// This will separate out into Player and Enemies


// trying to work it with the generic selecter

$('.playerChoice').on('click', function () {
    var id = $(this).attr('id');
    $("#" + id).removeClass('playerChoice');
    $("#" + id).addClass('chosenPlayer');
    $("#" + id).detach().appendTo('#chosenChar');
    // Deal with enemies
    $('.playerChoice').detach().appendTo('#availEnemies');
    $('.playerChoice').addClass('enemy');
    $('.playerChoice').removeClass('playerChoice');
    playerStats = Object(characterList)[id];
    playerChosen = true;
})


// Beginnings of defender choices
// Lets start with Maul
$('.enemy').on('click', function () {
    var id = $(this).attr('id');
    // Move that enemy to the defender section
    $('#' + id).detach().appendTo('#defender');
    // Move his stats to the enemy stats list
    defenderStats = Object(characterList)[id];
    // Hide other enemies
    $('#availEnemies').hide();
    gameActive = true;
    enemyChosen = true
})

$('#smackThat').click(function () {
    console.log(defenderStats.hp);
    defenderStats.hp = defenderStats.hp - playerStats.atk;
    playerStats.atk = playerStats.atk + 6;
    // console.log(playerStats);
    console.log(defenderStats.hp);

    // Clear the defeated enemy and bring the others back
    if (gameActive = true && defenderStats.hp <= 0) {
        $('#defender').empty();
        smackDown++;
        $('#availEnemies').show();
    }
})

$('.playerChoice').click(function () {
    let status = "#" + $(this).attr('id');
    console.log(status);
});