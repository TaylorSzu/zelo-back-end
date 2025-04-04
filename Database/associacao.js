const connected = require("./Database.js");
const User = require("../Models/userModel.js");
const Cliente = require("./Models/clienteModel.js");
const Cuidador = require("./Models/cuidadorModel.js");
const Agendamento = require("./Models/agendamentoModel.js");

// Relacionamentos Cuidador
User.hasMany(Cuidadores, { foreignKey: "usuarioId", onDelete: "CASCADE" });
Cuidadores.hasMany(Contratantes, { foreignKey: "cuidadorId", onDelete: "CASCADE" });
Cuidadores.hasMany(Agendamento, { foreignKey: "cuidadorId", onDelete: "CASCADE" });

Cuidadores.belongsTo(User, { foreignKey: "usuarioId" });
Agendamento.belongsTo(Cuidadores, { foreignKey: "cuidadorId" });
Contratantes.belongsTo(Cuidadores, { foreignKey: "cuidadorId" });

// Relacionamentos Contratante
Usuario.hasMany(Contratantes, { foreignKey: "usuarioId", onDelete: "CASCADE" });
Contratantes.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Relacionamentos Agendamento

Contratantes.hasMany(Agendamento, { foreignKey: "contratanteId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Cuidadores.hasMany(Agendamento, { foreignKey: "cuidadorId", onDelete: "CASCADE", onUpdate: "CASCADE" });

Agendamento.belongsTo(Contratantes, { foreignKey: "contratanteId", onDelete: "CASCADE", onUpdate: "CASCADE" });
Agendamento.belongsTo(Cuidadores, { foreignKey: "cuidadorId", onDelete: "CASCADE", onUpdate: "CASCADE" });

// Sincronização com o banco
connected.sync()
    .then(() => {
        console.log("✅ Banco de dados sincronizado com sucesso!");
    })
    .catch((error) => {
        console.error("❌ Erro ao sincronizar com o banco de dados:", error);
    });
