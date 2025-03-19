const { Produccion } = require("../models")
const getProduccion = async (req, res) => {
    try {
        const produccion = await Produccion.findAll();
        res.status(200).json(produccion);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addProduccion = async (req, res) => {
    try {
        const { producto_id, unidades_producidas, defectuosas } = req.body;
        const porcentajeDefectuosos = (defectuosas / unidades_producidas) * 100
        const produccion = await Produccion.create({ producto_id, unidades_producidas, defectuosas, porcentajeDefectuosos });

        res.status(201).json(produccion);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateProduccion = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto_id, unidades_producidas, defectuosas } = req.body;

        const produccion = await Produccion.findByPk(id);
        if (!produccion) {
            return res.status(404).json({ message: "Produccion no encontrada" });
        }

        if (producto_id) produccion.producto_id = producto_id;
        if (unidades_producidas) produccion.unidades_producidas = unidades_producidas;
        if (defectuosas) produccion.defectuosas = defectuosas;
        if (defectuosas || unidades_producidas) produccion.porcentajeDefectuosos = (defectuosas / unidades_producidas) * 100
        await produccion.save();
        return res.status(200).json({ message: "produccion actualizada", produccion })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const changeProduccionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { activa } = req.body;

        const produccion = await Produccion.findByPk(id);
        if (!produccion) {
            return res.status(404).json({ error: "produccion no encontrada" });
        }

        produccion.activa = activa;
        await produccion.save();

        res.json({ message: `Estado actualizado a ${activa}`, produccion });
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
const deleteProduccion = async (req, res) => {
    try {
        const { id } = req.params;

        const produccion = await Produccion.findByPk(id);
        if (!produccion) {
            return res.status(404).json({ error: "produccion no encontrada" });
        }

        await produccion.destroy();

        res.status(200).json({ message: "produccion eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar produccion:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = { getProduccion, addProduccion, updateProduccion, changeProduccionStatus, deleteProduccion };