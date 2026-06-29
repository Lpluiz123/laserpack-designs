const BASE_URL = "http://localhost:3000";

export async function registarClick(produtoId, meuIdAfiliado) {
  try {
    const response = await fetch(`${BASE_URL}/registrar-click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produtoId, meuIdAfiliado }),
      
    });

    return await response.json();
  } catch (error) {
    console.error("Erro na comunicação com o servidor:", error);
    return { error: true };
  }
}
