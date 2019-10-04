import React from "react"
import NavBar from "../components/Navbar"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
}))

export default function Layout({ children }) {
  const classes = useStyles()

  return (
    <div>
      <NavBar />
      <div className={classes.root}>{children}</div>
    </div>
  )
}
