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
    const [selectedGame, setSelectedGame] = useState<number | ''>('')
    const [games, setGames] = useState<Array<{ id: number, title: string }>>([]);

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
                setGames(response.data.map((game: { id: number, title: string }) => ({ id: game.id, title: game.title })));
                console.log('title list', response.data);
            } catch (error) {
                console.error('Failed to game title', error);
            }
        };

        fetchGames();
    }, []);


    const handleGameSelect = (event: SelectChangeEvent<number>) => {
        const selectedValue = event.target.value as number;
        setSelectedGame(selectedValue);
        console.log(`Selected game : ${selectedValue}`);
    };

    const handleGameStart = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (selectedGame !== '') {
            try {
                const response = await apiClient.post('/auth/selectgame', { gameId: selectedGame });
                console.log('Game data:', response.data);
                // レスポンスデータをローカルストレージに保存
                localStorage.setItem('currentGame', JSON.stringify(response.data));
                // アラートを表示し、ユーザーの確認を得る
                const confirmStart = window.confirm(`"${response.data.title}" を開始しますか？`);

                if (confirmStart) {
                    // ユーザーが確認した場合のみ画面遷移
                    window.location.href = '/gamemenu';
                }
            } catch (error) {
                console.error('Error starting game:', error);
            }
        } else {
            console.log('No game selected');
        }
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
                            renderValue={(selected) => {
                                if (selected === 0) {
                                    return <span className={`${abril.className} ${styles.select}`}>title list</span>;
                                }
                                const selectedGameTitle = games.find(game => game.id === selected)?.title;
                                return <span className={`${abril.className} ${styles.select}`}>{selectedGameTitle}</span>;
                            }}
                        >
                {games.map((game) => (
                    <MenuItem className={`${abril.className} ${styles.selectTitle}`} key={game.id} value={game.id}>
                        {game.title}
                        {selectedGame === game.id && <CheckIcon className="ml-2" />}
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
                            height: 'auto',
                        }}
                        priority
                    />
                </div>
                <div className={styles.linkContainer}>
                    <Link
                        href="/gamemenu"
                        onClick={handleGameStart}
                        className={`${abril.className} ${styles.link}`}
                    >
                        !Game start!
                    </Link>
                </div>
            </div>
        )
}
