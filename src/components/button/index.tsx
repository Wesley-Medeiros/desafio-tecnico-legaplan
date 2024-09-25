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
        const baseClass = `${styles.button}`;

        const variantClass = (() => {
            switch (variant) {
                case 'primary':
                    return `${styles['btn-primary']}`;
                case 'danger':
                    return `${styles['btn-danger']}`;
                default:
                    return `${styles['btn-default']}`;
            }
        })();

        const disabledClass = disabled ? `${styles['btn-disabled']}` : '';

        return `${baseClass} ${variantClass} ${disabledClass}`.trim();
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
