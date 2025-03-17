(function ($) {
    $.fn.displayPokemon = function (options) {
        const settings = $.extend({
            data: [],
        }, options);

        return this.each(function () {
            const container = $(this);
            container.empty();

            $.each(settings.data, function (i, pokemon) {
                container.append(`
                    <div class="pokemon-card">
                        <h2>${pokemon.name}</h2>
                        <img src="${pokemon.img}" alt="${pokemon.name}" />
                        <p><strong>Type:</strong> ${pokemon.type.join(", ")}</p>
                        <p><strong>Height:</strong> ${pokemon.height}</p>
                        <p><strong>Weight:</strong> ${pokemon.weight}</p>
                        <p><strong>Weaknesses:</strong> ${pokemon.weaknesses.join(", ")}</p>
                        <p><strong>Next Evolution:</strong> ${pokemon.next_evolution ? pokemon.next_evolution.map(evo => evo.name).join(", ") : "None"}</p>
                    </div>
                `);
            });
        });
    };
}(jQuery));
