# Claude MCP Server & API Setup

This project includes both a Model Context Protocol (MCP) server and REST API endpoints for integrating with Claude AI.

## Prerequisites

1. **Anthropic API Key**: Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. **Node.js 20+**: Required for running the server

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your API key:

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
PORT=3000
NODE_ENV=development
```

## Running the Servers

### REST API Server

The REST API provides HTTP endpoints for interacting with Claude.

**Start the API server:**

```bash
npm run api
```

**Development mode with auto-reload:**

```bash
npm run api:dev
```

The API will be available at `http://localhost:3000`

### MCP Server

The MCP server provides a Model Context Protocol interface for Claude.

**Run the MCP server:**

```bash
npm run mcp
```

**Build and run (production):**

```bash
npm run mcp:build
npm run mcp:start
```

## API Endpoints

### Base URL
```
http://localhost:3000/api/claude
```

### 1. Chat with Claude

Send a message to Claude and get a response.

**Endpoint:** `POST /api/claude/chat`

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hello, Claude!"
    }
  ],
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024
}
```

**Response:**
```json
{
  "id": "msg_xxx",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Hello! How can I help you today?"
    }
  ],
  "model": "claude-3-5-sonnet-20241022",
  "stop_reason": "end_turn",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 20
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/claude/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "What is 2+2?"}],
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 100
  }'
```

### 2. Stream Response

Get a streaming response from Claude (Server-Sent Events).

**Endpoint:** `POST /api/claude/stream`

**Request Body:** Same as `/chat`

**Response:** Server-Sent Events stream

**JavaScript Example:**
```javascript
const eventSource = await fetch('http://localhost:3000/api/claude/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Tell me a story' }],
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024
  })
});

const reader = eventSource.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') break;
      const event = JSON.parse(data);
      console.log(event);
    }
  }
}
```

### 3. Get Available Models

Get a list of available Claude models.

**Endpoint:** `GET /api/claude/models`

**Response:**
```json
{
  "models": [
    {
      "id": "claude-3-5-sonnet-20241022",
      "name": "Claude 3.5 Sonnet",
      "description": "Most intelligent model",
      "context_window": 200000
    },
    {
      "id": "claude-3-5-haiku-20241022",
      "name": "Claude 3.5 Haiku",
      "description": "Fastest model",
      "context_window": 200000
    },
    {
      "id": "claude-3-opus-20240229",
      "name": "Claude 3 Opus",
      "description": "Most powerful model for complex tasks",
      "context_window": 200000
    }
  ]
}
```

**cURL Example:**
```bash
curl http://localhost:3000/api/claude/models
```

### 4. Health Check

Check if the API server is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## MCP Server Tools

The MCP server provides the following tools:

### 1. `chat_with_claude`

Send messages to Claude and get responses.

**Parameters:**
- `messages` (required): Array of message objects with `role` and `content`
- `model` (optional): Claude model ID (default: "claude-3-5-sonnet-20241022")
- `max_tokens` (optional): Maximum tokens in response (default: 1024)

### 2. `get_models`

Get a list of available Claude models.

**Parameters:** None

## MCP Configuration

The MCP server configuration is in `mcp-config.json`:

```json
{
  "mcpServers": {
    "claude": {
      "command": "node",
      "args": ["./mcp-server/index.js"],
      "env": {
        "ANTHROPIC_API_KEY": "${ANTHROPIC_API_KEY}"
      }
    }
  }
}
```

To use this with an MCP client, reference this configuration file.

## Available Models

| Model ID | Name | Description | Context Window |
|----------|------|-------------|----------------|
| `claude-3-5-sonnet-20241022` | Claude 3.5 Sonnet | Most intelligent model | 200,000 tokens |
| `claude-3-5-haiku-20241022` | Claude 3.5 Haiku | Fastest model | 200,000 tokens |
| `claude-3-opus-20240229` | Claude 3 Opus | Most powerful for complex tasks | 200,000 tokens |

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid request parameters
- `500 Internal Server Error`: Server or API error

Error response format:
```json
{
  "error": "Error description",
  "details": "Detailed error message"
}
```

## Security Notes

1. **Never commit your `.env` file** - It contains your API key
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** in production
4. **Add authentication** before deploying to production
5. **Enable CORS** only for trusted domains in production

## Troubleshooting

### API Key Issues

If you see authentication errors:
1. Check that your API key is correctly set in `.env`
2. Verify the key is valid in the [Anthropic Console](https://console.anthropic.com/)
3. Ensure there are no extra spaces or quotes around the key

### Port Already in Use

If port 3000 is already in use, change it in `.env`:
```
PORT=3001
```

### Module Not Found

If you see module errors, reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Resources

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
- [Claude API Reference](https://docs.anthropic.com/en/api/messages)

## Example Integration

Here's a simple example of using the API in a React component:

```typescript
import { useState } from 'react';

function ChatWithClaude() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/claude/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024
        })
      });

      const data = await res.json();
      setResponse(data.content[0].text);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Claude anything..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
      {response && <div>{response}</div>}
    </div>
  );
}
```
