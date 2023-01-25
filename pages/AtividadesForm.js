import React, { useState, useContext } from 'react';
import { AuthContext } from './providers/auth';
import moment from 'moment/moment';

const OficinasEsportivas = [
  { id: 1, name: 'BASQUETE - 3º ao 5º /EF', permission: [{ serie: '3º Ano' }, { serie: '4º Ano' }, { serie: '5º Ano' }] },
  { id: 2, name: 'BASQUETE - 6º ao 8º /EF', permission: [{ serie: '6º Ano' }, { serie: '7º Ano' }, { serie: '8º Ano' }] },
  { id: 3, name: 'BASQUETE - 9º/EF ao 3º E. Médio', permission: [{ serie: '9º Ano' }, { serie: '1ª Série' }, { serie: '2ª Série' }, { serie: '3ª Série' }] },
  { id: 4, name: 'CAPOEIRA - 1º e 2º /EF', permission: [{ serie: '1º Ano' }, { serie: '2º Ano' }] },
  { id: 5, name: 'CAPOEIRA - 3º /EF', permission: [{ serie: '3º Ano' }] },
  { id: 6, name: 'CAPOEIRA - 4º e 5º /EF', permission: [{ serie: '4º Ano' }, { serie: '5º Ano' }] },
  { id: 7, name: 'CAPOEIRA - 6º ao 9º /EF', permission: [{ serie: '6º Ano' }, { serie: '7º Ano' }, { serie: '8º Ano' }] },
  { id: 8, name: 'ESCOLA DA BOLA - 1º /EF', permission: [{ serie: '1º Ano' }] },
  { id: 9, name: 'ESCOLA DA BOLA - 2º/EF', permission: [{ serie: '2º Ano' }] },
  { id: 10, name: 'FUTSAL (masc) - 5º /EF', permission: [{ serie: '5º Ano' }] },
  { id: 11, name: 'FUTSAL (masc) - 6º e 7º /EF', permission: [{ serie: '6º Ano' }, { serie: '7º Ano' }] },
  { id: 12, name: 'FUTSAL (masc) - 8º e 9º /EF', permission: [{ serie: '8º Ano' }, { serie: '9º Ano' }] },
  { id: 13, name: 'FUTSAL (masc) - E. Médio', permission: [{ serie: '1ª Série' }, { serie: '2ª Série' }, { serie: '3ª Série' }] },
  { id: 14, name: 'FUTSAL (misto) - 1º e 2º / EF', permission: [{ serie: '1º Ano' }, { serie: '2º Ano' }] },
  { id: 15, name: 'FUTSAL (misto)- 3º e 4º EF', permission: [{ serie: '3º Ano' }, { serie: '4º Ano' }] },
  { id: 16, name: 'HANDEBOL - 3º ao 5º /EF', permission: [{ serie: '3º Ano' }, { serie: '4º Ano' }, { serie: '5º Ano' }] },
  { id: 17, name: 'HANDEBOL - 6º ao 8º /EF', permission: [{ serie: '6º Ano' }, { serie: '7º Ano' }, { serie: '8º Ano' }] },
  { id: 18, name: 'HANDEBOL - 9º /EF ao 3º/E. Médio', permission: [{ serie: '9º Ano' }, { serie: '1ª Série' }, { serie: '2ª Série' }, { serie: '3ª Série' }] },
  { id: 19, name: 'JUDÔ - 3º e 4º / EF', permission: [{ serie: '3º Ano' }, { serie: '4º Ano' }] },
  { id: 20, name: 'JUDÔ - 5º e 6 º /EF', permission: [{ serie: '5º Ano' }, { serie: '6º Ano' }] },
  { id: 21, name: 'JUDÔ - 7º ao 9º /EF', permission: [{ serie: '7º Ano' }, { serie: '8º Ano' }, { serie: '9º Ano' }] },
  { id: 22, name: 'JUDÔ -1° e 2º /EF', permission: [{ serie: '1º Ano' }, { serie: '2º Ano' }] },
  { id: 23, name: 'VOLEIBOL - 3º ao 5ª /EF', permission: [{ serie: '3º Ano' }, { serie: '4º Ano' }, { serie: '5º Ano' }] },
  { id: 24, name: 'VOLEIBOL - 6º ao 9º /EF', permission: [{ serie: '6º Ano' }, { serie: '7º Ano' }, { serie: '8º Ano' }, { serie: '9º Ano' }] },
  { id: 25, name: 'XADREZ - 2º ao 4º /EF', permission: [{ serie: '2º Ano' }, { serie: '3º Ano' }, { serie: '4º Ano' }] },
  { id: 26, name: 'XADREZ - 5º ao 8º /EF', permission: [{ serie: '5º Ano' }, { serie: '6º Ano' }, { serie: '7º Ano' }, { serie: '8º Ano' }] },

];


