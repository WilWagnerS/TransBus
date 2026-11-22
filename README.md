# TransBus — Gestão de Frota e Linhas

Sistema web para empresas de transporte gerenciarem **veículos (ônibus e caminhões), motoristas e viagens**, com separação de dados por empresa, autenticação JWT e uma aplicação desktop (JavaFX) para inicializar o sistema do zero.

Projeto da **Avaliação Final**, desenvolvido por **Wilian Wagner dos Santos**.

---

## Tecnologias

| Parte | Tecnologias |
| --- | --- |
| Backend | Java 17, Spring Boot, Spring Security, JWT (Auth0 `java-jwt`), Spring Data JPA, PostgreSQL, Swagger (springdoc), Lombok |
| Frontend | Next.js (React + TypeScript), Redux Toolkit, Axios, Tailwind CSS |
| Desktop | JavaFX (bootstrapping: cria o Administrador do sistema e as empresas clientes) |
| Integrações externas | **ViaCEP** (endereço do motorista pelo CEP) e **BrasilAPI** (razão social e nome fantasia pelo CNPJ) |
| DevOps | Docker, Docker Compose e GitHub Actions (CI) |

## Estrutura do repositório

```
TransBus/
├── src/main/java/com/example/transbus/   → Backend (Spring Boot)
│   ├── domain/          → Entidades, objetos de valor (CPF, Endereco), repositories e portas (interfaces)
│   ├── application/     → Services (regras de negócio) e DTOs (records Request/Response)
│   ├── infra/           → Segurança (JWT), Swagger, CORS e adaptadores do ViaCEP e da BrasilAPI
│   └── presentation/    → Controllers REST
├── front/               → Frontend (Next.js + Redux)
├── back/                → Aplicação Desktop (JavaFX)
├── Dockerfile           → Imagem da API
└── docker-compose.yml   → API + PostgreSQL
```

## Arquitetura (DDD / Clean Code)

- **Apresentação (`presentation`)**: controllers recebem e devolvem **DTOs** e só chamam os services.
- **Aplicação (`application`)**: services com as regras de negócio e o filtro por empresa do usuário logado.
- **Domínio (`domain`)**: entidades, objetos de valor e as **portas** `IViaCepExternalRepository` e `IConsultaCnpjExternalRepository`.
- **Infraestrutura (`infra`)**: implementa as portas (adaptadores `ViaCepExternalRepository` e `BrasilApiCnpjExternalRepository`) e configura a segurança.

As integrações externas seguem a **Inversão de Dependência**: o domínio define a porta, que devolve um tipo do próprio domínio (`Endereco` e `Empresa`), e a infraestrutura chama a API externa e converte a resposta. O domínio não conhece o ViaCEP nem a BrasilAPI.

## Relacionamentos JPA

| Relação | Tipo |
| --- | --- |
| Empresa → Usuários | `@OneToMany` |
| Usuário, Veículo, Motorista, Viagem → Empresa | `@ManyToOne` |
| Viagem → Motorista / Viagem → Veículo | `@ManyToOne` |
| Usuário → CPF / Motorista → Endereço | `@Embedded` (objetos de valor) |

## Perfis de usuário

| Perfil | Como é no sistema | Quem cria | O que pode fazer |
| --- | --- | --- | --- |
| **Administrador** (dono do sistema) | `ROLE_ADMIN` sem empresa | JavaFX | Consulta os dados de **todas** as empresas (com a coluna Empresa nas tabelas, ordenadas por empresa) e gerencia os usuários: editar, bloquear e excluir. Não cadastra veículos, motoristas nem viagens. |
| **Usuário** (empresa cliente) | `ROLE_USER` com empresa | JavaFX, junto com a empresa (um login por empresa) | Usa o sistema completo (veículos, motoristas e viagens), sempre só com os dados da própria empresa. Não acessa a tela de usuários. |

Todas as consultas são filtradas pela empresa do usuário logado. Acesso a um registro de outra empresa responde **404**. Um usuário **bloqueado** pelo Administrador não consegue fazer login.

## Regras de negócio

- Um **motorista** (e um **veículo**) não pode estar em duas viagens ativas no mesmo período de tempo.
- Quando um veículo é marcado como **AVARIADO**, as próximas viagens agendadas para ele são **desvinculadas** (ficam "aguardando veículo"), e a viagem em andamento passa para **COM_PROBLEMA**.
- Ao iniciar uma viagem, o motorista fica `DIRIGINDO` e o veículo `EM_SERVICO`; ao concluir ou cancelar, os dois voltam a ficar disponíveis.

