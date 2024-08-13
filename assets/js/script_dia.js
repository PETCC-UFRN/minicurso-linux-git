document.addEventListener("DOMContentLoaded", function() {
    const datasAtivacao = {
        "primeiroDia": new Date("2024-08-04"), // A partir de hoje
        "segundoDia": new Date("2024-08-06"), // A partir de 06/08/2024
        "terceiroDia": new Date("2024-08-08"), // A partir de 08/08/2024
        "quartoDia": new Date("2024-08-11"), // A partir de 11/08/2024
        "quintoDia": new Date("2024-08-13") // A partir de 13/08/2024
    };

    const agora = new Date();

    Object.keys(datasAtivacao).forEach(id => {
        const dataAtivacao = datasAtivacao[id];
        const link = document.getElementById(id);
        if (agora >= dataAtivacao) {
            link.classList.remove('inactive');
        }
    });
});