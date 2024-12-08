import { Header } from '@/components/Header'
import { Signup } from '@/components/Signup'
import { Layout } from '@/components/Layout'
import React from 'react'

const signup = () => {
    return (
        <Layout>
        <main>
            <Header />
            <Signup />
            </main>
        </Layout>
    )
}

export default signup