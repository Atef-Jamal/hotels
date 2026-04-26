-- CreateEnum
CREATE TYPE "PaymentFacilities" AS ENUM ('Pay_At_Hotel', 'Prepay_Online');

-- CreateEnum
CREATE TYPE "AttractionCategory" AS ENUM ('Restaurant', 'Museum', 'Park', 'Shopping', 'Landmark', 'Beach', 'Theater', 'Transportation');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('Single', 'Standard', 'Junior_Suite', 'Penthouse_Suite', 'Double', 'Deluxe', 'Twin', 'Executive_Suite', 'Suite', 'Family_Room');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Credit_Card', 'Debit_Card', 'PayPal', 'Bank_Transfer', 'Cash', 'Mobile_Payment', 'Cryptocurrency');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Refunded', 'Cancelled');

-- CreateEnum
CREATE TYPE "RoomServices" AS ENUM ('Room_cleaning', 'Bed_making', 'Towel_replacement', 'Laundry_service', 'Ironing_service', 'Mini_bar_restocking', 'Room_service_menu', 'Washing_Machine', 'In_room_dining', 'Breakfast_in_bed', 'Wake_up_call', 'Concierge_service', 'Turndown_service', 'Pillow_menu', 'Extra_blanket', 'Extra_pillow', 'Shoe_shining', 'Sewing_kit', 'Bathrobe', 'Slippers', 'Toiletries', 'Hairdryer', 'Shaving_kit', 'Dental_ki_', 'Makeup_mirror', 'In_room_safe', 'Umbrella', 'Newspaper_delivery', 'Magazine_delivery', 'DVD_player', 'Blu_ray_player', 'Streaming_services', 'In_room_movies', 'Satellite_TV', 'Cable_TV', 'High_speed_internet', 'Wi_Fi_access', 'Business_center_services', 'Printer', 'Fax_machine', 'Scanner', 'Laptop_rental', 'Gaming_console', 'Board_games', 'Books', 'In_room_massage', 'In_room_spa_treatments', 'In_room_yoga', 'Personal_trainer', 'Fitness_equipment', 'Baby_cot', 'Baby_sitting', 'Kids_amenities', 'PlayStation', 'Xbox', 'Nintendo_Switch', 'Pet_bed', 'Pet_food', 'Pet_sitting', 'Pet_grooming', 'Wheelchair', 'Accessible_bathroom', 'Accessible_shower', 'Hearing_accessible_services', 'Visual_accessible_services', 'Air_conditioning', 'Heating', 'Soundproofing', 'Room_fragrance', 'Butler_service', 'Personal_shopper', 'Dry_cleaning', 'Suit_pressing', 'Dietary_meals', 'Allergy_free_room', 'Connecting_rooms', 'Balcony', 'Terrace', 'City_view', 'Ocean_view', 'Garden_view', 'Mountain_view', 'River_view', 'Luggage_storage', 'Late_checkout', 'Early_check_in', 'Currency_exchange', 'Mail_service', 'Courier_service', 'Medical_assistance', 'Doctor_on_call', 'Pharmacy_service', 'Car_rental', 'Airport_transfer', 'Shuttle_service', 'Parking_service', 'Valet_parking', 'Bicycle_rental', 'Private_chauffeur', 'Tour_booking', 'Event_tickets', 'Concert_tickets', 'Restaurant_reservations', 'Ticket_printing', 'Translation_services', 'Interpreter_services', 'Courier_delivery', 'Flower_arrangement', 'Gift_wrapping', 'Special_occasion_setup', 'Birthday_cake', 'Anniversary_setup', 'Honeymoon_setup', 'Business_amenities', 'Meeting_room_booking', 'Conference_setup', 'Video_conferencing', 'Projector_rental', 'Whiteboard_rental', 'Flipchart_rental', 'Notepads_and_pens', 'Photocopying_service', 'Secretarial_service', 'Tea_and_coffee_making', 'Espresso_machine', 'Kettle', 'Microwave', 'Refrigerator', 'Oven', 'Stovetop', 'Dishwasher', 'Kitchen_utensils', 'Cookware', 'Tableware', 'Glassware', 'Bottled_water', 'Welcome_drink', 'Fresh_fruit', 'Chocolate', 'Champagne', 'Wine', 'Beer', 'Snack_basket', 'Grocery_shopping_service', 'Barbecue_equipment', 'Outdoor_furniture', 'Private_pool', 'Jacuzzi', 'Sauna', 'Steam_room', 'Fitness_room', 'Private_garden', 'Private_beach', 'Beach_towels', 'Sun_loungers', 'Beach_umbrella', 'Beach_bag', 'Beach_toys', 'Snorkeling_gear', 'Kayak', 'Paddleboard', 'Water_sports_equipment', 'Bicycle_storage', 'Ski_storage', 'Ski_passes', 'Ski_equipment_rental', 'Golf_equipment_rental', 'Tennis_equipment_rental', 'Yoga_mat', 'Meditation_cushion', 'First_aid_kit', 'Emergency_contact_numbers', 'Local_maps', 'Guidebooks', 'Tourist_information', 'Souvenir_shop', 'Art_gallery_access', 'Museum_tickets', 'Theater_tickets', 'Dance_show_tickets', 'Music_performance_tickets', 'Exhibition_tickets', 'Cooking_class_booking', 'Wine_tasting_booking', 'Food_tour_booking', 'Cultural_tour_booking', 'City_tour_booking', 'Adventure_tour_booking', 'Hiking_guide', 'Nature_guide', 'Personal_photographer', 'Photo_printing_service', 'Photo_album', 'Video_recording_service', 'Streaming_equipment', 'Podcast_recording_equipment', 'Blogging_equipment', 'Social_media_setup', 'Live_streaming_setup', 'Digital_concierge', 'Virtual_assistant', 'Room_control_tablet', 'Smart_lighting', 'Smart_thermostat', 'Voice_assistant', 'Smart_lock', 'Keyless_entry');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "amenities" TEXT[],
    "paymentFacilities" "PaymentFacilities" NOT NULL,
    "averageRating" TEXT NOT NULL DEFAULT '0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_location" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "coordinates" TEXT[],
    "postalCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotel_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nearby_attraction" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "AttractionCategory" NOT NULL,
    "coordinates" TEXT[],
    "distance" INTEGER NOT NULL,
    "travelTime" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "images" TEXT[],
    "website" TEXT NOT NULL,
    "openingHours" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nearby_attraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_policy" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "checkIn" TEXT NOT NULL,
    "checkOut" TEXT NOT NULL,
    "cancellationPolicy" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotel_policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "roomServices" "RoomServices"[],
    "type" "RoomType" NOT NULL,
    "pricePerNight" INTEGER NOT NULL,
    "breakfastIncluded" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_capacity" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_capacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bed_type" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bed_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cleanlness" INTEGER NOT NULL,
    "location" INTEGER NOT NULL,
    "amentities" INTEGER NOT NULL,
    "service" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_location_hotelId_key" ON "hotel_location"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_policy_hotelId_key" ON "hotel_policy"("hotelId");

-- CreateIndex
CREATE UNIQUE INDEX "room_capacity_roomId_key" ON "room_capacity"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_bookingId_key" ON "payment"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactionId_key" ON "payment"("transactionId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_location" ADD CONSTRAINT "hotel_location_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nearby_attraction" ADD CONSTRAINT "nearby_attraction_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_policy" ADD CONSTRAINT "hotel_policy_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_capacity" ADD CONSTRAINT "room_capacity_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bed_type" ADD CONSTRAINT "bed_type_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
