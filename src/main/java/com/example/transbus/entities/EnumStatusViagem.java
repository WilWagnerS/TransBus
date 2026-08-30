package com.example.transbus.entities;

public enum EnumStatusViagem {
    AGENDADA, //Viagem criada e aguardando início.
    EM_ANDAMENTO, //Está realizando uma viagem/rota.
    CONCLUIDA, //Viagem finalizada com sucesso.
    COM_PROBLEMA, //Ocorreu algum problema durante a viagem.(add campo de descrição quando colocar esta opção rodar).
    CANCELADA //Viagem cancelada.(add campo de observações quando colocar esta opção rodar).
}
