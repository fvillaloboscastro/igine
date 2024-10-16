// Editar solo la ficha ginecológica del paciente
pacienteCtrl.editFichaGinecologica = async (req, res) => {
    const { id } = req.params;  // ID del paciente
    const fichaGinecologica = req.body;  // Datos de la ficha ginecológica
  
    try {
      const paciente = await Paciente.findById(id);
      if (!paciente) {
        return res.status(404).json({ message: "Paciente no encontrado" });
      }
  
      paciente.fichaGinecologica = fichaGinecologica;
      await paciente.save();
  
      res.json({ message: "Ficha ginecológica actualizada", paciente });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la ficha ginecológica", error });
    }
  };
  