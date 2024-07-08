const express = require('express');
const router = express.Router();
const Transaccion = require('../models/Transaccion');
const CasaApuestas = require('../models/CasaApuestas');

// Middleware de validación
const validateTransaccion = (req, res, next) => {
  const { fecha, casaApuestasId, tipo, importe, comentarios } = req.body;
  const errors = [];

  if (!fecha) errors.push('La fecha es requerida');
  if (!casaApuestasId) errors.push('El ID de la casa de apuestas es requerido');
  if (!tipo || !['Depósito', 'Retiro'].includes(tipo)) errors.push('El tipo debe ser "Depósito" o "Retiro"');
  if (!importe || isNaN(importe) || importe <= 0) errors.push('El importe debe ser un número positivo');
  if (comentarios && comentarios.length > 500) errors.push('Los comentarios no pueden exceder 500 caracteres');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

// POST una nueva transacción
router.post('/', validateTransaccion, async (req, res) => {
  try {
    const casaApuestas = await CasaApuestas.findByPk(req.body.casaApuestasId);
    if (!casaApuestas) {
      return res.status(400).json({ message: "La casa de apuestas especificada no existe" });
    }

    const nuevaTransaccion = await Transaccion.create(req.body);
    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT actualizar una transacción existente
router.put('/:id', validateTransaccion, async (req, res) => {
  try {
    const transaccion = await Transaccion.findByPk(req.params.id);
    if (!transaccion) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    await transaccion.update(req.body);
    res.json(transaccion);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/transacciones:
 *   get:
 *     summary: Obtiene todas las transacciones
 *     tags: [Transacciones]
 *     responses:
 *       200:
 *         description: Lista de transacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaccion'
 */
// GET todas las transacciones
router.get('/', async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      include: [{ model: CasaApuestas, attributes: ['nombre'] }]
    });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Transaccion:
 *       type: object
 *       required:
 *         - fecha
 *         - casaApuestasId
 *         - tipo
 *         - importe
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la transacción
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la transacción
 *         casaApuestasId:
 *           type: integer
 *           description: ID de la casa de apuestas asociada
 *         tipo:
 *           type: string
 *           enum: [Depósito, Retiro]
 *           description: Tipo de transacción
 *         importe:
 *           type: number
 *           description: Importe de la transacción
 *         comentarios:
 *           type: string
 *           description: Comentarios adicionales
 */

// GET una transacción específica por ID
router.get('/:id', async (req, res) => {
  try {
    const transaccion = await Transaccion.findByPk(req.params.id, {
      include: [{ model: CasaApuestas, attributes: ['nombre'] }]
    });
    if (transaccion) {
      res.json(transaccion);
    } else {
      res.status(404).json({ message: 'Transacción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE una transacción
router.delete('/:id', async (req, res) => {
  try {
    const transaccion = await Transaccion.findByPk(req.params.id);
    if (transaccion) {
      await transaccion.destroy();
      res.json({ message: 'Transacción eliminada' });
    } else {
      res.status(404).json({ message: 'Transacción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


router.get('/', async (req, res) => {
  // ... tu código existente ...
});

