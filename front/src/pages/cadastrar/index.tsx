import React, { useState, useEffect, ChangeEvent,useCallback, ButtonHTMLAttributes } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from '../../components/Input';
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Medico, Funcionario, Exame, Agente, Ppp } from "../../services/interfaces";
import api from '../../services/api';
import { useHistory, useLocation } from 'react-router-dom'


const Cadastrar: React.FC = () => {

  const [id] = useState(useLocation().pathname.split('/')[2]);
  const [image, setImage] = useState('');
  const history = useHistory();
  const [selectedMedico, setSelectedMedico] = useState('');
  const [medico, setMedico] = useState<Medico[]>([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState('');
  const [Funcionario, setFuncionario] = useState<Funcionario[]>([]);
  const [selectedExame, setSelectedExame] = useState('');
  const [exame, setExame] = useState<Exame[]>([]);
  const [selectedAgente, setSelectedAgente] = useState('');
  const [agente, setAgente] = useState<Agente[]>([]);
  
    
    function handleFile(event: ChangeEvent<HTMLInputElement>) {
      const files = event.target.files;
      if (files) {
        setImage(JSON.stringify(files[0]))
      }
    };

  const load = async () => {
    await api
      .get('medicos')
      .then(({ data }) => {
        setMedico(data.docs)
      })
    await api
      .get('funcionarios')
      .then(({ data }) => {
        setFuncionario(data.docs)
      })
    await api
      .get('exames')
      .then(({ data }) => {
        setExame(data.docs)
      })
    await api
      .get('agentes')
      .then(({ data }) => {
        setAgente(data.docs)
      })
  }
  useEffect(() => {
    load()}, [])

  function handleSelectMedico(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedMedico(res);
  };

  function handleSelectFuncionario(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedFuncionario(res);
  };

  function handleSelectExame(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedExame(res);
  };

  function handleSelectAgente(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedAgente(res);
  };

  async function handleSubmit(data: Ppp) {
      try {
        const schema = Yup.object().shape({
        });

        await schema.validate(data, {
            abortEarly: false
        });

        if (!selectedMedico || !selectedFuncionario) {
          throw new Error("Médico e Funcionario são obrigatórios");
        }

        // let bodyFormData = new FormData();
        // bodyFormData.set('medico_id', selectedMedico);
        // bodyFormData.set('funcionario_id', selectedFuncionario);
        // bodyFormData.set('descricao', data.descricao);
        // if (id) bodyFormData.append('_method', 'PUT')

        let body = {
          medico_id: selectedMedico,
          funcionario_id: selectedFuncionario,
          exame_id: selectedExame,
          agente_id: selectedAgente,
          descricao: data.descricao
        }
        
        try {
          // await api({
          //     method: id ? 'put' : 'post',
          //     url: id ? `ppps/${id}` : 'ppps',
          //     data: bodyFormData,
          //     headers: {'Content-Type': 'multipart/form-data' }
          //     })
          await api({
            method: 'post',
            url: 'ppps',
            data: body,
            headers: {'Content-Type': 'application/json' }
            })

            alert('Cadastro efetuado com sucesso.')

            history.push('/')
        } catch (err) {
            alert('Erro ao cadastrar seus dados.')
        }
    } catch ( error ) {
        console.log(error)
    }
  }

    return(
        <Container>
            <header>
                <img src={Logo} alt="medico" />

                <span>Cadastro de Exames</span>

                <a href="/">
                <FiArrowLeft />
                    Voltar
                </a>
            </header>

        <Form onSubmit={handleSubmit}>

        <div className="row">
          <div className="col-12">
            <input type="file" onChange={handleFile} />
          </div>
        </div>


        <select
            value={selectedMedico}
            onChange={handleSelectMedico}
          >
            <option>Selecione o Medico</option>
            {
              medico.length > 0
              ? medico.map((o) => {
                  return (
                    <option key={o._id} value={o._id}>{o.nome}</option>
                  )
                })
              : <option>Nenhum Medico encontrado</option>
            }
        </select>
           
        <select
          value={selectedFuncionario}
          onChange={handleSelectFuncionario}
        >
        <option>Selecione o Funcionario</option>
        
      {
        Funcionario.length > 0
        ? Funcionario.map((o) => {
            return (
              <option key={o._id} value={o._id}>{o.nome}</option>
            )
          })
        : <option>Nenhum Funcionario encontrado</option>
      }
      
        </select>
        
        <select
            value={selectedExame}
            onChange={handleSelectExame}
          >
            <option>Selecione o Exame</option>
            {
              exame.length > 0
              ? exame.map((o) => {
                  return (
                    <option key={o._id} value={o._id}>{o.nome}</option>
                  )
                })
              : <option>Nenhum Exame encontrado</option>
            }
        </select>
        
        <select
            value={selectedAgente}
            onChange={handleSelectAgente}
          >
            <option>Selecione o Agente</option>
            {
              agente.length > 0
              ? agente.map((o) => {
                  return (
                    <option key={o._id} value={o._id}>{o.nome}</option>
                  )
                })
              : <option>Nenhum Agente encontrado</option>
            }
        </select>
        <br></br>
        <Input name="descricao" placeholder="Descricao" />



          <Button type="submit">
            Cadastrar Exame
          </Button>
        </Form>
      </Container>
            
    );
}

export default Cadastrar;