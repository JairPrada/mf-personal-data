import { createApp, type App as VueApp } from 'vue';
import PersonalData from './PersonalData.vue';
import { manifest } from './manifest';

const cssUrl = new URL('./remoteEntry.css', import.meta.url).href;
if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);
}

const apps = new WeakMap<HTMLElement, VueApp>();

export default {
    manifest,
    mount(el: HTMLElement, _component: string, props: Record<string, unknown> = {}): void {
        const app = createApp(PersonalData, props);
        apps.set(el, app);
        app.mount(el);
    },
    unmount(el: HTMLElement): void {
        apps.get(el)?.unmount();
        apps.delete(el);
    },
};
