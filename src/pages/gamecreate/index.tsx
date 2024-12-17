import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import React from 'react'
import { Gamecreate } from '@/components/Gamecreate'

const gamecreate = () => {
    return (
        <Layout>
            <main>
                <Header />
                <Gamecreate />
            </main>
        </Layout>
    )
}

export default gamecreate