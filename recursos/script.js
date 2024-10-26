const API_URL = 'http://localhost:5000/';

async function fetchRecords() {
    const response = await fetch(API_URL);
    const records = await response.json();
    updateTable(records);
}

async function createRecord() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
        await fetchRecords();
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    }
}

async function deleteRecord(name) {
    const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });

    if (response.ok) {
        await fetchRecords();
    }
}

async function updateRecord(name) {
    const email = prompt('Novo E-mail:');
    if (email) {
        const response = await fetch(API_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
            await fetchRecords();
        }
    }
}

function updateTable(records) {
    const recordsBody = document.getElementById('recordsBody');
    recordsBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>
                <button onclick="updateRecord('${record.name}')">Alterar</button>
                <button onclick="deleteRecord('${record.name}')">Deletar</button>
            </td>
        `;
        recordsBody.appendChild(row);
    });
}

function searchRecords() {
    const query = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#recordsBody tr');

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        row.style.display = name.includes(query) ? '' : 'none';
    });
}

// Carregar registros ao iniciar
fetchRecords();
