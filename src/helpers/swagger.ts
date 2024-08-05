import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks-pro API',
      version: '1.0.0',
      description: 'A detailed description to be used with Tasks-pro API',
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
        Column: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '64d5f7d1c2d1e8d4d8c9b5a2',
            },
            title: {
              type: 'string',
              example: 'To Do',
            },
            tasks: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: [],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
          },
        },
        CreateColumnRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'New Column',
            },
          },
          required: ['title'],
        },
        UpdateColumnRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'Updated Column Title',
            },
          },
          required: ['title'],
        },
        ColumnResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 201,
            },
            message: {
              type: 'string',
              example: 'Column successfully created',
            },
            data: {
              $ref: '#/components/schemas/Column',
            },
          },
        },
        UpdateColumnResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Column successfully updated',
            },
            data: {
              $ref: '#/components/schemas/Column',
            },
          },
        },
        DeleteColumnResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 204,
            },
            message: {
              type: 'string',
              example: 'Column successfully deleted',
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
