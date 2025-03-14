const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// post route
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  // {rating: req.body.review.rating, // Rating from the request body
  // comment: req.body.review.comment, }// Comment from the request body
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  // console.log(`Deleting review ${reviewId} from listing ${id}`);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  // console.log(`/listings/${id}`);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
