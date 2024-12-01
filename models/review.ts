import { IReviewDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const reviewSchema: Schema<IReviewDoc> = new Schema<IReviewDoc>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cleanlness: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  location: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  amentities: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  service: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review: Model<IReviewDoc> =
  models.Review || model<IReviewDoc>("Review", reviewSchema);

export default Review;

// const DummyReviews = [
//   {
//     rating: 5,
//     comment:
//       "Excellent stay! The room was spacious and the staff were very friendly.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great hotel with comfortable rooms. The breakfast could use some improvement.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Average experience. The location was convenient, but the room was a bit noisy.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Loved the amenities and the cleanliness of the room. Highly recommended!",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not satisfied. The room was smaller than expected and there was no hot water.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good value for money. The staff were helpful and the room was clean.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Decent stay. The Wi-Fi was unreliable and the bed was uncomfortable.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Amazing hotel! The service was top-notch and the view from the room was fantastic.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Very pleasant stay. The location was great and the room was clean and tidy.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Average experience. The noise from the street was disturbing and the breakfast was basic.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic hotel with great amenities. The staff were very accommodating and friendly.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not impressed. The room was not as described and the air conditioning was faulty.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice hotel with comfortable rooms. The service was good, but the check-in process was slow.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Okay stay. The hotel was clean but lacked character and the food options were limited.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Exceptional service and beautiful room. Will definitely stay here again!",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good hotel with clean facilities. The location was central and convenient.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Average hotel. The room was fine, but the noise from the hallways was bothersome.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful experience. The room was luxurious and the staff went above and beyond.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Disappointing stay. The room was not well-maintained and the staff were unhelpful.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice stay with comfortable beds. The breakfast options were good but could be more varied.",
//   },
//   {
//     rating: 3,
//     comment:
//       "The hotel was okay, but the noise from the street and the lack of amenities were drawbacks.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Excellent hotel. The room was clean and spacious, and the staff were very accommodating.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great location and good service. The room was a bit small but comfortable.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not a great experience. The room was dated and the noise from the hallway was disturbing.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Perfect stay. The hotel was modern, clean, and had fantastic amenities.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Very good stay. The room was nice and the location was ideal for exploring the city.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Average stay. The hotel was clean but the staff were not very friendly.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic experience. The hotel exceeded my expectations in every way.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not recommended. The room was dirty and the staff were unprofessional.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good stay overall. The room was comfortable and the service was good.",
//   },
//   {
//     rating: 3,
//     comment: "Okay hotel. The room was average and the amenities were lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Amazing hotel with great service. The room was clean and the staff were very helpful.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice stay with good amenities. The location was convenient and the room was clean.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Disappointing experience. The room was small and not well-maintained.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful hotel with excellent service. The room was perfect and the location was ideal.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great hotel with friendly staff. The room was comfortable but could use some updates.",
//   },
//   {
//     rating: 3,
//     comment: "Average stay. The hotel was clean but the service was lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Exceptional stay. The room was beautiful and the staff were very accommodating.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not a pleasant stay. The room was noisy and the service was poor.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good experience. The room was comfortable and the hotel was in a great location.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Okay hotel. The amenities were basic and the room was not very clean.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic hotel with great amenities. The staff were very friendly and helpful.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice stay with clean rooms. The location was central and convenient for sightseeing.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not satisfied with the stay. The room was not as described and the service was lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Excellent experience. The hotel was clean, modern, and the staff were very professional.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Very good stay. The room was comfortable and the hotel was well-located.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Average experience. The room was fine but lacked amenities and the service was average.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful hotel. The room was spacious and the service was outstanding.",
//   },
//   {
//     rating: 2,
//     comment: "Disappointing stay. The room was noisy and the service was poor.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good hotel with clean facilities. The room was comfortable and the location was convenient.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Okay stay. The room was clean but the amenities were lacking and the service was average.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Amazing hotel! The service was excellent and the room was perfect.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great stay with comfortable rooms. The breakfast was good but could be improved.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not a good experience. The room was dirty and the staff were unhelpful.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic stay. The room was clean, spacious, and the staff were very friendly.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice hotel with good amenities. The room was comfortable and the location was ideal.",
//   },
//   {
//     rating: 3,
//     comment: "Average stay. The room was fine but the service could be better.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Exceptional hotel. The room was luxurious and the staff provided excellent service.",
//   },
//   {
//     rating: 2,
//     comment: "Not recommended. The room was small and the service was poor.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good stay overall. The room was clean and the location was central.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Okay experience. The hotel was clean but the amenities were lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful stay. The room was comfortable and the staff were very accommodating.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Very good hotel. The room was clean and the location was convenient for sightseeing.",
//   },
//   {
//     rating: 2,
//     comment: "Disappointing. The room was noisy and not well-maintained.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic hotel with excellent service. The room was perfect and the amenities were great.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great experience. The room was comfortable and the location was ideal.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Average hotel. The room was okay but lacked character and the service was average.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Exceptional stay. The hotel was modern, clean, and the staff were very helpful.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not a good experience. The room was outdated and the staff were unhelpful.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice stay with good amenities. The room was comfortable and the location was great.",
//   },
//   {
//     rating: 3,
//     comment: "Okay stay. The room was clean but the amenities were lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful hotel. The service was excellent and the room was clean and spacious.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good stay overall. The room was comfortable and the location was convenient.",
//   },
//   {
//     rating: 2,
//     comment: "Disappointing stay. The room was noisy and the service was poor.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic experience. The room was perfect and the staff were very friendly and accommodating.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great hotel with clean rooms. The location was ideal and the amenities were good.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Average experience. The room was fine but the service was lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Excellent stay. The hotel was modern and the staff were very helpful and professional.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not a good experience. The room was not clean and the staff were unprofessional.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice hotel with good service. The room was clean and comfortable.",
//   },
//   {
//     rating: 3,
//     comment: "Okay stay. The room was average and the amenities were lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful stay! The room was spacious and the service was exceptional.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great hotel. The room was clean and the location was perfect for our needs.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Disappointing stay. The room was noisy and the service was not up to standard.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic hotel. The service was excellent and the room was very comfortable.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good stay overall. The room was clean and the location was convenient.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Average hotel. The room was okay but lacked amenities and the service was average.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Exceptional stay. The hotel was clean and modern with great service.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not a great experience. The room was small and the service was poor.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice hotel with comfortable rooms. The location was ideal for exploring the city.",
//   },
//   {
//     rating: 3,
//     comment: "Okay stay. The hotel was clean but the amenities were basic.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful hotel. The room was luxurious and the staff were very friendly and accommodating.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great stay with good amenities. The room was clean and comfortable.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Disappointing. The room was outdated and the service was lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic experience. The room was perfect and the service was excellent.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Very good stay. The room was clean and the location was convenient.",
//   },
//   {
//     rating: 3,
//     comment: "Average hotel. The room was fine but the amenities were lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful hotel with great service. The room was spacious and the location was ideal.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Good stay overall. The room was comfortable and the location was central.",
//   },
//   {
//     rating: 2,
//     comment: "Disappointing stay. The room was noisy and the service was poor.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Exceptional stay. The hotel was clean, modern, and the service was outstanding.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Nice hotel with good amenities. The room was comfortable and clean.",
//   },
//   {
//     rating: 3,
//     comment:
//       "Okay experience. The room was fine but lacked character and the service was average.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Wonderful hotel. The service was excellent and the room was clean and comfortable.",
//   },
//   {
//     rating: 4,
//     comment: "Good stay. The room was clean and the location was perfect.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not recommended. The room was small and the service was unhelpful.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Fantastic hotel! The room was spacious and the staff were very friendly and accommodating.",
//   },
//   {
//     rating: 4,
//     comment:
//       "Great stay with comfortable rooms. The location was convenient for sightseeing.",
//   },
//   {
//     rating: 3,
//     comment: "Average stay. The room was clean but the amenities were lacking.",
//   },
//   {
//     rating: 5,
//     comment:
//       "Exceptional stay. The hotel was modern and the staff provided excellent service.",
//   },
//   {
//     rating: 2,
//     comment:
//       "Not a good experience. The room was outdated and the service was poor.",
//   },
// ];
