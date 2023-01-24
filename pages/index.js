/* eslint-disable react/jsx-key */
import React from 'react';
import CardForm from './CardForm';
import AtividadesForm from './AtividadesForm'
import Layout from './Layout'
import Login from './Login'

export default function Home() {

  return (

    <Layout>
      <Login>
        <CardForm  >
          <AtividadesForm />
        </CardForm>
      </Login>
    </Layout>
  )

}

