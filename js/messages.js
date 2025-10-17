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

// Sample Messages Data
let messages = [
    {
        id: 1,
        from: "John Doe",
        email: "john@company.com",
        to: "you@company.com",
        subject: "Q4 Sales Report Review",
        preview: "Hi, I've completed the Q4 sales report. Could you please review it and provide your feedback? The deadline is approaching...",
        body: "Hi,\n\nI've completed the Q4 sales report and attached it to this email. Could you please review it and provide your feedback? The deadline is approaching and I want to make sure everything is accurate before the presentation.\n\nKey highlights:\n- Revenue increased by 23% compared to Q3\n- Customer acquisition improved by 15%\n- Product returns decreased by 8%\n\nPlease let me know if you have any questions or need clarification on any section.\n\nBest regards,\nJohn",
        folder: "inbox",
        priority: "high",
        starred: true,
        read: false,
        time: "2 min ago",
        timestamp: Date.now() - 120000,
        attachments: [
            { name: "Q4_Sales_Report.pdf", size: "2.4 MB", type: "pdf" }
        ]
    },
    {
        id: 2,
        from: "Jane Smith",
        email: "jane@company.com",
        to: "you@company.com",
        subject: "Team Meeting Tomorrow",
        preview: "Just a reminder about tomorrow's team meeting at 10 AM. Please come prepared with your project updates...",
        body: "Hi Team,\n\nJust a reminder about tomorrow's team meeting at 10 AM in Conference Room B. Please come prepared with your project updates and any blockers you're facing.\n\nAgenda:\n1. Project status updates (15 min)\n2. Q1 goals review (20 min)\n3. New client onboarding process (15 min)\n4. Open discussion (10 min)\n\nSee you all tomorrow!\n\nBest,\nJane",
        folder: "inbox",
        priority: "medium",
        starred: false,
        read: false,
        time: "1 hour ago",
        timestamp: Date.now() - 3600000,
        attachments: []
    },
    {
        id: 3,
        from: "Mike Johnson",
        email: "mike@company.com",
        to: "you@company.com",
        subject: "Server Maintenance Schedule",
        preview: "We'll be performing scheduled maintenance on our servers this weekend. Please plan accordingly...",
        body: "Hi,\n\nWe'll be performing scheduled maintenance on our servers this weekend from Saturday 11 PM to Sunday 6 AM. During this time, the following services will be unavailable:\n\n- Main application\n- Admin dashboard\n- API endpoints\n- Email services\n\nPlease plan your work accordingly and inform your team members.\n\nIf you have any urgent tasks that need to be completed, please do so before Saturday.\n\nThanks for your understanding,\nMike",
        folder: "inbox",
        priority: "high",
        starred: true,
        read: false,
        time: "3 hours ago",
        timestamp: Date.now() - 10800000,
        attachments: [
            { name: "Maintenance_Schedule.pdf", size: "856 KB", type: "pdf" }
        ]
    },
    {
        id: 4,
        from: "Emily Brown",
        email: "emily@company.com",
        to: "you@company.com",
        subject: "New Feature Proposal",
        preview: "I have some ideas for new features that could improve user experience. Would love to discuss...",
        body: "Hi,\n\nI have some ideas for new features that could significantly improve user experience on our platform. Would love to discuss these with you when you have time.\n\nProposed features:\n1. Dark mode implementation\n2. Advanced search filters\n3. Real-time notifications\n4. Export to multiple formats\n5. Collaborative editing\n\nI've prepared a detailed document with mockups and technical requirements. Let me know when you're available for a quick call.\n\nBest,\nEmily",
        folder: "inbox",
        priority: "low",
        starred: false,
        read: true,
        time: "5 hours ago",
        timestamp: Date.now() - 18000000,
        attachments: [
            { name: "Feature_Proposal.docx", size: "1.2 MB", type: "doc" },
            { name: "Mockups.zip", size: "4.8 MB", type: "zip" }
        ]
    },
    {
        id: 5,
        from: "David Wilson",
        email: "david@company.com",
        to: "you@company.com",
        subject: "Marketing Campaign Results",
        preview: "Great news! Our latest marketing campaign exceeded expectations. Here are the results...",
        body: "Hi,\n\nGreat news! Our latest marketing campaign exceeded expectations. Here are the results:\n\n📊 Campaign Performance:\n- Reach: 2.5M impressions\n- Click-through rate: 4.8% (industry avg: 2.1%)\n- Conversions: 15,243\n- ROI: 325%\n\nThe social media component performed exceptionally well, with Instagram showing the highest engagement. I've attached a detailed report with breakdown by platform and demographics.\n\nLet's schedule a meeting to discuss scaling this campaign.\n\nCheers,\nDavid",
        folder: "inbox",
        priority: "medium",
        starred: true,
        read: true,
        time: "Yesterday",
        timestamp: Date.now() - 86400000,
        attachments: [
            { name: "Campaign_Results.xlsx", size: "3.1 MB", type: "excel" }
        ]
    },
    {
        id: 6,
        from: "Sarah Anderson",
        email: "sarah@company.com",
        to: "you@company.com",
        subject: "Invoice #2024-1045",
        preview: "Please find attached the invoice for the services rendered in October...",
        body: "Dear Team,\n\nPlease find attached the invoice #2024-1045 for the services rendered in October.\n\nInvoice Details:\n- Invoice Date: October 1, 2024\n- Due Date: October 31, 2024\n- Amount: $12,450.00\n- Payment Terms: Net 30\n\nPayment can be made via:\n- Bank transfer\n- Credit card\n- PayPal\n\nPlease confirm receipt of this invoice and let me know if you have any questions.\n\nThank you,\nSarah",
        folder: "inbox",
        priority: "medium",
        starred: false,
        read: true,
        time: "2 days ago",
        timestamp: Date.now() - 172800000,
        attachments: [
            { name: "Invoice_2024-1045.pdf", size: "245 KB", type: "pdf" }
        ]
    },
    {
        id: 7,
        from: "You",
        email: "you@company.com",
        to: "client@example.com",
        subject: "Project Proposal",
        preview: "Thank you for considering our services. Please find attached our detailed proposal...",
        body: "Dear Client,\n\nThank you for considering our services for your upcoming project. Please find attached our detailed proposal including:\n\n- Project scope and deliverables\n- Timeline and milestones\n- Cost breakdown\n- Team composition\n- Terms and conditions\n\nWe're excited about the opportunity to work with you and believe we can deliver exceptional results.\n\nPlease review the proposal and let me know if you have any questions or would like to schedule a call to discuss further.\n\nBest regards,\nYour Team",
        folder: "sent",
        priority: "high",
        starred: false,
        read: true,
        time: "1 hour ago",
        timestamp: Date.now() - 3600000,
        attachments: [
            { name: "Project_Proposal.pdf", size: "3.2 MB", type: "pdf" }
        ]
    },
    {
        id: 8,
        from: "You",
        email: "you@company.com",
        to: "team@company.com",
        subject: "Weekly Status Update",
        preview: "Here's this week's status update for all ongoing projects...",
        body: "Hi Team,\n\nHere's this week's status update for all ongoing projects:\n\n✅ Completed:\n- Dashboard UI redesign\n- API integration testing\n- Documentation updates\n\n🔄 In Progress:\n- Mobile app development (75% complete)\n- Database optimization (60% complete)\n- User authentication improvements (30% complete)\n\n📋 Upcoming:\n- Beta testing phase\n- Performance testing\n- Security audit\n\nAll projects are on track for the Q4 delivery. Let me know if you need any additional resources.\n\nBest,\nYou",
        folder: "sent",
        priority: "medium",
        starred: false,
        read: true,
        time: "3 days ago",
        timestamp: Date.now() - 259200000,
        attachments: []
    }
];

