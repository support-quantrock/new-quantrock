import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Define available tools
const tools: Tool[] = [
  {
    name: 'chat_with_claude',
    description: 'Send a message to Claude and get a response',
    inputSchema: {
      type: 'object',
      properties: {
        messages: {
          type: 'array',
          description: 'Array of message objects with role and content',
          items: {
            type: 'object',
            properties: {
              role: {
                type: 'string',
                enum: ['user', 'assistant'],
              },
              content: {
                type: 'string',
              },
            },
            required: ['role', 'content'],
          },
        },
        model: {
          type: 'string',
          description: 'Claude model to use',
          default: 'claude-3-5-sonnet-20241022',
        },
        max_tokens: {
          type: 'number',
          description: 'Maximum tokens in response',
          default: 1024,
        },
      },
      required: ['messages'],
    },
  },
  {
    name: 'get_models',
    description: 'Get list of available Claude models',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

// Create MCP server
const server = new Server(
  {
    name: 'claude-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'chat_with_claude': {
        const { messages, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024 } = args as {
          messages: Array<{ role: 'user' | 'assistant'; content: string }>;
          model?: string;
          max_tokens?: number;
        };

        const response = await anthropic.messages.create({
          model,
          max_tokens,
          messages,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      }

      case 'get_models': {
        const models = [
          {
            id: 'claude-3-5-sonnet-20241022',
            name: 'Claude 3.5 Sonnet',
            description: 'Most intelligent model',
            context_window: 200000,
          },
          {
            id: 'claude-3-5-haiku-20241022',
            name: 'Claude 3.5 Haiku',
            description: 'Fastest model',
            context_window: 200000,
          },
          {
            id: 'claude-3-opus-20240229',
            name: 'Claude 3 Opus',
            description: 'Most powerful model for complex tasks',
            context_window: 200000,
          },
        ];

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ models }, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: error.message,
            details: error.toString(),
          }),
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Claude MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
