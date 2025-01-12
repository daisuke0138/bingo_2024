import Link from 'next/link';
import { Abril_Fatface } from 'next/font/google'// 名前付きエクスポートの場合
import { useState, useCallback, useEffect, MouseEvent } from 'react';
import { Button, Menu, MenuItem, Dialog, DialogContent, DialogActions, Slide, SlideProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Image from 'next/image';
import styles from './styles.module.scss';
import React from 'react';

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Gamemenu = () => {
    const [number, setNumber] = useState<number | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    let timeoutId: NodeJS.Timeout;
    const [gameTitle, setGameTitle] = useState<string>('');
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState(false);

    // ゲームのタイトルをローカルストレージから取得
    useEffect(() => {
        const currentGame = localStorage.getItem('currentGame');
        if (currentGame) {
            const { title } = JSON.parse(currentGame);
            setGameTitle(title);
        }
    }, []);

    // ビンゴの数字をランダムに選ぶ
    const handleSlotClick = useCallback(async () => {
        if (isDisabled) return;

        setIsDisabled(true);

        // 20回ループを繰り返した後、ランダムに数字を選択
        for (let i = 0; i < 20; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            setNumber(Math.floor(Math.random() * 50) + 1);
        }

        timeoutId = setTimeout(() => {
            setIsDisabled(false);
        }, 1000);
    }, [isDisabled]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    // メニューを開く
    const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // メニューを閉じる
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // QRコード画像URLをローカルストレージより取得
    const fetchQRCode = () => {
        try {
            const currentGame = localStorage.getItem('currentGame');
            if (currentGame) {
                const { qrCodeUrl } = JSON.parse(currentGame);
                if (qrCodeUrl) {
                    setQrCodeUrl(qrCodeUrl);
                    console.log('QRコードのURLを取得しました', qrCodeUrl);
                } else {
                    console.error('QRコードのURLが見つかりません');
                }
            } else {
                console.error('現在のゲーム情報が見つかりません');
            }
        } catch (error) {
            console.error('QRコードの取得に失敗しました', error);
        }
    };

    // QRコードダイアログを閉じる
    const handleQRCodeClick = () => {
        fetchQRCode();
        setDialogOpen(true);
        handleMenuClose();
    };

    return (
        <div className={styles.container}>
            <div className={`${abril.className} ${styles.gametitle}`}>{gameTitle}</div>
                <div className={styles.gameMenuText}>
                    <Button
                        onClick={handleMenuClick}
                        className={`${abril.className} ${styles.menuButton} `}
                    >
                    Game menu
                    
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose} className={`${abril.className} ${styles.menuItem}`}>
                            <Link href="/game-1">
                                player list
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose} className={`${abril.className} ${styles.menuItem}`}>
                            <Link href="/game-2">
                                number history
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleQRCodeClick} className={`${abril.className} ${styles.menuItem}`}>
                            see QR code
                        </MenuItem>
                    </Menu>
                </div>

            <button
                onClick={handleSlotClick}
                disabled={isDisabled}
                className={`${abril.className} ${styles.slotButton}`}
            >
                shuffle
            </button>
            <div className={`${abril.className} ${styles.slotResult}`}>
                {number && <div className={`${abril.className} ${styles.number}`}>{number}</div>}
            </div>
            <Link href="/menu" className={`${abril.className} ${styles.backButton}`}>
                back to menu
            </Link>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogContent className={styles.dialogContent}>
                    {qrCodeUrl && (
                    <Image
                        src={qrCodeUrl}
                        alt="QR Code"
                        width={200}
                        height={200}
                        className={styles.qrCodeImage}
                    />
                )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} className={`${abril.className} ${styles.closeButton}`}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};