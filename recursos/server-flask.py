#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask, request, jsonify

app = Flask(__name__)

# Define a constant for the filename
DATA_FILE = 'data.txt'

@app.route('/api/records', methods=['GET'])
def query_records():
    name = request.args.get('name')
    with open(DATA_FILE, 'r') as f:
        data = f.read()
        records = json.loads(data)
        for record in records:
            if record['name'] == str(name):
                return jsonify(record)
        return jsonify({'error': 'data not found'})

@app.route('/api/records', methods=['POST'])
def create_record():
    record = json.loads(request.data)
    with open(DATA_FILE, 'r') as f:
        data = f.read()
    if not data:
        records = [record]
    else:
        records = json.loads(data)
        records.append(record)
    with open(DATA_FILE, 'w') as f:
        f.write(json.dumps(records, indent=2))
    return jsonify(record)

@app.route('/api/records', methods=['PUT'])
def update_record():
    record = json.loads(request.data)
    new_records = []
    with open(DATA_FILE, 'r') as f:
        data = f.read()
        records = json.loads(data)
    for r in records:
        if r['name'] == record['name']:
            r['email'] = record['email']
        new_records.append(r)
    with open(DATA_FILE, 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    return jsonify(record)

@app.route('/api/records', methods=['DELETE'])
def delete_record():
    record = json.loads(request.data)
    new_records = []
    with open(DATA_FILE, 'r') as f:
        data = f.read()
        records = json.loads(data)
        for r in records:
            if r['name'] == record['name']:
                continue
            new_records.append(r)
    with open(DATA_FILE, 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    return jsonify(record)

@app.route('/api/records', methods=['OPTIONS'])
def options():
    return jsonify({
        'GET': 'Retrieve records',
        'POST': 'Create a new record',
        'PUT': 'Update an existing record',
        'DELETE': 'Delete a record',
        'PATCH': 'Partially update a record'
    }), 200

@app.route('/api/records', methods=['PATCH'])
def patch_record():
    record = json.loads(request.data)
    new_records = []
    with open(DATA_FILE, 'r') as f:
        data = f.read()
        records = json.loads(data)
    for r in records:
        if r['name'] == record['name']:
            r.update(record)  # Atualiza parcialmente
        new_records.append(r)
    with open(DATA_FILE, 'w') as f:
        f.write(json.dumps(new_records, indent=2))
    return jsonify(record)


app.run(debug=True)
