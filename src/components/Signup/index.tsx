import { useState } from 'react'
import { Abril_Fatface } from 'next/font/google'
import { TextField, Button, Container, Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import styles from './styles.module.scss'
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

export const Signup = () => {
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // サインアップロジックをここに実装
        try {
            await apiClient.post("/auth/signup", {
                username,
                password,
            });

            alert("アカウント登録できました！");
            router.push("/login");

        } catch (err) {
            console.error(err);
            alert("入力の何かが正しくありません！");
        }
        console.log('ユーザー登録', { username, password })
    }

    return (
        <Box className={styles.container}>
            <AppBar position="static" className={styles.header}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back" component={Link} href="/">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" className={`${abril.className} ${styles.title}`}>
                        Back to Top
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="xs" className={styles.main}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className={styles.form}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Pass Word"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={`${abril.className} ${styles.submitButton}`}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}