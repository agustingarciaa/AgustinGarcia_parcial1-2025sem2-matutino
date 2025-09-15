const API_URL = "http://localhost:3000/users";
let users = [];

async function showUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    users = [...data];
    renderUsers(users);
  } catch (error) {
    console.error("Error cargando usuarios:", error);
  }
}

function renderUsers(userList) {
  const list = document.getElementById("#users");
  list.innerHTML = "";

  userList.forEach((user) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="user-item">
        <span class="user-info">
          ${user.name} / ${user.role} / ${user.email}
        </span>
        <div class="user-actions">
          <button class="promote-demote" data-id="${
            user.id
          }" data-current-role="${user.role}">
            ${user.role === "Admin" ? "Demote" : "Promote"}
          </button>
          <button class="delete" data-id="${user.id}">Delete</button>
        </div>
      </div>`;

    list.appendChild(listItem);
  });
}

async function addUser(name, email, role) {
  try {
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      role: role,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    await showUsers();
    return true;
  } catch (error) {
    console.error("Error creando usuario:", error);
    return false;
  }
}

// 4. Función para actualizar rol del usuario
async function updateUserRole(userId, currentRole) {
  try {
    // Determinar nuevo rol
    let newRole;
    if (currentRole === "Viewer") {
      newRole = "Editor";
    } else if (currentRole === "Editor") {
      newRole = "Admin";
    } else {
      // Admin
      newRole = "Viewer";
    }

    const response = await fetch(`${API_URL}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Actualizar la UI
    await showUsers();
    return true;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return false;
  }
}

async function deleteUser(userId) {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    await showUsers();
    return true;
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showUsers();

  const addButton = document.querySelector("#add");
  const nameInput = document.querySelector('input[name="name"]');
  const emailInput = document.querySelector('input[name="email"]');
  const roleSelect = document.querySelector('select[name="role"]');

  addButton.addEventListener("click", async () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const role = roleSelect.value;

    if (!name || !email || !role) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un email válido");
      return;
    }

    const success = await addUser(name, email, role);
    if (success) {
      nameInput.value = "";
      emailInput.value = "";
      roleSelect.value = "Admin";
    }
  });

  const usersList = document.querySelector("#users");
  usersList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("promote-demote")) {
      const userId = parseInt(event.target.dataset.id);
      const currentRole = event.target.dataset.currentRole;
      await updateUserRole(userId, currentRole);
    } else if (event.target.classList.contains("delete")) {
      const userId = parseInt(event.target.dataset.id);
      const confirmed = confirm(
        "¿Estás seguro de que quieres eliminar este usuario?"
      );
      if (confirmed) {
        await deleteUser(userId);
      }
    }
  });
});
