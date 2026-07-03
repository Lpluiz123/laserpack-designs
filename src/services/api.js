export const handleClick = async (valorDoProduto) => {
  const sessionId = localStorage.getItem("user_session");
  const BASE_URL = "https://www.digilabzone.com/lasercutfiles?aff=luizfellipeilha25e3";

  // Se não tem sessão, apenas redireciona sem tentar salvar (evita erro)
  if (!sessionId) {
    console.warn("Sem sessão, redirecionando sem registro.");
    window.location.href = BASE_URL;
    return;
  }

  try {
    // Tenta registrar o clique
    await fetch("https://backend-laserpack-designs.onrender.com/api/evento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        valor: valorDoProduto,
        tipo: "CLICK",
      }),
    });
  } catch (error) {
    console.error("Erro ao registrar clique (silencioso):", error);
  } finally {
    // Redireciona sempre, independente de sucesso ou falha no POST
    window.location.href = `${BASE_URL}&tracking_id=${sessionId}`;
  }
};