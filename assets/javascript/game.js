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
        atk: 40,
        catk: 25,
        img: "<img class='portrait' src='./assets/images/vader.jpg' />"
    },
};

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
            $('#charChoice').prepend(character);
        }
    }
};



// $("#gameStart").on('click', function () {

//     //hide start screen
//     $('#gameStart').css({ display: "none" });

//     //Show main play page
//     $('#playArea').css({ display: "inherit" });

//     // Create  character choice boxes
//     playFunctions.generate(characterList);
// });

playFunctions.generate(characterList);
$('#vader').on('click', function () {
    $('#vader').removeClass('playerChoice');
    $('#vader').addClass('chosenPlayer');
    $('#vader').detach().appendTo('#chosenChar');
    $('.playerChoice').detach().appendTo('#availEnemies');
    $('.playerChoice').addClass('enemy');
    $('.playerChoice').removeClass('playerChoice');
    console.log('test');
})

