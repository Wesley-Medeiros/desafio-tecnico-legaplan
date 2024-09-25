'use client';

import { TaskList } from "../components/taskList"; 
import { Button } from "@/components/button";
import { useTaskContext } from "../context/task-context";
import { AddTaskModal } from "../components/AddTaskModal"; 
import { ConfirmRemoveTaskModal } from "../components/ConfirmRemoveTaskModal"; 
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
                <div className={styles.taskList}>
                    <TaskList />
                    <Button onClick={openModal} variant="primary">Adicionar nova tarefa</Button>
                </div>

                <AddTaskModal 
                    isOpen={isModalOpen} 
                    title={title} 
                    onChangeTitle={onChangeTitle} 
                    handleSubmit={handleSubmit} 
                    closeModal={closeModal} 
                />

                <ConfirmRemoveTaskModal 
                    isOpen={isConfirmModalOpen} 
                    closeConfirmModal={closeConfirmModal} 
                    removeTask={removeTask} 
                />
            </div>
        </main>
    );
}
