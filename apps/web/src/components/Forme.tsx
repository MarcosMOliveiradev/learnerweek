import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "@/lib/axios"

const cadastrarSchema = z.object({
  nome: z.string(),
  areaAtuacao: z.string(),
  descricao: z.string().optional(),

  datasParticipacao: z.array(z.string()),
});

const DIAS_EVENTO = [
  {
    label: "Segunda-feira (20/07)",
    value: "2026-07-20",
  },
  {
    label: "Terça-feira (21/07)",
    value: "2026-07-21",
  },
  {
    label: "Quarta-feira (22/07)",
    value: "2026-07-22",
  },
  {
    label: "Quinta-feira (23/07)",
    value: "2026-07-23",
  },
  {
    label: "Sexta-feira (24/07)",
    value: "2026-07-24",
  },
];

export function Forme() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();

  const form = useForm<z.infer<typeof cadastrarSchema>>({
    resolver: zodResolver(cadastrarSchema),
    defaultValues: {
      nome: "",
      areaAtuacao: "",
      descricao: "",
      datasParticipacao: [],
    },
  });

  async function cadastro(data: z.infer<typeof cadastrarSchema>) {

    if (!image) {
      toast.error("Selecione uma foto.");
      return;
    }

    const formData = new FormData();

    formData.append("nome", data.nome);
    formData.append("areaAtuacao", data.areaAtuacao);

    if (data.descricao) {
      formData.append("descricao", data.descricao);
    }

    formData.append(
      "datasParticipacao",
      JSON.stringify(data.datasParticipacao)
    );

    formData.append("file", image);

    const response = await api.post(
      "/pessoa/criarpessoa",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if(response.status === 201) {
      toast.success("Usuário cadastrado na lista do evento!")

    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <strong className="text-4xl">Cadastro de pessoas</strong>

        <form className=" flex flex-col gap-4" onSubmit={form.handleSubmit(cadastro)}>

          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="nome"
                    placeholder="EX: Marcos"
                    className="w-full bg-muted rounded-sm h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="areaAtuacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area de atuação:</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="areaAtuacao"
                    placeholder="EX: Informática"
                    className="w-full bg-muted rounded-sm h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição:</FormLabel>
                <FormControl>
                  <Textarea
                    id="descricao"
                    placeholder="EX: Melhor programador de sistemas do mundo quiça do Brasil"
                    className="w-full bg-muted rounded-sm h-[8rem]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="datasParticipacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dias de participação</FormLabel>

                <div className="grid grid-cols-2 gap-4 mt-2 text-white">
                  {DIAS_EVENTO.map((dia) => (
                    <Label
                      key={dia.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={field.value?.includes(dia.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([
                              ...(field.value ?? []),
                              dia.value,
                            ]);
                          } else {
                            field.onChange(
                              field.value?.filter(
                                (value) => value !== dia.value
                              )
                            );
                          }
                        }}
                      />

                      <span>{dia.label}</span>
                    </Label>
                  ))}
                </div>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Foto</FormLabel>

            <Input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (!file) return;

                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </FormItem>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-48 rounded-lg border object-cover"
            />
          )}

          <Button className="bg-emerald-700 h-10 rounded-sm cursor-pointer" type="submit">Salvar</Button>
        </form>
      </Form >

    </div>
  )
}