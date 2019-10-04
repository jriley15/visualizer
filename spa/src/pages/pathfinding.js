import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { Typography, Button } from "@material-ui/core"
import PathGrid from "../components/PathGrid"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const size = 30

export default function GraphTraversal() {
  const classes = useStyles()
  const [grid, setGrid] = useState(new Map())
  const [steps, setSteps] = useState(0)

  const initGrid = () => {
    let map = new Map()

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        map.set(`${x},${y}`, {
          x,
          y,
          visited: false,
          distance: Infinity,
          type: 0,
        })
      }
    }

    //start point
    map.set(`1,1`, {
      x: 1,
      y: 1,
      visited: false,
      distance: 0,
      type: 3,
      label: "S",
    })

    //goal point
    map.set(`${size - 2},${size - 2}`, {
      x: size - 2,
      y: size - 2,
      visited: false,
      distance: 0,
      type: 4,
      label: "F",
    })

    setSteps(0)
    setGrid(map)
  }

  useEffect(() => {
    //create grid
    initGrid()
  }, [])

  return (
    <Layout>
      <SEO title="Pathfinding" />
      <Typography variant="h4" gutterBottom>
        Pathfinding
      </Typography>
      <PathGrid grid={grid} size={size}>
        {steps > 0 && <Typography>Took {steps} steps to solve!</Typography>}
        <Button
          variant="outlined"
          onClick={() => {}}
          className={classes.button}
        >
          Dijkstra's
        </Button>
        <Button
          variant="outlined"
          onClick={() => {}}
          className={classes.button}
        >
          A*
        </Button>
        <Button
          variant="outlined"
          onClick={initGrid}
          className={classes.button}
        >
          Reset
        </Button>
      </PathGrid>
    </Layout>
  )
}
