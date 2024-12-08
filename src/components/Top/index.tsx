import Link from 'next/link'
import Image from 'next/image'
import { Abril_Fatface } from 'next/font/google'
import styles from './styles.module.scss'
import bingoImage from './image/bingo.png' // 画像ファイルをインポート

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

export const Top = () => {
    return (
        <div className={styles.container}>
            <div className={styles.linkContainer}>
                <Link
                    href="signup"
                    className={`${abril.className} ${styles.link}`}
                >
                    Sign up
                </Link>

                <Link
                    href="login"
                    className={`${abril.className} ${styles.link}`}
                >
                    Login 
                </Link>
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
        </div>
    )
}