'use client';

import { TaskList } from "../components/taskList"; // Importando o novo arquivo
import { Button } from "@/components/button";
import { useTaskContext } from "../context/task-context";
import styles from "./styles.module.scss";

export function Tasks() {
    const {
        isModalOpen,
        openModal,
        closeModal,
        handleSubmit,
        title,
        onChangeTitle,
        isConfirmModalOpen,
        closeConfirmModal,
        removeTask
    } = useTaskContext();

    return (
        <main>
            <div className={styles.taskContainer}>
                <TaskList />

                <Button onClick={openModal} variant="primary">Adicionar nova tarefa</Button>

                {isModalOpen && (
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
                                    <Button variant="primary" type="submit" disabled={!title}>Adicionar</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isConfirmModalOpen && (
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
                )}
            </div>
        </main>
    );
}
