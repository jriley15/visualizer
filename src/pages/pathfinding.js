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
  const [path, setPath] = useState(0)

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
          wall: false,
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
    setPath(0)
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

        let currNode = map.get(`${node.x},${node.y}`)
        currNode.visited = true

        let neighbors = []
        neighbors.push(map.get(`${node.x - 1},${node.y}`))
        neighbors.push(map.get(`${node.x + 1},${node.y}`))
        neighbors.push(map.get(`${node.x},${node.y - 1}`))
        neighbors.push(map.get(`${node.x},${node.y + 1}`))

        neighbors.forEach(neighbor => {
          if (neighbor && !neighbor.wall) {
            let alt = node.distance + neighbor.weight
            if (alt < neighbor.distance) {
              let neighborNode = map.get(`${neighbor.x},${neighbor.y}`)
              neighborNode.distance = alt
              neighborNode.prev = currNode
              pq.enqueue(neighborNode, neighborNode.distance)
            }
          }
        })
        if (node.type === 4) pq = new PriorityQueue()
      }
    }
    let iterations = 0

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
            iterations++
          }
          setPath(iterations)
        }
        if (index % size === 0 || index === traversalOrder.length - 1)
          setGrid(tempMap)
      }, index)
    })
  }

  const AStar = () => {
    let map = new Map(grid)
    let goal = map.get(`${size - 2},${size - 2}`)
    let open = new PriorityQueue()
    let closed = new Map()
    let traversalOrder = []

    open.enqueue(map.get("1,1", 0))

    closed.set(`1,1`, 0)

    while (!open.isEmpty()) {
      let qElement = open.dequeue()
      let current = qElement.element

      traversalOrder.push({ x: current.x, y: current.y })

      if (current === goal) break

      let neighbors = []
      let west = map.get(`${current.x - 1},${current.y}`)
      let east = map.get(`${current.x + 1},${current.y}`)
      let north = map.get(`${current.x},${current.y - 1}`)
      let south = map.get(`${current.x},${current.y + 1}`)

      neighbors.push(west)
      neighbors.push(east)
      neighbors.push(north)
      neighbors.push(south)

      let southEast = map.get(`${current.x + 1},${current.y + 1}`)
      let northWest = map.get(`${current.x - 1},${current.y - 1}`)
      let southWest = map.get(`${current.x - 1},${current.y + 1}`)
      let northEast = map.get(`${current.x + 1},${current.y - 1}`)

      if (southEast && (!south || !south.wall) && (!east || !east.wall))
        neighbors.push(southEast)

      if (northWest && (!north || !north.wall) && (!west || !west.wall))
        neighbors.push(northWest)

      if (southWest && (!south || !south.wall) && (!west || !west.wall))
        neighbors.push(southWest)

      if (northEast && (!north || !north.wall) && (!east || !east.wall))
        neighbors.push(northEast)

      neighbors.forEach(neighbor => {
        if (neighbor && !neighbor.wall) {
          let cost =
            closed.get(`${current.x},${current.y}`) +
            calculateDistance(current.x, current.y, neighbor.x, neighbor.y)

          if (
            !closed.get(`${neighbor.x},${neighbor.y}`) ||
            cost < closed.get(`${neighbor.x},${neighbor.y}`)
          ) {
            closed.set(`${neighbor.x},${neighbor.y}`, cost)

            let priority =
              cost + calculateDistance(neighbor.x, neighbor.y, goal.x, goal.y)

            open.enqueue(neighbor, priority)
            neighbor.prev = current
          }
        }
      })
      iterations++
    }

    let iterations = 0

    traversalOrder.forEach((node, index) => {
      setTimeout(() => {
        let tempMap = new Map(grid)

        let tempNode = tempMap.get(`${node.x},${node.y}`)
        if (tempNode.type === 0) {
          tempNode.type = 1
          tempNode.label = index
        }

        if (index === traversalOrder.length - 1) {
          setSteps(traversalOrder.length)
          let currentNode = map.get(`${size - 2},${size - 2}`)

          while (currentNode && currentNode.type !== 3) {
            if (currentNode.type !== 4) currentNode.type = 2
            currentNode = currentNode.prev
            iterations++
          }
          setPath(iterations)
        }
        if (index % (size / 3) === 0 || index === traversalOrder.length - 1)
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
      <PathGrid grid={grid} size={size} setGrid={setGrid}>
        {steps > 0 && <Typography>Took {steps} steps to solve!</Typography>}
        {path > 0 && (
          <Typography gutterBottom>Shortest path is {path} steps!</Typography>
        )}
        <Button
          variant="outlined"
          onClick={Dijkstras}
          className={classes.button}
        >
          Dijkstra's
        </Button>
        <Button variant="outlined" onClick={AStar} className={classes.button}>
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
