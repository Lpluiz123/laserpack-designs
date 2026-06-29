Para rodar o servidor: npx tsx src/index.ts

    Para testar se o servidor está vivo (no navegador): Acesse http://localhost:3000 (ele vai dar um erro de "Cannot GET", o que é normal, pois ainda não criamos uma página inicial, apenas a rota /gerar-link).

    Para enviar um pedido para o servidor: Você usaria uma ferramenta como o Postman ou o Insomnia, ou até mesmo um código fetch dentro do JavaScript da sua Landing Page.

Dica de ouro: O próximo desafio, quando você estiver pronto, será configurar o CORS (Cross-Origin Resource Sharing). Sem ele, seu navegador pode bloquear a Landing Page de falar com o servidor por motivos de segurança.

------------------------------------------------------------
Interface: Define o "formato" dos dados (o contrato entre o que você espera e o que você recebe).

Service: Contém a lógica de negócio (o "cérebro" que gera o link).

API (Server): É a "porta de entrada" (via Express) que recebe os dados externos e usa o Service para responder.

Client (no caso, o curl): É quem faz a pergunta para a porta de entrada.

-----------------------------------------------------

# Projeto Landing Page Laser Cut

Este projeto contém o servidor de backend que gerencia o rastreamento de afiliados, cliques e vendas.

## Como rodar o servidor
1. Certifique-se de estar na pasta `src/server/`.
2. Execute o comando:
   `npx tsx src/index.ts`

## Rotas da API
- `POST /gerar-link`: Gera o link de afiliado com base em `nome`, `urlBase` e `meuIdAfiliado`.
- `POST /registrar-clique`: Registra o interesse inicial (clique no CTA da Landing Page).
- `POST /registrar-conversao`: Registra a chegada ao checkout (fundo do funil).

## Estrutura do Funil
1. **Atração**: Cliente clica no botão (dispara `/registrar-clique`).
2. **Navegação**: Cliente vai para a página do produtor.
3. **Conversão**: Cliente chega ao formulário de compra (dispara `/registrar-conversao`).