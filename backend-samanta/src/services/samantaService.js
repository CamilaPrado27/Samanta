const db = require('../db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const listarPlantas = () => {
    return new Promise((resolve, reject) => {
        db.query('select t.id_planta, t.nome, t.nome_cientifico, t.url_imagem from plantas t;', (error, results) => {
            if (error) {
                return reject({
                    status: 500,
                    message: "Erro ao conectar ao banco",
                    error: error
                });
            }
            if (results.length > 0) {
                return resolve({
                    status: 200,
                    message: "Dados Plantas",
                    data: results
                });
            } else {
                return resolve({
                    status: 404,
                    message: "Nenhuma planta encontrada."
                });
            }
        });
    });
}

const dadosSensor = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM sensor ORDER BY dt_atualizacao DESC LIMIT 1;', (error, results) => {
            if (error) {
                return reject({
                    status: 500,
                    message: "Erro ao conectar ao banco",
                    error: error
                });
            }
            if (results.length > 0) {
                return resolve({
                    status: 200,
                    message: "Última atualização do sensor.",
                    data: results[0]
                });
            } else {
                return resolve({
                    status: 404,
                    message: "Nenhuma atualização encontrada."
                });
            }
        });
    });
};
const cadastroUsuario = (login, email, senha, dt_cadastro) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario WHERE email = ? OR login = ?', [email, login], (error, results) => {
            if (error) {
                // console.log(error);
                return reject({
                    status: 500,
                    message: "Erro ao conectar ao banco",
                    error: error
                });
            }

            if (results.length > 0) {
                const conflictField = results[0].email === email ? 'email' : 'login';
                return reject({
                    status: 401,
                    message: `O ${conflictField} já está cadastrado`,
                });
            } else {
                bcrypt.hash(senha, 10, (err, hash) => {
                    if (err) {
                        return reject({
                            status: 500,
                            message: "Erro ao gerar o hash da senha",
                            error: err
                        });
                    }

                    db.query(
                        'INSERT INTO usuario (login, email, senha, dt_cadastro) VALUES (?, ?, ?, ?);',
                        [login, email, hash, dt_cadastro],
                        (error, results) => {
                            if (error) {
                                console.log(error);
                                return reject({
                                    status: 500,
                                    message: "Erro ao inserir usuário no banco",
                                    error: error
                                });
                            }

                            if (results.affectedRows > 0) {
                                return resolve({
                                    status: 201,
                                    message: "Usuário Cadastrado",
                                    data: results
                                });
                            } else {
                                return resolve({
                                    status: 400,
                                    message: 'Não foi possível cadastrar o usuário',
                                    data: null
                                });
                            }
                        }
                    );
                });
            }
        });
    });
};
const loginUsuario = (email, senha) => {
    console.log(email)
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario WHERE email = ?;', [email], (error, results) => {
            if (error) {
                // console.log(error);
                return reject({
                    status: 500,
                    message: "Erro ao conectar ao banco",
                    error: error
                });
            }
            if (results.length < 1) {
                return reject({
                    status: 401,
                    message: 'Usuário não encontrado',
                    error: error
                })
            }
            bcrypt.compare(senha, results[0].senha, (err, result) => {
                if (err) {
                    return resolve({
                        status: 401,
                        message: 'Erro bcrypt',
                        error: error
                    })
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            Id_Usuario: results[0].Id_Usuario,
                            login: results[0].login,
                            email: results[0].email
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    )
                    return resolve({
                        status: 201,
                        message: "Autenticação feita com sucesso",
                        token: token
                    });
                }
                return resolve({
                    status: 401,
                    message: 'Senha Incorreta',
                    error: error
                })
            })
        });
    });
};
const cadastroPlanta = (Id_Usuario, Id_Vaso, Id_Planta, dt_criacao) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuario_vaso where Id_Vaso = ?;', [Id_Vaso], (error, results) => {
            if (error) {
                return reject({
                    status: 500,
                    message: "Erro ao conectar ao banco",
                    error: error
                });
            }

            if (results.length > 0) {
                const conflictField = results[0].Id_Usuario === Id_Usuario ? 'Vaso' : 'Vaso';
                return reject({
                    status: 401,
                    message: `O ${conflictField} já está cadastrado`,
                });
            } else {
                db.query(
                    'INSERT INTO usuario_vaso (Id_Usuario, Id_Vaso, Id_Planta, dt_criacao) VALUES (?, ?, ?, ?);;',
                    [Id_Usuario, Id_Vaso, Id_Planta, dt_criacao],
                    (error, results) => {
                        if (error) {
                            console.log(error);
                            return reject({
                                status: 500,
                                message: "Erro ao inserir usuário no banco",
                                error: error
                            });
                        }

                        if (results.affectedRows > 0) {
                            return resolve({
                                status: 201,
                                message: "Vaso Cadastrado",
                                data: results
                            });
                        } else {
                            return resolve({
                                status: 400,
                                message: 'Não foi possível cadastrar o Vaso',
                                data: null
                            });
                        }
                    }
                );

            }
        });




    });
}

const plantasUsuario = (Id_Usuario) => {
    return new Promise((resolve, reject) => {
        db.query('select t.Id_Planta, a.nome, a.nome_cientifico, a.descricao  from usuario_vaso t left join plantas a on t.Id_Planta = a.Id_Planta where t.Id_Usuario = ?;', [Id_Usuario], (error, results) => {
            if (error) {
                return reject({
                    status: 500,
                    message: "Erro ao conectar ao banco",
                    error: error
                });
            }
            if (results.length > 0) {
                return resolve({
                    status: 200,
                    message: "Dados Plantas",
                    data: results
                });
            } else {
                return resolve({
                    status: 201,
                    message: "Nenhuma planta encontrada.",
                    data: []

                });
            }
        });
    });
}

