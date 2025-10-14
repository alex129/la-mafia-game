import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "La Mafia Game API",
          version: "1.0.0",
          description: "Backend API for La Mafia Game - Social deduction mobile game",
        },
        tags: [
          { name: "auth", description: "Authentication endpoints" },
          { name: "games", description: "Game management" },
          { name: "players", description: "Player operations" },
          { name: "challenges", description: "Challenge management" },
          { name: "mafias", description: "Mafia operations" },
        ],
      },
    })
  )
  .use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:8081"],
      credentials: true,
    })
  )
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
      exp: process.env.JWT_EXPIRES_IN || "7d",
    })
  )
  .get("/", () => ({
    status: "ok",
    message: "La Mafia Game API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    docs: "/swagger",
  }))
  .get("/health", () => ({
    status: "healthy",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  }))
  .onError(({ code, error, set }) => {
    console.error("Error:", error);

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        error: "Not Found",
        message: "The requested resource was not found",
        path: error.message,
      };
    }

    if (code === "VALIDATION") {
      set.status = 400;
      return {
        error: "Validation Error",
        message: error.message,
      };
    }

    set.status = 500;
    return {
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : error.message,
    };
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `📚 Swagger documentation at http://${app.server?.hostname}:${app.server?.port}/swagger`
);

export default app;
