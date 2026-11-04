// CARROSSEL DO BANNER PROMOCIONAL
// Este carrossel fica exatamente no espaço do antigo banner-promocional.

const faixaBanner = document.querySelector(".faixa-banner");
const imagensBanner = document.querySelectorAll(".faixa-banner img");
const anteriorBanner = document.querySelector(".anterior-banner");
const proximoBanner = document.querySelector(".proximo-banner");
const indicadoresBanner = document.querySelectorAll(".indicador-banner");

let bannerAtual = 0;

function mostrarBanner(indice) {
    bannerAtual = indice;

    // Move a faixa para exibir somente o banner selecionado.
    faixaBanner.style.transform = `translateX(-${bannerAtual * 100}%)`;

    // Destaca o indicador do banner que está aparecendo.
    indicadoresBanner.forEach(function (indicador, posicao) {
        indicador.classList.toggle("ativo", posicao === bannerAtual);
    });
}

proximoBanner.addEventListener("click", function () {
    bannerAtual++;

    if (bannerAtual >= imagensBanner.length) {
        bannerAtual = 0;
    }

    mostrarBanner(bannerAtual);
});

anteriorBanner.addEventListener("click", function () {
    bannerAtual--;

    if (bannerAtual < 0) {
        bannerAtual = imagensBanner.length - 1;
    }

    mostrarBanner(bannerAtual);
});

// Permite clicar nos pontinhos para escolher um banner.
indicadoresBanner.forEach(function (indicador, indice) {
    indicador.addEventListener("click", function () {
        mostrarBanner(indice);
    });
});
