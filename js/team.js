// Sidebar Toggle
const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".bx-menu");

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Logout Confirmation
const logoutBtn = document.getElementById("log_out");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to logout?")) {
            window.location.href = "../templates/login.html";
        }
    });
}

// Sample Team Members Data
let teamMembers = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        role: "admin",
        department: "Management",
        status: "active",
        joined: "Jan 2024",
        lastSeen: "2 min ago",
        permissions: ["dashboard", "products", "orders", "analytics", "team", "settings"],
        notes: "Company founder and CEO"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@company.com",
        role: "manager",
        department: "Sales",
        status: "active",
        joined: "Feb 2024",
        lastSeen: "15 min ago",
        permissions: ["dashboard", "products", "orders", "analytics"],
        notes: "Sales department head"
    },
    {
        id: 3,
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@company.com",
        role: "staff",
        department: "Support",
        status: "active",
        joined: "Mar 2024",
        lastSeen: "1 hour ago",
        permissions: ["dashboard", "orders"],
        notes: "Customer support specialist"
    },
    {
        id: 4,
        firstName: "Emily",
        lastName: "Brown",
        email: "emily.brown@company.com",
        role: "staff",
        department: "Development",
        status: "inactive",
        joined: "Apr 2024",
        lastSeen: "2 days ago",
        permissions: ["dashboard", "products", "settings"],
        notes: "Frontend developer"
    },
    {
        id: 5,
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@company.com",
        role: "manager",
        department: "Marketing",
        status: "active",
        joined: "May 2024",
        lastSeen: "30 min ago",
        permissions: ["dashboard", "products", "analytics"],
        notes: "Marketing campaigns manager"
    },
    {
        id: 6,
        firstName: "Sarah",
        lastName: "Anderson",
        email: "sarah.anderson@company.com",
        role: "viewer",
        department: "Sales",
        status: "pending",
        joined: "Invited Oct 2024",
        lastSeen: "Not yet",
        permissions: ["dashboard"],
        notes: "New sales representative"
    }
];

// Activity Log Data
let activityLog = [
    {
        id: 1,
        type: "add",
        user: "John Doe",
        action: "added",
        target: "Sarah Anderson",
        details: "as Viewer",
        time: "2 hours ago"
    },
    {
        id: 2,
        type: "edit",
        user: "Jane Smith",
        action: "updated",
        target: "Mike Johnson's",
        details: "role from Viewer to Staff",
        time: "5 hours ago"
    },
    {
        id: 3,
        type: "remove",
        user: "David Wilson",
        action: "removed",
        target: "Tom Lee",
        details: "from team",
        time: "1 day ago"
    },
    {
        id: 4,
        type: "permissions",
        user: "John Doe",
        action: "updated",
        target: "Sales department",
        details: "permissions",
        time: "2 days ago"
    }
];

// View Toggle
const gridViewBtn = document.getElementById("gridView");
const listViewBtn = document.getElementById("listView");
const teamGrid = document.getElementById("teamGrid");
const teamList = document.getElementById("teamList");

gridViewBtn.addEventListener("click", () => {
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
    teamGrid.classList.add("active");
    teamList.classList.remove("active");
});

listViewBtn.addEventListener("click", () => {
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
    teamList.classList.add("active");
    teamGrid.classList.remove("active");
});

// Search Functionality
const searchInput = document.getElementById("searchMembers");
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterMembers();
});

// Filter Functionality
const departmentFilter = document.getElementById("departmentFilter");
const roleFilter = document.getElementById("roleFilter");
const statusFilter = document.getElementById("statusFilter");

departmentFilter.addEventListener("change", filterMembers);
roleFilter.addEventListener("change", filterMembers);
statusFilter.addEventListener("change", filterMembers);

function filterMembers() {
    const searchTerm = searchInput.value.toLowerCase();
    const department = departmentFilter.value;
    const role = roleFilter.value;
    const status = statusFilter.value;
    
    const filteredMembers = teamMembers.filter(member => {
        const matchesSearch = 
            member.firstName.toLowerCase().includes(searchTerm) ||
            member.lastName.toLowerCase().includes(searchTerm) ||
            member.email.toLowerCase().includes(searchTerm);
        
        const matchesDepartment = !department || member.department === department;
        const matchesRole = !role || member.role === role;
        const matchesStatus = !status || member.status === status;
        
        return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
    });
    
    renderMembers(filteredMembers);
}

