import React, { useEffect, useState, FormEvent } from "react";
import { Abril_Fatface } from 'next/font/google'
import styles from './styles.module.scss'
import apiClient from "@/lib/apiClient";
import { useRouter, NextRouter } from "next/router";


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

    // urlからgameIdとtitleを取得する
    const [gameTitle, setGameTitle] = useState<string>("game title");
    const router = useRouter() as NextRouter;

    useEffect(() => {
        // URLからgameIdとtitleを取得
        const { gameId, title } = router.query;

        if (gameId && title) {
            // ローカルストレージへ保存
            localStorage.setItem('gameId', gameId as string);
            localStorage.setItem('gameTitle', title as string);
            // タイトルを状態にセット
            setGameTitle(decodeURIComponent(title as string));

                console.log('保存されたgameId:', gameId);
                console.log('保存されたtitle:', title);
            }
        }, [router.query]);

        return (
            <div className={styles.headerline}>
                <header className={styles.header}>
                    <h1 className={`${abril.className} ${styles.title}`}>
                        {gameTitle}
                    </h1>
                </header>
            </div>
        );
}
