'use client';

import { Button } from "@/components/button";
import styles from "./styles.module.scss";

interface AddTaskModalProps {
    isOpen: boolean;
    title: string;
    onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    closeModal: () => void;
}

export function AddTaskModal({ isOpen, title, onChangeTitle, handleSubmit, closeModal }: AddTaskModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Nova Tarefa</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Titulo
                        <input onChange={onChangeTitle} value={title} type="text" placeholder="Digite" />
                    </label>
                    <div className={styles.modalActions}>
                        <Button onClick={closeModal}>Cancelar</Button>
                        <Button variant="primary" type="submit" disabled={!title.trim()}>Adicionar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
