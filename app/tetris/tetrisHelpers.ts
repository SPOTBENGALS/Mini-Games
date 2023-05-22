import { STAGE_HEIGHT, STAGE_WIDTH } from "./data";
import { TETROMINOS } from "./data";
import { PLAYER } from "./hooks/usePlayer";
import { STAGE } from "./stage";

export function createStage() {
  return Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, "clear"]));
}

export function randomTetromino() {
  const tetrominos = ["I", "J", "L", "O", "S", "T", "Z"] as (keyof typeof TETROMINOS)[];
  const randerTetrominos = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randerTetrominos];
}

export function isColliding(player: PLAYER, stage: STAGE, { x: moveX, y: moveY }: { x: number; y: number }) {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      if (player.tetromino[y][x] !== 0) {
        if (
          !stage[y + player.position.y + moveY] ||
          !stage[y + player.position.y + moveY][x + player.position.x + moveX] ||
          stage[y + player.position.y + moveY][x + player.position.x + moveX][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }

  return false;
}
