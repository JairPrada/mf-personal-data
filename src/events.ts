import { z } from "zod";
import { createEventBus } from "@journals/lib-service-bus";

const schemas = {
  "mf-personal-data:PersonalData:submit": z.object({
    nombres: z.string().min(1),
    correo: z.string().email(),
    telefono: z.string().min(7).max(15),
  }),
};

export type EventSchemas = typeof schemas;

export const { publish } = createEventBus(schemas);
