# Cadastro de Pessoas com Docker

Projeto full-stack para cadastro de pessoas com autopreenchimento de endereço via API ViaCEP, banco de dados PostgreSQL e orquestração de containers.

## Tecnologias Utilizadas

- Frontend: HTML, CSS, JavaScript (Nginx)
- Backend: Node.js (Express)
- Banco de Dados: PostgreSQL
- API Externa: ViaCEP
- Orquestração: Docker Compose

## Estrutura dos Containers

A aplicação é dividida em 3 serviços:

1. web_pessoas (Frontend): Porta 8081
2. api_pessoas (Backend): Porta 3000
3. db_pessoas (PostgreSQL): Porta 5432 (uso interno com volume persistente)

## Como Executar

### Pré-requisitos
- Git
- Docker Desktop

### Passo a Passo

1. Clone o repositório:
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

2. Acesse a pasta do projeto:
   cd SEU_REPOSITORIO

3. Suba os containers com o Docker Compose:
   docker compose up -d --build

4. Acesse a aplicação no navegador:
   http://localhost:8081

## Como Encerrar

Para parar a execução dos containers:
docker compose down