// implement your API here
const express = require('express');
const cors = require('cors');
const Users = require('./data/db');

const server = express();
server.use(express.json());
server.use(cors())

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users=>{
            res.status(200).json(users);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({errorMessage: 'The users information could not be retrieved.'})
        })

})
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    Users.findById(id)
        .then(user=>{
            user ? res.status(200).json(user) : res.status(404).json({errorMessage:'The user with the specified ID does not exist.'})
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({errorMessage: 'The user information could not be retrieved.'})
        })
})

server.post('/api/users', (req, res)=>{
    const newUser = req.body;
    console.log('newuser', newUser);
    if(newUser.name && newUser.bio){
        Users.insert(newUser)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({errorMessage: 'There was an error while saving the user to the database'})
        })
    } else {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    }
    
})

server.put('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    const newUser = req.body;
    Users.findById(id)
        .then(user=>{
            if(user){
                if(newUser.name && newUser.bio){
                    //edit the user
                    Users.update(id, newUser)
                        .then(user => {
                            res.status(200).json(newUser);
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(500).json({errorMessage:'The user information could not be modified.'});
                        })
                    
                } else{
                    res.status(400).json({errorMessage:'Please provide name and bio for the user.'})
                }
               
            } else {
                res.status(404).json({errorMessage:'The user with the specified ID does not exist.'})
            }
            
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({errorMessage: 'The user information could not be retrieved.'})
        })
})

server.delete('/api/users/:id', (req, res)=>{
    const {id} = req.params;
    let removedUser;
    //so I can return a user object instead of a number
    Users.findById(id)
        .then(res=>removedUser=res)
        .catch(err=>console.log(err))

    Users.remove(id)
        .then(user => {
            user ? res.status(200).json(removedUser) : res.status(404).json({errorMessage: 'The user with the specified ID does not exist.'});
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({errorMessage:'The user could not be removed'})
        })
})

const port = 5000;
server.listen(port, ()=>console.log(`\n Listening on port ${port}\n`))
