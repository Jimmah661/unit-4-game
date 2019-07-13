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

// ****** Character/Defender Selection area ******
$('.playerChoice').on('click', function () {
    var id = $(this).attr('id');
    if (playerChosen === false) {
        $("#" + id).removeClass('playerChoice');
        $("#" + id).addClass('chosenPlayer');
        $("#" + id).detach().appendTo('#chosenChar');
        // Deal with enemies
        $('.playerChoice').detach().appendTo('#availEnemies');
        $('.playerChoice').addClass('enemy');
        $('.playerChoice').removeClass('playerChoice');
        playerStats = Object(characterList)[id];
        playerChosen = true;
    }
    else if (playerChosen === true) {
        // Move that enemy to the defender section
        $('#' + id).detach().appendTo('#defender');
        // Move his stats to the enemy stats list
        defenderStats = Object(characterList)[id];
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
        // resolve damage
        defenderStats.hp -= playerStats.atk;
        playerStats.hp -= defenderStats.catk;


        // Display damage information below defender
        var yourDamage = $('<p>You did ' + playerStats.atk + ' damage</p>')
        var theirDamage = $('<p>They countered for ' + defenderStats.catk + ' damage</p>')
        $('#battleReport').append(yourDamage);
        $('#battleReport').append(theirDamage);

        // Increase player attack
        playerStats.atk += 6;

        // Clear the defeated enemy and bring the others back
        if (gameActive === true && defenderStats.hp <= 0) {
            $('#defender').empty();
            smackDown++;
            $('#availEnemies').show();

            //if all enemies have been beaten, display the reset option
            if (smackDown === 3) {
                $('#battleReport').empty();
                $('#battleReport').text('You Win! Click Restart to try again')
                $('#reset').show();
                gameActive = false;
            }

        }
        // If you get beaten, display a message stating so and give the reset option
        else if (gameActive === true && playerStats.hp <= 0) {
            $('#reset').show();
            $('#battleReport').empty();
            $('#battleReport').text('You lost, click restart to try again')
            gameActive = false;
        }
    }
})








// If the reset button is clicked call this function
$('#reset').click(function () {

    // Reset defeated opponents
    smackDown = 0;

    // remove existing player portraits
    $('.enemy').remove();
    $('.chosenPlayer').remove();

    // Set gameboard up again
    playFunctions.generate(characterList);
    enemyChosen = false;
    playerChosen = false;
    $('#battleReport').empty();
    // Hide Reset button
    $('#reset').hide();
})








$('.playerChoice').click(function () {
    let status = "#" + $(this).attr('id');
    console.log(status);
});