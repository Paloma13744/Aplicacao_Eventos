const apiUrl = 'http://127.0.0.1:5000/api/records';  // URL da API

// Função para buscar e exibir registros
function searchRecords() {
    const searchTerm = document.getElementById('search').value;
    fetch(apiUrl + '?name=' + searchTerm)
        .then(response => response.json())
        .then(data => {
            displayRecords(data);
        })
        .catch(error => console.error('Erro:', error));
}

// Função para exibir registros na tabela
function displayRecords(records) {
    const tbody = document.querySelector('#recordsTable tbody');
    tbody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.email}</td>
            <td>
                <button onclick="editRecord('${record.name}', '${record.email}')">Editar</button>
                <button onclick="deleteRecord('${record.name}')">Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para criar ou atualizar um registro
function createOrUpdateRecord() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const method = records.some(record => record.name === name) ? 'PUT' : 'POST';
    fetch(apiUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao salvar o registro');
        return response.json();
    })
    .then(data => {
        alert('Registro salvo com sucesso!');
        searchRecords();  // Atualiza a lista
        clearFields();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar o registro. Tente novamente.');
    });
}

// Função para editar um registro
function editRecord(name, email) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
}

// Função para deletar um registro
function deleteRecord(name) {
    if (confirm('Você tem certeza que deseja deletar este registro?')) {
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao deletar o registro');
            return response.json();
        })
        .then(data => {
            alert('Registro deletado com sucesso!');
            searchRecords();  // Atualiza a lista
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao deletar o registro. Tente novamente.');
        });
    }
}

// Limpar campos de entrada
function clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

// Inicializa a busca ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    searchRecords();
});
