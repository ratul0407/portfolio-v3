import { useRef, useEffect } from "react";

const TwoBallCollisionCanvas = () => {
  const canvasRef = useRef(null);

  // Constants
  const BALL_RADIUS = 20;
  const CANVAS_WIDTH = 480;
  const CANVAS_HEIGHT = 320;
  const ANIMATION_INTERVAL = 10; // ms

  // Initial ball state definition
  // We'll use an array of objects to manage multiple balls easily
  let balls = [
    {
      x: CANVAS_WIDTH / 4, // Start position 1 (Quarter way)
      y: CANVAS_HEIGHT / 4,
      dx: 2, // Velocity x
      dy: 2, // Velocity y
      radius: BALL_RADIUS,
      color: "#da2c38",
    },
    {
      x: (CANVAS_WIDTH * 3) / 4, // Start position 2 (Three-quarter way)
      y: (CANVAS_HEIGHT * 3) / 4,
      dx: -2,
      dy: -2,
      radius: BALL_RADIUS,
      color: "#6a994e", // A distinct color for the second ball
    },
  ];

  // 1. useEffect hook for setup and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = (canvas as any).getContext("2d");

    // --- Core Collision Logic ---

    /**
     * Resolves the velocities of two balls after an elastic collision.
     * This uses the standard 2D vector math for perfectly elastic collision
     * between two circles of equal mass (since their radii are the same).
     */
    const resolveCollision = (ballA: any, ballB: any) => {
      // 1. Calculate the distance vector (vector from B to A)
      const dx = ballA.x - ballB.x;
      const dy = ballA.y - ballB.y;

      // 2. Calculate the unit normal vector (n) and tangential vector (t)
      const distance = Math.sqrt(dx * dx + dy * dy);
      const nx = dx / distance; // normal x
      const ny = dy / distance; // normal y
      const tx = -ny; // tangent x
      const ty = nx; // tangent y

      // 3. Calculate Dot Products for Tangential and Normal Velocities

      // Project velocities onto the tangent (t) and normal (n) vectors
      // Tangential components are unchanged after collision (frictionless)
      const vA_tan = ballA.dx * tx + ballA.dy * ty;
      const vB_tan = ballB.dx * tx + ballB.dy * ty;

      // Normal components are exchanged (perfectly elastic collision, equal mass)
      const vA_norm = ballA.dx * nx + ballA.dy * ny;
      const vB_norm = ballB.dx * nx + ballB.dy * ny;

      // 4. Swap normal velocities for the rebound
      const vA_norm_after = vB_norm;
      const vB_norm_after = vA_norm;

      // 5. Convert tangential and normal velocities back to a Cartesian vector (dx, dy)

      // Final velocity A
      ballA.dx = vA_tan * tx + vA_norm_after * nx;
      ballA.dy = vA_tan * ty + vA_norm_after * ny;

      // Final velocity B
      ballB.dx = vB_tan * tx + vB_norm_after * nx;
      ballB.dy = vB_tan * ty + vB_norm_after * ny;

      // 6. Separate the balls slightly after collision to prevent sticking
      // This is a common fix for collision detection issues
      const overlap = ballA.radius + ballB.radius - distance;
      ballA.x += (nx * overlap) / 2;
      ballA.y += (ny * overlap) / 2;
      ballB.x -= (nx * overlap) / 2;
      ballB.y -= (ny * overlap) / 2;
    };
    //

    // --- Drawing and Wall Collision ---

    const drawBall = (ball: any) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    };

    const updateBallPosition = (ball: any) => {
      // Wall Collision Check
      if (
        ball.x + ball.dx > CANVAS_WIDTH - ball.radius ||
        ball.x + ball.dx < ball.radius
      ) {
        ball.dx = -ball.dx;
      }
      if (
        ball.y + ball.dy > CANVAS_HEIGHT - ball.radius ||
        ball.y + ball.dy < ball.radius
      ) {
        ball.dy = -ball.dy;
      }

      // Update position
      ball.x += ball.dx;
      ball.y += ball.dy;
    };

    // --- Main Animation Loop ---

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // 1. Check for ball-to-ball collisions
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const ballA = balls[i];
          const ballB = balls[j];

          // Check if balls are overlapping (distance < sum of radii)
          const dx = ballA.x - ballB.x;
          const dy = ballA.y - ballB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < ballA.radius + ballB.radius) {
            // Collision detected! Resolve the velocities.
            resolveCollision(ballA, ballB);
          }
        }
      }

      // 2. Update positions and draw all balls
      balls.forEach((ball) => {
        updateBallPosition(ball);
        drawBall(ball);
      });
    };

    // Start the game loop
    const intervalId = setInterval(draw, ANIMATION_INTERVAL);

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Run once on mount

  return (
    <div className="bg-white/10">
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
};

export default TwoBallCollisionCanvas;
