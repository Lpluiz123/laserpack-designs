import { ProdutoAfiliado } from "../interfaces/Afiliado.js"; // Adicione .js

export function criarLinkAfiliado(produto: ProdutoAfiliado): string {
    const linkCompleto = `${produto.urlBase}?ref=${produto.meuIdAfiliado}`

    return linkCompleto
}