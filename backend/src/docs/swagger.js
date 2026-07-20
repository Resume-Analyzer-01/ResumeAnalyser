import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'ResumeAI REST API Documentation',
      version: '1.0.0',
      description: 'Production-ready Express.js API backend for parsing, analyzing, and auditing resumes with role-based JWT control.',
      contact: {
        name: 'ResumeAI Support',
        url: 'http://localhost:5173/contact'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Input authorization token in form "Bearer <token>" to authenticate routes.'
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/app.js']
}

export const swaggerDocs = swaggerJsDoc(swaggerOptions)
export default swaggerDocs
