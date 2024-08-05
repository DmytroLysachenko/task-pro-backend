import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A description of my API',
    },
    servers: [
      {
        url: 'https://task-pro-backend-xdd4.onrender.com',
      },
    ],
    components: {
      schemas: {
        Register: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8, maxLength: 16 },
          },
          required: ['username', 'email', 'password'],
        },
        Login: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8, maxLength: 16 },
          },
          required: ['email', 'password'],
        },
        RefreshToken: {
          type: 'object',
          properties: {
            refreshToken: { type: 'string' },
          },
          required: ['refreshToken'],
        },
        PatchUser: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8, maxLength: 16 },
            theme: { type: 'string', enum: ['light', 'dark', 'violet'] },
          },
        },
        ResendVerifyMessage: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
          },
          required: ['email'],
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
          },
        },
        Board: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'board123' },
            title: { type: 'string', example: 'My Board' },
            icon: {
              type: 'string',
              example: 'icon_1',
              enum: ['icon_1', 'icon_2', 'icon_3'],
            },
            backgroundImg: {
              type: 'string',
              nullable: true,
              example: 'http://example.com/background.jpg',
            },
            columns: {
              type: 'array',
              items: {
                type: 'object', // Define the schema for objects in columns if needed
              },
              example: [],
            },
          },
          required: ['id', 'title', 'icon'],
        },
        BoardCreation: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'New Board' },
            icon: {
              type: 'string',
              example: 'icon_2',
              enum: ['icon_1', 'icon_2', 'icon_3'],
            },
            backgroundImg: {
              type: 'string',
              nullable: true,
              example: 'image_1',
            },
          },
          required: ['title'],
        },
        BoardUpdate: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Updated Board Title' },
            icon: {
              type: 'string',
              example: 'icon_3',
              enum: ['icon_1', 'icon_2', 'icon_3'],
            },
            backgroundImg: {
              type: 'object',
              nullable: true,
              example: {
                mobile: 'http://example.com/new-background.jpg',
                tablet: 'http://example.com/new-background.jpg',
                desktop: 'http://example.com/new-background.jpg',
              },
            },
            columns: {
              type: 'array',
              items: {
                type: 'object', // Define the schema for objects in columns if needed
              },
              example: [],
            },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./dist/routes/*.js'], // Adjust this path as needed
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
