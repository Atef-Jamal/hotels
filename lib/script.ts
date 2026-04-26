import prisma from "./prisma";

export function randomBoolean() {
  return Math.random() < 0.5;
}

export function randomOneTwoThree() {
  return Math.floor(Math.random() * 3) + 1;
}

export function randomRangeNumber() {
  return Math.floor(Math.random() * 700) + 251;
}

export function shuffleArray(arr: string[]) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const addRoomServices = async () => {
  const services = [
    "Room_cleaning",
    "Bed_making",
    "Towel_replacement",
    "Laundry_service",
    "Ironing_service",
    "Mini_bar_restocking",
    "Room_service_menu",
    "Washing_Machine",
    "In_room_dining",
    "Breakfast_in_bed",
    "Wake_up_call",
    "Concierge_service",
    "Turndown_service",
    "Pillow_menu",
    "Extra_blanket",
    "Extra_pillow",
    "Shoe_shining",
    "Sewing_kit",
    "Bathrobe",
    "Slippers",
    "Toiletries",
    "Hairdryer",
    "Shaving_kit",
    "Dental_ki_",
    "Makeup_mirror",
    "In_room_safe",
    "Umbrella",
    "Newspaper_delivery",
    "Magazine_delivery",
    "DVD_player",
    "Blu_ray_player",
    "Streaming_services",
    "In_room_movies",
    "Satellite_TV",
    "Cable_TV",
    "High_speed_internet",
    "Wi_Fi_access",
    "Business_center_services",
    "Printer",
    "Fax_machine",
    "Scanner",
    "Laptop_rental",
    "Gaming_console",
    "Board_games",
    "Books",
    "In_room_massage",
    "In_room_spa_treatments",
    "In_room_yoga",
    "Personal_trainer",
    "Fitness_equipment",
    "Baby_cot",
    "Baby_sitting",
    "Kids_amenities",
    "PlayStation",
    "Xbox",
    "Nintendo_Switch",
    "Pet_bed",
    "Pet_food",
    "Pet_sitting",
    "Pet_grooming",
    "Wheelchair",
    "Accessible_bathroom",
    "Accessible_shower",
    "Hearing_accessible_services",
    "Visual_accessible_services",
    "Air_conditioning",
    "Heating",
    "Soundproofing",
    "Room_fragrance",
    "Butler_service",
    "Personal_shopper",
    "Dry_cleaning",
    "Suit_pressing",
    "Dietary_meals",
    "Allergy_free_room",
    "Connecting_rooms",
    "Balcony",
    "Terrace",
    "City_view",
    "Ocean_view",
    "Garden_view",
    "Mountain_view",
    "River_view",
    "Luggage_storage",
    "Late_checkout",
    "Early_check_in",
    "Currency_exchange",
    "Mail_service",
    "Courier_service",
    "Medical_assistance",
    "Doctor_on_call",
    "Pharmacy_service",
    "Car_rental",
    "Airport_transfer",
    "Shuttle_service",
    "Parking_service",
    "Valet_parking",
    "Bicycle_rental",
    "Private_chauffeur",
    "Tour_booking",
    "Event_tickets",
    "Concert_tickets",
    "Restaurant_reservations",
    "Ticket_printing",
    "Translation_services",
    "Interpreter_services",
    "Courier_delivery",
    "Flower_arrangement",
    "Gift_wrapping",
    "Special_occasion_setup",
    "Birthday_cake",
    "Anniversary_setup",
    "Honeymoon_setup",
    "Business_amenities",
    "Meeting_room_booking",
    "Conference_setup",
    "Video_conferencing",
    "Projector_rental",
    "Whiteboard_rental",
    "Flipchart_rental",
    "Notepads_and_pens",
    "Photocopying_service",
    "Secretarial_service",
    "Tea_and_coffee_making",
    "Espresso_machine",
    "Kettle",
    "Microwave",
    "Refrigerator",
    "Oven",
    "Stovetop",
    "Dishwasher",
    "Kitchen_utensils",
    "Cookware",
    "Tableware",
    "Glassware",
    "Bottled_water",
    "Welcome_drink",
    "Fresh_fruit",
    "Chocolate",
    "Champagne",
    "Wine",
    "Beer",
    "Snack_basket",
    "Grocery_shopping_service",
    "Barbecue_equipment",
    "Outdoor_furniture",
    "Private_pool",
    "Jacuzzi",
    "Sauna",
    "Steam_room",
    "Fitness_room",
    "Private_garden",
    "Private_beach",
    "Beach_towels",
    "Sun_loungers",
    "Beach_umbrella",
    "Beach_bag",
    "Beach_toys",
    "Snorkeling_gear",
    "Kayak",
    "Paddleboard",
    "Water_sports_equipment",
    "Bicycle_storage",
    "Ski_storage",
    "Ski_passes",
    "Ski_equipment_rental",
    "Golf_equipment_rental",
    "Tennis_equipment_rental",
    "Yoga_mat",
    "Meditation_cushion",
    "First_aid_kit",
    "Emergency_contact_numbers",
    "Local_maps",
    "Guidebooks",
    "Tourist_information",
    "Souvenir_shop",
    "Art_gallery_access",
    "Museum_tickets",
    "Theater_tickets",
    "Dance_show_tickets",
    "Music_performance_tickets",
    "Exhibition_tickets",
    "Cooking_class_booking",
    "Wine_tasting_booking",
    "Food_tour_booking",
    "Cultural_tour_booking",
    "City_tour_booking",
    "Adventure_tour_booking",
    "Hiking_guide",
    "Nature_guide",
    "Personal_photographer",
    "Photo_printing_service",
    "Photo_album",
    "Video_recording_service",
    "Streaming_equipment",
    "Podcast_recording_equipment",
    "Blogging_equipment",
    "Social_media_setup",
    "Live_streaming_setup",
    "Digital_concierge",
    "Virtual_assistant",
    "Room_control_tablet",
    "Smart_lighting",
    "Smart_thermostat",
    "Voice_assistant",
    "Smart_lock",
    "Keyless_entry",
  ];

  const rooms = await prisma.room.findMany({
    select: {
      id: true,
    },
    orderBy: {
      id: "asc",
    },
    take: 1000,
    skip: 20000,
  });

  const roomIds = rooms.map((item) => item.id);
  const promises: any = [];

  roomIds.forEach((room, i) => {
    const shuffled = shuffleArray(services).slice(0, 20);
    promises.push(
      prisma.room.update({
        where: {
          id: room,
        },
        data: {
          roomServices: shuffled as any,
        },
      }),
    );
    console.log(`promise ${i} added`);
  });

  try {
    console.log("Operation Start", Math.random());
    await Promise.all(promises);
    console.log("Operation Success!");
  } catch (error) {
    console.log("Operation Failed!");
  } finally {
    console.log("Operation End");
  }
};