const plantaInvidual = (Id_Usuario) => {

    return new Promise((resolve, reject) => {
        db.query('select v.Id_Vaso, b.nome, b.nome_cientifico, b.descricao,  v.umidade, v.luminosidade, v.temperatura, v.dt_atualizacao  from ( select t.id_vaso, a.* from usuario_vaso t left join plantas a on t.Id_Planta = a.Id_Planta where t.id_usuario = ?) b  left join vaso v on b.id_vaso = v.id_vaso  ORDER BY dt_atualizacao DESC LIMIT 1 ;', [Id_Usuario], (error, results) => {
            if (error) {
                return reject({
                    status: 500,
                    message: "Erro ao conectar ao banco",
                    error: error
                });
            }
            if (results.length > 0) {
                return resolve({
                    status: 200,
                    message: "Dados Plantas",
                    data: results
                });
            } else {
                return resolve({
                    status: 200,
                    message: "Nenhuma planta encontrada.",
                    data: []

                });
            }
        });
    });

}

const relatorio = (Id_Vaso) => {

    return new Promise((resolve, reject) => {
        db.query('select t.Id_Vaso as id, t.umidade, t.luminosidade, t.temperatura, t.dt_atualizacao as data from vaso t where t.Id_Vaso = ? ;', 
            [Id_Vaso], (error, results) => {
            if (error) {
                return reject({
                    status: 500,
                    message: "Erro ao conectar ao banco",
                    error: error
                });
            }
            if (results.length > 0) {
                return resolve({
                    status: 200,
                    message: "Dados Plantas",
                    data: results
                });
            } else {
                return resolve({
                    status: 200,
                    message: "Nenhuma planta encontrada.",
                    data: []

                });
            }
        });
    });
}

module.exports = { listarPlantas, cadastroUsuario, cadastroPlanta, loginUsuario, dadosSensor, plantasUsuario, plantaInvidual, relatorio }

// module.exports = {
//     listarPlantas: () => {
//         return new Promise((aceito, rejeitado) => {
//             db.query('SELECT * FROM planta', (error, results) => {
//                 if (error) { rejeitado(error); return; }
//                 aceito(results);
//             })
//         });
//     },

//     buscarId_planta: (Id_Planta) => {
//         return new Promise((aceito, rejeitado) => {
//             db.query('SELECT * FROM Planta WHERE Id_Planta = ?', [Id_Planta], (error, results) => {
//                 if (error) { rejeitado(error); return; }
//                 if (results.length > 0) {
//                     aceito(results[0]);
//                 } else {
//                     aceito(false);
//                 }

//             })
//         })
//     },

//     listarSensor: () => {
//         return new Promise((aceito, rejeitado) => {
//             db.query('SELECT * FROM sensor', (error, results) => {
//                 if (error) { rejeitado(error); return; }
//                 aceito(results);
//             })
//         });
//     },

//     listarUsuarios: () => {
//         return new Promise((aceito, rejeitado) => {
//             db.query('SELECT * FROM usuario', (error, results) => {
//                 if (error) { rejeitado(error); return; }
//                 aceito(results);
//             })
//         });
//     },

//     buscarId_Usuario: (Id_Usuario) => {
//         return new Promise((aceito, rejeitado) => {
//             db.query('SELECT * FROM usuario WHERE Id_Usuario = ?', [Id_Usuario], (error, results) => {
//                 if (error) { rejeitado(error); return; }
//                 if (results.length > 0) {
//                     aceito(results[0]);
//                 } else {
//                     aceito(false);
//                 }

//             })
//         })
//     },
//     cadastroUsuario: (Id_Usuario, login, email, senha, dt_cadastro) => {
//         return new Promise((aceito, rejeitado) => {
//             db.query(`INSERT INTO usuario (Id_Usuario, login, email, senha, dt_cadastro) VALUES (?, ?, ?, ?, ?);`,
//                 [Id_Usuario, login, email, senha, dt_cadastro],
//                 (error, results) => {
//                     if (error) {
//                         console.log(error)
//                         rejeitado(error);
//                         return;
//                     }
//                     if (results.affectedRows > 0) {
//                         aceito(results);
//                     } else {
//                         aceito(false);
//                     }
//                 });
//         });
//     },
//     cadastroPlanta: (Id_Usuario, Id_Planta, nome, nome_cientifico, dt_criacao) => {
//         return new Promise((aceito, rejeitado) => {
//             db.query(`INSERT INTO planta (Id_Usuario, Id_Planta, nome, nome_cientifico, dt_criacao) VALUES (?, ?, ?, ?, ?);`,
//                 [Id_Usuario, Id_Planta, nome, nome_cientifico, dt_criacao],
//                 (error, results) => {
//                     if (error) {
//                         console.log(error)
//                         rejeitado(error);
//                         return;
//                     }
//                     if (results.affectedRows > 0) {
//                         aceito(results);
//                     } else {
//                         aceito(false);
//                     }
//                 });
//         });
//     }

// };

// const buscarId_Planta = () => {
//     return new Promise((aceito, rejeitado) => {
//         db.query('SELECT * FROM Planta WHERE Id_Planta = ?', [Id_Planta], (error, results) => {
//             if (error) { rejeitado(error); return; }
//             if (results.length > 0) {
//                 aceito(results[0]);
//             } else {
//                 aceito(false);
//             }

//         })
//     })
// }
// const listarSensor = () => {
//     return new Promise((aceito, rejeitado) => {
//         db.query('SELECT * FROM sensor', (error, results) => {
//             if (error) { rejeitado(error); return; }
//             aceito(results);
//         })
//     });
// }
