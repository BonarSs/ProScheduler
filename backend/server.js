require('dotenv').config()

//Defining variable and dependencies
const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

//Database Connection

const connectionString = process.env.DATABASE_URL
const connection = mongoose.connect(connectionString)
    .then(()=> console.log('connected to', connectionString))
    .catch((err) => console.log('database connection error => ', err.message))

//Routers
const taskRouter = require('./routers/taskRouter')
const projectRouter = require('./routers/projectRouter')
// const project_taskRouter = require('./routers/project_taskRouter')
const userRouter = require('./routers/userRouter')
const statusRouter = require('./routers/statusRouter')
const roleMemberRouter = require('./routers/roleMemberRouter')

// Add Middleware Cors
// app.options('*', cors())
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
  }));  
app.use(cookieParser())


//Routing
app.use('/task', taskRouter)
app.use('/project', projectRouter)
// app.use('/project_task', project_taskRouter)
app.use('/user', userRouter)
app.use('/status', statusRouter)
app.use('/rolemember', roleMemberRouter)


// app.listen(3000, console.log('server started'))

export default app;
