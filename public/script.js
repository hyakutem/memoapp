// Connect to the WebSocket server
const socket = io();

// DOM Elements
const memosContainer = document.getElementById('memosContainer');
const addMemoBtn = document.getElementById('addMemoBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Listen for memos updates from the server
    socket.on('memos-update', (memos) => {
        renderMemos(memos);
    });

    // Add new memo button event
    addMemoBtn.addEventListener('click', () => {
        createNewMemo();
    });

    // Initial load of memos
    socket.emit('get-memos');
});

// Function to create a new memo
function createNewMemo() {
    const newMemo = {
        content: 'New memo content...'
    };
    
    socket.emit('create-memo', newMemo);
}

// Function to update a memo
function updateMemo(id, content) {
    socket.emit('update-memo', { id, content });
}

// Function to delete a memo
function deleteMemo(id) {
    if (confirm('Are you sure you want to delete this memo?')) {
        socket.emit('delete-memo', id);
    }
}

// Function to render memos
function renderMemos(memos) {
    memosContainer.innerHTML = '';
    
    if (memos.length === 0) {
        memosContainer.innerHTML = '<p>No memos yet. Click "Add New Memo" to get started!</p>';
        return;
    }

    // Sort memos by timestamp (newest first)
    memos.sort((a, b) => b.timestamp - a.timestamp);

    memos.forEach(memo => {
        const memoElement = document.createElement('div');
        memoElement.className = 'memo';
        memoElement.innerHTML = `
            <textarea class="memo-content" data-id="${memo.id}">${memo.content}</textarea>
            <div class="memo-actions">
                <button class="delete-btn" data-id="${memo.id}">Delete</button>
            </div>
            <div class="timestamp">Created: ${formatTimestamp(memo.timestamp)}</div>
        `;
        
        memosContainer.appendChild(memoElement);
        
        // Add event listeners to the textarea
        const textarea = memoElement.querySelector('.memo-content');
        textarea.addEventListener('input', () => {
            updateMemo(memo.id, textarea.value);
        });
        
        // Add event listener to the delete button
        const deleteBtn = memoElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteMemo(memo.id);
        });
    });
}

// Helper function to format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}