# Sistemas Distribuídos

Este projeto é uma aplicação de exemplo que demonstra o uso de uma API RESTful para gerenciamento de registros em um sistema distribuído, utilizando o framework Flask. A aplicação suporta operações de criação, leitura, atualização e exclusão (CRUD) de registros.

## 🚀 Funcionalidades

A aplicação oferece as seguintes funcionalidades:
- 🔍 **Buscar registros**: Busca registros por nome.
- ➕ **Criar registros**: Adiciona novos registros com nome e e-mail.
- ✏️ **Atualizar registros**: Atualiza as informações de um registro existente (nome ou e-mail).
- 🗑️ **Deletar registros**: Remove registros pelo nome.
- 📜 **Listar métodos suportados**: Consulta os métodos HTTP suportados pela API.

## 🛠️ Tecnologias Utilizadas

As seguintes tecnologias foram usadas na construção do projeto:

- ![Python](https://img.shields.io/badge/Python-3.6%2B-blue?logo=python&logoColor=white) **Python**: Linguagem principal para a implementação do backend.
- ![Flask](https://img.shields.io/badge/Flask-2.0+-black?logo=flask&logoColor=white) **Flask**: Framework web utilizado para a criação da API RESTful.
- ![Flask-CORS](https://img.shields.io/badge/Flask--CORS-Enabled-orange) **Flask-CORS**: Biblioteca usada para permitir requisições de diferentes origens, facilitando o desenvolvimento de aplicações front-end.

## 📋 Pré-requisitos

Para rodar a aplicação, você precisará de:
- ![Python](https://img.shields.io/badge/Python-3.6%2B-blue?logo=python&logoColor=white) **Python 3.6 ou superior** instalado na sua máquina.
- ![Pip](https://img.shields.io/badge/Pip-Package_Manager-yellow) **Pip** (gerenciador de pacotes do Python) configurado.

## ⚙️ Instalação

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/Paloma13744/Aplicacao_Eventos.git
´´´

2. **Instale as dependências necessárias:**:
    ```bash
pip install flask
pip install flask-cors
´´´

## 📡 Endpoints da API
A seguir estão os endpoints disponíveis na API:

- GET /: Busca registros pelo nome (parâmetro name opcional).
- POST /: Cria um novo registro com name e email no corpo da requisição.
- PUT /: Atualiza um registro existente com base no name fornecido (corpo da requisição deve conter os dados atualizados).
- PATCH /: Atualiza parcialmente um registro com base no name fornecido (corpo da requisição deve conter o campo a ser atualizado).
- DELETE /: Deleta um registro com base no name fornecido.
- OPTIONS /: Retorna os métodos HTTP suportados pela API.

  

   
