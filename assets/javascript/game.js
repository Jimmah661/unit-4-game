$("#gameStart").on('click', function () {
    $('#gameStart').css({ display: "none" });
    $('#playArea').css({ display: "inherit" });
    var character = $("<div>");
    character.addClass("playerChoice");

    $('#charChoice').append(character);
    $('.playerChoice').append("<img id='yoda' src='./assets/images/yoda.jpg' />");
});