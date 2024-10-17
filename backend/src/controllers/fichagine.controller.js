const Paciente = require('../models/paciente');

// Editar solo la ficha ginecológica del paciente
const editarFichaGinecologica = async (req, res) => {
  const { id } = req.params;  // ID del paciente
  const fichaGinecologica = req.body;  // Datos de la ficha ginecológica enviados desde el frontend

  try {
    // Buscar al paciente por ID
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Actualizar la ficha ginecológica
    paciente.fichaGinecologica = fichaGinecologica;

    // Guardar los cambios
    await paciente.save();

    // Responder con el paciente actualizado
    res.json({ message: "Ficha ginecológica actualizada", paciente });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la ficha ginecológica", error });
  }
};

module.exports = { editarFichaGinecologica };