// Render Members
function renderMembers(members = teamMembers) {
    // Render Grid View
    const gridHTML = members.map(member => `
        <div class="member-card">
            <div class="card-header">
                <span class="status-indicator ${member.status}"></span>
                <div class="card-actions">
                    <button class="action-btn" onclick="editMember(${member.id})">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="action-btn" onclick="deleteMember(${member.id})">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
            <div class="member-avatar">${member.firstName.charAt(0)}${member.lastName.charAt(0)}</div>
            <div class="member-info">
                <h3>${member.firstName} ${member.lastName}</h3>
                <p class="member-email">${member.email}</p>
                <span class="role-badge ${member.role}">${capitalizeFirstLetter(member.role)}</span>
                <span class="department-badge">${member.department}</span>
            </div>
            <div class="member-stats">
                <div class="stat-item">
                    <i class='bx bx-calendar'></i>
                    <span>Joined ${member.joined}</span>
                </div>
                <div class="stat-item">
                    <i class='bx bx-time'></i>
                    <span>Last seen ${member.lastSeen}</span>
                </div>
            </div>
            <button class="view-profile-btn" onclick="viewProfile(${member.id})">View Profile</button>
        </div>
    `).join("");
    
    teamGrid.innerHTML = gridHTML || '<p style="text-align: center; padding: 40px; color: var(--gray);">No members found</p>';
    
    // Render List View
    const listHTML = members.map(member => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px;">
                        ${member.firstName.charAt(0)}${member.lastName.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 500; color: var(--dark);">${member.firstName} ${member.lastName}</div>
                        <div style="font-size: 12px; color: var(--gray);">${member.email}</div>
                    </div>
                </div>
            </td>
            <td><span class="role-badge ${member.role}">${capitalizeFirstLetter(member.role)}</span></td>
            <td><span class="department-badge">${member.department}</span></td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="status-indicator ${member.status}"></span>
                    <span>${capitalizeFirstLetter(member.status)}</span>
                </div>
            </td>
            <td>${member.joined}</td>
            <td>${member.lastSeen}</td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="action-btn" onclick="editMember(${member.id})">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="action-btn" onclick="deleteMember(${member.id})">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join("");
    
    const tbody = teamList.querySelector("tbody");
    tbody.innerHTML = listHTML || '<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--gray);">No members found</td></tr>';
}

// Add Member
const addMemberBtn = document.getElementById("addMemberBtn");
const memberModal = document.getElementById("memberModal");
const memberForm = document.getElementById("memberForm");
const closeModalBtn = memberModal.querySelector(".close-modal");
const modalTitle = document.getElementById("modalTitle");

addMemberBtn.addEventListener("click", () => {
    memberForm.reset();
    modalTitle.textContent = "Add New Member";
    memberForm.dataset.mode = "add";
    delete memberForm.dataset.editId;
    memberModal.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
    memberModal.classList.remove("active");
});

memberModal.addEventListener("click", (e) => {
    if (e.target === memberModal) {
        memberModal.classList.remove("active");
    }
});

// Edit Member
function editMember(id) {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;
    
    modalTitle.textContent = "Edit Member";
    memberForm.dataset.mode = "edit";
    memberForm.dataset.editId = id;
    
    // Fill form with member data
    document.getElementById("firstName").value = member.firstName;
    document.getElementById("lastName").value = member.lastName;
    document.getElementById("email").value = member.email;
    document.getElementById("role").value = member.role;
    document.getElementById("department").value = member.department;
    document.getElementById("notes").value = member.notes || "";
    
    // Set permissions checkboxes
    const checkboxes = document.querySelectorAll("input[name='permissions']");
    checkboxes.forEach(checkbox => {
        checkbox.checked = member.permissions.includes(checkbox.value);
    });
    
    memberModal.classList.add("active");
}

// Delete Member
function deleteMember(id) {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;
    
    if (confirm(`Are you sure you want to remove ${member.firstName} ${member.lastName} from the team?`)) {
        teamMembers = teamMembers.filter(m => m.id !== id);
        renderMembers();
        updateStatistics();
        
        // Add to activity log
        activityLog.unshift({
            id: Date.now(),
            type: "remove",
            user: "You",
            action: "removed",
            target: `${member.firstName} ${member.lastName}`,
            details: "from team",
            time: "Just now"
        });
        renderActivityLog();
        
        showToast(`${member.firstName} ${member.lastName} has been removed from the team`);
    }
}

// View Profile
function viewProfile(id) {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;
    
    showToast(`Opening profile for ${member.firstName} ${member.lastName}`);
    // In a real application, this would navigate to a profile page
}

// Save Member
memberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(memberForm);
    const permissions = formData.getAll("permissions");
    
    const memberData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        role: formData.get("role"),
        department: formData.get("department"),
        permissions: permissions,
        notes: formData.get("notes"),
        status: "active"
    };
    
    if (memberForm.dataset.mode === "add") {
        // Add new member
        const newMember = {
            id: Date.now(),
            ...memberData,
            joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
            lastSeen: "Just now"
        };
        
        teamMembers.push(newMember);
        
        // Add to activity log
        activityLog.unshift({
            id: Date.now(),
            type: "add",
            user: "You",
            action: "added",
            target: `${memberData.firstName} ${memberData.lastName}`,
            details: `as ${capitalizeFirstLetter(memberData.role)}`,
            time: "Just now"
        });
        
        showToast(`${memberData.firstName} ${memberData.lastName} has been added to the team`);
    } else {
        // Update existing member
        const id = parseInt(memberForm.dataset.editId);
        const index = teamMembers.findIndex(m => m.id === id);
        
        if (index !== -1) {
            teamMembers[index] = {
                ...teamMembers[index],
                ...memberData
            };
            
            // Add to activity log
            activityLog.unshift({
                id: Date.now(),
                type: "edit",
                user: "You",
                action: "updated",
                target: `${memberData.firstName} ${memberData.lastName}'s`,
                details: "profile information",
                time: "Just now"
            });
            
            showToast(`${memberData.firstName} ${memberData.lastName}'s profile has been updated`);
        }
    }
    
    memberModal.classList.remove("active");
    renderMembers();
    renderActivityLog();
    updateStatistics();
    memberForm.reset();
});

