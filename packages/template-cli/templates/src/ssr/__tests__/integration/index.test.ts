/* eslint-env jest */

import serverPromise from "../../server"
import fetch from "node-fetch"

let httpServer

test("serves the Next.js app", async () => {
    // expect(1).toBeTruthy()
    httpServer = await serverPromise
    const res = await fetch(`http://localhost}`)
    // expect(await res.text()).toBe("Welcome to Next.js!")
    httpServer.close()
})
