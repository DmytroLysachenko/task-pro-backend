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
                type: 'object',
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
              type: 'string',
              nullable: true,
              example: 'image_1',
            },
            columns: {
              type: 'array',
              items: {
                type: 'object',
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
        CreateColumnResponse: {
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
        Task: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '64d5f7d1c2d1e8d4d8c9b5a2',
            },
            title: {
              type: 'string',
              example: 'Task title',
            },
            description: {
              type: 'string',
              example: 'Task description',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              default: '',
              example: 'low',
            },
            deadline: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
          },
        },
        CreateTaskRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'New title',
            },
            description: {
              type: 'string',
              example: 'New description',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              default: '',
              example: 'low',
            },
            deadline: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
          },
          required: ['title', 'description'],
        },
        CreateTaskResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 201,
            },
            message: {
              type: 'string',
              example: 'Task successfully created',
            },
            data: {
              $ref: '#/components/schemas/Task',
            },
          },
        },
        UpdateTaskRequest: {
          type: 'object',
          properties: {
            columnId: {
              type: 'string',
              example: '64d5f7d1c2d1e8d4d8c9b5a2',
            },
            title: {
              type: 'string',
              example: 'New title',
            },
            description: {
              type: 'string',
              example: 'New description',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              default: '',
              example: 'low',
            },
            deadline: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
          },
        },
        UpdateTaskResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Task successfully updated',
            },
            data: {
              $ref: '#/components/schemas/Task',
            },
          },
        },
        sendSupportEmailRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user@mail.com',
            },
            message: {
              type: 'string',
              example: 'Comment message',
            },
          },
          required: ['email', 'message'],
        },
        sendSupportEmailResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Email send successfully',
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
  apis: ['./dist/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
