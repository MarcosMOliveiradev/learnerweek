CREATE TABLE "participacao" (
	"id" text PRIMARY KEY NOT NULL,
	"pessoa_id" text NOT NULL,
	"data_participacao" date NOT NULL,
	"presenca" boolean DEFAULT false NOT NULL,
	"hora_reconhecimento" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "participacao_pessoa_id_data_participacao_unique" UNIQUE("pessoa_id","data_participacao")
);
--> statement-breakpoint
CREATE TABLE "pessoas" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"area_atuacao" text NOT NULL,
	"descricao" text,
	"foto" "bytea" NOT NULL,
	"face_embedding" vector(512) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "participacao" ADD CONSTRAINT "participacao_pessoa_id_pessoas_id_fk" FOREIGN KEY ("pessoa_id") REFERENCES "public"."pessoas"("id") ON DELETE cascade ON UPDATE no action;