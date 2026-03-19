// Config
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import handlerError from './Shared/Infrastructure/Utils/Middlewares/HandlerError';

// Routers
/* import { UsuarioRouter } from './Usuarios/Infrastructure/Router';
import { PagoRouter } from './Pagos/Infrastructure/Router';
import { MembresiaRouter } from './Membresias/Infrastructure/Router';
import { PromocionRouter } from './Promociones/Infrastructure/Router';
import { EmpleadoRouter } from './Empleados/Infrastructure/Router';
import { PonchadaRouter } from './Ponchadas/Infrastructure/Router';
import { ClienteRouter } from './Clientes/Infrastructure/Router';
import { PagoClienteRouter } from './PagosClientes/Infrastructure/Router';
import { AlimentoRouter } from './Alimentos/Infrastructure/Router';
import { EjercicioRouter } from './Ejercicios/Infrastructure/Router';
import { DietaRouter } from './Dietas/Infrastructure/Router';
import { RutinaRouter } from './Rutinas/Infrastructure/Router';
import { EncuestaRouter } from './Encuestas/Infrastructure/Router';
import { RespuestaRouter } from './Respuestas/Infrastructure/Router';
import { ReporteRouter } from './Reportes/Infrastructure/Router'; */

// CONSTS
//const PREFIX = '/api/v1';

const app = express();

// Config
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // Tu frontend
    credentials: true, // Permitir envío de cookies
  }),
);
app.use(cookieParser());

// Routes
/* swaggerSpec(app); */
/* app.use(PREFIX, UsuarioRouter);
app.use(PREFIX, PagoRouter);
app.use(PREFIX, MembresiaRouter);
app.use(PREFIX, PromocionRouter);
app.use(PREFIX, EmpleadoRouter);
app.use(PREFIX, PonchadaRouter);
app.use(PREFIX, ClienteRouter);
app.use(PREFIX, PagoClienteRouter);
app.use(PREFIX, AlimentoRouter);
app.use(PREFIX, EjercicioRouter);
app.use(PREFIX, DietaRouter);
app.use(PREFIX, RutinaRouter);
app.use(PREFIX, EncuestaRouter);
app.use(PREFIX, RespuestaRouter);
app.use(PREFIX, ReporteRouter); */

app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Not found' });
  next();
});

// Middlewares
app.use(handlerError);

export { app };
