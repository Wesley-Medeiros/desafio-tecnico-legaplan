'use client';

import { Button } from "@/components/button";
import styles from "./styles.module.scss";

interface ConfirmRemoveTaskModalProps {
    isOpen: boolean;
    closeConfirmModal: () => void;
    removeTask: () => void;
}

export function ConfirmRemoveTaskModal({ isOpen, closeConfirmModal, removeTask }: ConfirmRemoveTaskModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.removeModal}>
                <h2>Deletar tarefa</h2>
                <p>Tem certeza que você deseja deletar essa tarefa?</p>
                <div className={styles.removeModalActions}>
                    <Button onClick={closeConfirmModal}>Cancelar</Button>
                    <Button variant="danger" onClick={removeTask}>Remover</Button>
                </div>
            </div>
        </div>
    );
}
