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

  const BFS = () => {
    let map = new Map(grid)
    let queue = []
    let traversalOrder = []

    queue.push(map.get(`1,1`))

    while (queue.length > 0) {
      let node = queue.shift()

      if (!node.visited) {
        if (node.type === 4) {
          queue = []
        } else {
          node.visited = true
          traversalOrder.push({ x: node.x, y: node.y })

          let left = map.get(`${node.x - 1},${node.y}`)
          let right = map.get(`${node.x + 1},${node.y}`)
          let top = map.get(`${node.x},${node.y - 1}`)
          let bottom = map.get(`${node.x},${node.y + 1}`)

          if (left) queue.push(left)
          if (right) queue.push(right)
          if (top) queue.push(top)
          if (bottom) queue.push(bottom)
        }
      }
    }

    traversalOrder.forEach((node, index) => {
      setTimeout(() => {
        let tempMap = new Map(grid)

        let tempNode = tempMap.get(`${node.x},${node.y}`)
        if (tempNode.type === 0) {
          tempNode.type = 1
          tempNode.label = index
        }

        if ((index % size) / 3 === 0 || index === traversalOrder.length - 1)
          setGrid(tempMap)
        if (index === traversalOrder.length - 1) setSteps(traversalOrder.length)
      }, index)
    })
  }

  const DFS = () => {
    let map = new Map(grid)
    let queue = []
    let traversalOrder = []

    queue.push(map.get(`1,1`))

    while (queue.length > 0) {
      let node = queue.shift()

      if (!node.visited) {
        if (node.type === 4) {
          queue = []
        } else {
          node.visited = true
          traversalOrder.push({ x: node.x, y: node.y })

          let left = map.get(`${node.x - 1},${node.y}`)
          let right = map.get(`${node.x + 1},${node.y}`)
          let top = map.get(`${node.x},${node.y - 1}`)
          let bottom = map.get(`${node.x},${node.y + 1}`)

          if (left) queue.unshift(left)
          if (right) queue.unshift(right)
          if (top) queue.unshift(top)
          if (bottom) queue.unshift(bottom)
        }
      }
    }

    traversalOrder.forEach((node, index) => {
      setTimeout(() => {
        let tempMap = new Map(grid)

        let tempNode = tempMap.get(`${node.x},${node.y}`)
        if (tempNode.type === 0) {
          tempNode.type = 1
          tempNode.label = index
        }

        if (index % size === 0 || index === traversalOrder.length - 1)
          setGrid(tempMap)
        if (index === traversalOrder.length - 1) setSteps(traversalOrder.length)
      }, index)
    })
  }

  return (
    <Layout>
      <SEO title="Graph Traversal" />
      <Typography variant="h4" gutterBottom>
        Graph Traversal
      </Typography>
      <PathGrid grid={grid} size={size}>
        {steps > 0 && <Typography>Took {steps} steps to solve!</Typography>}
        <Button variant="outlined" onClick={BFS} className={classes.button}>
          Breadth First Search
        </Button>
        <Button variant="outlined" onClick={DFS} className={classes.button}>
          Depth First Search
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
