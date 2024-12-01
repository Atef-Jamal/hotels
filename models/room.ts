import { EnumRoomType, IRoomDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const roomSchema: Schema<IRoomDoc> = new Schema<IRoomDoc>({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  type: {
    type: String,
    enum: EnumRoomType,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomServices: [{ type: String }],
  breackfastIncluded: { type: Boolean, default: false },
  amenities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Amenity",
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  occupancyLimit: {
    type: Number,
    required: true,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room: Model<IRoomDoc> =
  models.Room || model<IRoomDoc>("Room", roomSchema);

export default Room;

// const DummyRooms = [
//   {
//     type: "Single",
//     description:
//       "A cozy room designed for a single guest with a comfortable single bed.",
//     price: 80,
//     occupancyLimit: 1,
//   },
//   {
//     type: "Double",
//     description:
//       "A room with a double bed or two twin beds, perfect for two guests.",
//     price: 120,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Suite",
//     description:
//       "A spacious suite with a separate living area and bedroom for a luxurious stay.",
//     price: 250,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Fitness Room",
//     description:
//       "A room equipped with fitness equipment for guests who like to work out.",
//     price: 180,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Business Suite",
//     description:
//       "A suite designed for business travelers with a dedicated workspace and office amenities.",
//     price: 300,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Art Room",
//     description:
//       "A room with artistic decorations and creative design elements.",
//     price: 150,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Themed Room",
//     description:
//       "A room designed around a specific theme or concept for a unique experience.",
//     price: 200,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Dormitory Room",
//     description:
//       "A shared room with multiple beds, ideal for budget travelers.",
//     price: 50,
//     occupancyLimit: 6,
//   },
//   {
//     type: "Studio Room",
//     description:
//       "A room with an open-plan layout including a sleeping and living area.",
//     price: 140,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Deluxe Room",
//     description:
//       "An upgraded room with enhanced amenities and more space than standard rooms.",
//     price: 180,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Connecting Rooms",
//     description:
//       "Two or more rooms with an internal door connecting them, suitable for families or groups.",
//     price: 220,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Junior Suite",
//     description:
//       "A smaller suite with a combined living and sleeping area, offering extra space and comfort.",
//     price: 210,
//     occupancyLimit: 3,
//   },
//   {
//     type: "Queen Room",
//     description: "A room with a queen-sized bed, perfect for two guests.",
//     price: 130,
//     occupancyLimit: 2,
//   },
//   {
//     type: "King Room",
//     description:
//       "A room with a king-sized bed, offering ample space and luxury.",
//     price: 170,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Single",
//     description: "A compact room with a single bed for solo travelers.",
//     price: 75,
//     occupancyLimit: 1,
//   },
//   {
//     type: "Double",
//     description:
//       "A comfortable room with double or twin beds for couples or friends.",
//     price: 110,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Suite",
//     description:
//       "A luxurious suite with a separate living space and bedroom, ideal for extended stays.",
//     price: 275,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Fitness Room",
//     description:
//       "A room with state-of-the-art fitness equipment for health-conscious guests.",
//     price: 200,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Business Suite",
//     description:
//       "An upscale suite with business amenities such as a large desk and high-speed internet.",
//     price: 320,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Art Room",
//     description:
//       "A creatively designed room featuring unique art pieces and stylish decor.",
//     price: 160,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Themed Room",
//     description:
//       "A room designed with a special theme to enhance guest experience.",
//     price: 210,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Dormitory Room",
//     description:
//       "Shared sleeping spaces in a dorm-style room, perfect for budget-conscious travelers.",
//     price: 55,
//     occupancyLimit: 8,
//   },
//   {
//     type: "Studio Room",
//     description:
//       "A multifunctional room with living and sleeping areas, including a small kitchen.",
//     price: 145,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Deluxe Room",
//     description:
//       "A premium room with additional comforts and upgraded amenities.",
//     price: 190,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Connecting Rooms",
//     description:
//       "Multiple rooms with a connecting door, ideal for families and groups requiring more space.",
//     price: 240,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Junior Suite",
//     description:
//       "A spacious suite with an open-plan living area and bedroom for added comfort.",
//     price: 220,
//     occupancyLimit: 3,
//   },
//   {
//     type: "Queen Room",
//     description:
//       "A room featuring a queen-sized bed, offering a comfortable stay for two.",
//     price: 140,
//     occupancyLimit: 2,
//   },
//   {
//     type: "King Room",
//     description:
//       "A luxurious room with a king-sized bed and ample space for relaxation.",
//     price: 180,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Single",
//     description:
//       "A simple room with a single bed, ideal for solo travelers.",
//     price: 85,
//     occupancyLimit: 1,
//   },
//   {
//     type: "Double",
//     description:
//       "A double room with either a double bed or two singles, perfect for pairs.",
//     price: 115,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Suite",
//     description:
//       "An elegant suite with a separate living area and bedroom, ideal for extended stays.",
//     price: 260,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Fitness Room",
//     description:
//       "A room featuring a variety of fitness equipment for guests who like to stay active.",
//     price: 190,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Business Suite",
//     description:
//       "A suite offering a range of business amenities, including a desk and high-speed internet access.",
//     price: 310,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Art Room",
//     description:
//       "A unique room adorned with artistic elements and creative design.",
//     price: 155,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Themed Room",
//     description:
//       "A room with distinctive thematic decor, offering a unique stay experience.",
//     price: 205,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Dormitory Room",
//     description:
//       "A large shared room with multiple beds for budget travelers.",
//     price: 60,
//     occupancyLimit: 10,
//   },
//   {
//     type: "Studio Room",
//     description:
//       "A room with a combined living and sleeping area, including a small kitchen.",
//     price: 150,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Deluxe Room",
//     description:
//       "A superior room with upgraded amenities and additional comfort.",
//     price: 200,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Connecting Rooms",
//     description:
//       "Two or more rooms with a connecting door for families or groups requiring more space.",
//     price: 250,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Junior Suite",
//     description:
//       "A suite with an open-plan layout and added comfort for a small group or family.",
//     price: 230,
//     occupancyLimit: 3,
//   },
//   {
//     type: "Queen Room",
//     description:
//       "A comfortable room with a queen-sized bed, ideal for two guests.",
//     price: 135,
//     occupancyLimit: 2,
//   },
//   {
//     type: "King Room",
//     description:
//       "A spacious room featuring a king-sized bed for a luxurious stay.",
//     price: 190,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Single",
//     description:
//       "A compact room with a single bed for solo travelers looking for affordability.",
//     price: 90,
//     occupancyLimit: 1,
//   },
//   {
//     type: "Double",
//     description:
//       "A room with double or twin beds, ideal for couples or friends.",
//     price: 125,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Suite",
//     description:
//       "An upscale suite featuring a separate living space and bedroom, offering additional comfort.",
//     price: 270,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Fitness Room",
//     description:
//       "A room equipped with a range of fitness equipment for health-conscious guests.",
//     price: 200,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Business Suite",
//     description:
//       "An executive suite designed for business travelers with work-related amenities.",
//     price: 330,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Art Room",
//     description: "A room designed with artistic elements and unique decor.",
//     price: 165,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Themed Room",
//     description:
//       "A room with thematic decor to enhance the guest experience.",
//     price: 215,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Dormitory Room",
//     description:
//       "A shared room with multiple beds for budget travelers and groups.",
//     price: 65,
//     occupancyLimit: 8,
//   },
//   {
//     type: "Studio Room",
//     description:
//       "An open-plan room with living and sleeping areas, often with kitchen facilities.",
//     price: 155,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Deluxe Room",
//     description:
//       "An upgraded room offering enhanced comfort and amenities.",
//     price: 210,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Connecting Rooms",
//     description:
//       "Two or more rooms with an internal door connecting them for added convenience.",
//     price: 260,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Junior Suite",
//     description:
//       "A suite with a combined living and sleeping area for extra comfort and space.",
//     price: 240,
//     occupancyLimit: 3,
//   },
//   {
//     type: "Queen Room",
//     description:
//       "A room with a queen-sized bed offering comfort for two guests.",
//     price: 145,
//     occupancyLimit: 2,
//   },
//   {
//     type: "King Room",
//     description:
//       "A room with a king-sized bed, providing spacious and luxurious accommodations.",
//     price: 200,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Single",
//     description:
//       "A small room with a single bed, suitable for solo travelers.",
//     price: 95,
//     occupancyLimit: 1,
//   },
//   {
//     type: "Double",
//     description:
//       "A room with either a double bed or two single beds, perfect for couples or friends.",
//     price: 130,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Suite",
//     description:
//       "A luxurious suite featuring separate living and sleeping areas for a premium experience.",
//     price: 280,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Fitness Room",
//     description:
//       "A room with fitness equipment for guests who enjoy staying active during their stay.",
//     price: 210,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Business Suite",
//     description:
//       "A suite with business amenities like a desk and high-speed internet, designed for business travelers.",
//     price: 340,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Art Room",
//     description:
//       "A room featuring artistic designs and creative decor elements.",
//     price: 170,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Themed Room",
//     description:
//       "A uniquely designed room with a specific theme for a memorable stay.",
//     price: 220,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Dormitory Room",
//     description:
//       "A large shared space with multiple beds for economical and group stays.",
//     price: 70,
//     occupancyLimit: 10,
//   },
//   {
//     type: "Studio Room",
//     description:
//       "An all-in-one room with living and sleeping spaces, plus a small kitchen.",
//     price: 160,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Deluxe Room",
//     description:
//       "A premium room with upgraded amenities for a more comfortable stay.",
//     price: 220,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Connecting Rooms",
//     description:
//       "Rooms with an internal door connecting them, perfect for families or groups.",
//     price: 270,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Junior Suite",
//     description:
//       "A suite with an open-plan layout for added space and comfort.",
//     price: 250,
//     occupancyLimit: 3,
//   },
//   {
//     type: "Queen Room",
//     description:
//       "A room with a queen-sized bed for a comfortable stay for two.",
//     price: 150,
//     occupancyLimit: 2,
//   },
//   {
//     type: "King Room",
//     description: "A room with a king-sized bed and luxurious features.",
//     price: 210,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Single",
//     description:
//       "A compact room with a single bed, ideal for solo guests looking for comfort and value.",
//     price: 100,
//     occupancyLimit: 1,
//   },
//   {
//     type: "Double",
//     description:
//       "A double room with a comfortable bed or twin beds for two guests.",
//     price: 135,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Suite",
//     description:
//       "A suite with a separate living area and bedroom, offering extra space and luxury.",
//     price: 290,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Fitness Room",
//     description:
//       "A room with fitness equipment for guests who want to maintain their workout routine.",
//     price: 220,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Business Suite",
//     description:
//       "An executive suite with business amenities, including a desk and high-speed internet access.",
//     price: 350,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Art Room",
//     description:
//       "A room designed with unique art elements and stylish decor.",
//     price: 175,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Themed Room",
//     description:
//       "A creatively themed room for a distinctive lodging experience.",
//     price: 225,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Dormitory Room",
//     description:
//       "A shared room with multiple beds for budget-conscious travelers.",
//     price: 75,
//     occupancyLimit: 12,
//   },
//   {
//     type: "Studio Room",
//     description:
//       "An all-in-one room with combined living and sleeping areas, plus kitchenette facilities.",
//     price: 165,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Deluxe Room",
//     description:
//       "An upgraded room with superior amenities for added comfort.",
//     price: 230,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Connecting Rooms",
//     description:
//       "Multiple rooms connected by an internal door for families or larger groups.",
//     price: 280,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Junior Suite",
//     description:
//       "A suite with a spacious layout and combined living and sleeping areas.",
//     price: 260,
//     occupancyLimit: 3,
//   },
//   {
//     type: "Queen Room",
//     description:
//       "A room with a queen-sized bed, offering comfort for two guests.",
//     price: 155,
//     occupancyLimit: 2,
//   },
//   {
//     type: "King Room",
//     description:
//       "A luxurious room with a king-sized bed for a premium experience.",
//     price: 220,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Single",
//     description: "A small, budget-friendly room with a single bed.",
//     price: 105,
//     occupancyLimit: 1,
//   },
//   {
//     type: "Double",
//     description:
//       "A double room with either a double bed or two single beds for two guests.",
//     price: 140,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Suite",
//     description:
//       "A spacious suite with separate living and sleeping areas for a luxurious stay.",
//     price: 300,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Fitness Room",
//     description:
//       "A room equipped with fitness machines and equipment for guest workouts.",
//     price: 230,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Business Suite",
//     description:
//       "An executive suite designed with business travelers in mind, including work amenities.",
//     price: 360,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Art Room",
//     description:
//       "A room featuring artistic decor and design elements for a unique experience.",
//     price: 180,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Themed Room",
//     description:
//       "A room with a creative theme and special decor for a memorable stay.",
//     price: 230,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Dormitory Room",
//     description:
//       "A large shared room with multiple beds, ideal for budget travelers and groups.",
//     price: 80,
//     occupancyLimit: 12,
//   },
//   {
//     type: "Studio Room",
//     description:
//       "A combined living and sleeping space with kitchen facilities.",
//     price: 170,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Deluxe Room",
//     description:
//       "A room with enhanced amenities and comfort for an upgraded experience.",
//     price: 240,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Connecting Rooms",
//     description:
//       "Two or more rooms with connecting doors for families or groups needing more space.",
//     price: 290,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Junior Suite",
//     description:
//       "A suite offering a combination of living and sleeping areas with added space.",
//     price: 270,
//     occupancyLimit: 3,
//   },
//   {
//     type: "Queen Room",
//     description:
//       "A room with a queen-sized bed, perfect for couples or small families.",
//     price: 160,
//     occupancyLimit: 2,
//   },
//   {
//     type: "King Room",
//     description:
//       "A spacious room with a king-sized bed for a luxurious stay.",
//     price: 230,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Single",
//     description:
//       "A small room with a single bed, suitable for solo travelers.",
//     price: 110,
//     occupancyLimit: 1,
//   },
//   {
//     type: "Double",
//     description:
//       "A room with double or twin beds, ideal for couples or friends.",
//     price: 145,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Suite",
//     description:
//       "An elegant suite with separate living and sleeping areas for ultimate comfort.",
//     price: 310,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Fitness Room",
//     description:
//       "A room featuring fitness equipment for guests who want to stay fit during their stay.",
//     price: 240,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Business Suite",
//     description:
//       "A suite tailored for business travelers with a desk and high-speed internet access.",
//     price: 370,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Art Room",
//     description: "A room with unique art and creative decor.",
//     price: 185,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Themed Room",
//     description:
//       "A room decorated with a special theme for a unique guest experience.",
//     price: 235,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Dormitory Room",
//     description: "A budget-friendly shared room with multiple beds.",
//     price: 85,
//     occupancyLimit: 14,
//   },
//   {
//     type: "Studio Room",
//     description:
//       "A room with combined living and sleeping areas, including a kitchenette.",
//     price: 175,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Deluxe Room",
//     description:
//       "An upgraded room offering superior comfort and amenities.",
//     price: 250,
//     occupancyLimit: 2,
//   },
//   {
//     type: "Connecting Rooms",
//     description:
//       "Rooms connected by an internal door for families or groups.",
//     price: 300,
//     occupancyLimit: 4,
//   },
//   {
//     type: "Junior Suite",
//     description: "A suite with an open-plan layout and additional comfort.",
//     price: 280,
//     occupancyLimit: 3,
//   },
//   {
//     type: "Queen Room",
//     description:
//       "A room with a queen-sized bed offering comfort for two guests.",
//     price: 165,
//     occupancyLimit: 2,
//   },
//   {
//     type: "King Room",
//     description:
//       "A spacious room with a king-sized bed for luxurious accommodation.",
//     price: 240,
//     occupancyLimit: 2,
//   },
// ]

// const DummyRoomServices = [
//   "Air Conditioning",
//   "Free Wi-Fi",
//   "Flat-screen TV",
//   "Cable Channels",
//   "Coffee Maker",
//   "Mini Bar",
//   "Room Service",
//   "Private Bathroom",
//   "Bathrobes",
//   "Slippers",
//   "Hair Dryer",
//   "Ironing Facilities",
//   "Desk",
//   "Safe Deposit Box",
//   "Seating Area",
//   "Sofa",
//   "Soundproof Rooms",
//   "Blackout Curtains",
//   "Electric Kettle",
//   "Balcony",
//   "Terrace",
//   "City View",
//   "Garden View",
//   "Ocean View",
//   "Mountain View",
//   "Pool View",
//   "Telephone",
//   "Alarm Clock",
//   "Wake-up Service",
//   "Closet",
//   "Extra Long Beds",
//   "Free Toiletries",
//   "Toothbrush",
//   "Shampoo",
//   "Conditioner",
//   "Body Wash",
//   "Toilet Paper",
//   "Towels",
//   "Linen",
//   "Heating",
//   "Fan",
//   "Carpeted",
//   "Wooden/Parquet Floor",
//   "Tile/Marble Floor",
//   "Interconnected Rooms",
//   "Non-smoking Rooms",
//   "Smoking Rooms",
//   "Hypoallergenic Pillows",
//   "Hypoallergenic Mattress",
//   "Hypoallergenic Bed Linens",
//   "Mosquito Net",
//   "Daily Housekeeping",
//   "Laundry Service",
//   "Dry Cleaning",
//   "Ironing Service",
//   "Shoe Shine",
//   "Trouser Press",
//   "Clothes Rack",
//   "Fireplace",
//   "Hot Tub",
//   "Spa Bath",
//   "Jacuzzi",
//   "Sauna",
//   "Steam Room",
//   "Massage Service",
//   "Fitness Center",
//   "Indoor Pool",
//   "Outdoor Pool",
//   "Infinity Pool",
//   "Rooftop Pool",
//   "Saltwater Pool",
//   "Heated Pool",
//   "Plunge Pool",
//   "Private Pool",
//   "Child Safety Socket Covers",
//   "Baby Safety Gates",
//   "High Chair",
//   "Kids' Club",
//   "Playground",
//   "Babysitting/Child Services",
//   "Board Games/Puzzles",
//   "Books, DVDs, or Music for Children",
//   "Game Console",
//   "Video Games",
//   "Pet-friendly",
//   "Pet Bowls",
//   "Pet Basket",
//   "24-hour Front Desk",
//   "Express Check-in/Check-out",
//   "Concierge Service",
//   "Luggage Storage",
//   "Tour Desk",
//   "Ticket Service",
//   "Airport Shuttle",
//   "Shuttle Service",
//   "Car Hire",
//   "Bicycle Rental",
//   "Free Parking",
//   "Valet Parking",
//   "Secured Parking",
//   "Street Parking",
//   "Parking Garage",
//   "Accessible Parking",
//   "Electric Vehicle Charging Station",
//   "Public Transport Tickets",
//   "Newspapers",
//   "Magazines",
//   "Library",
//   "Shared Lounge/TV Area",
//   "Shared Kitchen",
//   "BBQ Facilities",
//   "Picnic Area",
//   "Outdoor Furniture",
//   "Sun Terrace",
//   "Garden",
//   "Fireplace in Lobby",
//   "Business Center",
//   "Meeting/Banquet Facilities",
//   "Fax/Photocopying",
//   "Private Check-in/Check-out",
//   "Designated Smoking Area",
//   "Allergy-free Room",
//   "Soundproof Rooms",
//   "Bridal Suite",
//   "VIP Room Facilities",
//   "Executive Lounge Access",
//   "Private Entrance",
//   "Key Card Access",
//   "24-hour Security",
//   "Security Alarm",
//   "Smoke Alarms",
//   "CCTV in Common Areas",
//   "CCTV Outside Property",
//   "Fire Extinguishers",
//   "Family Rooms",
//   "Wheelchair Accessible",
//   "Lower Sink",
//   "Higher Level Toilet",
//   "Toilet with Grab Rails",
//   "Emergency Cord in Bathroom",
//   "Shower Chair",
//   "Adapted Bath",
//   "Walk-in Shower",
//   "Pool Towels",
//   "Beach Towels",
//   "Pool Bar",
//   "Snack Bar",
//   "Restaurant",
//   "Bar",
//   "Diet Menus (on request)",
//   "Special Diet Meals",
//   "Kid-friendly Buffet",
//   "Kid Meals",
//   "Wine/Champagne",
//   "Fruits",
//   "Bottle of Water",
//   "Breakfast in Room",
//   "Packed Lunches",
//   "Grocery Deliveries",
//   "Vending Machine (drinks)",
//   "Vending Machine (snacks)",
//   "Evening Entertainment",
//   "Nightclub/DJ",
//   "Live Music/Performance",
//   "Live Sports Events (broadcast)",
//   "Themed Dinner Nights",
//   "Cooking Class",
//   "Happy Hour",
//   "Bike Tours",
//   "Walking Tours",
//   "Pub Crawls",
//   "Temporary Art Galleries",
//   "Movie Nights",
//   "Horse Riding",
//   "Canoeing",
//   "Fishing",
//   "Golf Course (within 3 km)",
//   "Mini Golf",
//   "Bowling",
//   "Skiing",
//   "Ski Storage",
//   "Ski Pass Vendor",
//   "Ski-to-Door Access",
//   "Hiking",
//   "Cycling",
//   "Diving",
//   "Snorkeling",
//   "Windsurfing",
//   "Surfing",
//   "Tennis Court",
//   "Squash",
//   "Yoga Classes",
//   "Fitness Classes",
//   "Personal Trainer",
//   "Aerobics",
//   "Archery",
//   "Water Park",
//   "Casino",
//   "Karaoke",
//   "BBQ Facilities",
//   "Picnic Area",
//   "Outdoor Fireplace",
//   "Private Beach Area",
//   "Beachfront",
//   "Fishing",
//   "Table Tennis",
//   "Darts",
//   "Billiards",
//   "Shuffleboard",
//   "Dart Board",
// ];
