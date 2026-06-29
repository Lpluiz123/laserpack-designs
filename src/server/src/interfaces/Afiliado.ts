
export interface ProdutoAfiliado {
    id: string;
    nome: string;
    urlBase: string;
    meuIdAfiliado: string;
}

export interface ConfiguracaoRastreamento {
    utmSource: string;
    utmCampaing: string;
    dataClique: Date;
}