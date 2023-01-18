import React, { useState, useContext } from 'react';
import { AuthContext } from './providers/auth';

export default function Login({ children }) {
  const { responsavel, setResponsavel, usuario, setUsuario } = useContext(AuthContext);

  const [LoginCPF, setLoginCPF] = useState('');
  const [LoginWpensar, setLoginWPensar] = useState('');
  const [error, setError] = useState('');

  
  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  function onCPFValueChange(event) {
    setLoginCPF(event.target.value)
  }

  function onUserWPensarValueChange(event) {
    setLoginWPensar(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      cpf: LoginCPF,
      user_wpensar: LoginWpensar,
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/get_login', options)

    const result = await response.json()

    setUsuario(result.login)

    if (isEmptyObject(usuario)) {
      setError('Usuário ou CPF incorretos.')
    }

    //setResponsavel({})

    //router.push(result.aluno.responsaveis[0].username)
  }

  if (!isEmptyObject(usuario)) {
    return { ...children }
  }

  return (
    <div className='p-5 justify-center flex'>
      <div>
        {error &&

          <div className="mb-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold mr-2">Oooops!</strong>
            <span className="block sm:inline">{error}</span>
          </div>

        }

        <form onSubmit={handleSubmit}>
          <>
            <div className='text-lg text-center mb-6 font-bold text-lg font-medium'>Informe suas credenciais</div>
            <div className='mb-6'>
              <label htmlFor="user_wpensar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuário do WPensar</label>
              <input onChange={onUserWPensarValueChange} type="user_wpensar" id="user_wpensar" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="primeiro_nome.ultimo_nome" required />
            </div>

            <div className="mb-6">
              <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
              <input onChange={onCPFValueChange} type="cpf" id="cpf" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='000.000.000-00' required />
            </div>

          </>

          <div className='flex justify-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
          </div>

        </form>
      </div>
    </div >

  )
}
