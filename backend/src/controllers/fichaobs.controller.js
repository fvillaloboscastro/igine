const Paciente = require('../models/paciente');

// Editar solo la ficha obstétrica del paciente
const editarFichaObstetrica = async (req, res) => {
  const { id } = req.params;  // ID del paciente
  const fichaObstetrica = req.body;  // Datos de la ficha obstétrica enviados desde el frontend

  try {
    // Buscar al paciente por ID
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Actualizar la ficha obstétrica
    paciente.fichaObstetrica = fichaObstetrica;

    // Guardar los cambios
    await paciente.save();

    // Responder con el paciente actualizado
    res.json({ message: "Ficha obstétrica actualizada", paciente });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la ficha obstétrica", error });
  }
};

module.exports = { editarFichaObstetrica };
