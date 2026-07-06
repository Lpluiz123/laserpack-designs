export const handleClick = async (valorDoProduto) => {
  const sessionId = localStorage.getItem("user_session");

  const DIGISTORE_LINK = "https://www.digistore24.com/redir/639602/luizfellipeilha25e3/";

  if (!sessionId) {
    console.warn("Sem sessão, redirecionando sem registro.");
    window.location.href = DIGISTORE_LINK;
    return;
  }

  try {
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
    console.error("Erro ao registrar clique:", error);
  } finally {
    // 2. MUDANÇA: Usamos 'tid' que é o parâmetro de rastreamento da Digistore
    window.location.href = `${DIGISTORE_LINK}?tid=${sessionId}`;
  }
};