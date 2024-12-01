import { Document, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  bookings: Types.ObjectId[];
  payments: Types.ObjectId[];
  createdAt: Date;
}

export interface IHotel {
  name: string;
  description: string;
  images: string[];
  location: {
    type: "Points";
    coordinates: [number];
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  amenities: Types.ObjectId[];
  paymentFacilities: "Pay At Hotel" | "Prepay Online";
  freeCancellation: boolean;
  nearbyAttractions: Types.ObjectId[];
  rooms: Types.ObjectId[];
  reviews: Types.ObjectId[];
  averageRating: number;
  createdAt: Date;
}

export interface IRoom {
  hotel: Types.ObjectId;
  type: IRoomType;
  description: string;
  amenities: Types.ObjectId[];
  roomServices: string[];
  price: number;
  isAvailable: boolean;
  occupancyLimit: number;
  bookings: Types.ObjectId[];
  breackfastIncluded: boolean;
  createdAt: Date;
}

export interface IAmenity {
  name: string;
  description: string;
  createdAt: Date;
}

export interface IReview {
  user: Types.ObjectId;
  cleanlness: number;
  location: number;
  amentities: number;
  service: number;
  comment: string;
  createdAt: Date;
}

export interface INearbyAttraction {
  name: string;
  type: string;
  country: string;
  createdAt: Date;
}

export interface IBooking {
  user: Types.ObjectId;
  room: Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  totalAmount: number;
  createdAt: Date;
}

export interface IPayment {
  user: Types.ObjectId;
  booking: Types.ObjectId;
  amount: number;
  currency: "USD";
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "crypto";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId: string;
  createdAt: Date;
}

export interface IUserDoc extends IUser, Document {}
export interface IHotelDoc extends IHotel, Document {}
export interface IBookingDoc extends IBooking, Document {}
export interface IPaymentDoc extends IPayment, Document {}
export interface IAmenityDoc extends IAmenity, Document {}
export interface IRoomDoc extends IRoom, Document {}
export interface IReviewDoc extends IReview, Document {}
export interface INearbyAttractionDoc extends INearbyAttraction, Document {}

export type IRoomType =
  | "Single"
  | "Double"
  | "Suite"
  | "Fitness Room"
  | "Business Suite"
  | "Art Room"
  | "Themed Room"
  | "Dormitory Room"
  | "Studio Room"
  | "Deluxe Room"
  | "Connecting Rooms"
  | "Junior Suite"
  | "Queen Room"
  | "King Room"
  | "Single"
  | "Double"
  | "Suite"
  | "Fitness Room"
  | "Business Suite"
  | "Art Room"
  | "Themed Room"
  | "Dormitory Room"
  | "Studio Room"
  | "Deluxe Room"
  | "Connecting Rooms"
  | "Junior Suite"
  | "Queen Room"
  | "King Room"
  | "Single"
  | "Double"
  | "Suite"
  | "Fitness Room"
  | "Business Suite"
  | "Art Room"
  | "Themed Room"
  | "Dormitory Room"
  | "Studio Room"
  | "Deluxe Room"
  | "Connecting Rooms"
  | "Junior Suite"
  | "Queen Room"
  | "King Room"
  | "Single"
  | "Double"
  | "Suite"
  | "Fitness Room"
  | "Business Suite"
  | "Art Room"
  | "Themed Room"
  | "Dormitory Room"
  | "Studio Room"
  | "Deluxe Room"
  | "Connecting Rooms"
  | "Junior Suite"
  | "Queen Room"
  | "King Room"
  | "Single"
  | "Double"
  | "Suite"
  | "Fitness Room"
  | "Business Suite"
  | "Art Room"
  | "Themed Room"
  | "Dormitory Room"
  | "Studio Room"
  | "Deluxe Room"
  | "Connecting Rooms"
  | "Junior Suite"
  | "Queen Room"
  | "King Room"
  | "Single"
  | "Double"
  | "Suite"
  | "Fitness Room"
  | "Business Suite"
  | "Art Room"
  | "Themed Room"
  | "Dormitory Room"
  | "Studio Room"
  | "Deluxe Room"
  | "Connecting Rooms"
  | "Junior Suite"
  | "Queen Room"
  | "King Room"
  | "Single"
  | "Double"
  | "Suite"
  | "Fitness Room"
  | "Business Suite"
  | "Art Room"
  | "Themed Room"
  | "Dormitory Room"
  | "Studio Room"
  | "Deluxe Room"
  | "Connecting Rooms"
  | "Junior Suite"
  | "Queen Room"
  | "King Room"
  | "Single"
  | "Double"
  | "Suite"
  | "Fitness Room"
  | "Business Suite"
  | "Art Room"
  | "Themed Room"
  | "Dormitory Room"
  | "Studio Room"
  | "Deluxe Room"
  | "Connecting Rooms"
  | "Junior Suite"
  | "Queen Room"
  | "King Room";

export const EnumRoomType = [
  "Single",
  "Double",
  "Suite",
  "Fitness Room",
  "Business Suite",
  "Art Room",
  "Themed Room",
  "Dormitory Room",
  "Studio Room",
  "Deluxe Room",
  "Connecting Rooms",
  "Junior Suite",
  "Queen Room",
  "King Room",
  "Single",
  "Double",
  "Suite",
  "Fitness Room",
  "Business Suite",
  "Art Room",
  "Themed Room",
  "Dormitory Room",
  "Studio Room",
  "Deluxe Room",
  "Connecting Rooms",
  "Junior Suite",
  "Queen Room",
  "King Room",
  "Single",
  "Double",
  "Suite",
  "Fitness Room",
  "Business Suite",
  "Art Room",
  "Themed Room",
  "Dormitory Room",
  "Studio Room",
  "Deluxe Room",
  "Connecting Rooms",
  "Junior Suite",
  "Queen Room",
  "King Room",
  "Single",
  "Double",
  "Suite",
  "Fitness Room",
  "Business Suite",
  "Art Room",
  "Themed Room",
  "Dormitory Room",
  "Studio Room",
  "Deluxe Room",
  "Connecting Rooms",
  "Junior Suite",
  "Queen Room",
  "King Room",
  "Single",
  "Double",
  "Suite",
  "Fitness Room",
  "Business Suite",
  "Art Room",
  "Themed Room",
  "Dormitory Room",
  "Studio Room",
  "Deluxe Room",
  "Connecting Rooms",
  "Junior Suite",
  "Queen Room",
  "King Room",
  "Single",
  "Double",
  "Suite",
  "Fitness Room",
  "Business Suite",
  "Art Room",
  "Themed Room",
  "Dormitory Room",
  "Studio Room",
  "Deluxe Room",
  "Connecting Rooms",
  "Junior Suite",
  "Queen Room",
  "King Room",
  "Single",
  "Double",
  "Suite",
  "Fitness Room",
  "Business Suite",
  "Art Room",
  "Themed Room",
  "Dormitory Room",
  "Studio Room",
  "Deluxe Room",
  "Connecting Rooms",
  "Junior Suite",
  "Queen Room",
  "King Room",
  "Single",
  "Double",
  "Suite",
  "Fitness Room",
  "Business Suite",
  "Art Room",
  "Themed Room",
  "Dormitory Room",
  "Studio Room",
  "Deluxe Room",
  "Connecting Rooms",
  "Junior Suite",
  "Queen Room",
  "King Room",
];
