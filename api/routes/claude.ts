import { Router, Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// POST /api/claude/chat - Send a message to Claude
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { messages, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Messages array is required'
      });
    }

    const response = await anthropic.messages.create({
      model,
      max_tokens,
      messages,
    });

    res.json(response);
  } catch (error: any) {
    console.error('Claude API Error:', error);
    res.status(500).json({
      error: 'Failed to communicate with Claude API',
      details: error.message
    });
  }
});

// POST /api/claude/stream - Stream a conversation with Claude
router.post('/stream', async (req: Request, res: Response) => {
  try {
    const { messages, model = 'claude-3-5-sonnet-20241022', max_tokens = 1024 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Messages array is required'
      });
    }

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await anthropic.messages.create({
      model,
      max_tokens,
      messages,
      stream: true,
    });

    for await (const messageStreamEvent of stream) {
      res.write(`data: ${JSON.stringify(messageStreamEvent)}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Claude Stream Error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Failed to stream from Claude API',
        details: error.message
      });
    }
  }
});

// GET /api/claude/models - Get available models
router.get('/models', async (req: Request, res: Response) => {
  try {
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

    res.json({ models });
  } catch (error: any) {
    console.error('Error fetching models:', error);
    res.status(500).json({
      error: 'Failed to fetch models',
      details: error.message
    });
  }
});

export default router;
