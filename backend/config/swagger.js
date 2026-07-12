import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'HealthSlot API',
    version: '1.0.0',
    description:
      'Swagger documentation for the HealthSlot MERN backend covering appointments, doctors, services, payments, and uploads.',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local development server',
    },
  ],
  tags: [
    { name: 'Health', description: 'Basic health and status endpoints' },
    { name: 'Authentication', description: 'Doctor and protected authentication flows' },
    { name: 'Users', description: 'Patient-facing endpoints' },
    { name: 'Doctors', description: 'Doctor profiles, login, and availability' },
    { name: 'Appointments', description: 'Doctor appointment booking and management' },
    { name: 'Admin', description: 'Administrative summaries and counts' },
    { name: 'Payments', description: 'Stripe and payment confirmation flows' },
    { name: 'Services', description: 'Service catalog and service appointments' },
    { name: 'Uploads', description: 'Multipart upload flows for doctor and service images' },
  ],
  security: [{ bearerAuth: [] }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT issued by the doctor authentication flow. Clerk-authenticated patient routes may also be exercised with a Bearer token when available.',
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [path.resolve(__dirname, '../docs/swaggerDocs.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
