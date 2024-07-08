const express = require('express');
const router = express.Router();
const Apuesta = require('../models/Apuesta');
const CasaApuestas = require('../models/CasaApuestas');

// GET todas las apuestas
router.get('/', async (req, res) => {
  try {
    const apuestas = await Apuesta.findAll({
      include: [{ model: CasaApuestas, attributes: ['nombre'] }]
    });
    res.json(apuestas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET una apuesta específica por ID
router.get('/:id', async (req, res) => {
  try {
    const apuesta = await Apuesta.findByPk(req.params.id, {
      include: [{ model: CasaApuestas, attributes: ['nombre'] }]
    });
    if (apuesta) {
      res.json(apuesta);
    } else {
      res.status(404).json({ message: 'Apuesta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/apuestas:
 *   post:
 *     summary: Crea una nueva apuesta
 *     tags: [Apuestas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apuesta'
 *     responses:
 *       201:
 *         description: Apuesta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apuesta'
 *       400:
 *         description: Datos inválidos
 */

// POST una nueva apuesta
router.post('/', async (req, res) => {
  try {
    const nuevaApuesta = await Apuesta.create(req.body);
    res.status(201).json(nuevaApuesta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Apuesta:
 *       type: object
 *       required:
 *         - casaApuestasId
 *         - fechaApuesta
 *         - tipoApuesta
 *         - evento
 *         - fechaEvento
 *         - importe
 *         - cuota
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la apuesta
 *         casaApuestasId:
 *           type: integer
 *           description: ID de la casa de apuestas asociada
 *         fechaApuesta:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la apuesta
 *         tipoApuesta:
 *           type: string
 *           enum: [Calificante, Relleno, FreeBet, Aumento de Cuota, Exchange]
 *           description: Tipo de apuesta
 *         evento:
 *           type: string
 *           description: Evento sobre el que se apuesta
 *         fechaEvento:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora del evento
 *         importe:
 *           type: number
 *           description: Importe de la apuesta
 *         cuota:
 *           type: number
 *           description: Cuota de la apuesta
 *         estado:
 *           type: string
 *           enum: [Abierta, Ganada, Perdida, Cancelada]
 *           description: Estado de la apuesta
 */

// PUT actualizar una apuesta existente
router.put('/:id', async (req, res) => {
  try {
    const apuesta = await Apuesta.findByPk(req.params.id);
    if (apuesta) {
      await apuesta.update(req.body);
      res.json(apuesta);
    } else {
      res.status(404).json({ message: 'Apuesta no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE una apuesta
router.delete('/:id', async (req, res) => {
  try {
    const apuesta = await Apuesta.findByPk(req.params.id);
    if (apuesta) {
      await apuesta.destroy();
      res.json({ message: 'Apuesta eliminada' });
    } else {
      res.status(404).json({ message: 'Apuesta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

