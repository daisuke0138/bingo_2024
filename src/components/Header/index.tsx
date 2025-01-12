import React, { useEffect, useState, FormEvent } from "react";
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { Settings, Logout, PersonAdd } from '@mui/icons-material'
import { Abril_Fatface } from 'next/font/google'
import styles from './styles.module.scss'
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";
import Link from "next/link";


interface Userdata {
    id: number;
    username: string;
}

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

export const Header = () => {
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
                    const response = await apiClient.get('/auth/user', {
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

        // ユーザーのイニシャルを取得する
        const getInitial = (username: string) => {
            return username.charAt(0);
        };
    
        // // logout処理
        const { logout } = useAuth();
        const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();

            try {
                await apiClient.post("/auth/logout");
                localStorage.removeItem('auth_token'); // ローカルストレージからトークンを削除
                localStorage.removeItem('currentGame'); // ローカルストレージからcurrentGameを削除
                logout(); // ログアウト処理を呼び出し
                alert("ログアウトが成功しました！");
                router.push("/"); // topページにリダイレクト
            } catch (err) {
                console.error(err);
                alert("ログアウトが失敗しました！");
            }
        };
        // meneuの開閉処理
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
        const open = Boolean(anchorEl)

        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget)
        }

        const handleClose = () => {
            setAnchorEl(null)
        }
        // ↑解説↑
        // handleClick関数が呼び出されると、setAnchorElを使ってanchorElにクリックされた要素を設定します。これにより、openがtrueになり、メニューが開きます。
        // handleClose関数が呼び出されると、setAnchorElを使ってanchorElをnullに設定します。これにより、openがfalseになり、メニューが閉じます。

        return (
            <div className={styles.headerline}>
                <header className={styles.header}>
                    <h1 className={`${abril.className} ${styles.title}`}>
                        bingo game
                    </h1>
                </header>
                <Box className={styles.box}>
                    <IconButton
                        onClick={handleClick}
                        size="large"  //small、medium、largeのいずれかを指定
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#e0e0e0', color: '#000' }}>
                            {user ? getInitial(user.username) : ''}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            {user ? user.username : 'Guest'}
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            {/* <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon> */}
                            <Link
                                href="/menu"
                                className={`${abril.className} ${styles.link}`}
                            >
                                Menu
                            </Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </div>
        );
}
