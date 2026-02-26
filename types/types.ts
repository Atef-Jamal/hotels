import { Document, Types } from "mongoose";

// client-side types

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  bookings: IBooking[];
  payments: IPayment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IDiscount {
  _id: string;
  hotel: IHotel;
  type: "promo-code" | "first-deal";
  code?: string;
  expiredAt: Date;
  amount: { type: "percentage" | "fixed"; amount: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface IHotel {
  _id: string;
  name: string;
  description: string;
  images: string[];
  location: {
    country: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    address: string;
    postalCode: string;
  };
  amenities: string[];
  paymentFacilities: "Pay At Hotel" | "Prepay Online";
  policies: {
    checkIn: string;
    checkOut: string;
    cancellationPolicy: boolean;
  };
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHotelWithRoomsReviewsNearbyAttractions extends IHotel {
  rooms: IRoom[];
  reviews: IReview[];
  nearbyAttractions: INearbyAttraction[];
}

export interface IRoom {
  _id: string;
  hotel: IHotel;
  type: IRoomType;
  description: string;
  images: string[];
  roomServices: string[];
  breakfastIncluded: boolean;
  pricePerNight: number;
  beds: { type: string; count: number }[];
  capacity: { adults: number; children: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  _id: string;
  user: IUser;
  hotel: IHotel;
  cleanlness: number;
  location: number;
  amentities: number;
  service: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INearbyAttraction {
  _id: string;
  category: INearbyAttractionCategory;
  hotel: IHotel;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance: number;
  travelTime: string;
  images: string[];
  website: string;
  priceRange: string;
  rating: number;
  openingHours: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBooking {
  _id: string;
  user: IUser;
  roomId: IRoom;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  _id: string;
  user: IUser;
  booking: IBooking;
  amount: number;
  currency: "USD";
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "crypto";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}
// server-side types

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  bookings: Types.ObjectId[];
  payments: Types.ObjectId[];
}
export interface IHotelDoc extends Document {
  name: string;
  description: string;
  images: string[];
  location: {
    country: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    address: string;
    postalCode: string;
  };
  amenities: string[];
  paymentFacilities: "Pay At Hotel" | "Prepay Online";
  policies: {
    checkIn: string;
    checkOut: string;
    cancellationPolicy: boolean;
  };
  nearbyAttractions: Types.ObjectId[];
  rooms: Types.ObjectId[];
  reviews: Types.ObjectId[];
  averageRating: number;
}
export interface IRoomDoc extends Document {
  hotel: Types.ObjectId;
  type: IRoomType;
  description: string;
  images: string[];
  roomServices: string[];
  breakfastIncluded: boolean;
  beds: { type: string; count: number }[];
  pricePerNight: number;
  capacity: { adults: number; children: number };
}
export interface IBookingDoc extends Document {
  user: Types.ObjectId;
  roomId: Types.ObjectId;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
}
export interface IPaymentDoc extends Document {
  user: Types.ObjectId;
  booking: Types.ObjectId;
  amount: number;
  currency: "USD";
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "crypto";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId: string;
}
export interface INearbyAttractionDoc extends Document {
  category: INearbyAttractionCategory;
  name: string;
  hotel: Types.ObjectId;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance: number;
  travelTime: string;
  images: string[];
  website: string;
  priceRange: string;
  rating: number;
  openingHours: string;
}
export interface IReviewDoc extends Document {
  user: Types.ObjectId;
  hotel: Types.ObjectId;
  cleanlness: number;
  location: number;
  amentities: number;
  service: number;
  comment: string;
}
export interface IDiscountDoc extends Document {
  hotel: Types.ObjectId;
  type: "promo-code" | "first-deal";
  code?: string;
  amount: { type: "percentage" | "fixed"; amount: number };
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const EnumAmenityName = [
  "Free Wi-Fi",
  "Swimming pool",
  "Fitness center",
  "Restaurant",
  "Bar",
  "Spa",
  "Room service",
  "24-hour front desk",
  "Airport shuttle",
  "Parking",
  "Valet parking",
  "Business center",
  "Conference rooms",
  "Banquet facilities",
  "Laundry service",
  "Dry cleaning",
  "Housekeeping",
  "Concierge service",
  "Currency exchange",
  "Luggage storage",
  "Safety deposit box",
  "ATM on-site",
  "Gift shop",
  "Newspaper",
  "Non-smoking rooms",
  "Family rooms",
  "Pet-friendly",
  "Accessible rooms",
  "Elevator",
  "Air conditioning",
  "Heating",
  "Balcony",
  "Terrace",
  "Garden",
  "Beachfront",
  "Private beach area",
  "BBQ facilities",
  "Picnic area",
  "Sun terrace",
  "Bicycle rental",
  "Car hire",
  "Shared lounge/TV area",
  "Library",
  "Karaoke",
  "Nightclub/DJ",
  "Entertainment staff",
  "Children's playground",
  "Kids' club",
  "Babysitting/child services",
  "Board games/puzzles",
  "Books",
  "DVDs",
  "music for children",
  "Indoor play area",
  "Outdoor play equipment for children",
  "Kids' outdoor play equipment",
  "Kids' meals",
  "Special diet menus (on request)",
  "Snack bar",
  "Packed lunches",
  "Breakfast in the room",
  "In-room breakfast",
  "Coffee shop on-site",
  "Tea/Coffee maker",
  "Mini-bar",
  "Kitchenette",
  "Microwave",
  "Refrigerator",
  "Dishwasher",
  "Oven",
  "Stovetop",
  "Kitchenware",
  "Dining area",
  "Seating area",
  "Sofa",
  "Desk",
  "Flat-screen TV",
  "Cable channels",
  "Satellite channels",
  "Pay-per-view channels",
  "Telephone",
  "Radio",
  "iPod dock",
  "DVD player",
  "CD player",
  "Computer",
  "Game console",
  "Video games",
  "Streaming service (like Netflix)",
  "Bathroom",
  "Bathtub",
  "Shower",
  "Hairdryer",
  "Bathrobe",
  "Free toiletries",
  "Slippers",
  "Toilet",
  "Bidet",
  "Towels",
  "Linen",
  "Wardrobe or closet",
  "Extra long beds (> 2 metres)",
  "Clothes rack",
  "Ironing facilities",
  "Iron",
  "Trouser press",
  "Wake-up service",
  "Alarm clock",
  "Hypoallergenic",
  "Soundproofing",
  "Electric kettle",
  "Outdoor furniture",
  "Private pool",
  "Hot tub",
  "Sauna",
  "Steam room",
  "Massage",
  "Yoga classes",
  "Fitness classes",
  "Personal trainer",
  "Locker rooms",
  "Spa lounge/relaxation area",
  "Spa/wellness packages",
  "Beauty services",
  "Facial treatments",
  "Hair treatments",
  "Manicure",
  "Pedicure",
  "Haircut",
  "Hair colouring",
  "Hair styling",
  "Body treatments",
  "Body scrub",
  "Body wrap",
  "Light therapy",
  "Make up services",
  "Fitness/spa locker rooms",
  "Pool/beach towels",
  "Sun loungers or beach chairs",
  "Pool bar",
  "Heated pool",
  "Infinity pool",
  "Plunge pool",
  "Salt-water pool",
  "Shallow end",
  "Water slide",
  "Swimming pool toys",
  "Pool with view",
  "Rooftop pool",
  "Indoor pool",
  "Outdoor pool",
  "Seasonal pool",
  "All year pool",
  "Indoor pool (all year)",
  "Outdoor pool (all year)",
  "Shuttle service",
  "Public transport tickets",
  "Electric vehicle charging station",
  "Secured parking",
  "Street parking",
  "Accessible parking",
  "Parking garage",
  "Newspapers",
  "Books",
  "DVDs",
  "Music for children",
  "Children television networks",
  "Baby safety gates",
  "Children's high chair",
  "Baby bath",
  "Baby safety sockets",
  "Bottle warmer",
  "Carpeted",
  "Non-smoking throughout",
  "Designated smoking area",
  "Hypoallergenic room available",
  "Allergy-free room",
  "Soundproof rooms",
  "Bridal suite",
  "Facilities for disabled guests",
  "Vending machine (drinks)",
  "Vending machine (snacks)",
  "Kid meals",
  "Wine/champagne",
  "Bottle of water",
  "Fruits",
  "Chocolate or cookies",
  "Coffee house on site",
  "Outdoor fireplace",
  "Outdoor dining area",
  "Barbecue",
  "Patio",
  "Business centre",
  "Meeting/banquet facilities",
  "Fax/photocopying",
  "Express check-in/check-out",
  "Private check-in/check-out",
  "Lockers",
  "Tour desk",
  "Ticket service",
  "ATM/cash machine on site",
  "Lift",
  "VIP room facilities",
  "Ironing service",
  "Laundry",
  "Shoeshine",
  "Daily housekeeping",
  "Grocery deliveries",
  "Mini-market on site",
  "Airport shuttle (additional charge)",
  "Shuttle service (additional charge)",
  "Private parking",
  "24-hour front",
];

export const EnumRoomServices = [
  "Room cleaning",
  "Bed making",
  "Towel replacement",
  "Laundry service",
  "Ironing service",
  "Mini bar restocking",
  "Room service menu",
  "Washing Machine",
  "In-room dining",
  "Breakfast in bed",
  "Wake-up call",
  "Concierge service",
  "Turndown service",
  "Pillow menu",
  "Extra blanket",
  "Extra pillow",
  "Shoe shining",
  "Sewing kit",
  "Bathrobe",
  "Slippers",
  "Toiletries",
  "Hairdryer",
  "Shaving kit",
  "Dental kit",
  "Makeup mirror",
  "In-room safe",
  "Umbrella",
  "Newspaper delivery",
  "Magazine delivery",
  "DVD player",
  "Blu-ray player",
  "Streaming services",
  "In-room movies",
  "Satellite TV",
  "Cable TV",
  "High-speed internet",
  "Wi-Fi access",
  "Business center services",
  "Printer",
  "Fax machine",
  "Scanner",
  "Laptop rental",
  "Gaming console",
  "Board games",
  "Books",
  "In-room massage",
  "In-room spa treatments",
  "In-room yoga",
  "Personal trainer",
  "Fitness equipment",
  "Baby cot",
  "Baby sitting",
  "Kids amenities",
  "PlayStation",
  "Xbox",
  "Nintendo Switch",
  "Pet bed",
  "Pet food",
  "Pet sitting",
  "Pet grooming",
  "Wheelchair",
  "Accessible bathroom",
  "Accessible shower",
  "Hearing accessible services",
  "Visual accessible services",
  "Air conditioning",
  "Heating",
  "Soundproofing",
  "Room fragrance",
  "Butler service",
  "Personal shopper",
  "Dry cleaning",
  "Suit pressing",
  "Dietary meals",
  "Allergy-free room",
  "Connecting rooms",
  "Balcony",
  "Terrace",
  "City view",
  "Ocean view",
  "Garden view",
  "Mountain view",
  "River view",
  "Luggage storage",
  "Late checkout",
  "Early check-in",
  "Currency exchange",
  "Mail service",
  "Courier service",
  "Medical assistance",
  "Doctor on call",
  "Pharmacy service",
  "Car rental",
  "Airport transfer",
  "Shuttle service",
  "Parking service",
  "Valet parking",
  "Bicycle rental",
  "Private chauffeur",
  "Tour booking",
  "Event tickets",
  "Concert tickets",
  "Restaurant reservations",
  "Ticket printing",
  "Translation services",
  "Interpreter services",
  "Courier delivery",
  "Flower arrangement",
  "Gift wrapping",
  "Special occasion setup",
  "Birthday cake",
  "Anniversary setup",
  "Honeymoon setup",
  "Business amenities",
  "Meeting room booking",
  "Conference setup",
  "Video conferencing",
  "Projector rental",
  "Whiteboard rental",
  "Flipchart rental",
  "Notepads and pens",
  "Photocopying service",
  "Secretarial service",
  "Tea and coffee making",
  "Espresso machine",
  "Kettle",
  "Microwave",
  "Refrigerator",
  "Oven",
  "Stovetop",
  "Dishwasher",
  "Kitchen utensils",
  "Cookware",
  "Tableware",
  "Glassware",
  "Bottled water",
  "Welcome drink",
  "Fresh fruit",
  "Chocolate",
  "Champagne",
  "Wine",
  "Beer",
  "Snack basket",
  "Grocery shopping service",
  "Barbecue equipment",
  "Outdoor furniture",
  "Private pool",
  "Jacuzzi",
  "Sauna",
  "Steam room",
  "Fitness room",
  "Private garden",
  "Private beach",
  "Beach towels",
  "Sun loungers",
  "Beach umbrella",
  "Beach bag",
  "Beach toys",
  "Snorkeling gear",
  "Kayak",
  "Paddleboard",
  "Water sports equipment",
  "Bicycle storage",
  "Ski storage",
  "Ski passes",
  "Ski equipment rental",
  "Golf equipment rental",
  "Tennis equipment rental",
  "Yoga mat",
  "Meditation cushion",
  "First aid kit",
  "Emergency contact numbers",
  "Local maps",
  "Guidebooks",
  "Tourist information",
  "Souvenir shop",
  "Art gallery access",
  "Museum tickets",
  "Theater tickets",
  "Dance show tickets",
  "Music performance tickets",
  "Exhibition tickets",
  "Cooking class booking",
  "Wine tasting booking",
  "Food tour booking",
  "Cultural tour booking",
  "City tour booking",
  "Adventure tour booking",
  "Hiking guide",
  "Nature guide",
  "Personal photographer",
  "Photo printing service",
  "Photo album",
  "Video recording service",
  "Streaming equipment",
  "Podcast recording equipment",
  "Blogging equipment",
  "Social media setup",
  "Live streaming setup",
  "Digital concierge",
  "Virtual assistant",
  "Room control tablet",
  "Smart lighting",
  "Smart thermostat",
  "Voice assistant",
  "Smart lock",
  "Keyless entry",
];

export const EnumRoomType = [
  "Single",
  "Standard",
  "Junior Suite",
  "Penthouse Suite",
  "Double",
  "Deluxe",
  "Twin",
  "Executive Suite",
  "Suite",
  "Family Room",
];

export const EnumNearbyAttraction = [
  "Restaurant",
  "Museum",
  "Park",
  "Shopping",
  "Landmark",
  "Beach",
  "Theater",
  "Transportation",
];

export type INearbyAttractionCategory =
  | "Restaurant"
  | "Museum"
  | "Park"
  | "Shopping"
  | "Landmark"
  | "Beach"
  | "Theater"
  | "Transportation";

export type IRoomType =
  | "Single"
  | "Standard"
  | "Junior Suite"
  | "Penthouse Suite"
  | "Double"
  | "Deluxe"
  | "Twin"
  | "Executive Suite"
  | "Suite"
  | "Family Room";

export type IAmenityType =
  | "Free Wi-Fi"
  | "Swimming pool"
  | "Fitness center"
  | "Restaurant"
  | "Bar"
  | "Spa"
  | "Room service"
  | "24-hour front desk"
  | "Airport shuttle"
  | "Parking"
  | "Valet parking"
  | "Business center"
  | "Conference rooms"
  | "Banquet facilities"
  | "Laundry service"
  | "Dry cleaning"
  | "Housekeeping"
  | "Concierge service"
  | "Currency exchange"
  | "Luggage storage"
  | "Safety deposit box"
  | "ATM on-site"
  | "Gift shop"
  | "Newspaper"
  | "Non-smoking rooms"
  | "Family rooms"
  | "Pet-friendly"
  | "Accessible rooms"
  | "Elevator"
  | "Air conditioning"
  | "Heating"
  | "Balcony"
  | "Terrace"
  | "Garden"
  | "Beachfront"
  | "Private beach area"
  | "BBQ facilities"
  | "Picnic area"
  | "Sun terrace"
  | "Bicycle rental"
  | "Car hire"
  | "Shared lounge/TV area"
  | "Library"
  | "Karaoke"
  | "Nightclub/DJ"
  | "Entertainment staff"
  | "Children's playground"
  | "Kids' club"
  | "Babysitting/child services"
  | "Board games/puzzles"
  | "Books"
  | "DVDs"
  | "music for children"
  | "Indoor play area"
  | "Outdoor play equipment for children"
  | "Kids' outdoor play equipment"
  | "Kids' meals"
  | "Special diet menus (on request)"
  | "Snack bar"
  | "Packed lunches"
  | "Breakfast in the room"
  | "In-room breakfast"
  | "Coffee shop on-site"
  | "Tea/Coffee maker"
  | "Mini-bar"
  | "Kitchenette"
  | "Microwave"
  | "Refrigerator"
  | "Dishwasher"
  | "Oven"
  | "Stovetop"
  | "Kitchenware"
  | "Dining area"
  | "Seating area"
  | "Sofa"
  | "Desk"
  | "Flat-screen TV"
  | "Cable channels"
  | "Satellite channels"
  | "Pay-per-view channels"
  | "Telephone"
  | "Radio"
  | "iPod dock"
  | "DVD player"
  | "CD player"
  | "Computer"
  | "Game console"
  | "Video games"
  | "Streaming service (like Netflix)"
  | "Bathroom"
  | "Bathtub"
  | "Shower"
  | "Hairdryer"
  | "Bathrobe"
  | "Free toiletries"
  | "Slippers"
  | "Toilet"
  | "Bidet"
  | "Towels"
  | "Linen"
  | "Wardrobe or closet"
  | "Extra long beds (> 2 metres)"
  | "Clothes rack"
  | "Ironing facilities"
  | "Iron"
  | "Trouser press"
  | "Wake-up service"
  | "Alarm clock"
  | "Hypoallergenic"
  | "Soundproofing"
  | "Electric kettle"
  | "Outdoor furniture"
  | "Private pool"
  | "Hot tub"
  | "Sauna"
  | "Steam room"
  | "Massage"
  | "Yoga classes"
  | "Fitness classes"
  | "Personal trainer"
  | "Locker rooms"
  | "Spa lounge/relaxation area"
  | "Spa/wellness packages"
  | "Beauty services"
  | "Facial treatments"
  | "Hair treatments"
  | "Manicure"
  | "Pedicure"
  | "Haircut"
  | "Hair colouring"
  | "Hair styling"
  | "Body treatments"
  | "Body scrub"
  | "Body wrap"
  | "Light therapy"
  | "Make up services"
  | "Fitness/spa locker rooms"
  | "Pool/beach towels"
  | "Sun loungers or beach chairs"
  | "Pool bar"
  | "Heated pool"
  | "Infinity pool"
  | "Plunge pool"
  | "Salt-water pool"
  | "Shallow end"
  | "Water slide"
  | "Swimming pool toys"
  | "Pool with view"
  | "Rooftop pool"
  | "Indoor pool"
  | "Outdoor pool"
  | "Seasonal pool"
  | "All year pool"
  | "Indoor pool (all year)"
  | "Outdoor pool (all year)"
  | "Shuttle service"
  | "Public transport tickets"
  | "Electric vehicle charging station"
  | "Secured parking"
  | "Street parking"
  | "Accessible parking"
  | "Parking garage"
  | "Newspapers"
  | "Books"
  | "DVDs"
  | "Music for children"
  | "Children television networks"
  | "Baby safety gates"
  | "Children's high chair"
  | "Baby bath"
  | "Baby safety sockets"
  | "Bottle warmer"
  | "Carpeted"
  | "Non-smoking throughout"
  | "Designated smoking area"
  | "Hypoallergenic room available"
  | "Allergy-free room"
  | "Soundproof rooms"
  | "Bridal suite"
  | "Facilities for disabled guests"
  | "Vending machine (drinks)"
  | "Vending machine (snacks)"
  | "Kid meals"
  | "Wine/champagne"
  | "Bottle of water"
  | "Fruits"
  | "Chocolate or cookies"
  | "Coffee house on site"
  | "Outdoor fireplace"
  | "Outdoor dining area"
  | "Barbecue"
  | "Patio"
  | "Business centre"
  | "Meeting/banquet facilities"
  | "Fax/photocopying"
  | "Express check-in/check-out"
  | "Private check-in/check-out"
  | "Lockers"
  | "Tour desk"
  | "Ticket service"
  | "ATM/cash machine on site"
  | "Lift"
  | "VIP room facilities"
  | "Ironing service"
  | "Laundry"
  | "Shoeshine"
  | "Daily housekeeping"
  | "Grocery deliveries"
  | "Mini-market on site"
  | "Airport shuttle (additional charge)"
  | "Shuttle service (additional charge)"
  | "Private parking"
  | "24-hour front";

export type IRoomServicesType =
  | "Room cleaning"
  | "Bed making"
  | "Towel replacement"
  | "Laundry service"
  | "Ironing service"
  | "Mini bar restocking"
  | "Room service menu"
  | "Washing Machine"
  | "In-room dining"
  | "Breakfast in bed"
  | "Wake-up call"
  | "Concierge service"
  | "Turndown service"
  | "Pillow menu"
  | "Extra blanket"
  | "Extra pillow"
  | "Shoe shining"
  | "Sewing kit"
  | "Bathrobe"
  | "Slippers"
  | "Toiletries"
  | "Hairdryer"
  | "Shaving kit"
  | "Dental kit"
  | "Makeup mirror"
  | "In-room safe"
  | "Umbrella"
  | "Newspaper delivery"
  | "Magazine delivery"
  | "DVD player"
  | "Blu-ray player"
  | "Streaming services"
  | "In-room movies"
  | "Satellite TV"
  | "Cable TV"
  | "High-speed internet"
  | "Wi-Fi access"
  | "Business center services"
  | "Printer"
  | "Fax machine"
  | "Scanner"
  | "Laptop rental"
  | "Gaming console"
  | "Board games"
  | "Books"
  | "In-room massage"
  | "In-room spa treatments"
  | "In-room yoga"
  | "Personal trainer"
  | "Fitness equipment"
  | "Baby cot"
  | "Baby sitting"
  | "Kids amenities"
  | "PlayStation"
  | "Xbox"
  | "Nintendo Switch"
  | "Pet bed"
  | "Pet food"
  | "Pet sitting"
  | "Pet grooming"
  | "Wheelchair"
  | "Accessible bathroom"
  | "Accessible shower"
  | "Hearing accessible services"
  | "Visual accessible services"
  | "Air conditioning"
  | "Heating"
  | "Soundproofing"
  | "Room fragrance"
  | "Butler service"
  | "Personal shopper"
  | "Dry cleaning"
  | "Suit pressing"
  | "Dietary meals"
  | "Allergy-free room"
  | "Connecting rooms"
  | "Balcony"
  | "Terrace"
  | "City view"
  | "Ocean view"
  | "Garden view"
  | "Mountain view"
  | "River view"
  | "Luggage storage"
  | "Late checkout"
  | "Early check-in"
  | "Currency exchange"
  | "Mail service"
  | "Courier service"
  | "Medical assistance"
  | "Doctor on call"
  | "Pharmacy service"
  | "Car rental"
  | "Airport transfer"
  | "Shuttle service"
  | "Parking service"
  | "Valet parking"
  | "Bicycle rental"
  | "Private chauffeur"
  | "Tour booking"
  | "Event tickets"
  | "Concert tickets"
  | "Restaurant reservations"
  | "Ticket printing"
  | "Translation services"
  | "Interpreter services"
  | "Courier delivery"
  | "Flower arrangement"
  | "Gift wrapping"
  | "Special occasion setup"
  | "Birthday cake"
  | "Anniversary setup"
  | "Honeymoon setup"
  | "Business amenities"
  | "Meeting room booking"
  | "Conference setup"
  | "Video conferencing"
  | "Projector rental"
  | "Whiteboard rental"
  | "Flipchart rental"
  | "Notepads and pens"
  | "Photocopying service"
  | "Secretarial service"
  | "Tea and coffee making"
  | "Espresso machine"
  | "Kettle"
  | "Microwave"
  | "Refrigerator"
  | "Oven"
  | "Stovetop"
  | "Dishwasher"
  | "Kitchen utensils"
  | "Cookware"
  | "Tableware"
  | "Glassware"
  | "Bottled water"
  | "Welcome drink"
  | "Fresh fruit"
  | "Chocolate"
  | "Champagne"
  | "Wine"
  | "Beer"
  | "Snack basket"
  | "Grocery shopping service"
  | "Barbecue equipment"
  | "Outdoor furniture"
  | "Private pool"
  | "Jacuzzi"
  | "Sauna"
  | "Steam room"
  | "Fitness room"
  | "Private garden"
  | "Private beach"
  | "Beach towels"
  | "Sun loungers"
  | "Beach umbrella"
  | "Beach bag"
  | "Beach toys"
  | "Snorkeling gear"
  | "Kayak"
  | "Paddleboard"
  | "Water sports equipment"
  | "Bicycle storage"
  | "Ski storage"
  | "Ski passes"
  | "Ski equipment rental"
  | "Golf equipment rental"
  | "Tennis equipment rental"
  | "Yoga mat"
  | "Meditation cushion"
  | "First aid kit"
  | "Emergency contact numbers"
  | "Local maps"
  | "Guidebooks"
  | "Tourist information"
  | "Souvenir shop"
  | "Art gallery access"
  | "Museum tickets"
  | "Theater tickets"
  | "Dance show tickets"
  | "Music performance tickets"
  | "Exhibition tickets"
  | "Cooking class booking"
  | "Wine tasting booking"
  | "Food tour booking"
  | "Cultural tour booking"
  | "City tour booking"
  | "Adventure tour booking"
  | "Hiking guide"
  | "Nature guide"
  | "Personal photographer"
  | "Photo printing service"
  | "Photo album"
  | "Video recording service"
  | "Streaming equipment"
  | "Podcast recording equipment"
  | "Blogging equipment"
  | "Social media setup"
  | "Live streaming setup"
  | "Digital concierge"
  | "Virtual assistant"
  | "Room control tablet"
  | "Smart lighting"
  | "Smart thermostat"
  | "Voice assistant"
  | "Smart lock"
  | "Keyless entry";
