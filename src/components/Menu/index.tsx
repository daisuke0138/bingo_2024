import Link from 'next/link'
import Image from 'next/image'
import { Abril_Fatface } from 'next/font/google'
import styles from './styles.module.scss'
import bingoImage from './image/bingo.png' // 画像ファイルをインポート
import { useEffect, useState } from 'react'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import apiClient from '@/lib/apiClient'

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

export const Menu = () => {
    const [selectedGame, setSelectedGame] = useState<string>('')
    const [games, setGames] = useState<string[]>([])

    useEffect(() => {
        const fetchGames = async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            try {
                const response = await apiClient.get('/auth/title', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setGames(response.data.map((game: { title: string }) => game.title));
                console.log('title list', response.data);
            } catch (error) {
                console.error('Failed to game title', error);
            }
        };

        fetchGames();
    }, []);


    const handleGameSelect = (event: SelectChangeEvent<string>) => {
        setSelectedGame(event.target.value as string);
    };
        return (
            <div className={styles.container}>
                <div className={styles.linkContainer}>
                    <p className={`${abril.className} ${styles.menulogo}`}>
                        "Menu"
                    </p>
                    <Link
                        href="/gamecreate"
                        className={`${abril.className} ${styles.link}`}
                    >
                        Game create →
                    </Link>

                    <div >
                        <p className={`${abril.className} ${styles.select}`}>
                            Select game title
                        </p>
                        <Select
                            value={selectedGame}
                            onChange={handleGameSelect}
                            displayEmpty
                            fullWidth
                            renderValue={(selected) => selected || <span>title list</span>}
                        >
                            {games.map((game, index) => (
                                <MenuItem key={index} value={game}>
                                    {game}
                                    {selectedGame === game && <CheckIcon className="ml-2" />}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <div className={styles.imageContainer}>
                    <Image
                        src={bingoImage}
                        alt="Bingo game illustration"
                        width={320}
                        height={224}
                        style={{
                            maxWidth: '100%',
                            height: 'auto'
                        }}
                        priority
                    />
                </div>
                <div className={styles.linkContainer}>
                    <Link
                        href="/menu"
                        className={`${abril.className} ${styles.link}`}
                    >
                        Game start
                    </Link>
                </div>
            </div>
        )
}
