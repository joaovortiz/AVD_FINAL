export interface Exame {
    _id: string;
    nome: string;
}

export interface Medico {
    _id: string;
    nome: string;
    
}

export interface Funcionario {
    _id: string;
    nome: string;
}

export interface Agente {
    _id: string;
    nome: string;
}

export interface Ppp {
    _id: string;
    funcionario_id: string;
    funcionario: {
        nome: string;
    };
    exame_id: string;
    exame: {
        nome: string;
    };
    agente_id: string;
    agente: {
        nome: string;
    };
    medico_id: string;
    medico: {
        nome: string;
    };
    descricao: string;
    image: string;
    createdAt: string;
}