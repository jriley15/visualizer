import React, { useRef } from "react"
import { Link } from "gatsby"
import Image from "../components/image"
import SEO from "../components/seo"
import NavBar from "../components/Navbar"
import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Grid,
  Button,
  Fade,
  Zoom,
  Paper,
  Avatar,
  Slide,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
  },

  scrollContainer: {
    position: "relative",
  },
  scrollElement: {
    position: "absolute",
    top: "-" + theme.spacing(12) + "px",
  },
}))

const IndexPage = () => {
  const classes = useStyles()

  return (
    <>
      <SEO title="Home" />
      <NavBar />
      <div className={classes.root}>Test Home</div>
    </>
  )
}

export default IndexPage
