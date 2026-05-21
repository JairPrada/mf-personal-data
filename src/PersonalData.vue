<template>
  <div class="pd-root">
    <div class="pd-topbar" />
    <header class="pd-header">
      <div class="pd-logo">
        <div class="pd-logo-text">
          <span class="pd-logo-name">Banco Caja Social</span>
        </div>
      </div>
      <nav class="pd-nav">
        <span>Cr\u00e9dito </span>
        <span class="pd-nav-highlight">Hipotecario</span>
      </nav>
    </header>
    <main class="pd-main">
      <h2 class="pd-title">Ingrese sus datos personales</h2>
      <form class="pd-form" @submit.prevent="handleSubmit" novalidate>
        <div class="pd-row">
          <div class="pd-field">
            <input v-model="form.nombres" class="pd-input" :class="{ 'pd-input--error': errors.nombres }" type="text" placeholder="Nombres" />
            <span v-if="errors.nombres" class="pd-error">{{ errors.nombres }}</span>
          </div>
          <div class="pd-field">
            <input v-model="form.primerApellido" class="pd-input" :class="{ 'pd-input--error': errors.primerApellido }" type="text" placeholder="Primer apellido" />
            <span v-if="errors.primerApellido" class="pd-error">{{ errors.primerApellido }}</span>
          </div>
        </div>
        <div class="pd-row">
          <div class="pd-field">
            <input v-model="form.segundoApellido" class="pd-input" type="text" placeholder="Segundo apellido" />
          </div>
          <div class="pd-field">
            <input v-model="form.fechaNacimiento" class="pd-input" :class="{ 'pd-input--error': errors.fechaNacimiento }" type="date" />
            <span v-if="errors.fechaNacimiento" class="pd-error">{{ errors.fechaNacimiento }}</span>
          </div>
        </div>
        <div class="pd-row">
          <div class="pd-field pd-select-wrap">
            <select v-model="form.genero" class="pd-select" :class="{ 'pd-input--error': errors.genero }">
              <option value="" disabled>G\u00e9nero</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
            <span v-if="errors.genero" class="pd-error">{{ errors.genero }}</span>
          </div>
          <div class="pd-field pd-select-wrap">
            <select v-model="form.estadoCivil" class="pd-select" :class="{ 'pd-input--error': errors.estadoCivil }">
              <option value="" disabled>Estado civil</option>
              <option value="S">Soltero/a</option>
              <option value="C">Casado/a</option>
              <option value="D">Divorciado/a</option>
              <option value="V">Viudo/a</option>
              <option value="UL">Uni\u00f3n libre</option>
            </select>
            <span v-if="errors.estadoCivil" class="pd-error">{{ errors.estadoCivil }}</span>
          </div>
        </div>
        <div class="pd-row">
          <div class="pd-field">
            <input v-model="form.correo" class="pd-input" :class="{ 'pd-input--error': errors.correo }" type="email" placeholder="Correo electr\u00f3nico" />
            <span v-if="errors.correo" class="pd-error">{{ errors.correo }}</span>
          </div>
          <div class="pd-field">
            <input v-model="form.telefono" class="pd-input" :class="{ 'pd-input--error': errors.telefono }" type="tel" placeholder="Tel\u00e9fono celular" maxlength="10" />
            <span v-if="errors.telefono" class="pd-error">{{ errors.telefono }}</span>
          </div>
        </div>
        <div class="pd-row">
          <div class="pd-field">
            <input v-model="form.direccion" class="pd-input" :class="{ 'pd-input--error': errors.direccion }" type="text" placeholder="Direcci\u00f3n de residencia" />
            <span v-if="errors.direccion" class="pd-error">{{ errors.direccion }}</span>
          </div>
          <div class="pd-field">
            <input v-model="form.ciudad" class="pd-input" :class="{ 'pd-input--error': errors.ciudad }" type="text" placeholder="Ciudad" />
            <span v-if="errors.ciudad" class="pd-error">{{ errors.ciudad }}</span>
          </div>
        </div>
        <button type="submit" class="pd-btn" :class="{ 'pd-btn--active': isValid }" :disabled="!isValid">Continuar</button>
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";

