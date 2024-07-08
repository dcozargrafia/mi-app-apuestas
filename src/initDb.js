const CasaApuestas = require('./models/CasaApuestas');
const Apuesta = require('./models/Apuesta');

async function initDb() {
  // Inicializar Casas de Apuestas
  const casasApuestasCount = await CasaApuestas.count();
  if (casasApuestasCount === 0) {
    const casasApuestas = await CasaApuestas.bulkCreate([
      { nombre: "Bet365", fechaRegistro: new Date(), username: "user1", password: "pass1", saldoInicial: 1000 },
      { nombre: "William Hill", fechaRegistro: new Date(), username: "user2", password: "pass2", saldoInicial: 1000 },
      { nombre: "Bwin", fechaRegistro: new Date(), username: "user3", password: "pass3", saldoInicial: 1000 }
    ]);
    console.log("Casas de apuestas iniciales creadas.");

    // Inicializar Apuestas
    const apuestasCount = await Apuesta.count();
    if (apuestasCount === 0) {
      await Apuesta.bulkCreate([
        {
          fechaApuesta: new Date(),
          casaApuestasId: casasApuestas[0].id,
          tipoApuesta: "Calificante",
          evento: "Real Madrid vs Barcelona",
          fechaEvento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días en el futuro
          mercado: "Resultado final",
          importe: 50.00,
          cuota: 2.5,
          estado: "Abierta"
        },
        {
          fechaApuesta: new Date(),
          casaApuestasId: casasApuestas[1].id,
          tipoApuesta: "FreeBet",
          evento: "Liverpool vs Manchester United",
          fechaEvento: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 días en el futuro
          mercado: "Ambos equipos marcan",
          importe: 20.00,
          cuota: 1.8,
          estado: "Abierta"
        },
        {
          fechaApuesta: new Date(),
          casaApuestasId: casasApuestas[2].id,
          tipoApuesta: "Relleno",
          evento: "PSG vs Bayern Munich",
          fechaEvento: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 días en el futuro
          mercado: "Más/Menos 2.5 goles",
          importe: 30.00,
          cuota: 1.9,
          estado: "Abierta"
        }
      ]);
      console.log("Apuestas iniciales creadas.");
    }
  }
}

module.exports = initDb;