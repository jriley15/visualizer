import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { Typography, Button } from "@material-ui/core"
import PathGrid from "../components/PathGrid"
import { makeStyles } from "@material-ui/core/styles"
import PriorityQueue from "../structures/PriorityQueue"

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
          weight: calculateDistance(x, y, size - 2, size - 2),
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
      weight: calculateDistance(1, 1, size - 2, size - 2),
      type: 3,
      label: "S",
    })

    //goal point
    map.set(`${size - 2},${size - 2}`, {
      x: size - 2,
      y: size - 2,
      visited: false,
      distance: Infinity,
      weight: 0,
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

  const calculateDistance = (x1, y1, x2, y2) => {
    var xs = x2 - x1,
      ys = y2 - y1
    xs *= xs
    ys *= ys
    return parseInt(Math.sqrt(xs + ys), 10)
  }

  const Dijkstras = () => {
    let map = new Map(grid)
    let pq = new PriorityQueue()

    pq.enqueue(map.get(`1,1`), 0)

    let traversalOrder = []

    while (!pq.isEmpty()) {
      let qElement = pq.dequeue()
      let node = qElement.element
      if (!node.visited) {
        traversalOrder.push({ x: node.x, y: node.y })
        //if (node.type === 4) pq = new PriorityQueue()
        let currNode = map.get(`${node.x},${node.y}`)
        currNode.visited = true

        let neighbors = []
        neighbors.push(map.get(`${node.x - 1},${node.y}`))
        neighbors.push(map.get(`${node.x + 1},${node.y}`))
        neighbors.push(map.get(`${node.x},${node.y - 1}`))
        neighbors.push(map.get(`${node.x},${node.y + 1}`))

        neighbors.forEach(neighbor => {
          if (neighbor) {
            let alt = node.distance + neighbor.weight
            if (alt < neighbor.distance) {
              let neighborNode = map.get(`${neighbor.x},${neighbor.y}`)
              neighborNode.distance = alt
              neighborNode.prev = currNode
              pq.enqueue(neighborNode, neighborNode.distance)
            }
          }
        })
      }
    }
    traversalOrder.forEach((node, index) => {
      setTimeout(() => {
        let tempMap = new Map(grid)

        let tempNode = tempMap.get(`${node.x},${node.y}`)
        if (tempNode.type === 0) {
          tempNode.type = 1
          tempNode.label = tempNode.distance
        }

        if (index === traversalOrder.length - 1) {
          setSteps(traversalOrder.length)
          let currentNode = map.get(`${size - 2},${size - 2}`)

          while (currentNode && currentNode.type !== 3) {
            if (currentNode.type !== 4) currentNode.type = 2
            currentNode = currentNode.prev
          }
        }
        if (index % size === 0 || index === traversalOrder.length - 1)
          setGrid(tempMap)
      }, index)
    })
  }

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
          onClick={Dijkstras}
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
