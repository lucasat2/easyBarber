# 💈 EasyBarber

**EasyBarber** é uma aplicação web desenvolvida para facilitar o gerenciamento de barbearias, permitindo o agendamento de serviços, controle de usuários, equipe, clientes e serviços oferecidos.

A aplicação possui funcionalidades como:

✨ Cadastro e login de usuários  
📅 Agendamento de horários  
🧼 Controle de serviços oferecidos  
🧑‍🤝‍🧑 Gerenciamento de clientes e funcionários  
🌐 Interface de agendamento externa  
🧰 Scripts para criação e reinicialização do banco de dados

---

## 🛠️ Tecnologias Utilizadas

- ⚙️ Node.js
- 🚀 Express.js
- 🐘 PostgreSQL
- 🎨 HTML/CSS
- 🧠 JavaScript
- 🌐 Nginx (proxy reverso)

---

## 📁 Estrutura do Projeto

```
easyBarber/
├── src/
│   ├── controller/         # Lógica das rotas (users, login, serviços, etc.)
│   ├── DTO/                # Data Transfer Objects
│   ├── config/             # Configurações da aplicação
│   ├── db/                 # Conexão com o banco de dados
│   ├── middleware/         # Middlewares customizados
│   ├── public/             # Arquivos estáticos e páginas HTML
│   └── app.js              # Arquivo principal da aplicação
├── scripts/                # 📜 Scripts SQL para o banco
├── nginx/                  # ⚙️ Configuração do servidor nginx
├── .env-example            # 🌡️ Exemplo de variáveis de ambiente
├── package.json            # 📦 Dependências e scripts npm
└── README.md               # 📘 Este arquivo
```

---

## 🚀 Como Executar

### 📌 Pré-requisitos

- ✅ Node.js instalado
- ✅ PostgreSQL configurado


### 💻 Instalação

```bash
git clone https://github.com/seu-usuario/easyBarber.git
cd easyBarber
npm install
```

### ⚙️ Configuração

Copie o arquivo `.env-example` para `.env` e ajuste com suas variáveis:

```bash
cp .env-example .env
```

### 🗃️ Banco de Dados

Execute os scripts SQL na pasta `scripts/`:

```sql
-- createTables.sql
-- insertData.sql
-- resetDatabase.sql (opcional)
```

### ▶️ Execução

```bash
npm start
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## 🌍 Configuração do Nginx (opcional)

Você pode usar o arquivo `nginx/sites.conf` para configurar um proxy reverso em ambiente de produção com Nginx.

---

## 🖼️ Interface Pública

A pasta `src/public/` contém a interface de agendamento externo com imagens e páginas HTML estáticas prontas para uso.

---

## 📌 Status do Projeto

🚧 Em desenvolvimento — melhorias e novas funcionalidades a caminho!

---

## 👤 Autor

Feito por [Lucas Ataide,Gabriell Queiroz,Fabiano Santos,Bruno Catunda]  
🔗[santosfabin](https://github.com/santosfabin )
🔗[lucasat2](https://github.com/lucasat2 )
🔗[BrunoCat42](https://github.com/BrunoCat42 )
🔗[gbrQueiroz](https://github.com/gbrQueiroz )
