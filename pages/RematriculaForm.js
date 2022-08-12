
import React, { Fragment, useState, useEffect } from 'react';
import { Prisma, PrismaClient } from '@prisma/client'

/* Material Tailwind Imports */
import {
  Tabs,
  Chip,
  Input,
  Card,
  Radio,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Switch,
  Button,
} from "@material-tailwind/react";



export default function RematriculaForm({ rematricula }) {
  const [aceites, setAceites] = useState({});

  const [aceite_matricula, setAceitesMatricula] = useState({});
  const [ip_aceite_matricula, setIpAceiteMatricula] = useState('');
  const [date_aceite_matricula, setDateAceiteMatricula] = useState('');

  const [regime, setRegime] = useState({});
  const [ip_regime, setIpRegime] = useState('');
  const [date_regime, setDateRegime] = useState('');

  const [cota_parcelamento, setCotaParcelamento] = useState({});
  const [ip_cota, setIpAceiteContrato] = useState('');
  const [date_cota, setDateCota] = useState('');
  // Similar ao componentDidMount e componentDidUpdate:


  function IsRespFinan(usuario) {
    if (usuario.matricula.cpfrespfinan == usuario.cpf) {
      return true
    }

    return false
  }

  function IsEntranteDeSegmento(usuario) {

    if (usuario.matricula.turma == '901' ||
      usuario.matricula.turma == '902' ||
      usuario.matricula.turma == '401' ||
      usuario.matricula.turma == '402' ||
      usuario.matricula.turma == 'Pré-Escola II') {
      return true
    }

    return false
  }


  function IsEducacaoInfantil(usuario) {
    if (usuario.matricula.turma == 'Pré-Escola II' ||
      usuario.matricula.turma == 'Pré-Escola I' ||
      usuario.matricula.turma == 'Maternal I-A' ||
      usuario.matricula.turma == 'Maternal I-B' ||
      usuario.matricula.turma == 'Maternal II' ||
      usuario.matricula.turma == 'Berçário II') {
      return true
    }

    return false
  }

  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className=''>
      <form>
        <div className="relative z-0 mb-6 w-full group">
          <input value={rematricula.matricula.nome} type="name" name="nome" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do aluno</label>
        </div>
        <div className="relative z-0 mb-7 w-full group">
          <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Série pretendida para 2023</label>
        </div>

        {rematricula.matricula.aceite_matricula == 0 ?
          <div>
            <div className='mb-2'>Deseja realizar a rematrícula para o ano de 2023 ?</div>
            <fieldset className='flex gap-10 mb-5'>
              <div className="flex items-center mb-4">
                <input id="country-option-1" type="radio" name="countries" defaultValue="USA" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Sim
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input id="country-option-2" type="radio" name="countries" defaultValue="Germany" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Não
                </label>
              </div>
            </fieldset>
          </div> : 
          
          <div className='mb-6 text-sm'>Aceite de matricula dado pelo usuário {rematricula.matricula.user_aceite_matricula} {rematricula.matricula.ip_aceite_matricula} em {rematricula.matricula.date_aceite_matricula}.</div> }

        {IsEducacaoInfantil(rematricula) && rematricula.matricula.regime < 0 ?
          <div>
            <div className='mb-2'>Opções de turno ?</div>
            <fieldset className='flex gap-10 mb-5'>
              <div className="flex items-center mb-4">
                <input id="country-option-3" type="radio" name="integral" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Integral
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input id="country-option-4" type="radio" name="integral" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Parcial
                </label>
              </div>
            </fieldset>
          </div> : ''}

        {(rematricula.matricula.parcelamento_cota == 0 && IsRespFinan(rematricula) && IsEntranteDeSegmento(rematricula)) ?
          <div className='mb-5'>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Escolha uma das opções de parcelamento da cota-parte</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

              <option value="1">1x</option>
              <option value="2">2x</option>
              <option value="3">3x</option>
              <option value="4">4x</option>
              <option value="5">5x</option>
              <option value="6">6x</option>
              <option value="7">7x</option>
              <option value="8">8x</option>
              <option value="9">9x</option>
              <option value="10">10x</option>
              <option value="11">11x</option>
              <option value="12">12x</option>
              <option value="13">13x</option>
              <option value="14">14x</option>
              <option value="15">15x</option>
              <option value="16">16x</option>
              <option value="17">17x</option>
              <option value="18">18x</option>
              <option value="19">19x</option>
              <option value="20">20x</option>
              <option value="21">21x</option>
              <option value="22">22x</option>
              <option value="23">23x</option>
              <option value="24">24x</option>
              <option value="25">25x</option>
              <option value="26">26x</option>
              <option value="27">27x</option>
              <option value="28">28x</option>
              <option value="29">29x</option>
              <option value="30">30x</option>
              <option value="31">31x</option>
              <option value="32">32x</option>
              <option value="33">33x</option>
              <option value="34">34x</option>
              <option value="35">35x</option>
              <option value="36">36x</option>

            </select>
          </div>
          : '' }


        {rematricula.aceite_contrato == 0 ?
        <fieldset>
          <div className="flex items-center mb-4">
            <input id="checkbox-1" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="checkbox-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Concordo com os termos do contrato de prestação de serviços educacionais <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
          </div>

        </fieldset>: 
        
        <div className='mb-6 text-sm'>Aceite de contrato dado em {rematricula.date_aceite_contrato} sob o IP: {rematricula.ip_aceite_contrato}.</div>}

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
      </form>
    </div>
  )
}