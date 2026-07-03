import { pgTable ,text, date, boolean, timestamp, unique } from "drizzle-orm/pg-core";
import { pessoas } from "./pessoas";

export const participacao = pgTable("participacao", {
  id: text("id").primaryKey(),
  pessoaId: text("pessoa_id").notNull().references(() => pessoas.id, { onDelete: "cascade" }),
  dataParticipacao: date("data_participacao").notNull(),
  presenca: boolean("presenca").default(false).notNull(),
  horaReconhecimento: timestamp("hora_reconhecimento"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
},
  (table) => ({
    pessoaDataUnique: unique().on(
      table.pessoaId,
      table.dataParticipacao
    )
  })
)