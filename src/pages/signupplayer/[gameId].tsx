import { Headerplayer } from '@/components/Headerplayer'
import { Layout } from '@/components/Layout'
import React from 'react'
import { Signupplayer } from '@/components/Signupplayer'

const signupplayer = () => {
    return (
        <Layout>
        <main>
            <Headerplayer />
            <Signupplayer/>
        </main>
        </Layout>
    )
}

export default signupplayer