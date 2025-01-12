import { Gamemenu } from '@/components/Gamemenu'
import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import React from 'react'


const gamemenu = () => {
    return (
        <Layout>
            <main>
                <Header />
                <Gamemenu />
            </main>
        </Layout>
    )
}

export default gamemenu