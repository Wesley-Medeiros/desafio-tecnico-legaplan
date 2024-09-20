import styles from "./styles.module.scss";
import Image from 'next/image';
import LOGO from "../../public/logo.png";

export function Header() {
    const newDate = new Date();

    const dateFormatter = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'full'
        }).format(date);
    }

    return (
        <header className={styles.header}>
            <div>
                <Image src={LOGO} alt="Logo" />
                <h1>Bem vindo de Volta, Marcos</h1>
                <p>{dateFormatter(newDate)}</p>
            </div>
        </header>
    );
}
