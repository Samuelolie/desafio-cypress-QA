# 🧪 Testes E2E – Loja EBAC (Cypress)

Automação E2E da loja **http://lojaebac.ebaconline.art.br** utilizando **Cypress**, com geração de dados faker brasileiros e comandos customizados para executar o fluxo completo de compra e autenticação.

---

## 📦 Tecnologias Utilizadas

- 🚀 Cypress (Testes E2E)
- 🎭 @faker-js/faker (Dados fake brasileiros)
- ⚙️ Node.js / npm
- 📜 JavaScript ES6+

---

# 🚀 Como Rodar o Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Samuelolie/desafio-cypress-QA
cd desafio-cypress-QA
```

---

## 2️⃣ Instalar dependências

```bash
npm install
```

---

## 3️⃣ Executar os testes no modo interativo

```bash
npx cypress open
```

Selecione:

- E2E Testing  
- Navegador  
- Teste desejado  

---

## 4️⃣ Executar no modo headless

```bash
npx cypress run
```

---

# ⚙️ Configuração de Variáveis de Ambiente (ENV)

Crie o arquivo:

📁 **.env**

```dotenv
EMAIL=SeuEmailCadastrado
SENHA=SuaSenhaCadastrada
```

Utilizando no código:

```js
Cypress.env("email");
Cypress.env("senha");
```

---

# 👤 Geração de Dados Fake (Faker)

O projeto utiliza **@faker-js/faker** com locale **pt_BR**, gerando dados 100% brasileiros:

- Nome  
- Sobrenome  
- Endereço  
- Cidade  
- CEP  
- Celular **válido (Anatel)**  
- Email único  

---

## 📁 Arquivo responsável  
`cypress/support/utils/generatePerson.js`

---

## 📌 Código Utilizado

```js
import { faker } from "@faker-js/faker/locale/pt_BR";

export function generateFakeUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    zip: faker.location.zipCode("#####-###"),
    phone: faker.helpers.fromRegExp(/\([1-9]{2}\) 9[6-9][0-9]{3}-[0-9]{4}/),
    email: faker.internet.email()
  };
}
```

---

## 📌 Como usar no teste

```js
import { generateFakeUser } from "../support/utils/generatePerson";

const user = generateFakeUser();
```

---

# 🧩 Comandos Customizados (Cypress Commands)

Local:  
📁 `cypress/support/commands.js`

---

### 🔹 Selecionar produto

```js
cy.selectProduct("Ingrid Running Jacket", "S", "Red");
```

---

### 🔹 Adicionar ao carrinho

```js
cy.buyProduct();
```

---

### 🔹 Preencher dados do comprador

```js
cy.formBuyer(
  user.firstName,
  user.lastName,
  user.address,
  user.city,
  user.zip,
  user.phone,
  user.email
);
```

---

# 📁 Estrutura do Projeto

```
cypress/
 ├── e2e/
 │    ├── checkout.spec.js      → Teste E2E do checkout
 │    └── login.spec.js         → Testes de login
 ├── fixtures/                  → Massa de teste estática
 ├── support/
 │     ├── commands.js          → Comandos customizados
 │     ├── utils/
 │     │     └── generatePerson.js → Gerador de dados fake
 │     ├── functions/
 │     │     ├── checkout.js    → Funções auxiliares de checkout
 │     │     └── login.js       → Funções auxiliares de login
 │     └── e2e.js               → Configurações globais
cypress.config.js               → Configurações do Cypress
package.json                    → Dependências
```

---

# 🧭 Cenários E2E – Checkout

### 🟩 **Feature: Checkout com sucesso**

```
Given que o usuário acessa a plataforma
When seleciona um produto
And confirma a compra
Then o checkout deve ser concluído com sucesso
And deve exibir mensagem de sucesso
```

---

### 🟥 **Feature: Produto sem estoque**

```
Given que o usuário acessa a plataforma
When seleciona um produto sem estoque
Then deve exibir a mensagem "Fora de estoque"
```

---

### 🟧 **Feature: Campo inválido no formulário**

```
Given que o usuário acessa a plataforma
When seleciona um produto
And informa dados inválidos no formulário
Then o sistema deve exibir mensagem de erro
```

---

### 🟨 **Feature: Campo obrigatório não preenchido**

```
Given que o usuário acessa a plataforma
When seleciona um produto
And deixa campos obrigatórios em branco
Then o sistema deve exibir mensagens de campo obrigatório
```

---

### 📌 Justificativa dos Cenários de Checkout

Os cenários selecionados cobrem o **coração do e-commerce**, garantindo:

- fluxo completo de compra  
- cenários positivos e negativos  
- validação de campos obrigatórios  
- manipulação adequada de erros  

---

# 🔐 Cenários – Login

### 🟩 **Login com sucesso**

```
Given que o usuário acessa a plataforma
When informa login corretamente
Then deve logar com sucesso
```

---

### 🟥 **Login incorreto**

```
Given que o usuário acessa a plataforma
When informa login inválido
Then deve retornar mensagem de email ou senha inválida
```

---

### 🟦 **Logout via botão do cabeçalho**

```
Given que o usuário está logado
When clicar no botão de logout do cabeçalho
Then o sistema deve deslogar com sucesso
```

---

### 🟪 **Logout via botão "Sair"**

```
Given que o usuário está logado
When clicar no botão Sair
Then o sistema deve deslogar com sucesso
```

---

### 📌 Justificativa dos Cenários de Login

O login é uma área sensível do sistema.  
Foram testados:

- Autenticação válida  
- Tratamento de credenciais inválidas  
- Fluxos de logout  
- Comportamento esperado do sistema  

---

# 🎉 Conclusão

Este projeto entrega uma automação completa, modular e escalável, utilizando:

- Dados dinâmicos com Faker  
- Comandos customizados  
- Cenários positivos e negativos  
- Validações completas do fluxo principal de compra  
- Testes de autenticação  

Pronto para ser evoluído e integrado em pipelines CI/CD.