---

## Como rodar

### Pré-requisitos

- Java 17+ e Maven (ou o `mvnw` do projeto)
- Node.js 20+
- PostgreSQL com um banco chamado **`TransBus`** (ou Docker, veja abaixo)

### 1. Backend (porta 8080)

Confira em `src/main/resources/application.properties` o usuário e a senha do PostgreSQL e rode a classe `TransBusApplication`, ou:

```bash
./mvnw spring-boot:run
```

As tabelas são criadas automaticamente (`spring.jpa.hibernate.ddl-auto=update`).

Swagger: **http://localhost:8080/swagger-ui/index.html**

### 2. Desktop JavaFX (primeiro acesso)

```bash
cd back
./mvnw javafx:run
```

1. Entre com a chave definida no `LoginController.java`.
2. Em **Cadastrar Empresa / Admin**:
    - marque **Administrador do sistema** para criar o dono do sistema (sem empresa); ou
    - deixe desmarcado, digite o **CNPJ**, clique em **Buscar CNPJ** (preenche a razão social e o nome fantasia pela BrasilAPI) e informe os dados de acesso, para criar a **Empresa + Usuário**.
3. Em **Cadastrar Marca de Veículo**, cadastre as marcas usadas pelas empresas.

A `SECRET_KEY` dos controllers do JavaFX precisa ser igual ao `spring.secret` do backend.

### 3. Frontend (porta 3000)

```bash
cd front
npm install
npm run dev
```

Acesse **http://localhost:3000** e faça login com um usuário criado pelo JavaFX.

### Docker (opcional)

```bash
docker-compose up -d
```

Sobe o **PostgreSQL** e a **API** (porta 8080) em contêineres. O `docker-compose.yml` define o banco e as credenciais usados pela API dentro do Docker.

O workflow do **GitHub Actions** sobe esse ambiente a cada push na `main` e verifica se o Swagger responde.

---

## Segurança

- `POST /auth/login` devolve um **token JWT**; todos os endpoints de negócio exigem `Authorization: Bearer <token>`.
- Endpoints públicos, usados pelo JavaFX antes de existir qualquer login:
    - `POST /usuarios/admin` e `POST /marcas-veiculo/criar`, protegidos pela `secretKey`;
    - `GET /empresas/consulta-cnpj/{cnpj}`, que só consulta dados públicos e não grava nada.
- `/usuarios/**` exige perfil **ADMIN**.
- Os tokens válidos ficam na tabela `token`, que é limpa quando o backend inicia: reiniciar o backend invalida todos os tokens.

## Frontend: Redux e Axios

- **`authSlice`**: guarda o token e o usuário **somente na store** do Redux (sem cookie ou localStorage).
- **`veiculoSlice`**: guarda a lista de veículos e o filtro de status, compartilhados entre a tela de Veículos e a Home.
- **`services/api.ts`**:
    - interceptor de **requisição**: injeta o token da store em todas as chamadas;
    - interceptor de **resposta**: ao receber **401**, despacha `logout()` e a aplicação volta para a tela de login.
- As telas mudam conforme o perfil: o Administrador vê a coluna **Empresa** e não vê os botões de cadastro e ação; o menu **Usuários** só aparece para ele.

## Endpoints principais

| Recurso | Endpoints |
| --- | --- |
| Autenticação | `POST /auth/login` |
| Usuários | `GET /usuarios`, `POST /usuarios/admin`, `GET/PUT /usuarios/{id}`, `PATCH /usuarios/{id}/status`, `DELETE /usuarios/{id}/excluir`, `GET /usuarios/buscarusuariologado` |
| Veículos | `GET/POST /veiculos`, `GET/PUT /veiculos/{id}`, `PATCH /veiculos/{id}/status`, `DELETE /veiculos/{id}/excluir` |
| Motoristas | `GET/POST /motoristas`, `GET/PUT /motoristas/{id}`, `PATCH /motoristas/{id}/status`, `DELETE /motoristas/{id}/excluir` |
| Viagens | `GET/POST /viagens`, `GET/PUT /viagens/{id}`, `PATCH /viagens/{id}/status`, `DELETE /viagens/{id}/cancelar` |
| Marcas de veículo | `GET /marcas-veiculo`, `POST /marcas-veiculo/criar` |
| Empresas (BrasilAPI) | `GET /empresas/consulta-cnpj/{cnpj}` |
| Endereço (ViaCEP) | `GET /endereco/{cep}` |