import { Header } from '@/components/Header'
import { Top } from '@/components/Top'
import { Layout } from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <main>
        <Header />
        <Top />
      </main>
    </Layout>
  )
}