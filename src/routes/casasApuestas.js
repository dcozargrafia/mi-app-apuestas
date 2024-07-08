// src/routes/casasApuestas.js
const express = require('express');
const router = express.Router();
const CasaApuestas = require('../models/CasaApuestas');

// GET todas las casas de apuestas
router.get('/', async (req, res) => {
  try {
    const casasApuestas = await CasaApuestas.findAll();
    res.json(casasApuestas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET una casa de apuestas específica por ID
router.get('/:id', async (req, res) => {
  try {
    const casaApuestas = await CasaApuestas.findByPk(req.params.id);
    if (casaApuestas) {
      res.json(casaApuestas);
    } else {
      res.status(404).json({ message: 'Casa de apuestas no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /api/casas-apuestas:
 *   get:
 *     summary: Obtiene todas las casas de apuestas
 *     tags: [Casas de Apuestas]
 *     responses:
 *       200:
 *         description: Lista de casas de apuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CasaApuestas'
 */
// POST una nueva casa de apuestas
router.post('/', async (req, res) => {
  console.log('Datos recibidos:', req.body);
  try {
    const nuevaCasaApuestas = await CasaApuestas.create(req.body);
    res.status(201).json(nuevaCasaApuestas);
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(400).json({ 
      message: error.message, 
      name: error.name,
      errors: error.errors
    });
  }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     CasaApuestas:
 *       type: object
 *       required:
 *         - nombre
 *         - fechaRegistro
 *         - username
 *         - password
 *         - saldoInicial
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la casa de apuestas
 *         nombre:
 *           type: string
 *           description: Nombre de la casa de apuestas
 *         fechaRegistro:
 *           type: string
 *           format: date
 *           description: Fecha de registro de la casa de apuestas
 *         username:
 *           type: string
 *           description: Nombre de usuario para la casa de apuestas
 *         password:
 *           type: string
 *           description: Contraseña para la casa de apuestas
 *         observaciones:
 *           type: string
 *           description: Observaciones adicionales
 *         saldoInicial:
 *           type: number
 *           description: Saldo inicial de la casa de apuestas
 */

// PUT actualizar una casa de apuestas existente
router.put('/:id', async (req, res) => {
  try {
    const casaApuestas = await CasaApuestas.findByPk(req.params.id);
    if (casaApuestas) {
      await casaApuestas.update(req.body);
      res.json(casaApuestas);
    } else {
      res.status(404).json({ message: 'Casa de apuestas no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE una casa de apuestas
router.delete('/:id', async (req, res) => {
  try {
    const casaApuestas = await CasaApuestas.findByPk(req.params.id);
    if (casaApuestas) {
      await casaApuestas.destroy();
      res.json({ message: 'Casa de apuestas eliminada' });
    } else {
      res.status(404).json({ message: 'Casa de apuestas no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

