# Chat Application with socket.io and Node js

This application was developed to improve my knowledge on how bi-directional communication works.

## Project Dependencies

```json
    "dependencies": {
    "express": "^4.17.1",
    "moment": "^2.29.1",
    "socket.io": "^4.1.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
```

## Usage

If you are cloning this repo, make sure Node.js is installed in your local machine or computer then run: `npm install`

then run `npm run dev` or `npm start`.

## Knowledge Summary

When working on this project with `socket.io`,  i realized that for every event you emit, then has to been a function that listens for that that event.
