import { useState } from 'react'
import { Abril_Fatface } from 'next/font/google'
import { TextField, Button, Container, Box} from '@mui/material'
import styles from './styles.module.scss'
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

export const Signupplayer = () => {
    const router = useRouter();
    const [playername, setPlayername] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // サインアップロジックをここに実装
        try {
            await apiClient.post("/auth/signupplayer", {
                playername,
            });

            alert("アカウント登録できました！");
            router.push("/game");

        } catch (err) {
            console.error(err);
            alert("入力の何かが正しくありません！");
        }
        console.log('ユーザー登録', { playername})
    }

    return (
        <Box className={styles.container}>
            {/* <AppBar position="static" className={styles.header}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="back" component={Link} href="/">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h5" className={`${abril.className} ${styles.title}`}>
                        Back to Top
                    </Typography>
                </Toolbar>
            </AppBar> */}

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
                        id="playername"
                        label="Player Name"
                        name="playername"
                        autoComplete="playername"
                        autoFocus
                        value={playername}
                        onChange={(e) => setPlayername(e.target.value)}
                        className={styles.input}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={`${abril.className} ${styles.submitButton}`}
                    >
                        Game start
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}