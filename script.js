// script.js

// Mock data
let users = [
  { id: 1, name: "Dhanashri", email: "dhanu123@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Asha", email: "asha123@example.com", role: "Editor", status: "Inactive" },
];
let roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
];

// Render Users
function renderUsers() {
  const userTable = document.getElementById("user-table");
  userTable.innerHTML = users
    .map(
      (user) => `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.status}</td>
      <td>
        <button onclick="editUser(${user.id})">Edit</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </td>
    </tr>
  `
    )
    .join("");
}

// Render Roles
function renderRoles() {
  const rolesContainer = document.getElementById("roles-container");
  rolesContainer.innerHTML = roles
    .map(
      (role) => `
    <div>
      <h3>${role.name}</h3>
      <p>Permissions: ${role.permissions.join(", ")}</p>
      <button onclick="openModal('editRole', ${role.id})">Edit</button>
    </div>
  `
    )
    .join("");
}

// Add User
function addUser(name, email, role, status = "Active") {
  users.push({ id: Date.now(), name, email, role, status });
  renderUsers();
}

// Edit User
function editUser(id) {
  const user = users.find((u) => u.id === id);
  alert(`Editing user: ${user.name}`);
}

// Delete User
function deleteUser(id) {
  users = users.filter((u) => u.id !== id);
  renderUsers();
}

// Open Modal
function openModal(type , id = null) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  if (type === "addUser") {
    content.innerHTML = `
      <h2>Add User</h2>
      <form onsubmit="event.preventDefault(); addUser(document.getElementById('name').value, document.getElementById('email').value, document.getElementById('role').value); closeModal();">
        <input id="name" placeholder="Name" required />
        <input id="email" placeholder="Email" required />
        <input id="role" placeholder="Role" required />
        <button type="submit">Save</button>
      </form>
    `;
  }

  else if (type === "editUser") {
     const user = users.find((u) => u.id === id);
    content.innerHTML = `
      <h2>Edit User</h2>
      <form onsubmit="event.preventDefault(); editUser(${id}, document.getElementById('name').value, document.getElementById('email').value, document.getElementById('role').value); closeModal();">
        <input id="name" placeholder="Name" value="${user.name}" required />
        <input id="email" placeholder="Email" value="${user.email}" required />
        <input id="role" placeholder="Role" value="${user.role}" required />
        <button type="submit">Update</button>
      </form>
    `;
  }

  else if (type === "addRole") {
     content.innerHTML = `
      <h2>Add Role</h2>
      <form onsubmit="event.preventDefault(); addRole(document.getElementById('roleName').value, document.getElementById('permissions').value.split(',').map(p => p.trim())); closeModal();">
        <input id="roleName" placeholder="Role Name" required />
        <input id="permissions" placeholder="Permissions (comma-separated)" required />
        <button type="submit">Save</button>
      </form>
    `;
  }

  else if (type === "editRole") {
    const role = roles.find((r) => r.id === id);
    content.innerHTML = `
      <h2>Edit Role</h2>
      <form onsubmit="event.preventDefault(); editRole(${id}, document.getElementById('roleName').value, document.getElementById('permissions').value.split(',').map(p => p.trim())); closeModal();">
        <input id="roleName" placeholder="Role Name" value="${role.name}" required />
        <input id="permissions" placeholder="Permissions (comma-separated)" value="${role.permissions.join(', ')}" required />
        <button type="submit">Update</button>
      </form>
    `;
  }

  modal.classList.remove("hidden");
}

// Edit User Function
function editUser(id, name, email, role) {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], name, email, role };
    renderUsers();
  }
}

// Edit Role Function
function editRole(id, name, permissions) {
  const roleIndex = roles.findIndex((r) => r.id === id);
  if (roleIndex !== -1) {
    roles[roleIndex] = { ...roles[roleIndex], name, permissions };
    renderRoles();
  }
}

// Close Modal
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// Initial Render
document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
  renderRoles();
});
