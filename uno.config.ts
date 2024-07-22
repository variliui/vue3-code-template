// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    shortcuts: [
        // ...
    ],
    theme: {
        colors: {
            // ...
        }
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true
            // collections: {
            //   carbon: () =>
            //     import('@iconify-json/carbon').then((i) => i.icons as any)
            // }
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            }
        })
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()]
})
