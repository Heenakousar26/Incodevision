const API_URL = '/api/notes';

const noteForm = document.getElementById('note-form');
const noteIdInput = document.getElementById('note-id');
const noteTitleInput = document.getElementById('note-title');
const noteContentInput = document.getElementById('note-content');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const notesList = document.getElementById('notes-list');

async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        const notes = await response.json();
        renderNotes(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

function renderNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <div>
                <h3>${escapeHTML(note.title)}</h3>
                <p>${escapeHTML(note.content)}</p>
            </div>
            <div class="card-actions">
                <button class="edit-btn" onclick="editNote('${note._id}', '${escapeAttr(note.title)}', '${escapeAttr(note.content)}')">Edit</button>
                <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
            </div>
        `;
        notesList.appendChild(card);
    });
}

noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = noteIdInput.value;
    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();

    if (!title || !content) return;

    try {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content })
            });
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content })
            });
        }
        resetForm();
        fetchNotes();
    } catch (error) {
        console.error('Error saving note:', error);
    }
});

function editNote(id, title, content) {
    noteIdInput.value = id;
    noteTitleInput.value = title;
    noteContentInput.value = content;
    submitBtn.textContent = 'Update Note';
    cancelBtn.classList.remove('hidden');
}

async function deleteNote(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

function resetForm() {
    noteIdInput.value = '';
    noteTitleInput.value = '';
    noteContentInput.value = '';
    submitBtn.textContent = 'Add Note';
    cancelBtn.classList.add('hidden');
}

cancelBtn.addEventListener('click', resetForm);

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function escapeAttr(str) {
    return str.replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

fetchNotes();