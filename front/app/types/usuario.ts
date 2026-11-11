// Define a classe que representa um usuário no frontend.
export class Usuario {

    constructor(

        // ID do usuário. null quando ainda não possui ID.
        public id: number | null,

        // Nome do usuário.
        public nome: string,

        // CPF do usuário.
        public cpf: string,

        // E-mail do usuário.
        public email: string,

        // Senha do usuário.
        public senha: string,

        // Status atual do usuário (ATIVO, BLOQUEADO, EXCLUIDO).
        public status: string,

        // Perfil: ROLE_ADMIN (admin/global) ou ROLE_USER (funcionário).
        public role?: string,

        // Nome da empresa (ou "Global (dono do sistema)").
        public empresa?: string

    ) { }
}

// Propriedades recebidas pelo formulário de usuário.
export interface UsuarioFormProps {
    // Usuário existente (usado na edição).
    usuarioExistente?: Usuario
}