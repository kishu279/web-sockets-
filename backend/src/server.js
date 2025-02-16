// const { WebSocketServer } = require("ws");
// const wss = new WebSocketServer({ port: 3000 });

// wss.on("connection", (ws) => {
//   console.log("Connected");

//   ws.on("error", (error) => {
//     console.error(error);
//   });

//   ws.on("close", () => {
//     console.log("Disconnected");
//   });

//   ws.on("message", (data) => {
//     console.log("Data: ", data.toString());

//     ws.send(`success : ${data}`);
//   });
// });

// Creating the connection using the http/s server

// const { WebSocketServer } = require("ws");
// const http = require("http");

// const server = http.createServer();

// const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//   console.log("connected !!!");

//   ws.on("error", (error) => {
//     console.error("error");
//   });

//   ws.on("message", (data) => {
//     console.log(data.toString());
//     ws.send("data is perfetctly alrigth");
//   });

//   ws.on("close", () => {
//     console.log("closed !!!");
//   });

//   ws.send("something");
// });

// server.listen(3000, () => {
//   console.log("Connected");
// });

// Creating the Multiple connection between different server using http/s

// const http = require("http");
// const { WebSocketServer } = require("ws");

// const server = http.createServer();

// const wss1 = new WebSocketServer({ noServer: true });
// const wss2 = new WebSocketServer({ noServer: true });

// wss1.on("connection", (ws) => {
//   ws.on("error", (error) => {
//     console.log(error);
//   });
//   ws.on("message", (data) => {
//     // console.log(data.toString());
//     ws.send("success from wss1");
//   });
// });

// wss2.on("connection", (ws) => {
//   ws.on("error", (error) => {
//     console.log(error);
//   });
//   ws.on("message", (data) => {
//     console.log(data.toString());
//     ws.send("success from wss1");
//   });
// });

// server.on("upgrade", (req, socket, head) => {
//   const { pathname } = new URL(req.url, "wss://base.url");
//   console.log(pathname);

//   if (pathname === "/foo") {
//     wss1.handleUpgrade(req, socket, head, (ws) => {
//       console.log("upgrade to /foo");
//       wss1.emit("connection", ws, req);
//     });
//   } else if (pathname === "/bar") {
//     console.log("upgrade to /bar");
//     wss2.handleUpgrade(req, socket, head, (ws) => {
//       wss2.emit("connection", ws, req);
//     });
//   } else {
//     socket.destroy();
//   }
// });

// server.listen(3000);

// Server Broadcasting

// const { WebSocketServer } = require("ws");
// const WebSocket = require("ws");

// const wss = new WebSocketServer({ port: 3000 });

// wss.on("connection", (ws) => {
//   console.log("Connected!!!");
//   ws.on("error", (error) => {
//     console.error(error);
//   });

//   ws.on("message", (data) => {
//     console.log(data.toString());
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(`Data: ${data}`); // client.seng(data, {binary: isBinary});
//       }
//     });
//   });
// });

// const { createServer } = require("http");
// const { WebSocketServer } = require("ws");

// const server = createServer();
// const wss1 = new WebSocketServer({ noServer: true });
// const wss2 = new WebSocketServer({ noServer: true });

// wss1.on("connection", (ws) => {
//   ws.on("error", (error) => {
//     console.error(error);
//   });

//   ws.on("message", (event) => {
//     console.log(event.data); //data from the event
//   });
// });

// server.on("upgrade", (req, socket, head) => {
//   console.log("connection initiated");
//   const { pathname } = new URL(req.url, "wss://localhost:3000");

//   if (pathname === "/foo") {
//     wss1.handleUpgrade(req, socket, head, (ws) => {
//       wss1.emit("connection", ws, req);
//     });
//   } else if (pathname === "bar") {
//     wss2.handleUpgrade(req, socket, head, (ws) => {
//       wss2.emit("connecton", req, head);
//     });
//   } else {
//     socket.destroy();
//   }
// });

// server.listen(3000);

// connection when upgrading the request
// const express = require("express");
// const app = express();
// const { WebSocketServer } = require("ws");

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

//   res.header("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   next();
// });

// const server = app.listen(3000, () => {
//   console.log("connections succeded");
// });

// app.get("/", (req, res) => {
//   return res.status(200).send("SUCCESSFULL connection");
// });

// const wss = new WebSocketServer({ server });

// wss.on("connection", (ws) => {
//   console.log("web socket connection is successfull");
//   ws.on("error", (error) => {
//     console.log(error);
//   });

//   ws.on("message", (event) => {
//     console.log("Recieved: ", event.data);
//   });
//   ws.send("connection is successfull in web sockets");
// });

const express = require("express");
const http = require("http");
const crypto = require("crypto");
const { WebSocketServer } = require("ws");
const cors = require("cors");

const { z } = require("zod");

const app = express();
app.use(express.json());
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const userSchema = z.object({
  // Schema
  email: z.string().email(),
  password: z.string(),
});

app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "POST", "PUT", "OPTION", "PATCH"],
    allowedHeader: ["Content-Type", "Authorization"],
  })
);

function main() {
  server.listen(3000, () => {
    console.log("server is listening on port 3000");
  });
}

const validTokens = new Map();
const user = {};

app.get("/", (req, res) => {
  res.send("Server is working fine");
});

// user is created in this route
app.post("/signup", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.format(),
    });
  }

  const { email, password } = result.data;

  try {
    user[email] = password;
    console.log(user);
    return res.status(200).json({
      success: true,
      message: "Account created successfully",
      user: user, // object that for successfull intialization
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});

// user is validatade after creation of user
app.post("/signin", async (req, res) => {
  // token will be created
  const { email, password } = req.body;
  console.log("User: ", email, password);

  try {
    if (user[email] === password) {
      console.log("signed in successfully");
      const token = await crypto.randomBytes(16).toString("hex");
      validTokens.set(token, email);

      console.log(validTokens); //

      setTimeout(() => validTokens.delete(token), 60000);
      return res
        .status(200)
        .json({ success: true, message: "token created ", token: token });
    }

    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });
  } catch (err) {
    return res.status(404).json({ success: false, message: err });
  }
});

server.on("upgrade", (req, socket, head) => {
  console.log("Upgraded");
  const params = new URLSearchParams(req.url.split("?")[1]);
  const token = params.get("token");
  console.log(token);

  if (!token && !validTokens.has(token)) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  const userEmail = validTokens.get(token);
  validTokens.delete(token);

  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.userEmail = userEmail;
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws) => {
  console.log("connected");
  ws.on("error", (error) => {
    console.error(error);
  });
  ws.on("message", (event) => {
    console.log("Recieved: ", event.toString());
  });
  ws.on("close", () => {
    console.log("connection closed!!!");
  });
});

main();
