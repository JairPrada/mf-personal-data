import { defineManifest } from "@journals/lib-manifest";

export const manifest = defineManifest({
  name: "mf-personal-data",
  version: "0.0.1",
  framework: "vue",
  port: 3003,
  components: [
    {
      name: "PersonalData",
      description: "Formulario de datos personales",
      props: [],
    },
  ],
  events: [
    {
      event: "mf-personal-data:PersonalData:submit",
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

export type Manifest = typeof manifest;
