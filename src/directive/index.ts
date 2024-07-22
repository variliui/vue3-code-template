import { type RendererElement, type App } from 'vue';

export const customDirective = (app: App<RendererElement>) => {
    app.directive('focus', {
        mounted(el: HTMLElement) {
            el.focus();
        }
    });
};