// export async function start() {
//     const hotels = await prisma.hotel.findMany({
//       select: {
//         id: true,
//       },
//       orderBy: {
//         id: "asc",
//       },
//     });
//     const hotelIds = hotels.map((hotel) => hotel.id);

//     hotelIds.forEach(async (hotelId, i) => {
//       const promises: any[] = [];

//       familyRoom.forEach((room, j) => {
//         const included = randomBoolean();
//         const price = randomNumberStandard();
//         const randomOneTowThree = randomOneTwoThree();

//         promises.push(
//           prisma.room.create({
//             data: {
//               breakfastIncluded: included,
//               description: room.description,
//               hotel: {
//                 connect: {
//                   id: hotelId,
//                 },
//               },
//               type: "Family_Room",
//               adults: 8,
//               children: randomOneTowThree,
//               pricePerNight: price,
//               beds: {
//                 create:
//                   randomOneTowThree === 1
//                     ? [
//                         {
//                           type: "King",
//                           count: 1,
//                         },
//                         {
//                           type: "Queen",
//                           count: 1,
//                         },
//                         {
//                           type: "Single",
//                           count: 3,
//                         },
//                       ]
//                     : randomOneTowThree === 2
//                       ? [
//                           {
//                             type: "Queen",
//                             count: 3,
//                           },
//                           {
//                             type: "Single",
//                             count: 2,
//                           },
//                         ]
//                       : [
//                           {
//                             type: "Queen",
//                             count: 2,
//                           },
//                           {
//                             type: "Single",
//                             count: 4,
//                           },
//                         ],
//               },
//             },
//           }),
//         );
//         console.log(`====Room ${j + 1} created ! =====`);
//       });

//       excutive.forEach((room, j) => {
//         const included = randomBoolean();
//         const price = randomNumberexcutive();
//         const randomOneTowThreeOrFour = randomOneTwoThreeOrFour();
//         const randomOneTowThree = randomOneTwoThree();

//         promises.push(
//           prisma.room.create({
//             data: {
//               breakfastIncluded: included,
//               description: room.description,
//               hotel: {
//                 connect: {
//                   id: hotelId,
//                 },
//               },
//               type: "Executive_Suite",
//               adults: 6,
//               children: randomOneTowThree,
//               pricePerNight: price,
//               beds: {
//                 create:
//                   randomOneTowThreeOrFour === 1
//                     ? [
//                         {
//                           type: "Queen",
//                           count: 1,
//                         },
//                         {
//                           type: "Single",
//                           count: 4,
//                         },
//                       ]
//                     : randomOneTowThreeOrFour === 2
//                       ? [
//                           {
//                             type: "King",
//                             count: 1,
//                           },
//                           {
//                             type: "Single",
//                             count: 3,
//                           },
//                         ]
//                       : randomOneTowThreeOrFour === 3
//                         ? [
//                             {
//                               type: "Single",
//                               count: 6,
//                             },
//                           ]
//                         : [
//                             {
//                               type: "Queen",
//                               count: 3,
//                             },
//                           ],
//               },
//             },
//           }),
//         );
//         console.log(`====Room ${j + 1} created ! =====`);
//       });

//       await Promise.all(promises);
//       console.log(`=============== Hotel ${i + 1} created ! ==============`);
//     });

//     console.log("Done !!");
//   }
