import { ThemeProvider } from "@material-ui/core/styles"
import App from "next/app"
import React from "react"
import { withApplicationInsights } from "utils/appInsightsLogger"
import getConfig from "next/config"
import { createMuiTheme } from "@material-ui/core/styles";

const AmidoTheme = createMuiTheme({
    palette: {
        primary: { main: "#000000" },
        secondary: { main: "#FECB07" }
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: "5px",
                fontSize: "13px",
                textTransform: "none"
            },
            contained: {
                boxShadow: "0px",
                textTransform: "uppercase"
            }
        },
        MuiListItem: {
            root: {
                marginTop: "20px"
            }
        }
    },
    typography: {
        fontFamily: [
            "Arial",
            "Work sans",
        ].join(","),
        h2: {
            fontSize: "24px",
            marginBotton: "40px"
        },
        h3: {
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "15px"
        },
        body1: {
            fontSize: "13px",
            fontWeight: 400,
            overflowWrap: "break-word"
        }
    },
});

class _App extends App {
    /**
     * UNCOMMENT this depending on if you DO NOT want [Automatic Static optimisation](https://github.com/zeit/next.js/blob/master/errors/opt-out-auto-static-optimization.md)
     */
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <ThemeProvider theme={AmidoTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
        )
    }
}

// AppInsights are disabled for localhost
export default withApplicationInsights({
    instrumentationKey: getConfig().publicRuntimeConfig.APPINSIGHTS_KEY,
    isEnabled: true,
})(_App)
