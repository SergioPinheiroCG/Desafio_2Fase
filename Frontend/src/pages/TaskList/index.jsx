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

  async function getTasks() {
    try {
      const response = await api.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  }

  function handleEdit(id, title, status) {
    setEditingTask(id);
    setEditedTitle(title);
    setEditedStatus(status);
  }

  async function saveEditedTask(id) {
    try {
      await api.put(`/api/tasks/${id}`, {
        title: editedTitle,
        status: editedStatus,
      });
      setEditingTask(null);
      getTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  }

  function cancelEdit() {
    setEditingTask(null);
    setEditedTitle("");
  }

  function handleStatusChange(status) {
    setEditedStatus(status);
    }

  useEffect(() => {
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
        
        <div className="card-actions">

        </div>
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
                <button
                  onClick={() => handleEdit(task._id, task.title, task.status)}
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
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;