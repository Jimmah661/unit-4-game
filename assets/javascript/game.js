var characterList = {
    yoda: {
        hp: 100,
        atk: 20,
        catk: 5,
        name: "Yoda",
        img: "<img class='portrait' src='./assets/images/yoda.jpg' />"
    },
    luke: {
        hp: 120,
        atk: 10,
        catk: 10,
        name: "Luke Skywalker",
        img: "<img class='portrait' src='./assets/images/luke.jpg' />"
    },
    maul: {
        hp: 180,
        atk: 10,
        catk: 15,
        name: "Darth Maul",
        img: "<img class='portrait' src='./assets/images/maul.jpg' />"
    },
    vader: {
        hp: 140,
        atk: 15,
        catk: 25,
        name: "Darth Vader",
        img: "<img class='portrait' src='./assets/images/vader.jpg' />"
    },
};

var playerStats = {
    hp: 0,
    atk: 0,
    catk: 0
};
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

            // Create character tiles
            var character = $("<div>");
            // Assign class and ID for character divs
            character.addClass("playerChoice");
            character.attr('ID', ID);
            // Add name to character div
            character.append("<p>" + Object(x)[ID].name + "</p>");
            // Add image to character div
            character.append(Object(x)[ID].img);
            // Add HP to div
            character.append("<p class='" + ID + "HP'>" + Object(x)[ID].hp + "</p>")
            // Assign div to Choice location
            $('#charChoice').append(character);
        }
    }
};

// Generate all the possible player choices
$(document).ready(playFunctions.generate(characterList));

// ****** Character/Defender Selection area ******
$('.playerChoice').on('click', function () {
    // pull the id field from the selected Div
    var id = $(this).attr('id');
    console.log('click');

    // select player character
    if (playerChosen === false) {
        $("#" + id).removeClass('playerChoice');
        $("#" + id).addClass('chosenPlayer');
        $("#" + id).detach().appendTo('#chosenChar');
        // set the playerStats to be that of the selected character
        playerStats = Object(characterList)[id];
        playerChosen = true;
        $("." + id + "HP").replaceWith('<p id="heroHP">');
        $("#heroHP").text("HP: " + playerStats.hp)

        // separate other characters to the enemies section
        $('.playerChoice').detach().appendTo('#availEnemies');
        $('.playerChoice').addClass('enemy');
        $('.playerChoice').removeClass('playerChoice');

        $('#charChoice').hide();

    }

    // select defender
    else if (playerChosen === true) {
        // Move that enemy to the defender section
        $('#' + id).detach().appendTo('#defender');

        // Move his stats to the enemy stats list
        defenderStats = Object(characterList)[id];

        $("." + id + "HP").replaceWith('<p id="defenderHP">');
        $("#defenderHP").text("HP: " + defenderStats.hp)

        // Hide other enemies
        $('#availEnemies').hide();
        gameActive = true;
        enemyChosen = true
    }
})


// If the attack button is clicked call this function
$('#smackThat').click(function () {
    if (gameActive === true) {
        $('#battleReport').empty();
        // resolve damage to enemy
        defenderStats.hp -= playerStats.atk;
        $('#defenderHP').text("HP: " + defenderStats.hp);

        // Display damage information below defender
        var yourDamage = $('<p>You did ' + playerStats.atk + ' damage</p>')
        var theirDamage = $('<p>They countered for ' + defenderStats.catk + ' damage</p>')
        $('#battleReport').append(yourDamage);
        $('#battleReport').append(theirDamage);

        // Increase player attack
        playerStats.atk += 8;


        // Clear the defeated enemy and bring the others back
        if (gameActive === true && defenderStats.hp <= 0) {
            $('#defender').empty();
            smackDown++;
            $('#availEnemies').show();
            enemyChosen = false;
            gameActive = false;

            //if all enemies have been beaten, display the reset option
            if (smackDown === 3) {
                $('#battleReport').empty();
                $('#battleReport').append('<p>You Win! Click Restart to try again</p>')
                $('#reset').show();
                gameActive = false;
            }

        }

        // Resolve damage to player
        playerStats.hp -= defenderStats.catk;
        $('#heroHP').text("HP: " + playerStats.hp)

        // If you get beaten, display a message stating so and give the reset option
        if (gameActive === true && playerStats.hp <= 0) {
            $('#reset').show();
            $('#battleReport').empty();
            $('#battleReport').append('<p>You lost, click restart to try again</p>')
            gameActive = false;
        }
    }
})



// This is what I wanted to use for the reset function
// Unfortunately I could not figure out how to get it to let me pick new characters on reset

// $('#reset').click(function () {

//     smackDown = 0;

//     $('.enemy').remove();
//     $('.chosenPlayer').remove();


//     enemyChosen = false;
//     playerChosen = false;
//     $('#battleReport').empty();
//     characterList.maul.hp = 180;
//     characterList.luke.hp = 120;
//     characterList.yoda.hp = 100;
//     characterList.vader.hp = 140;
//     playFunctions.generate(characterList);
//     $('#reset').hide();
// })
