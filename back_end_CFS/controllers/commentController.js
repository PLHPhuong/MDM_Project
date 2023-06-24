const asyncHandler = require("express-async-handler");
const commentModel = require("../models/commentModel");

const Comment = new commentModel();

// @desc Create a comment
// @route POST /api/comment
// @access Private
const createAComment = asyncHandler(async (req, res) => {
  const { activities_id, user_id, user_name, comment } = req.body;

  try {
    await Comment.createComment({
      activitiesId: activities_id,
      userId: user_id,
      userName: user_name,
      comment: comment,
    });
    res.status(200).json({ message: "Comment created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to create comment" });
  }
});

// @desc Create a comment
// @route GET /api/comment/activity/:id
// @access Private
const getCommentsByActivitiesId = asyncHandler(async (req, res) => {
  const activities_id = req.params.id;
  try {
    const result = await Comment.getCommentsByActivites(activities_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Failed to get comments" });
  }
});

module.exports = {
  createAComment,
  getCommentsByActivitiesId,
};
