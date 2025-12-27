# Real-time Memo App

A web application that allows multiple devices to access and edit memos simultaneously in real-time. This application demonstrates real-time collaboration using WebSockets.

## Features

- Real-time memo editing across multiple browsers
- Simultaneous access from multiple devices
- WebSocket-based real-time updates
- Responsive web interface
- Docker-based deployment

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │    │   Browser   │    │   Browser   │
│   Client    │    │   Client    │    │   Client    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌─────────────┐
                    │   Server    │
                    │  (WebSocket)│
                    └─────────────┘
                           │
                    ┌─────────────┐
                    │   Database  │
                    │  (Memory)   │
                    └─────────────┘
```

## Tech Stack

- Backend: Node.js with Express
- Frontend: HTML/CSS/JavaScript
- Real-time Communication: WebSocket
- Containerization: Docker
- Deployment: Docker Compose

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone this repository
2. Run `docker-compose up` in the project root directory
3. Access the application at `http://localhost:3000`

### Development

To develop locally:

1. Install Node.js dependencies: `npm install`
2. Start the development server: `npm start`
3. Access the application at `http://localhost:3000`

## Project Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```

## How It Works

1. Users connect to the application through web browsers
2. Each browser establishes a WebSocket connection to the server
3. When a user creates, updates, or deletes a memo, the change is sent to the server
4. The server broadcasts the change to all connected clients
5. All clients receive the update in real-time and refresh their views

## Testing Real-time Updates

To test the real-time functionality:

1. Open multiple browser windows/tabs to `http://localhost:3000`
2. Create a new memo in one browser
3. Observe that the memo appears instantly in all other browsers
4. Edit the memo in one browser
5. See the changes propagate to all other browsers immediately

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT