import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Travels Booking API',
      version: '1.0.0',
      description: '',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          bearerFormat: 'JWT',
          scheme: 'bearer',
          type: 'http',
        },
      },
      schemas: {
        Role: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
              enum: ['ADMIN', 'USER'],
            },
            userId: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            users: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            phoneNumber: {
              type: 'string',
            },
            avatar: {
              type: 'string',
            },
            roleIds: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            roles: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Role',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Tour: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            address: {
              type: 'string',
            },
            distance: {
              type: 'integer',
            },
            thumbnail: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            price: {
              type: 'integer',
              format: 'currency',
            },
            maxGroupSize: {
              type: 'integer',
              format: 'int32',
            },
            featured: {
              type: 'boolean',
              default: 'false',
            },
            reviews: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Review',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            reviewText: {
              type: 'string',
            },
            rating: {
              type: 'integer',
              format: 'int32',
              example: 5,
            },
            tour: {
              $ref: '#/components/schemas/Tour',
            },
            tourId: {
              type: 'string',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
            userId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/routes/*.route.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
