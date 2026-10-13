// Define a classe que representa um usuário no frontend.
export class Usuario {

    // Construtor responsável por receber e inicializar
    // os dados do usuário.
    constructor(

        // ID do usuário.
        // Pode ser um número ou null quando ainda não possui ID.
        public id: number | null,

        // Nome do usuário.
        public nome: string,

        // CPF do usuário.
        public cpf: string,

        // E-mail do usuário.
        public email: string,

        // Senha do usuário.
        public senha: string,

        // Status atual do usuário.
        public status: string

    ) {}
}

// Define as propriedades que podem ser recebidas
// pelo componente de formulário de usuário.
export interface UsuarioFormProps{

    // usuarioExistente é uma propriedade opcional.
    //
    // Quando informado, representa um usuário existente
    // que será utilizado pelo formulário, normalmente
    // durante uma edição.
    usuarioExistente?:Usuario
}