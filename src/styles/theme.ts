import { extendTheme } from "@mui/joy";

declare module "@mui/joy/styles" {
    interface PaletteBackground {
        appBody: string;
        componentBg: string;
    }
}

export default extendTheme({
    components: {
        JoySheet: {
            styleOverrides: {
                root: {
                    boxSizing: "border-box",
                },
            },
        },
        JoyBox: {
            styleOverrides: {
                root: {
                    boxSizing: "border-box",
                },
            },
        },
    },
    colorSchemes: {
        light: {
            palette: {
                background: {
                    appBody: "var(--joy-palette-neutral-50)",
                    componentBg: "var(--joy-palette-common-white)",
                },
            },
        },
        dark: {
            palette: {
                background: {
                    appBody: "var(--joy-palette-common-black)",
                    componentBg: "var(--joy-palette-neutral-900)",
                },
            },
        },
    },
});
