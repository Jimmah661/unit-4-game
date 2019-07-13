$('#vader').on('click', function () {
    $('#vader').removeClass('playerChoice');
    $('#vader').addClass('chosenPlayer');
    $('#vader').detach().appendTo('#chosenChar');
    $('.playerChoice').detach().appendTo('#availEnemies');
    $('.playerChoice').addClass('enemy');
    $('.playerChoice').removeClass('playerChoice');
    playerStats = characterList.vader;
})