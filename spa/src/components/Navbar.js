import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { Link } from "gatsby"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: "90px",
  },
  navButton: {
    color: "#FFFFFF",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    //textTransform: "none",
  },
  navBar: {
    //background: "transparent",
    transition: "background-color 0.5s ease, box-shadow 0.5s ease",
    //alignItems: "center",
  },
  toolBar: {
    //width: "100%",
    //maxWidth: "1200px",
  },
}))

export default function NavBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5">Algorithm Visualizer</Typography>
          <div className={classes.grow} />

          <Button size="large" className={classes.navButton}>
            About
          </Button>
          <Button size="large" className={classes.navButton}>
            Algorithms
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
