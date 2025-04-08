import { useState, useRef } from "react";
import api from "../../services/api";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Pendente"); // Estado para o status selecionado
  const inputTitle = useRef();
  const navigate = useNavigate();

  async function createTask() {
    try {
      await api.post("/api/tasks", {
        title: inputTitle.current.value,
        status: selectedStatus, // Usa o estado do status selecionado
      });
      inputTitle.current.value = "";
      setSelectedStatus("Pendente"); // Reseta para o status padrão
      setSuccessMessage("Tarefa cadastrada com sucesso!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  }

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Atividades</h1>
        <input placeholder="Título" name="título" ref={inputTitle} />
        
        <div className="status-options">
          <label className="status-label">
            <input
              type="radio"
              name="status"
              checked={selectedStatus === "Pendente"}
              onChange={() => handleStatusChange("Pendente")}
            />
            <span>Pendente</span>
          </label>
          
          <label className="status-label">
            <input
              type="radio"
              name="status"
              checked={selectedStatus === "Em andamento"}
              onChange={() => handleStatusChange("Em andamento")}
            />
            <span>Em andamento</span>
          </label>
          
          <label className="status-label">
            <input
              type="radio"
              name="status"
              checked={selectedStatus === "Concluída"}
              onChange={() => handleStatusChange("Concluída")}
            />
            <span>Concluída</span>
          </label>
        </div>
        
        <button type="button" onClick={createTask}>
          Cadastrar
        </button>
      </form>
      
      <button
        type="button"
        onClick={() => navigate("/tasks")}
        className="list-tasks-button"
      >
        Listar Tarefas
      </button>
      
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Home;