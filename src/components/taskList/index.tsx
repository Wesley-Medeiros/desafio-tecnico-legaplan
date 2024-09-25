'use client';

import { GoCheckbox } from "react-icons/go";
import { TrashSVG } from "@/components/trashSVG";
import { useTaskContext } from "../../context/task-context";
import Image from "next/image";
import ClipBoard from "../../../public/Clipboard.png";
import styles from "./styles.module.scss";

export function TaskList() {
    const {
        tasks,
        toggleTaskCompletion,
        openConfirmModal
    } = useTaskContext();

    const pendingTasks = tasks.filter(task => !task.isCompleted);
    const completedTasks = tasks.filter(task => task.isCompleted);

    return (
        <div className={styles.tasks}>
            <p className={styles.titleTasks}>Suas tarefas de hoje</p>

            {tasks.length === 0 || pendingTasks.length === 0 ? (
                <div className={styles.noTasksMessage}>
                    <Image src={ClipBoard} alt="Clip board" />
                    <h3>Você ainda não tem tarefas cadastradas para hoje</h3>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            ) : (
                <div>
                    {pendingTasks.map((task) => (
                        <label key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => toggleTaskCompletion(task.id)}
                            />
                            {task.isCompleted && (
                                <GoCheckbox className={styles.checkboxIcon} />
                            )}
                            <div>
                                <p className={task.isCompleted ? styles.completedTaskTitle : ''}>
                                    {task.title}
                                </p>
                            </div>
                            <button
                                className={styles.removeTask}
                                onClick={() => openConfirmModal(task.id)}>
                                <TrashSVG />
                            </button>
                        </label>
                    ))}
                </div>
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
                                {task.isCompleted && (
                                    <GoCheckbox className={styles.checkboxIcon} style={{ fill: '#0796D3' }} />
                                )}
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
    );
}
