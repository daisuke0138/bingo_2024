import Link from 'next/link'
import Image from 'next/image'
import { Abril_Fatface } from 'next/font/google'
import styles from './styles.module.scss'
import bingoImage from './image/bingo.png' // 画像ファイルをインポート

const abril = Abril_Fatface({
    weight: '400',
    subsets: ['latin'],
})

export const Menu = () => {
    return (
        <div className={styles.container}>
            <div className={styles.linkContainer}>
                <Link
                    href="/menu"
                    className={`${abril.className} ${styles.link}`}
                >
                    Game create
                </Link>

                <Link
                    href="/menu"
                    className={`${abril.className} ${styles.link}`}
                >
                    Game select
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