const props = withDefaults(
  defineProps<{
    emit?: (event: string, detail: Record<string, unknown>) => void;
  }>(),
  { emit: undefined }
);

interface FormState {
  nombres: string; primerApellido: string; segundoApellido: string;
  fechaNacimiento: string; genero: string; estadoCivil: string;
  correo: string; telefono: string; direccion: string; ciudad: string;
}

const form = reactive<FormState>({
  nombres: "", primerApellido: "", segundoApellido: "",
  fechaNacimiento: "", genero: "", estadoCivil: "",
  correo: "", telefono: "", direccion: "", ciudad: "",
});

const errors = reactive<Partial<Record<keyof FormState, string>>>({});

const required: (keyof FormState)[] = [
  "nombres", "primerApellido", "fechaNacimiento", "genero",
  "estadoCivil", "correo", "telefono", "direccion", "ciudad",
];

function validate(): boolean {
  (Object.keys(errors) as (keyof FormState)[]).forEach((k) => delete errors[k]);
  required.forEach((field) => { if (!form[field]) errors[field] = "Campo requerido"; });
  if (form.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) errors.correo = "Correo inv\u00e1lido";
  if (form.telefono && !/^\d{10}$/.test(form.telefono)) errors.telefono = "Debe tener 10 d\u00edgitos";
  return Object.keys(errors).length === 0;
}

const isValid = computed(() =>
  required.every((f) => !!form[f]) &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo) &&
  /^\d{10}$/.test(form.telefono)
);

function handleSubmit() {
  if (validate()) props.emit?.("mf:personal-data:submit", { ...form });
}
</script>

<style>
.pd-root { min-height: 100vh; display: flex; flex-direction: column; background: #fff; font-family: system-ui, "Segoe UI", Roboto, sans-serif; color: #333; }
.pd-topbar { height: 8px; background: #1a1a2e; }
.pd-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 32px; border-bottom: 1px solid #e8e8e8; }
.pd-logo { display: flex; align-items: center; gap: 10px; }
.pd-logo-text { display: flex; flex-direction: column; line-height: 1.2; }
.pd-logo-name { font-size: 14px; font-weight: 700; color: #1a1a2e; }
.pd-logo-tagline { font-size: 10px; color: #888; }
.pd-nav { font-size: 15px; color: #444; }
.pd-nav-highlight { color: #0057a8; font-weight: 600; }
.pd-main { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 48px 16px; }
.pd-title { font-size: 20px; font-weight: 700; text-align: center; color: #1a1a2e; margin: 0 0 32px; }
.pd-form { width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 14px; }
.pd-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.pd-field { display: flex; flex-direction: column; gap: 4px; }
.pd-input, .pd-select { width: 100%; padding: 14px 16px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; color: #333; background: #fff; box-sizing: border-box; appearance: none; outline: none; transition: border-color 0.2s; }
.pd-input::placeholder { color: #999; }
.pd-input:focus, .pd-select:focus { border-color: #0057a8; }
.pd-input--error { border-color: #e53935 !important; }
.pd-select-wrap { position: relative; }
.pd-select-wrap::after { content: ""; pointer-events: none; position: absolute; right: 16px; top: 22px; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid #666; }
.pd-error { font-size: 12px; color: #e53935; }
.pd-btn { margin-top: 8px; width: 100%; padding: 15px; border: none; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: not-allowed; background: #d0d0d0; color: #888; transition: background 0.2s, color 0.2s; }
.pd-btn--active { background: #0057a8; color: #fff; cursor: pointer; }
.pd-btn--active:hover { background: #004494; }
@media (max-width: 600px) { .pd-row { grid-template-columns: 1fr; } }
</style>
