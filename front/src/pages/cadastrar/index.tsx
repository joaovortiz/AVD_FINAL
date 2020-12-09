import React, { useState, useEffect, ChangeEvent,useCallback, ButtonHTMLAttributes } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from '../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Doutor, Funcionario, Exame } from "../../services/interfaces";
import api from '../../services/api';


const Cadastrar: React.FC = () => {

  const history = useHistory();
  const [selectedDoutor, setSelectedDoutor] = useState('');
  const [selectedPaciente, setSelectedPatient] = useState('');
  const [doutor, setDoutor] = useState<Doutor[]>([]);
  const [Funcionario, setPaciente] = useState<Funcionario[]>([]);

  const load = async () => {
    await api
      .get('doutores')
      .then(({ data }) => {
        setDoutor(data.docs)
      })
    await api
      .get('pacientes')
      .then(({ data }) => {
        setPaciente(data.docs)
      })
  }
  useEffect(() => {
    load()}, [])

  function handleSelectDoutor(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedDoutor(res);
  };

  function handleSelectPaciente(event: ChangeEvent<HTMLSelectElement>) {
    const res = event.target.value;

    setSelectedPatient(res);
  };

  async function handleSubmit(data: Exame) {
      try {
        const schema = Yup.object().shape({
          data: Yup.string().required('Data do exame obrigatório'),
          hora: Yup.string().required('Hora do exame obrigatório'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        if (!selectedDoutor || !selectedPaciente) {
          throw new Error("Médico e Funcionario são obrigatórios");
        }

        let body = {
          doutor_id: selectedDoutor,
          paciente_id: selectedPaciente,
          data: data.data,
          hora: data.hora
        }
        
        try {
            await api({
                method: 'post',
                url: 'exames',
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



        <select
            value={selectedDoutor}
            onChange={handleSelectDoutor}
          >
            <option>Selecione o Medico</option>
          {
            doutor.length > 0
            ? doutor.map((o) => {
                return (
                  <option key={o._id} value={o._id}>{o.nome} - {o.especialidade}</option>
                )
              })
            : <option>Nenhum Medico encontrado</option>
          }
          </select>
           
           <select
              value={selectedPaciente}
              onChange={handleSelectPaciente}
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
          <br></br>
          <Input name="data" type="date" placeholder="Data do Exame" />
          <Input name="hora" type="time" placeholder="Hora do Exame" />



          <Button type="submit">
            Cadastrar Exame
          </Button>
        </Form>
      </Container>
            
    );
}

export default Cadastrar;






import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import api from '../services/api'

function Livro() {
    const [id] = useState(useLocation().pathname.split('/')[2])
    const [image] = useState(React.createRef())
    const [nomeLivro, setNomeLivro] = useState('')
    const [author, setAuthor] = useState('')
    const [numeroPaginas, setNumeroPaginas] = useState('')
    const [editora, setEditora] = useState('')
    const [isbn, setIsbn] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        let bodyFormData = new FormData();
        bodyFormData.set('nomeLivro', nomeLivro);
        bodyFormData.set('author', author);
        bodyFormData.set('numeroPaginas', numeroPaginas);
        bodyFormData.set('editora', editora);
        bodyFormData.set('isbn', isbn);
        if (image.current.files[0]) bodyFormData.append('image', image.current.files[0]);
        if (id) bodyFormData.append('_method', 'PUT')

        try {
            await api({
                method: id ? 'put' : 'post',
                url: id ? `livros/${id}` : 'livros',
                data: bodyFormData,
                headers: {'Content-Type': 'multipart/form-data' }
                })

            alert('Cadastro efetuado com sucesso.')

            history.push('/listalivro')
        } catch (err) {
            alert('Erro ao cadastrar seus dados.')
        }
    }
    
    const load = async () => {
        if (id) {  
            await api
            .get(`livros/${id}`)
            .then(({ data }) => {
                setNomeLivro(data.nomeLivro)
                setAuthor(data.author)
                setNumeroPaginas(data.numeroPaginas)
                setEditora(data.editora)
                setIsbn(data.isbn)
            })
        }
    }
    useEffect(() => {
      load()}, [id])

    return (
        <>
            <div className="layout-padding">
                <div className="row">
                    <div className="col-12">
                        <h1>Cadastro de Livros</h1>
                    </div>
                </div>

                <div>
                    <div>
                        <form onSubmit={handleRegister}>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        className="full-width"
                                        type="file"
                                        placeholder="Imagem do Livro"
                                        ref={image}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        className="full-width"
                                        placeholder="Nome do Livro"
                                        value={nomeLivro}
                                        onChange={e => setNomeLivro(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        className="full-width"
                                        placeholder="Autor do Livro"
                                        value={author}
                                        onChange={e => setAuthor(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        className="full-width"
                                        type="number"
                                        placeholder="Número de Páginas"
                                        value={numeroPaginas}
                                        onChange={e => setNumeroPaginas(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        className="full-width"
                                        placeholder="Editora"
                                        value={editora}
                                        onChange={e => setEditora(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        className="full-width"
                                        placeholder="ISBN"
                                        value={isbn}
                                        onChange={e => setIsbn(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                <button
                                    className="full-width button primary"
                                    type="submit">
                                    Cadastrar
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Livro
