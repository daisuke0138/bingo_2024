import React, { useEffect, useState, FormEvent } from "react";
import { Abril_Fatface } from 'next/font/google'
import styles from './styles.module.scss'
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";


interface Userdata {
    id: number;
    username: string;
}

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

export const Headerplayer = () => {
    // loginしているユーザー情報を取得する
    const [user, setUser] = useState<Userdata | null>(null);
    const router = useRouter();

        useEffect(() => {
            const fetchUser = async () => {
                const token = localStorage.getItem('auth_token');
                if (!token) {
                    console.log('No auth token found, stopping request.');
                    return; // トークンがない場合はリクエストを停止
                }

                try {
                    const response = await apiClient.get('/auth/player', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('API response:', response.data); // 取得したデータをコンソールに出力
                    setUser(response.data.user); // レスポンスの構造に合わせて修正
                }
            
                catch (error: unknown) {
                    console.error('Failed to fetch user:', error);
                    if
                        (error instanceof Error && (error as { response?: { status: number } }).response?.status === 401) {
                            router.push('/login');
                        }
                }
            };
            fetchUser();
        }, [router]);

        return (
            <div className={styles.headerline}>
                <header className={styles.header}>
                    <h1 className={`${abril.className} ${styles.title}`}>
                        game title
                    </h1>
                </header>
            </div>
        );
}
