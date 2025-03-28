import { Character, Handler } from '../../types/global';

export const updateCharacter: Handler<
  { name: string; age: number; hunger: number; happiness: number; energy: number },
  Character | Error
> = (ctx, input) =>
  new Promise((resolve, reject) => {
    const { name, age, hunger, happiness, energy } = input;

    ctx.globals.db.run(
      `UPDATE character SET age = ?, hunger = ?, happiness = ?, energy = ? WHERE name = ?`,
      [age, hunger, happiness, energy, name],
      function (err) {
        if (err) {
          console.error("Update error:", err);
          return reject(err);
        }

        ctx.globals.db.get(
          `SELECT * FROM character WHERE name = ?`,
          [name],
          (err, result) => {
            if (err) {
              console.error("Select error:", err);
              return reject(err);
            }
            console.log("Updated result:", result);
            resolve(result);
          }
        );
      }
    );
  });
