const asyncHandler = require("express-async-handler");
const commentModel = require("../models/commentModel");
const axios = require("axios");
const Comment = new commentModel();

// @desc Create a comment
// @route POST /api/comment
// @access Private
const createAComment = asyncHandler(async (req, res) => {
  const { activities_id, user_id, user_name, comment } = req.body;
  let { avatar, rating } = req.body;
  rating = parseFloat(rating);
  if (!activities_id || !user_id || !user_name || !rating)
    throw new Error("missing important fields");

  if (!avatar)
    avatar =
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010";
  try {
    const { average, count } =
      await Comment.getAverageCommentsRatingByActivites(activities_id);
    const newRating = (average * count + rating) / (count + 1);

    console.log(newRating);

    const update = await axios.put(
      "http://localhost:8000/api/activities/" +
        activities_id +
        "/rating/" +
        newRating
    );
    if (update.error) {
      throw new Error(update.error);
    }
    await Comment.createComment({
      activitiesId: activities_id,
      userId: user_id,
      userName: user_name,
      avatar: avatar,
      rating: rating,
      comment: comment,
    });
    res.status(200).json({ message: "Comment created successfully" });
  } catch (error) {
    // console.log(error)
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
