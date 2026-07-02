export const handleClick = async (valorDoProduto, sessionId) => {

  const baseUrl = "https://www.digilabzone.com/lasercutfiles?aff=luizfellipeilha25e3"
  const urlComRastreio = `${baseUrl}&tracking_id=${sessionId}`

  // 2. Avisa o seu banco de dados

  try {
    await fetch("https://backend-laserpack-designs.onrender.com/api/eventos", {
      method: "POST",
      body: JSON.stringify({
        sessionId: sessionId,
        valor: valorDoProduto,
        tipo: "click_checkout",
      }),
    });
  } catch (error) {
    // Apenas logamos o erro para você corrigir depois
    console.error("Falha ao registrar clique no banco, mas a venda segue:", erro);
  }

  //3. Manda o usuário para a página da Digistore24
  window.location.href = urlComRastreio;
};
