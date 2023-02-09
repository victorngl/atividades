
import React, { useContext } from 'react';
import { AuthContext } from './providers/auth';
import { useSession } from 'next-auth/react';

export default function CardForm({children}) {
  const { responsavel, setResponsavel, usuario, setUsuario } = useContext(AuthContext);

  const { data: session, status } = useSession()

  const handleClick = (event, index) => {
    event.preventDefault();
    setResponsavel(usuario[index]);
  }

  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  if(!isEmptyObject(responsavel) && !isEmptyObject(usuario)) {
    return {...children}
  }

  return (
    <>
      {!isEmptyObject(usuario) ?
        <div className='md:flex gap-3 justify-center'>
          {usuario.map((user, index) => (

            <div key={user.naluno} className="rounded border-2 border-grey-500 justify-center mb-2 shadow-xl md:w-9/12 gap-4">
             
                <div className={(user.aluno.resposta == 0 ? 'm-3 text-center p-2 text-white rounded bg-blue-500 font-bold' : 'm-3 text-center p-2 text-white rounded bg-green-500 font-bold')}>

                  {user.aluno.resposta == 0 ? (<a>Incrição Pendente</a>) : (<a>Inscrição Realizada</a>)}

                </div>

                <div className='justify-center flex'>
                  <label htmlFor='nomealuno' className='font-bold mr-4 text-sm'>Nome do Aluno:</label>
                  <a name='nomealuno' className='mb-5 text-sm'>{user.aluno.nome}</a>
                </div>

                {user.aluno.resposta == 1 ? (
                  <div className='justify-center mx-2 text-sm'>
                    <div className='text-lg text-center font-bold'>Atividades Inscritas:</div>

                    <div className='mb-2'>
                      <p htmlFor='nomealuno' className='font-bold'>Atividade Prioritária:</p>
                      <a name='nomealuno' className='mb-5'>{user.aluno.atividade_prioridade}</a>
                    </div>

                    <div>
                      <p htmlFor='nomealuno' className='font-bold'>Atividade Esportiva:</p>
                      <a name='nomealuno' className='mb-5'>{user.aluno.atividade_esportiva}</a>
                    </div>

                    <div>
                      <p htmlFor='nomealuno' className='font-bold'>Atividade Cultural:</p>
                      <a name='nomealuno' className='mb-5'>{user.aluno.atividade_cultural}</a>
                    </div>

                    <div>
                      <p htmlFor='nomealuno' className='font-bold mr-4'>Atividade Optativa:</p>
                      <a name='nomealuno' className='mb-5'>{user.aluno.atividade_optativa}</a>
                    </div>

                    <div className='my-5 text-center'>
                      <a name='nomealuno'>Inscrição feita pelo usuário {user.aluno.user_registro} em {user.aluno.date_registro}</a>
                    </div>

                    

                   <div className='mx-5 text-justify font-semibold'>Em caso de dúvidas relacionas às oficinas, entre em contato com tuanne.moser@cambauba.org.br</div>

                  </div>

                ) : (

                  <div className='text-justify m-4 text-sm'>O aluno não está inscrito em nenhuma atividade. Clique abaixo para realizar a inscrição.</div>
                )}




                <div className="text-center m-5 " >

                  {/*
                  {user.aluno.resposta  == 0 ?
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded' onClick={e => handleClick(e, index)}>Realizar Inscrição</button>
                    :
                    <button className='bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded' onClick={e => handleClick(e, index)}>Alterar Inscrição</button>
                  }*/}

                  <button className='bg-gray-500 text-white font-bold py-2 px-3 rounded' disabled>Inscrições Encerradas</button>


                </div>

              </div>

           
          ))}
        </div>
        : <div className='p-4 text-justify text-lg'>Não existem alunos elegíveis para inscrição em atividades relacionados a este usuário. Entre em contato com suporte@cambauba.org.br </div>
        
        }
    </>
  )
}