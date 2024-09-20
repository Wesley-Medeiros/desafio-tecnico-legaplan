'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { TrashSVG } from "@/components/trashSVG";
import ClipBoard from "../../public/Clipboard.png";
import styles from "./styles.module.scss";
import Image from "next/image";

interface ITask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export function Tasks() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [title, setTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [taskToRemove, setTaskToRemove] = useState<string | null>(null);

    function addTask(taskTitle: string) {
        setTasks([
            ...tasks,
            {
                id: crypto.randomUUID(),
                title: taskTitle,
                isCompleted: false
            }
        ]);
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        addTask(title);
        setTitle("");
        closeModal();
    }

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function toggleTaskCompletion(taskId: string) {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function openConfirmModal(taskId: string) {
        setTaskToRemove(taskId);
        setIsConfirmModalOpen(true);
    }

    function closeConfirmModal() {
        setTaskToRemove(null);
        setIsConfirmModalOpen(false);
    }

    function removeTask() {
        if (taskToRemove) {
            setTasks(tasks.filter(task => task.id !== taskToRemove));
            closeConfirmModal();
        }
    }

    const pendingTasks = tasks.filter(task => !task.isCompleted);
    const completedTasks = tasks.filter(task => task.isCompleted);

    return (
        <main>
            <div className={styles.taskContainer}>
                <div className={styles.tasks}>
                    <p className={styles.titleTasks}>Suas tarefas de hoje</p>

                    {tasks.length === 0 || pendingTasks.length === 0 ? (
                        <div className={styles.noTasksMessage}>
                            <Image src={ClipBoard} alt="Clip board" />
                            <h3>Você ainda não tem tarefas cadastradas para hoje</h3>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    ) : (
                        <>
                            <div>
                                {pendingTasks.map((task) => (
                                    <label key={task.id}>
                                        <input
                                            type="checkbox"
                                            checked={task.isCompleted}
                                            onChange={() => toggleTaskCompletion(task.id)}
                                        />
                                        <div>
                                            <p className={task.isCompleted ? styles.completedTaskTitle : ''}>
                                                {task.title}
                                            </p>
                                        </div>
                                        <button
                                            className={styles.removeTask}
                                            onClick={() => openConfirmModal(task.id)}
                                        >
                                            <TrashSVG />
                                        </button>
                                    </label>
                                ))}
                            </div>
                        </>
                    )}

                    {completedTasks.length > 0 && (
                        <div className={styles.completedTasks}>
                            <p className={styles.titleTasks}>Tarefas finalizadas</p>
                            <div>
                                {completedTasks.map((task) => (
                                    <label key={task.id}>
                                        <input
                                            type="checkbox"
                                            checked={task.isCompleted}
                                            onChange={() => toggleTaskCompletion(task.id)}
                                        />
                                        <div>
                                            <p className={task.isCompleted ? styles.completedTaskTitle : ''}>
                                                {task.title}
                                            </p>
                                        </div>
                                        <button
                                            className={styles.removeTask}
                                            onClick={() => openConfirmModal(task.id)}
                                        >
                                            <TrashSVG />
                                        </button>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button className={styles.AddNewTaskButton} onClick={openModal}>Adicionar nova tarefa</button>

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
                                    <button type="button" onClick={closeModal}>Cancelar</button>
                                    <button type="submit">Adicionar</button>
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
                                <button onClick={closeConfirmModal}>Cancelar</button>
                                <button onClick={removeTask}>Deletar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
