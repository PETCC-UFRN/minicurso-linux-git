document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.getElementById("toggle-button");
    var sumario = document.getElementById("sumario");

    var sumarioEstado = localStorage.getItem("sumarioEstado");
    if (sumarioEstado === "hidden") {
        sumario.classList.add("hidden");
        toggleButton.textContent = "Mostrar Sumário";
    }

    toggleButton.addEventListener("click", function() {
        sumario.classList.toggle("hidden");
        if (sumario.classList.contains("hidden")) {
            toggleButton.textContent = "Mostrar Sumário";
            localStorage.setItem("sumarioEstado", "hidden");
        } else {
            toggleButton.textContent = "Esconder Sumário";
            localStorage.removeItem("sumarioEstado");
        }
    });
});

