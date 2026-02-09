import type { App } from 'vue';

export const registerLayouts = (app: App) => {
    const layouts = import.meta.glob<{ default: any }>(
        './*.vue',
        { eager: true },
    );
    Object
        .values(layouts)
        .forEach((layout) => {
            app.component(layout.default.name, layout.default);
        });
};
