export const handleClick = async (valorDoProduto) => {
  const sessionId = localStorage.getItem("user_session");
  if (!sessionId) {
    console.error("ERRO: Tentou clicar sem um ID de sessão!");
    return; // Para a execução aqui para não salvar dados corrompidos
  }
  try {
    const response = await fetch(
      "https://backend-laserpack-designs.onrender.com/api/evento",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId,
          valor: valorDoProduto,
          tipo: "CLICK",
        }),
      },
    );

    if (response.ok) {
      console.log("Registro sucesso, redirecionando...");
      const baseUrl =
        "https://www.digilabzone.com/lasercutfiles?aff=luizfellipeilha25e3";
      window.location.href = `${baseUrl}&tracking_id=${sessionId}`;
    }
  } catch (error) {
    console.error(
      "Falha ao registrar, mas vamos redirecionar assim mesmo:",
      error,
    );
    // Opcional: Redirecionar mesmo se o banco falhar para não perder a venda
    window.location.href = `https://www.digilabzone.com/lasercutfiles?aff=luizfellipeilha25e3&tracking_id=${sessionId}`;
  }
};
