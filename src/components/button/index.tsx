import styles from "./styles.module.scss";

interface ButtonProps {
    onClick?: () => void; 
    variant?: 'default' | 'primary' | 'danger';
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset'; 
    disabled?: boolean; 
}

export function Button({ onClick, variant = 'default', children, type = 'button', disabled = false }: ButtonProps) {
    const getButtonClass = () => {
        switch(variant) {
            case 'primary':
                return `${styles.button} ${styles['btn-primary']}`;
            case 'danger':
                return `${styles.button} ${styles['btn-danger']}`;
            default:
                return `${styles.button} ${styles['btn-default']}`;
        }
    };

    return (
        <button 
            className={getButtonClass()} 
            onClick={onClick} 
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
