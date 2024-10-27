const apiUrl = 'http://127.0.0.1:5000/';
let currentRecord = null;

// Função para buscar registros
function searchRecords() {
    const searchTerm = document.getElementById('search').value.trim();
    fetch(apiUrl + '?name=' + encodeURIComponent(searchTerm))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayRecords(Array.isArray(data) ? data : [data]);
        })
        .catch(error => {
            console.error('Erro na busca do registro:', error);
            alert('Erro ao buscar registros: ' + error.message);
        });
}

// Função para exibir os registros na tabela
function displayRecords(records) {
    const tbody = document.querySelector('#recordsTable tbody');
    tbody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-4 border">${record.name}</td>
            <td class="py-2 px-4 border">${record.email}</td>
            <td class="py-2 px-4 border">
                <button onclick="editRecord('${record.name}', '${record.email}', 'PUT')" class="bg-yellow-500 text-white rounded px-3 py-1 mr-2">Atualizar</button>
                <button onclick="deleteRecord('${record.name}')" class="bg-red-500 text-white rounded px-3 py-1">Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para editar registro
function editRecord(name, email) {
    document.getElementById('updateName').value = name;
    document.getElementById('updateEmail').value = email;

    currentRecord = { name, email };
    document.getElementById('updateSection').classList.remove('hidden');
}

// Função para criar registro
function createRecord() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
        alert("Por favor, preencha ambos os campos: Nome e Email.");
        return;
    }

    const record = { name, email };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    })
    .then(response => response.json())
    .then(data => {
        clearFields();  // Limpa os campos após criação
        searchRecords(); // Atualiza a tabela para mostrar o novo registro
    })
    .catch(error => {
        console.error('Erro ao criar registro:', error);
        alert('Erro ao criar registro: ' + error.message);
    });
}

// Função para atualizar registro
function updateRecord(method) {
    let record = {
        email: document.getElementById('updateEmail').value.trim()
    };

    fetch(apiUrl + '?name=' + encodeURIComponent(currentRecord.name), {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        searchRecords();
        clearUpdateFields();
    })
    .catch(error => {
        console.error('Erro ao atualizar registro:', error);
        alert('Erro ao atualizar registro: ' + error.message);
    });
}

// Função para deletar registro
function deleteRecord(name) {
    const record = { name: name };

    fetch(apiUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        searchRecords();
    })
    .catch(error => {
        console.error('Erro ao deletar registro:', error);
        alert('Erro ao deletar registro: ' + error.message);
    });
}

// Função para buscar métodos suportados (OPTIONS)
function fetchOptions() {
    fetch(apiUrl, { method: 'OPTIONS' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const optionsResponse = document.getElementById('optionsResponse');
            optionsResponse.innerHTML = '<h5 class="font-semibold">Métodos Suportados:</h5><ul class="list-disc ml-5">' + 
                data.methods.map(method => `<li>${method}</li>`).join('') + '</ul>';
            optionsResponse.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Erro ao buscar métodos suportados:', error);
            alert('Erro ao buscar métodos suportados: ' + error.message);
        });
}

// Função para limpar campos
function clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

// Função para limpar campos de atualização
function clearUpdateFields() {
    document.getElementById('updateName').value = '';
    document.getElementById('updateEmail').value = '';
    document.getElementById('updateSection').classList.add('hidden');
}
