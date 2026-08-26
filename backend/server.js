import app from "./src/app.js"
import { connectdb } from "./src/config/db.js"
import dns from "dns"


dns.setServers(["1.1.1.1","0.0.0.0"])


connectdb()


app.listen(3000,()=>{
    console.log("running on 3k")
})