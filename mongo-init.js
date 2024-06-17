db = db.getSiblingDB('GEMSUS');
db.createCollection('farmaceutico', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['senha', 'nome', 'local'],
            properties: {
                // cpf
                _id: {
                    bsonType: 'string',
                    pattern: '^\\d{11}$',
                },
                senha: {
                    bsonType: 'string',
                    // sha256 hash
                    pattern: '^[a-f\\d]{64}$',
                },
                nome: {
                    bsonType: 'string',
                    pattern: '^[A-Z][a-z]*( [A-Za-z]+)*$',
                    maxLength: 64,
                },
                local: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
            },
        },
    },
});
db.createCollection('secretaria', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['senha', 'nome'],
            properties: {
                // codigo da regiao
                _id: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
                senha: {
                    bsonType: 'string',
                    // sha256 hash
                    pattern: '^[a-f\\d]{64}$',
                },
                nome: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
                estado: {
                    bsonType: 'string',
                    // UF
                    pattern: '^[A-Z]{2}$',
                },
                cidade: {
                    bsonType: 'string',
                    pattern: '^[A-Z][a-z]*( [A-Za-z]+)*$',
                    maxLength: 64,
                },
            },
        },
    },
});
db.createCollection('medicamento', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nome'],
            properties: {
                // registro anvisa
                _id: {
                    bsonType: 'string',
                    pattern: '^\\d{13}$',
                },
                nome: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
                tarja: {
                    bsonType: 'string',
                    // A = Amarela, V = Vermelha, P = Preta
                    enum: ['A', 'V', 'P'],
                },
            },
        },
    },
});
db.createCollection('estoqueRegional', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['quantidade', 'secretaria_id', 'medicamento_id'],
            properties: {
                quantidade: {
                    bsonType: 'int',
                    minimum: 0,
                },
                secretaria_id: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
                medicamento_id: {
                    bsonType: 'string',
                    pattern: '^\\d{13}$',
                },
            },
        },
    },
});
db.estoqueRegional.createIndex({secretaria_id: 1, medicamento_id: 1}, {unique: true});
db.createCollection('estoqueLocal', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['quantidade', 'local', 'medicamento_id'],
            properties: {
                quantidade: {
                    bsonType: 'int',
                    minimum: 0,
                },
                local: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
                medicamento_id: {
                    bsonType: 'string',
                    pattern: '^\\d{13}$',
                },
            },
        },
    },
});
db.estoqueLocal.createIndex({local: 1, medicamento_id: 1}, {unique: true});
db.createCollection('paciente', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nome', 'senha', 'posto', 'secretaria_id'],
            properties: {
                // cpf
                _id: {
                    bsonType: 'string',
                    pattern: '^\\d{11}$',
                },
                senha: {
                    bsonType: 'string',
                    // sha256 hash
                    pattern: '^[a-f\\d]{64}$',
                },
                nome: {
                    bsonType: 'string',
                    pattern: '^[A-Z][a-z]*( [A-Za-z]+)*$',
                    maxLength: 64,
                },
                convenio: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
                posto: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
                secretaria_id: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
            },
        },
    },
});
db.createCollection('medico', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nome', 'senha', 'secretaria_id'],
            properties: {
                // crm
                _id: {
                    bsonType: 'string',
                    pattern: '^\\d{6}(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$',
                },
                senha: {
                    bsonType: 'string',
                    // sha256 hash
                    pattern: '^[a-f\\d]{64}$',
                },
                nome: {
                    bsonType: 'string',
                    pattern: '^[A-Z][a-z]*( [A-Za-z]+)*$',
                    maxLength: 64,
                },
                secretaria_id: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 64,
                },
            },
        },
    },
});
db.createCollection('receita', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['data', 'medicamento_id', 'paciente_id', 'medico_id'],
            properties: {
                prontidao: {
                    bsonType: 'string',
                    // E = Emergencial, S = Semanal, M = Mensal
                    enum: ['E', 'S', 'M'],
                },
                comRetencao: {bsonType: 'bool'},
                data: {bsonType: 'date'},
                medicamento_id: {
                    bsonType: 'string',
                    pattern: '^\\d{13}$',
                },
                paciente_id: {
                    bsonType: 'string',
                    pattern: '^\\d{11}$',
                },
                medico_id: {
                    bsonType: 'string',
                    pattern: '^\\d{6}(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$',
                },
            },
        },
    },
});