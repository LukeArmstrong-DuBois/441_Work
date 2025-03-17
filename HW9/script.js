$(document).ready(function () {
    $("button").click(function () {
        $.getJSON("data.json", function (data) {
            $("#data-container").displayPokemon({
                data: data.pokemon
            });
        });
    });
});
