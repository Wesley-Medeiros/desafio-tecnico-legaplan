import styles from "./styles.module.scss";
import Image from 'next/image'
import LOGO from "../../public/logo.png"

export function Header() {
    return (
        <header className={styles.header}>
            <div>
            <Image src={LOGO} alt="Logo"/>
                <h1>Bem vindo de Volta, Marcos</h1>
                <p>Segunda, 01 de dezembro de 2025</p>
            </div>
        </header>
    );
}
