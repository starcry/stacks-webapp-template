import React from "react"
import {AppBar, Fab, Toolbar, Tooltip, Typography} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import {PrefixedLink as Link} from "components"
import {useRouter} from "next/router"
import styled from "@emotion/styled"

const StyledLink = styled.a`
    text-decoration: none;
    cursor: pointer;
`

const title: string = `Yumido`

export const Header = () => {
    const isCreatePage =
        useRouter()
            ?.pathname.split("/")
            .pop() === "create"
    return (
        <AppBar position="fixed" color="secondary">
            <Toolbar>
                <Typography variant="h2" style={{margin: "0 auto"}}>
                    <Link href="/">
                        <StyledLink>{title}</StyledLink>
                    </Link>
                </Typography>
                {!isCreatePage && (
                    <Link href="/create">
                        <Tooltip title="Create menu" aria-label="create menu">
                            <Fab
                                size="small"
                                color="primary"
                                aria-label="create menu button"
                            >
                                <AddIcon data-testid="create_button"/>
                            </Fab>
                        </Tooltip>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    )
}
