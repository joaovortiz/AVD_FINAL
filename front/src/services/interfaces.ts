export interface Exame {
    _id: string;
    doutor_id: string;
    paciente_id: string;
    data: string;
    hora: string;
    doutor: {
        nome: string;
       
    };
    Funcionario: {
        nome: string;
    };
}

export interface Doutor {
    _id: string;
    nome: string;
    
}

export interface Funcionario {
    _id: string;
    nome: string;
}
export interface PPP {
  funcionario_id: String,
  exame_id: String,
  agente_id: String,
  medico_id: String,
  descricao: String,
  image: String
}