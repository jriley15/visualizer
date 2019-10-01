import React from "react"
import { Link } from "gatsby"
import Image from "../components/image"
import SEO from "../components/seo"
import Button from "@material-ui/core/Button"
import NavBar from "../components/Navbar"

/*
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>

    <Button variant="outlined" component={Link} to="/page-2/">
      Test button
    </Button>
  </Layout>
)*/

const AboutPage = () => {
  return (
    <>
      <SEO title="About" />
      <NavBar />
      About
    </>
  )
}

export default AboutPage
