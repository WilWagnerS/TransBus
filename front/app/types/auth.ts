// Define uma interface que representa a resposta
// recebida pelo frontend após um login realizado com sucesso.
export interface LoginResponse {

    // Define a propriedade token como uma string.
    // O backend envia o JWT nessa propriedade.
    token: string
}