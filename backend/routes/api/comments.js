/**
 * @file Routes for comments API.
 * @module routes/api/comments
 *
 * Express router exposing endpoints for listing and deleting Comment documents
 * stored in MongoDB via Mongoose.
 *
 * Dependencies:
 *  - express.Router() (mounted by the parent application, typically at /api/comments)
 *  - mongoose.model('Comment') - the Mongoose model for comments
 *
 * Routes:
 *  - GET /api/comments
 *      - Description: Retrieve all comments.
 *      - Handler: async (req, res)
 *      - Query Params: none
 *      - Success Response: 200 - JSON array of comment objects
 *      - Error Response: 500 - { error: "Failed to fetch comments" }
 *
 *  - DELETE /api/comments/:id
 *      - Description: Delete a comment by its ObjectId.
 *      - Handler: async (req, res)
 *      - Path Params:
 *          - id {string} - Mongoose ObjectId of the comment to delete
 *      - Success Response: 200 - { message: "Comment deleted successfully" }
 *      - Error Response: 500 - { error: "Failed to delete comment" }
 *
 * Export:
 *  - {Router} router - Configured Express router containing the above routes.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
//Hey Github Copilot!
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});