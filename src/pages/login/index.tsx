import { Header } from '@/components/Header'
import { Login } from '@/components/Login'
import { Layout } from '@/components/Layout'
import React from 'react'

const login = () => {
    return (
        <Layout>
            <Header />
            <Login />
        </Layout>
    )
}

export default login