const OficinasCulturais = [
  { id: 1, name: 'Coral - 1º e 2º /EF', permission: [{ serie: '1º Ano' }, { serie: '2º Ano' }] },
  { id: 2, name: 'Coral -  3º /EF ao E. Médio', permission: [{ serie: '3º Ano' }, { serie: '4º Ano' }, { serie: '5º Ano' }, { serie: '6º Ano' }, { serie: '7º Ano' }, { serie: '8º Ano' }, { serie: '9º Ano' }, { serie: '1º Série' }, { serie: '2ª Série' }, { serie: '3ª Série' }] },
  { id: 3, name: 'Flauta - 2º ao 5º /EF', permission: [{ serie: '2º Ano' }, { serie: '3º Ano' }, { serie: '4º Ano' }, { serie: '5º Ano' }] },
  { id: 4, name: 'Ukulele - 5º /EF ao E. MédioF', permission: [{ serie: '5º Ano' }, { serie: '6º Ano' }, { serie: '7º Ano' }, { serie: '8º Ano' }, { serie: '9º Ano' }, { serie: '1º Série' }, { serie: '2ª Série' }, { serie: '3ª Série' }] },
  { id: 5, name: 'Desenho Artístico - 4º e 5º /EF', permission: [{ serie: '4º Ano' }, { serie: '5º Ano' }] },
  { id: 6, name: 'Desenho Artístico - 6º /EF ao E. Médio', permission: [{ serie: '6º Ano' }, { serie: '7º Ano' }, { serie: '8º Ano' }, { serie: '9º Ano' }, { serie: '1º Série' }, { serie: '2ª Série' }, { serie: '3ª Série' }] },
];

