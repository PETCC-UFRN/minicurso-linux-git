document.addEventListener("DOMContentLoaded", function () {
  const datasAtivacao = {
    "primeiroDia": new Date("2025-03-07"), // A partir de 07/03/2025
    "segundoDia": new Date("2025-03-11"), // A partir de 11/03/2025
    "terceiroDia": new Date("2025-03-12"), // A partir de 12/03/2025
    "quartoDia": new Date("2025-03-13"), // A partir de 13/03/2025
    "quintoDia": new Date("2025-03-14"), // A partir de 14/03/2025
    "projetoFinalSimplificado": new Date("2025-03-14") // A partir de 14/03/2025
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
