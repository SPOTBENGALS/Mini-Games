import { STAGE_WIDTH } from "@app/tetris/data";
import { isColliding, randomTetromino } from "@app/tetris/tetrisHelpers";
import { useCallback, useState } from "react";
import { STAGE } from "../stage";

export interface PLAYER {
  position: {
    x: number;
    y: number;
  };
  tetromino: (string | number)[][];
  collided: boolean;
}

export function usePlayer() {
  const [player, setPlayer] = useState({} as PLAYER);

  function rotate(tetromino: PLAYER["tetromino"]) {
    const matrix = tetromino.map((_, i) => tetromino.map((column) => column[i]));
    return matrix.map((row) => row.reverse());
  }

  function playerRotate(stage: STAGE): void {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

    const positionX = clonedPlayer.position.x;
    let offset = 1;
    while (isColliding(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > clonedPlayer.tetromino[0].length) {
        clonedPlayer.position.x = positionX;
        return;
      }
    }

    setPlayer(clonedPlayer);
  }

  function updatePlayer({ x, y, collided }: { x: number; y: number; collided: boolean }): void {
    setPlayer((prev) => ({
      ...prev,
      position: { x: (prev.position.x += x), y: (prev.position.y += y) },
      collided,
    }));
  }

  const resetPlayer = useCallback(
    (): void =>
      setPlayer({
        position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
      }),
    []
  );

  return { player, updatePlayer, resetPlayer, playerRotate };
}
