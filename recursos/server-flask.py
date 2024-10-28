#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Caminho completo para o arquivo data.txt
DATA_FILE_PATH = 'C:/Programas code/Aplicacao_Eventos/recursos/data.txt'



def read_records():
    try:
        with open(DATA_FILE_PATH, 'r') as f:
            data = f.read()
            return json.loads(data) if data else []
    except Exception as e:
        print(f"Erro ao ler o arquivo: {e}")
        return []

def write_records(records):
    try:
        with open(DATA_FILE_PATH, 'w') as f:
            f.write(json.dumps(records, indent=2))
    except Exception as e:
        print(f"Erro ao escrever no arquivo: {e}")

@app.route('/', methods=['GET', 'OPTIONS'])
def query_records():
    if request.method == 'OPTIONS':
        return jsonify({'methods': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}), 200
    
    name = request.args.get('name')
    records = read_records()

    if name:
        for record in records:
            if record['name'] == name:
                return jsonify(record)
        return jsonify({'error': 'data not found'}), 404

    return jsonify(records)  # Retorna todos os registros se name não for fornecido

@app.route('/', methods=['POST'])
def create_record():
    record = json.loads(request.data)
    records = read_records()
    records.append(record)
    write_records(records)
    return jsonify(record), 201

@app.route('/', methods=['PUT'])
def update_record():
    record = json.loads(request.data)
    records = read_records()
    record_found = False
    
    for r in records:
        if r['name'] == record['name']:
            r['name'] = record['name']
            r['email'] = record['email']
            record_found = True
            break

    if record_found:
        write_records(records)
        return jsonify(record), 200
    else:
        return jsonify({'error': 'data not found'}), 404

@app.route('/', methods=['PATCH'])
def patch_record():
    name = request.args.get('name')
    record = json.loads(request.data)
    records = read_records()
    record_found = False

    for r in records:
        if r['name'] == name:
            if 'name' in record:
                r['name'] = record['name']
            if 'email' in record:
                r['email'] = record['email']
            record_found = True
            break

    if record_found:
        write_records(records)
        return jsonify(r), 200
    else:
        return jsonify({'error': 'data not found'}), 404

@app.route('/', methods=['DELETE'])
def delete_record():
    record = json.loads(request.data)
    records = read_records()
    new_records = [r for r in records if r['name'] != record['name']]
    
    if len(records) == len(new_records):
        return jsonify({'error': 'data not found'}), 404
    
    write_records(new_records)
    return jsonify(record), 200

if __name__ == '__main__':
    app.run(debug=True)
