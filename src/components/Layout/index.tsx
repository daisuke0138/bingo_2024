import React from 'react'
import styles from './styles.module.scss'

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}