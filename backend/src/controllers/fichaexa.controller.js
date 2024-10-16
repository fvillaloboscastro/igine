const Paciente = require('../models/paciente');

// Editar solo la ficha de examen del paciente
const editarFichaExamen = async (req, res) => {
  const { id } = req.params;  // ID del paciente
  const fichaExamen = req.body;  // Datos de la ficha de examen enviados desde el frontend

  try {
    // Buscar al paciente por ID
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Actualizar la ficha de examen
    paciente.fichaExamen = fichaExamen;

    // Guardar los cambios
    await paciente.save();

    // Responder con el paciente actualizado
    res.json({ message: "Ficha de examen actualizada", paciente });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la ficha de examen", error });
  }
};

module.exports = { editarFichaExamen };
