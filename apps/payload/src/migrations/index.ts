import * as migration_20241122_144917_initial from "./20241122_144917_initial";
import * as migration_20241122_165942_posts from "./20241122_165942_posts";

export const migrations = [
  {
    up: migration_20241122_144917_initial.up,
    down: migration_20241122_144917_initial.down,
    name: "20241122_144917_initial",
  },
  {
    up: migration_20241122_165942_posts.up,
    down: migration_20241122_165942_posts.down,
    name: "20241122_165942_posts",
  },
];
