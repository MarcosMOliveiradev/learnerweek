import { pgTable ,text, vector, customType, timestamp  } from "drizzle-orm/pg-core";

const bytea = customType<{ 
  data: Buffer;
  driverData: Buffer
}>({
  dataType() {
    return "bytea";
  }
})

export const pessoas = pgTable("pessoas", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  areaAtuacao: text("area_atuacao").notNull(),
  descricao: text("descricao"),
  foto: bytea("foto"),
  faceEmbedding: vector("face_embedding", { dimensions: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
})