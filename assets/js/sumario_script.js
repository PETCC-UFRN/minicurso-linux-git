document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.getElementById("toggle-button");
    var sumario = document.getElementById("sumario");

    toggleButton.addEventListener("click", function() {
        sumario.classList.toggle("hidden");
        if (sumario.classList.contains("hidden")) {
            toggleButton.textContent = "Mostrar Sumário";
        } else {
            toggleButton.textContent = "Esconder Sumário";
        }
    });
});
