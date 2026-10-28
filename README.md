# Capiva-Pizza — Projeto Educacional

Projeto de criação de um site para uma pizzaria fictícia, desenvolvido em grupo durante o curso do **SENAI**. O projeto tem finalidade exclusivamente educacional e foi criado para praticar desenvolvimento web, organização de páginas, estruturação de conteúdo, regras de negócio e trabalho em equipe com Git e GitHub.

## Sobre o projeto

O **Capiva-Pizza** apresenta os produtos e as informações da pizzaria de forma clara e objetiva. O visitante pode navegar pela página inicial, consultar o cardápio, visualizar categorias, conferir detalhes dos pratos, consultar preços e ingredientes, conhecer a localização e solicitar uma reserva de mesa.

O diferencial do produto é permitir que o cliente escolha o recheio da massa de acordo com a sua preferência.

## Visão do produto

### Problema ou necessidade

O website precisa disponibilizar:

- páginas organizadas;
- produtos do cardápio;
- informações pertinentes sobre os produtos;
- método de pagamento;
- dados de localização e contato da pizzaria.

### Público-alvo

- Classe trabalhadora, especialmente a classe C;
- famílias que desejam conhecer o cardápio e as informações da pizzaria;
- clientes que procuram uma experiência simples e objetiva para consultar produtos e solicitar uma reserva.

### Objetivo do website

Mostrar os produtos e a localização da pizzaria de forma clara, objetiva e acessível.

## Integrantes e responsabilidades

- **Gabriel Lúcio de Araújo** — Scrum Master;
- **Jacó de Souza Rufino** — Desenvolvedor;
- **Jonas Dawid** — Product Owner;
- **Jhon Wensky Pierre** — Desenvolvedor;
- **Davi Miguel Guerra** — Desenvolvedor.

## Objetivos do projeto

- Praticar o desenvolvimento de páginas web;
- aprender a organizar a estrutura de um projeto;
- desenvolver uma interface para uma pizzaria;
- aplicar conhecimentos de HTML, CSS e JavaScript;
- trabalhar em equipe utilizando Git e GitHub;
- aplicar conceitos de Scrum, organização e versionamento de código;
- documentar regras de negócio, validações e estados do sistema.

## Regras de negócio

### Entidades e dados principais

#### Produtos do cardápio

Cada produto deve apresentar:

- nome;
- categoria;
- descrição;
- ingredientes;
- imagem;
- preço;
- disponibilidade.

#### Categorias

- Pizzas;
- entradas;
- combos;
- sobremesas.

#### Reservas

Uma reserva deve conter:

- nome do cliente;
- telefone;
- data;
- horário;
- quantidade de pessoas;
- status da reserva.

#### Informações da pizzaria

- endereço;
- telefone;
- horário de funcionamento;
- redes sociais.

### Ações do usuário

O usuário poderá:

- navegar pela página inicial;
- acessar o cardápio;
- visualizar as categorias;
- consultar detalhes dos pratos;
- consultar preços e ingredientes;
- solicitar uma reserva de mesa;
- consultar as informações de contato da pizzaria.

### Regras e validações

- Todos os campos obrigatórios devem ser preenchidos para realizar uma reserva;
- o telefone deve possuir um formato válido;
- a data não pode ser anterior à data atual;
- o horário deve estar dentro do horário de funcionamento da pizzaria;
- não devem ser permitidas reservas para datas ou horários anteriores ao momento atual;
- a quantidade de pessoas deve ser um número maior que zero;
- produtos devem possuir nome e preço preenchidos;
- produtos indisponíveis não devem ser apresentados como disponíveis para pedido.

### Estados do sistema

#### Produtos

- disponíveis;
- indisponíveis.

#### Reservas

- solicitadas;
- confirmadas;
- canceladas;
- concluídas.

Uma reserva recém-enviada permanece como **solicitada** até ser confirmada pela pizzaria.

## Funcionalidades do MVP

- Página inicial com apresentação da pizzaria;
- cardápio organizado por categorias;
- exibição de nome, descrição, ingredientes, imagem e preço dos produtos;
- detalhes dos pratos;
- informações de endereço, telefone, horário e redes sociais;
- formulário de reserva;
- formulário de contato;
- interface responsiva para diferentes tamanhos de tela;
- possibilidade de escolha do recheio da massa, conforme a proposta do produto.

## Funcionalidades futuras

As funcionalidades abaixo ficam fora do MVP inicial e podem exigir back-end, banco de dados e autenticação:

- implementar pedidos online e carrinho de compras;
- permitir pagamento online;
- criar cadastro e login de clientes;
- enviar confirmação de reserva por WhatsApp ou e-mail;
- criar área administrativa para gerenciamento de produtos e reservas;
- permitir avaliações dos clientes.

## Tecnologias utilizadas

- **HTML5** — estrutura semântica das páginas;
- **CSS3** — estilização, identidade visual e layout responsivo;
- **JavaScript** — interações, filtros, carrinho demonstrativo e validações;
- **Git** — controle de versão;
- **GitHub** — hospedagem do código e colaboração da equipe.

## Estrutura do projeto

```text
VingadoresDaProgramacao/
│
├── PROJETO/
│   └── SITE/
│       └── PAGINAS/
│
└── README.md
```

A estrutura pode ser complementada com pastas de imagens, estilos, scripts e páginas específicas conforme a evolução do projeto.

## Como executar

1. Clone este repositório:

   ```bash
   git clone https://github.com/gabrielaraujo-eng/VingadoresDaProgramacao.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd VingadoresDaProgramacao
   ```

3. Abra a página inicial do site em um navegador ou utilize a extensão **Live Server** do Visual Studio Code.

## Finalidade

O Capiva-Pizza foi desenvolvido exclusivamente como atividade educacional do curso do SENAI. O projeto busca fortalecer conhecimentos técnicos, organização, comunicação, colaboração e evolução profissional dos integrantes.
