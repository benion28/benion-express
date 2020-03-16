const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const users = require("../../Users");

// Get All Users
router.get("/", (request, response) => response.json(users));

// Get A Single User
router.get("/:id", (request, response) => {
    const found = users.some(user => user.id === parseInt(request.params.id));
    if (found) {
        response.json(users.filter(user => user.id === parseInt(request.params.id)));
    } else {
        response.status(400).json({ message: `User With ID ${request.params.id} Not Found` });
    }
});

// Create User
router.post("/", (request, response) => {
    const newUser = {
        id: uuid.v4(),
        name: request.body.name,
        email: request.body.email,
        status: "Active"
    };

    if (!newUser.name || !newUser.email) {
        return response.status(400).json({ message: "Please Include A Name And An Email" });
    }

    users.push(newUser);
    response.json(users);
    // response.redirect("/");
});

// Update User
router.put("/:id", (request, response) => {
    const found = users.some(user => user.id === parseInt(request.params.id));
    if (found) {
        const updateUser = request.body;
        users.forEach(user => {
            if (user.id === parseInt(request.params.id)) {
                user.name = updateUser.name ? updateUser.name : user.name;
                user.email = updateUser.email ? updateUser.email : user.email;
            }

            response.json({ message: "User Was Updated", user });
        });
    } else {
        response.status(400).json({ message: `User With ID ${request.params.id} Not Found` });
    }
});

// Delete A USer
router.delete("/:id", (request, response) => {
    const found = users.some(user => user.id === parseInt(request.params.id));
    if (found) {
        response.json({ message: "User Deleted Successfully", user: users.filter(user => user.id !== parseInt(request.params.id)) });
    } else {
        response.status(400).json({ message: `User With ID ${request.params.id} Not Found` });
    }
});

module.exports = router;