// Current active folder
let activeFolder = "inbox";
let selectedMessageId = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderMessages();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Folder tabs
    const folderTabs = document.querySelectorAll(".folder-tab");
    folderTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            folderTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            activeFolder = tab.dataset.folder;
            renderMessages();
        });
    });

    // Search
    const searchInput = document.getElementById("searchMessages");
    searchInput.addEventListener("input", () => {
        renderMessages();
    });

    // Priority filter
    const priorityFilter = document.getElementById("priorityFilter");
    priorityFilter.addEventListener("change", () => {
        renderMessages();
    });

    // Compose button
    const composeBtn = document.getElementById("composeBtn");
    const composeModal = document.getElementById("composeModal");
    const composeForm = document.getElementById("composeForm");

    composeBtn.addEventListener("click", () => {
        composeModal.classList.add("active");
    });

    // Close modals
    const closeButtons = document.querySelectorAll(".close-modal");
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".modal").classList.remove("active");
        });
    });

    // Close modal on backdrop click
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    });

    // Compose form submit
    composeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessage();
    });

    // Reply form submit
    const replyForm = document.getElementById("replyForm");
    replyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        sendReply();
    });
}

// Render Messages List
function renderMessages() {
    const searchTerm = document.getElementById("searchMessages").value.toLowerCase();
    const priorityFilter = document.getElementById("priorityFilter").value;

    // Filter messages
    let filteredMessages = messages.filter(msg => {
        // Folder filter
        if (msg.folder !== activeFolder) return false;

        // Search filter
        if (searchTerm && !msg.subject.toLowerCase().includes(searchTerm) && 
            !msg.preview.toLowerCase().includes(searchTerm) &&
            !msg.from.toLowerCase().includes(searchTerm)) {
            return false;
        }

        // Priority filter
        if (priorityFilter && msg.priority !== priorityFilter) {
            return false;
        }

        return true;
    });

    // Sort by timestamp (newest first)
    filteredMessages.sort((a, b) => b.timestamp - a.timestamp);

    // Render
    const messagesList = document.getElementById("messagesList");
    
    if (filteredMessages.length === 0) {
        messagesList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray);">
                <i class='bx bx-envelope' style="font-size: 48px; opacity: 0.3; margin-bottom: 12px;"></i>
                <p>No messages found</p>
            </div>
        `;
        return;
    }

    const messagesHTML = filteredMessages.map(msg => `
        <div class="message-item ${msg.read ? '' : 'unread'} ${msg.id === selectedMessageId ? 'active' : ''}" 
             onclick="viewMessage(${msg.id})">
            <div class="message-header">
                <div class="sender-info">
                    <div class="sender-avatar">${getInitials(msg.from)}</div>
                    <div class="sender-details">
                        <div class="sender-name">${msg.from}</div>
                    </div>
                </div>
                <div class="message-time">${msg.time}</div>
            </div>
            <div class="message-subject">${msg.subject}</div>
            <div class="message-preview">${msg.preview}</div>
            <div class="message-meta">
                <span class="priority-badge ${msg.priority}">${capitalizeFirstLetter(msg.priority)}</span>
                <i class='bx ${msg.starred ? 'bxs-star' : 'bx-star'} star-icon ${msg.starred ? 'starred' : ''}' 
                   onclick="toggleStar(event, ${msg.id})"></i>
                ${msg.attachments.length > 0 ? `<i class='bx bx-paperclip attachment-icon'></i>` : ''}
            </div>
        </div>
    `).join("");

    messagesList.innerHTML = messagesHTML;

    // Update folder counts
    updateFolderCounts();
}

// View Message
function viewMessage(id) {
    const message = messages.find(msg => msg.id === id);
    if (!message) return;

    selectedMessageId = id;
    message.read = true;

    const messageDetail = document.getElementById("messageDetail");
    
    const attachmentsHTML = message.attachments.length > 0 ? `
        <div class="message-attachments">
            <h4><i class='bx bx-paperclip'></i> Attachments (${message.attachments.length})</h4>
            <div class="attachments-list">
                ${message.attachments.map(att => `
                    <div class="attachment-item">
                        <div class="attachment-icon">
                            <i class='bx ${getAttachmentIcon(att.type)}'></i>
                        </div>
                        <div class="attachment-info">
                            <div class="attachment-name">${att.name}</div>
                            <div class="attachment-size">${att.size}</div>
                        </div>
                        <button class="attachment-download">
                            <i class='bx bx-download'></i> Download
                        </button>
                    </div>
                `).join("")}
            </div>
        </div>
    ` : '';

    messageDetail.innerHTML = `
        <div class="message-content">
            <div class="message-content-header">
                <div class="message-actions">
                    <button class="action-btn" onclick="replyToMessage(${id})">
                        <i class='bx bx-reply'></i> Reply
                    </button>
                    <button class="action-btn" onclick="forwardMessage(${id})">
                        <i class='bx bx-share'></i> Forward
                    </button>
                    <button class="action-btn" onclick="archiveMessage(${id})">
                        <i class='bx bx-archive'></i> Archive
                    </button>
                    <button class="action-btn danger" onclick="deleteMessage(${id})">
                        <i class='bx bx-trash'></i> Delete
                    </button>
                </div>
                <h2 class="message-content-subject">${message.subject}</h2>
                <div class="message-content-meta">
                    <div class="meta-item">
                        <strong>From:</strong> ${message.from} &lt;${message.email}&gt;
                    </div>
                    <div class="meta-item">
                        <strong>To:</strong> ${message.to}
                    </div>
                    <div class="meta-item">
                        <strong>Time:</strong> ${message.time}
                    </div>
                    <span class="priority-badge ${message.priority}">${capitalizeFirstLetter(message.priority)} Priority</span>
                </div>
            </div>
            <div class="message-content-body">
                ${message.body.replace(/\n/g, '<br>')}
            </div>
            ${attachmentsHTML}
        </div>
    `;

    renderMessages();
}

// Reply to Message
function replyToMessage(id) {
    const message = messages.find(msg => msg.id === id);
    if (!message) return;

    document.getElementById("replyTo").textContent = `${message.from} <${message.email}>`;
    document.getElementById("replySubject").textContent = `Re: ${message.subject}`;
    document.getElementById("replyForm").dataset.messageId = id;
    document.getElementById("replyModal").classList.add("active");
}

// Send Reply
function sendReply() {
    const messageId = parseInt(document.getElementById("replyForm").dataset.messageId);
    const replyBody = document.getElementById("replyBody").value;
    const originalMessage = messages.find(msg => msg.id === messageId);

    if (!originalMessage) return;

    const newMessage = {
        id: Date.now(),
        from: "You",
        email: "you@company.com",
        to: originalMessage.email,
        subject: `Re: ${originalMessage.subject}`,
        preview: replyBody.substring(0, 100) + "...",
        body: replyBody,
        folder: "sent",
        priority: "medium",
        starred: false,
        read: true,
        time: "Just now",
        timestamp: Date.now(),
        attachments: []
    };

    messages.unshift(newMessage);
    
    document.getElementById("replyModal").classList.remove("active");
    document.getElementById("replyForm").reset();
    
    showToast("Reply sent successfully!");
    
    // Switch to sent folder
    const sentTab = document.querySelector('.folder-tab[data-folder="sent"]');
    if (sentTab) {
        sentTab.click();
    }
}

// Forward Message
function forwardMessage(id) {
    const message = messages.find(msg => msg.id === id);
    if (!message) return;

    document.getElementById("subject").value = `Fwd: ${message.subject}`;
    document.getElementById("messageBody").value = `\n\n---------- Forwarded message ----------\nFrom: ${message.from} <${message.email}>\nSubject: ${message.subject}\n\n${message.body}`;
    document.getElementById("composeModal").classList.add("active");
}

// Send Message
function sendMessage() {
    const form = document.getElementById("composeForm");
    const formData = new FormData(form);
    
    const recipients = Array.from(formData.getAll("recipient")).join(", ");
    const subject = formData.get("subject");
    const body = formData.get("messageBody");
    const priority = formData.get("priority");

    const newMessage = {
        id: Date.now(),
        from: "You",
        email: "you@company.com",
        to: recipients,
        subject: subject,
        preview: body.substring(0, 100) + "...",
        body: body,
        folder: "sent",
        priority: priority,
        starred: false,
        read: true,
        time: "Just now",
        timestamp: Date.now(),
        attachments: []
    };

    messages.unshift(newMessage);
    
    document.getElementById("composeModal").classList.remove("active");
    form.reset();
    
    showToast("Message sent successfully!");
    
    // Switch to sent folder
    const sentTab = document.querySelector('.folder-tab[data-folder="sent"]');
    if (sentTab) {
        sentTab.click();
    }
}

// Toggle Star
function toggleStar(event, id) {
    event.stopPropagation();
    const message = messages.find(msg => msg.id === id);
    if (message) {
        message.starred = !message.starred;
        renderMessages();
        
        if (message.starred) {
            showToast("Message starred");
        } else {
            showToast("Star removed");
        }
    }
}

// Archive Message
function archiveMessage(id) {
    const message = messages.find(msg => msg.id === id);
    if (message) {
        message.folder = "archived";
        selectedMessageId = null;
        document.getElementById("messageDetail").innerHTML = `
            <div class="empty-state">
                <i class='bx bx-message-square-dots'></i>
                <h3>No Message Selected</h3>
                <p>Select a message from the list to view its contents</p>
            </div>
        `;
        renderMessages();
        showToast("Message archived");
    }
}

// Delete Message
function deleteMessage(id) {
    if (confirm("Are you sure you want to delete this message?")) {
        messages = messages.filter(msg => msg.id !== id);
        selectedMessageId = null;
        document.getElementById("messageDetail").innerHTML = `
            <div class="empty-state">
                <i class='bx bx-message-square-dots'></i>
                <h3>No Message Selected</h3>
                <p>Select a message from the list to view its contents</p>
            </div>
        `;
        renderMessages();
        showToast("Message deleted");
    }
}

// Update Folder Counts
function updateFolderCounts() {
    const inboxCount = messages.filter(msg => msg.folder === "inbox").length;
    const sentCount = messages.filter(msg => msg.folder === "sent").length;
    const starredCount = messages.filter(msg => msg.starred).length;
    const archivedCount = messages.filter(msg => msg.folder === "archived").length;

    document.querySelector('.folder-tab[data-folder="inbox"] .folder-count').textContent = inboxCount;
    document.querySelector('.folder-tab[data-folder="sent"] .folder-count').textContent = sentCount;
    document.querySelector('.folder-tab[data-folder="starred"] .folder-count').textContent = starredCount;
    document.querySelector('.folder-tab[data-folder="archived"] .folder-count').textContent = archivedCount;
}

// Get Initials
function getInitials(name) {
    return name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
}

// Get Attachment Icon
function getAttachmentIcon(type) {
    const icons = {
        pdf: "bxs-file-pdf",
        doc: "bxs-file-doc",
        excel: "bxs-file",
        zip: "bxs-file-archive",
        image: "bxs-image"
    };
    return icons[type] || "bxs-file";
}

// Capitalize First Letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Toast Notification
function showToast(message) {
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
    
    setTimeout(() => {
        toast.classList.add("active");
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove("active");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
