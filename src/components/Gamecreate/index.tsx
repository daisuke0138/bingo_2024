import Link from 'next/link'
import { Abril_Fatface } from 'next/font/google'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import apiClient from '@/lib/apiClient'
import { useEffect, useState } from 'react'
import { jwtDecode, JwtPayload } from 'jwt-decode';

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

interface DecodedToken extends JwtPayload {
    id: string; // トークンのペイロードに含まれるユーザーIDのフィールド名
}

export const Gamecreate = () => {
    const router = useRouter()
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('auth_token')
        console.log('取得したトークン:', token) // トークンをログに出力して確認
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                setUserId(decodedToken.id);
                console.log('デコードされたトークン:', decodedToken);
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        } else {
            console.log('Token not found')
        }
    }, [])

    useEffect(() => {
        console.log('現在のユーザーID', userId)
    }, [userId])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const title = formData.get('title') as string

        if (userId === null) {
            console.error('User ID not found')
            return
        }

        if (!title) {
            console.error('Title is required')
            alert('Title を入力してください')
            return
        }

        try {
            const response = await apiClient.post('/auth/create', {
                title,
                userId
            })
            console.log('Game title:', response.data)
            if (response.status === 200) {
                console.log('Game created successfully')
                alert('Game が作成されました！')
                router.push('/menu')
            } else {
                console.error('Failed to create game')
            }
        } catch (error) {
            console.error('Error creating game:', error)
        }
    }

    return (
        <div className={styles.linkContainer}>
            <p className={`${abril.className} ${styles.menulogo}`}>
                "Game create"
            </p>
            
            <p className={`${abril.className} ${styles.menulogo}`}>
                game title
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="title"
                    className={`${abril.className} ${styles.link} ${styles.input}`}
                    placeholder="title"
                    required
                />

                <button
                    type="submit"
                    className={`${abril.className} ${styles.button}`}
                >
                    add game title
                </button>
            </form>
            <Link
                href="/menu"
                className={`${abril.className} ${styles.mainLink}`}
            >
               back to menu
            </Link>
        </div>
    )
}

