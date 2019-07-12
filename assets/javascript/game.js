var characterList = {
    yoda: {
        hp: 100,
        atk: 10,
        catk: 25,
        img: "<img class='portrait' src='./assets/images/yoda.jpg' />"
    },
    luke: {
        hp: 100,
        atk: 20,
        catk: 25,
        img: "<img class='portrait' src='./assets/images/luke.jpg' />"
    },
    maul: {
        hp: 100,
        atk: 30,
        catk: 25,
        img: "<img class='portrait' src='./assets/images/maul.jpg' />"
    },
    vader: {
        hp: 100,
        atk: 6,
        catk: 25,
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

var playFunctions = {
    generate: function (x) {
        // function to create the character choice boxes
        for (i = 0; i < Object.keys(x).length; i++) {
            var name = Object.keys(x)[i];
            var character = $("<div>");
            character.addClass("playerChoice");
            character.attr('ID', name);
            character.append("<p>" + name.charAt(0).toUpperCase() + name.slice(1) + "</p>");
            character.append(Object(x)[name].img);
            character.append(Object(x)[name].hp)
            $('#charChoice').append(character);
        }
    }
};

// I'll come back to the start screen later

// $("#gameStart").on('click', function () {

//     //hide start screen
//     $('#gameStart').css({ display: "none" });

//     //Show main play page
//     $('#playArea').css({ display: "inherit" });

//     // Create  character choice boxes
//     playFunctions.generate(characterList);
// });

// Generate all the possible player choices
playFunctions.generate(characterList);

// beginnings of the character selection
// This will separate out into Player and Enemies
$('#vader').on('click', function () {
    $('#vader').removeClass('playerChoice');
    $('#vader').addClass('chosenPlayer');
    $('#vader').detach().appendTo('#chosenChar');
    $('.playerChoice').detach().appendTo('#availEnemies');
    $('.playerChoice').addClass('enemy');
    $('.playerChoice').removeClass('playerChoice');
    playerStats = characterList.vader;
})

// Beginnings of defender choices
// Lets start with Maul
$('#maul').on('click', function () {
    // Move that enemy to the defender section
    $('#maul').detach().appendTo('#defender');
    // Move his stats to the enemy stats list
    defenderStats = characterList.maul;
    // Hide other enemies
    $('#availEnemies').hide();
    gameActive = true;
})

$('#smackThat').click(function () {
    console.log(defenderStats.hp);
    defenderStats.hp = defenderStats.hp - playerStats.atk;
    playerStats.atk = playerStats.atk + 6;
    // console.log(playerStats);
    console.log(defenderStats.hp);
    if (gameActive = true && defenderStats.hp <= 0) {
        $('#defender').empty();
        smackDown++;
        $('#availEnemies').show();
    }
})

