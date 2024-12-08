import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import React from 'react'
import { Menu } from '@/components/Menu'

const menu = () => {
    return (
        <Layout>
        <main>
            <Header />
            <Menu />
            </main>
        </Layout>
    )
}

export default menu