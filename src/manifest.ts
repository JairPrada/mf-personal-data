import { defineManifest } from "@journals/mf-contract";

export const manifest = defineManifest({
  name: "mf-personal-data",
  version: "0.0.1",
  framework: "vue",
  port: 3003,
  components: [
    {
      name: "PersonalData",
      description: "Formulario de datos personales",
      props: [
        {
          name: "emit",
          type: "function",
          required: true,
          description: "Event emitter del Shell",
        },
      ],
    },
  ],
  events: [
    {
      event: "mf:personal-data:submit",
      description: "Usuario completo el formulario de datos personales",
      direction: "emits",
      payload: {
        nombres: { type: "string", description: "Nombres del usuario" },
        correo: { type: "string", description: "Correo electronico" },
        telefono: { type: "string", description: "Telefono celular" },
      },
    },
  ],
});
