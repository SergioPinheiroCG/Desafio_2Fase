import { useState, useEffect } from "react";
import api from "../../services/api";
import "./style.css";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedStatus, setEditedStatus] = useState("Pendente");
  const navigate = useNavigate();

  async function deleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  }

  function handleStatusChange(status) {
    setEditedStatus(status);
  }

  async function saveEditedTask(taskId) {
    try {
      const updatedTask = {
        title: editedTitle,
        status: editedStatus,
      };
      await api.put(`/tasks/${taskId}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedTask } : task
        )
      );
      setEditingTask(null);
      setEditedTitle("");
      setEditedStatus("Pendente");
    } catch (error) {
      console.error("Erro ao salvar a tarefa editada:", error);
    }
  }

  function handleEdit(taskId, title, status) {
    setEditingTask(taskId);
    setEditedTitle(title);
    setEditedStatus(status);
  }

  function cancelEdit() {
    setEditingTask(null);
    setEditedTitle("");
    setEditedStatus("Pendente");
  }

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar as tarefas:", error);
      }
    }
    getTasks();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Atividades</h1>

      <div className="top-actions">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="action-button back-button"
        >
          Voltar
        </button>
      </div>

      {tasks.map((task) => (
        <div className="card" key={task._id}>
          <div className="task-info">
            {editingTask === task._id ? (
              <>
                <label htmlFor={`title-${task._id}`}>Título:</label>
                <input
                  id={`title-${task._id}`}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />

                <label>Situação:</label>
                <div className="status-options">
                  <label className="status-label">
                    <input
                      type="radio"
                      name={`status-${task._id}`}
                      checked={editedStatus === "Pendente"}
                      onChange={() => handleStatusChange("Pendente")}
                    />
                    <span>Pendente</span>
                  </label>

                  <label className="status-label">
                    <input
                      type="radio"
                      name={`status-${task._id}`}
                      checked={editedStatus === "Em andamento"}
                      onChange={() => handleStatusChange("Em andamento")}
                    />
                    <span>Em andamento</span>
                  </label>

                  <label className="status-label">
                    <input
                      type="radio"
                      name={`status-${task._id}`}
                      checked={editedStatus === "Concluída"}
                      onChange={() => handleStatusChange("Concluída")}
                    />
                    <span>Concluída</span>
                  </label>
                </div>

                <div className="edit-actions">
                  <button
                    onClick={() => saveEditedTask(task._id)}
                    className="action-button save-button"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="action-button cancel-button"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Título: {task.title}</p>
                <p>Situação: {task.status}</p>
                <div className="card-actions">
                  <button
                    onClick={() =>
                      handleEdit(task._id, task.title, task.status)
                    }
                    className="action-button edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="action-button delete-button"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
