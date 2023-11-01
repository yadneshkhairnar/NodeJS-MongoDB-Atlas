const db = require("../models");
const Post = db.posts;

// Create and Save a new Post

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty!"
        });
        return;
    }

    // Create a Post
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
    });

    // Save Post in the database
    post
        .save(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while creating the Post."
                });
        });
};

// Retrieve all Posts from the database.

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            $regex: new RegExp(title),
            $options: "i"
        }
    } : {};

    Post.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving posts."
                });
        });
};

// Find a single Post with an id

exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findById(id)
        .then(data => {
            if (!data)
                res.status(404)
                    .send({
                        message: "Not found Post with id " + id
                    });
            else res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: "Error retrieving Post with id=" + id
                });
        }); 
}

// Update a Post by the id in the request

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400)
            .send({
                message: "Data to update can not be empty!"
            });
    }

    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404)
                    .send({
                        message: `Cannot update Post with id=${id}. Maybe Post was not found!`
                    });
            } else res.send({
                message: "Post was updated successfully."
            });
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: "Error updating Post with id=" + id
                });
        });
};

// Delete a Post with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;

    Post.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404)
                    .send({
                        message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                    });
            } else {
                res.send({
                    message: "Post was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: "Could not delete Post with id=" + id
                });
        });
};

// Delete all Posts from the database.

exports.deleteAll = (req, res) => {
    Post.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Posts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while removing all posts."
                });
        });
};

// Find all published Posts

exports.findAllPublished = (req, res) => {
    Post.find({
            published: true
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving posts."
                });
        });
};

// Find all Posts with title

exports.findAllWithTitle = (req, res) => {
    Post.find({
            title: req.params.title
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving posts."
                });
        });
};

// Find all Posts with body

exports.findAllWithBody = (req, res) => {
    Post.find({
            body: req.params.body
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving posts."
                });
        });
}   

// Find all Posts with title and body

exports.findAllWithTitleAndBody = (req, res) => {
    Post.find({
            title: req.params.title,
            body: req.params.body
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500)
                .send({
                    message: err.message || "Some error occurred while retrieving posts."
                });
        });
}   




