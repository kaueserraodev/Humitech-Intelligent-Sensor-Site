// CEP AUTOMÁTICO
document.getElementById("cep").addEventListener("blur", function () {
  let cep = this.value.replace(/\D/g, "");

  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(dados => {
      if (dados.erro) return;

      document.getElementById("rua").value = dados.logradouro;
      document.getElementById("bairro").value = dados.bairro;
      document.getElementById("cidade").value = dados.localidade;
      document.getElementById("estado").value = dados.uf;
    });
});

// FORM
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Orçamento enviado 🚀");
});

// ANIMAÇÃO DE NÚMEROS
function animarNumero(el, final) {
  let atual = 0;
  let incremento = final / 100;

  let intervalo = setInterval(() => {
    atual += incremento;
    if (atual >= final) {
      el.innerText = final + (final < 100 ? "%" : "");
      clearInterval(intervalo);
    } else {
      el.innerText = Math.floor(atual);
    }
  }, 20);
}

// OBSERVER
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let el = entry.target;
      let valor = el.getAttribute("data-num");

      animarNumero(el, valor);
      observer.unobserve(el);
    }
  });
});

document.querySelectorAll(".numero").forEach(el => {
  observer.observe(el);
});