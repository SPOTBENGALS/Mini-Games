import { createStage } from "../tetrisHelpers";
import { PLAYER } from "./usePlayer";
import { useEffect, useState } from "react";

type STAGECELL = [string | number, string];
type STAGE = STAGECELL[][];

export function useStage(player: PLAYER, resetPlayer: () => void) {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    if (!player.position) return;

    setRowsCleared(0);

    function sweepRows(newStage: STAGE): STAGE {
      return newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]) as STAGECELL[]);
          return ack;
        }
        ack.push(row);
        return ack;
      }, [] as STAGE);
    }

    function updateStage(prevStage: STAGE): STAGE {
      const newStage = prevStage.map(
        (row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)) as STAGECELL[]
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell !== 0) {
            newStage[y + player.position.y][x + player.position.x] = [cell, `${player.collided ? "merged" : "clear"}`];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    }

    setStage((prev) => updateStage(prev));
  }, [player.collided, player.position?.x, player.position?.y, player.tetromino]);

  return { stage, setStage, rowsCleared };
}
