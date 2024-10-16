<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="30"/> Aplicação React - Dash Postos <img src="https://example.com/fuel-icon.png" alt="Bico de Combustível" width="30"/>

</div>



<p align="center">
  <a href="https://ibb.co/g7y3jrj">
    <img src="https://i.ibb.co/4fW7mFm/Captura-de-Tela-2024-10-16-a-s-18-18-35.png" alt="Captura-de-Tela-2024-10-16-a-s-18-18-35" border="0" />
  </a>
</p>

<h2 align="center">Dash Postos</h2>

## Descrição

**Dash Postos** é uma aplicação de dashboard desenvolvida em React para exibir os relatórios de vendas de um posto de combustível. A aplicação traz gráficos e informações sobre vendas por bico, forma de pagamento, turno, além de dados de sangria, suprimento e top 5 clientes.

O projeto utiliza **Supabase** como banco de dados backend e faz a busca dos dados baseados na data selecionada. Ele também conta com funcionalidades de ordenação por diferentes critérios, como valor maior/menor ou ordem alfabética.

## Demo Online

Você pode visualizar a aplicação hospedada no Vercel [clicando aqui](https://vendaspostos.vercel.app/).

## Funcionalidades

- **Relatório de Vendas por Bico**: Mostra as vendas por tipo de combustível, litros vendidos e total arrecadado.
- **Relatório de Vendas por Forma de Pagamento**: Mostra as formas de pagamento (Pix, cartão de crédito, débito, etc.) e o total de vendas.
- **Relatório de Vendas por Turno**: Exibe as vendas separadas por turno de operação e o operador responsável.
- **Sangria e Suprimento**: Informa os valores de sangria e suprimento do dia.
- **Top 5 Clientes**: Lista os cinco clientes que mais consumiram no dia selecionado.
- **Ordenação Personalizada**: Ordene os relatórios por maior para menor, menor para maior, ou em ordem alfabética.
- **Seleção de Data**: Escolha uma data para visualizar os relatórios daquele dia.
- **Atualização Dinâmica**: Os dados são atualizados automaticamente ao alterar a data.

## Tecnologias Utilizadas

<p align="center">
  <a href="https://reactjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React.js" />
  </a>
  <a href="https://mui.com/" target="_blank">
    <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material-UI" />
  </a>
  <a href="https://recharts.org/" target="_blank">
    <img src="https://img.shields.io/badge/Recharts-FFBB28?style=for-the-badge&logo=recharts&logoColor=white" alt="Recharts" />
  </a>
  <a href="https://supabase.com/" target="_blank">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </a>
  <a href="https://day.js.org/" target="_blank">
    <img src="https://img.shields.io/badge/Day.js-FFBB28?style=for-the-badge&logo=dayjs&logoColor=white" alt="Day.js" />
  </a>
  <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" target="_blank">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  </a>
</p>

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (v14 ou superior)
- **NPM** ou **Yarn**

### Passos para Instalação

1. **Clone o repositório**:

```bash
git clone https://github.com/amonmelo/DashPostosReact.git