export default function AtividadesForm({ }) {
  const [AtividadeCultural,   setAtividadeCultural]   = useState('Não se aplica');
  const [AtividadeEsportiva,  setAtividadeEsportiva]  = useState('Não se aplica');
  const [AtividadeOptativa,   setAtividadeOptativa]   = useState('Não se aplica');
  const [AtividadePrioridade, setAtividadePrioridade] = useState('0');

  const { responsavel, setResponsavel, usuario, setUsuario } = useContext(AuthContext);

  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  function onCulturalValueChange(event) {
    setAtividadeCultural(event.target.value);
  }

  function onEsportivaValueChange(event) {
    setAtividadeEsportiva(event.target.value)
  }

  function onOptativaValueChange(event) {
    setAtividadeOptativa(event.target.value)
  }

  function onPrioridadeValueChange(event) {
    setAtividadePrioridade(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const current = new Date();
    const formatDate = "DD-MM-YYYY HH:mm:ss"

    const dateTime = moment(current).format(formatDate);

    const data = {
      responsavel: responsavel,
      atividade_prioridade: AtividadePrioridade,
      atividade_cultural: AtividadeCultural,
      atividade_esportiva: AtividadeEsportiva,
      atividade_optativa: AtividadeOptativa,
      resposta: 1,
      user_registro: responsavel.username,
      date_registro: dateTime,
    }

    const DataEmail = {
      name: responsavel.nome,
      email: responsavel.email,
      prioritaria: AtividadePrioridade,
      esportiva: AtividadeEsportiva,
      cultural: AtividadeCultural,
      optativa: AtividadeOptativa,
      usuario: responsavel.username,
      date_registro: dateTime,
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/save_aceite', options)

    const result = await response.json()

    if(DataEmail.email)
      sendEmail(DataEmail);

    setUsuario(result.usuario)
    setResponsavel({})

  }

  const sendEmail = async (DataEmail) => {
    
    const JSONdata = JSON.stringify(DataEmail)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/email/contact', options)

    const result = await response.json()

    console.log(result)
  }

  if (isEmptyObject(responsavel))
    return (<h1>Erro desconhecido</h1>)

  return (
    <div className='p-5'>
      <form onSubmit={handleSubmit}>
        <div className='text-lg font-semibold text-justify mb-6'>Prezado (a) Associado(a), o presente questionário tem como objetivo agilizar o processo
          de inscrição nas atividades complementares noturnas do aluno para o Ano letivo de 2023.</div>
        <div className="relative z-0 mb-6 w-full group">
          <input value={responsavel.aluno.nome} type="name" name="nome" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do aluno</label>
        </div>

        <div className="relative z-0 mb-6 w-full group">
          <input value={responsavel.aluno.s_rie} type="name" name="nome" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Série do Aluno em 2023:</label>
        </div>

        <div className='my-7 w-full justify-center flex'>
          <img className='w-full md:w-9/12' src='/esportivas.png' alt='Atividades Esportivas' />
        </div>

        <div className='my-7 w-full justify-center flex'>
          <img className='w-full md:w-9/12' src='/culturais.png' alt='Atividades Esportivas' />
        </div>


        <div onChange={onPrioridadeValueChange}>
          <div className='mb-2'>Deseja que a primeira opção seja?</div>
          <fieldset className='flex gap-10 mb-5' >
            <div className="flex items-center mb-4">
              <input id="country-option-2" type="radio" name="countries" defaultValue="Esportiva" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Esportiva
              </label>
            </div>
            <div className="flex items-center mb-4" >
              <input required id="country-option-1" type="radio" name="countries" defaultValue="Cultural" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Cultural
              </label>
            </div>
          </fieldset>
        </div>


        <div className='mb-5' onChange={onEsportivaValueChange}>
          <label required htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Escolha uma atividade esportiva: {AtividadePrioridade == 'Esportiva' && <h3 className='font-bold'> Atividade Prioritária </h3>}</label>
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Não se aplica" >Não se aplica</option>

            {OficinasEsportivas.map((modalidade, index) =>

              modalidade.permission.map((permissao, index) => (

                permissao.serie == responsavel.aluno.s_rie && <option key={index} value={modalidade.name}>{modalidade.name}</option>))

            )}

          </select>
        </div>

        <div className='mb-5' onChange={onCulturalValueChange}>


          <label required htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Escolha uma atividade cultural: {AtividadePrioridade == 'Cultural' && <h3 className='font-bold'> Atividade Prioritária </h3>}</label>
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

            <option value="Não se aplica">Não se aplica</option>

            {OficinasCulturais.map((modalidade, index) =>

              modalidade.permission.map((permissao, index) => (

                permissao.serie == responsavel.aluno.s_rie && <option key={index} value={modalidade.name}>{modalidade.name}</option>))

            )}




          </select>
        </div>

        <div className='mb-5' onChange={onOptativaValueChange}>
          <label required htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Escolha uma atividade optativa: </label>
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="Não se aplica">Não se aplica</option>

            {OficinasEsportivas.map((modalidade, index) =>

              modalidade.permission.map((permissao, index) => (

                permissao.serie == responsavel.aluno.s_rie && <option key={index} value={modalidade.name}>{modalidade.name}</option>))

            )}

            {OficinasCulturais.map((modalidade, index) =>

              modalidade.permission.map((permissao, index) => (

                permissao.serie == responsavel.aluno.s_rie && <option key={index} value={modalidade.name}>{modalidade.name}</option>))

            )}


          </select>
        </div>

        <div className='text-sm font-semibold text-justify mb-3 mt-10'>*Verifique as modalidades antes de Enviar</div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
      </form>
    </div>



  )
}