// Render Activity Log
function renderActivityLog() {
    const activityHTML = activityLog.slice(0, 4).map(activity => {
        const iconClass = activity.type === "add" ? "bx-user-plus" : 
                         activity.type === "edit" ? "bx-edit" :
                         activity.type === "remove" ? "bx-user-minus" : "bx-lock";
        
        return `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    <i class='bx ${iconClass}'></i>
                </div>
                <div class="activity-content">
                    <h4><strong>${activity.user}</strong> ${activity.action} <strong>${activity.target}</strong> ${activity.details}</h4>
                    <p class="activity-time">${activity.time}</p>
                </div>
            </div>
        `;
    }).join("");
    
    document.querySelector(".activity-list").innerHTML = activityHTML;
}

// Update Statistics
function updateStatistics() {
    const totalMembers = teamMembers.length;
    const activeMembers = teamMembers.filter(m => m.status === "active").length;
    const pendingInvites = teamMembers.filter(m => m.status === "pending").length;
    
    // Get unique departments
    const departments = [...new Set(teamMembers.map(m => m.department))].length;
    
    // Update stat cards
    document.querySelector(".stat-card:nth-child(1) h3").textContent = totalMembers;
    document.querySelector(".stat-card:nth-child(2) h3").textContent = activeMembers;
    document.querySelector(".stat-card:nth-child(3) h3").textContent = departments;
    document.querySelector(".stat-card:nth-child(4) h3").textContent = pendingInvites;
    
    // Update percentages
    const activePercentage = totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0;
    document.querySelector(".stat-card:nth-child(2) .stat-change").innerHTML = `<i class='bx bx-up-arrow-alt'></i> ${activePercentage}% online`;
}

// Export Team Data
const exportBtn = document.getElementById("exportBtn");
exportBtn.addEventListener("click", () => {
    const csvContent = convertToCSV(teamMembers);
    downloadCSV(csvContent, "team-members.csv");
    showToast("Team data exported successfully");
});

function convertToCSV(data) {
    const headers = ["ID", "First Name", "Last Name", "Email", "Role", "Department", "Status", "Joined", "Last Seen"];
    const rows = data.map(member => [
        member.id,
        member.firstName,
        member.lastName,
        member.email,
        member.role,
        member.department,
        member.status,
        member.joined,
        member.lastSeen
    ]);
    
    const csv = [
        headers.join(","),
        ...rows.map(row => row.join(","))
    ].join("\n");
    
    return csv;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Toast Notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <i class='bx bx-check-circle'></i>
        <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add("active");
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove("active");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Utility function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderMembers();
    renderActivityLog();
    updateStatistics();
});
