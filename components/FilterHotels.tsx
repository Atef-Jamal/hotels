"use client";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import testImage from "@/public/gamePhoto-43.jpg";
import RcSlider from "rc-slider";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/actions/actions";
import { Button } from "./ui/button";
import { useSearchContext } from "@/context/searchProvider";
import { BedTypeEnum, PaymentFacilities, RoomServices } from "@/app/generated/prisma/enums";
import { useState } from "react";
import "rc-slider/assets/index.css";

type IResetFiltersTypes =
  | "Price"
  | "Popular_Filters"
  | "Average_Rating"
  | "Payment_Facilities"
  | "Room_Facilities_Services"
  | "Bed_Types";

const roomServicesList: RoomServices[] = [
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

const FilterHotels = () => {
  const { searchData, setSearchData } = useSearchContext();

  const [roomServicesPage, setRoomServicesPage] = useState(1);
  const roomServicesPerPage = 10;
  const skipRoomServices = (roomServicesPage - 1) * roomServicesPerPage;

  const priceRanges = [
    { label: "Under 60", min: 0, max: 60 },
    { label: "60 - 150", min: 60, max: 150 },
    { label: "150 - 200", min: 150, max: 200 },
    { label: "200 - 300", min: 200, max: 300 },
    { label: "300 - 400", min: 300, max: 400 },
    { label: "400 - 500", min: 400, max: 500 },
  ];

  const placesChangeHandler = (value: string) => {
    if (searchData.city) {
      return setSearchData((prev) => ({ ...prev, address: value }));
    }
    if (searchData.country) {
      return setSearchData((prev) => ({ ...prev, city: value, address: "" }));
    }
    return setSearchData((prev) => ({ ...prev, country: value, city: "", address: "" }));
  };

  const handleRoomServiceChange = (service: RoomServices) => {
    return setSearchData((prev) => {
      const exists = prev.roomServices?.includes(service);
      if (exists) {
        let filteredServices = prev.roomServices?.filter((i) => i !== service) || null;
        if (filteredServices?.length === 0) {
          filteredServices = null;
        }
        return {
          ...prev,
          roomServices: filteredServices,
        };
      }
      return {
        ...prev,
        roomServices: [...(prev.roomServices || []), service],
      };
    });
  };

  const {
    data: places,
    status,
    error,
  } = useQuery({
    queryKey: ["hotels-list-filters-places", { city: searchData.city, country: searchData.country }],
    queryFn: () => getPlaces({ city: searchData.city, country: searchData.country }),
    staleTime: 1000 * 60 * 60,
  });

  const resetFilters = (type: IResetFiltersTypes) => {
    switch (type) {
      case "Price":
        setSearchData((prev) => ({ ...prev, minPrice: 0, maxPrice: 700 }));
        break;
      case "Bed_Types":
        setSearchData((prev) => ({ ...prev, bedType: null }));
        break;
      case "Popular_Filters":
        setSearchData((prev) => ({ ...prev, breakfastIncluded: null, cancellationPolicy: null }));
        break;
      case "Room_Facilities_Services":
        setSearchData((prev) => ({ ...prev, roomServices: null }));
        break;
      case "Average_Rating":
        setSearchData((prev) => ({ ...prev, averageRating: null }));
        break;
      case "Payment_Facilities":
        setSearchData((prev) => ({ ...prev, paymentFacilities: null }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-5 max-sm:px-2">
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <p className="font-bold">Price Range</p>
          <Button
            onClick={() => resetFilters("Price")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-5 text-blue-700">
            <span className="font-medium">SAR {searchData.minPrice}</span>
            <span className="h-0.5 w-8 bg-blue-700"></span>
            <span className="font-medium">SAR {searchData.maxPrice}</span>
          </div>
          <RcSlider
            range
            min={0}
            max={500}
            step={1}
            value={[searchData.minPrice, searchData.maxPrice]}
            onChange={(value) => {
              if (Array.isArray(value)) {
                setSearchData((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
              }
            }}
            styles={{
              track: { background: "blue" },
              handle: { background: "blue" },
            }}
          />
          <div className="grid grid-cols-2 gap-x-1 gap-y-2">
            {priceRanges.map((range) => (
              <Button
                key={range.max}
                onClick={() => {
                  setSearchData((prev) => ({ ...prev, minPrice: range.min, maxPrice: range.max }));
                }}
                size={"sm"}
                className="text-blue-700"
                variant={"secondary"}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Popular Filters</h1>
          <Button
            onClick={() => resetFilters("Popular_Filters")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>
        <div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              id="Breakfast_Included"
              checked={searchData.breakfastIncluded === true}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setSearchData((prev) => ({ ...prev, breakfastIncluded: true }));
                } else {
                  setSearchData((prev) => ({ ...prev, breakfastIncluded: false }));
                }
              }}
            />
            <label
              htmlFor="Breakfast_Included"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Breakfast Included
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox
              id="Free_Cancellation"
              checked={searchData.cancellationPolicy === true}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setSearchData((prev) => ({ ...prev, cancellationPolicy: true }));
                } else {
                  setSearchData((prev) => ({ ...prev, cancellationPolicy: false }));
                }
              }}
            />
            <label
              htmlFor="Free_Cancellation"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Free Cancellation
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="Instant_Confiremations" />
            <label
              htmlFor="Instant_Confiremations"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Instant Confiremations
            </label>
          </div>
          <div className="flex items-center space-x-2 p-2">
            <Checkbox id="Accept_terms_and_conditions" />
            <label
              htmlFor="Accept_terms_and_conditions"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Average Rating</h1>
          <Button
            onClick={() => resetFilters("Average_Rating")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>

        <div className="flex items-center justify-between">
          {[...Array(4).keys()].map((i) => (
            <Badge
              key={i}
              onClick={() => {
                if (searchData.averageRating === i + 2) {
                  return setSearchData((prev) => ({ ...prev, averageRating: null }));
                }
                setSearchData((prev) => ({ ...prev, averageRating: i + 2 }));
              }}
              variant={"secondary"}
              className="flex items-center justify-center gap-x-2 px-2 py-1"
            >
              {i + 2}
              <Star
                fill={searchData.averageRating && searchData.averageRating >= i + 2 ? "blue" : "white"}
                size={18}
              />
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Bed Types</h1>
          <Button
            onClick={() => resetFilters("Bed_Types")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>

        <RadioGroup
          value={searchData.bedType}
          onValueChange={(value: BedTypeEnum) => {
            console.log(value);
            setSearchData((prev) => ({ ...prev, bedType: value }));
          }}
          className="pl-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Single" id="Single" />
            <Label htmlFor="Single"> Single Bed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Double" id="Double" />
            <Label htmlFor="Double"> Double Bed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Twin" id="Twin" />
            <Label htmlFor="Twin"> Twin Bed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Queen" id="Queen" />
            <Label htmlFor="Queen"> Queen Bed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="King" id="King" />
            <Label htmlFor="King"> King Bed</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3 border-b pb-4">
        <h1 className="font-bold">Locations</h1>
        {status === "error" && <div className="text-center text-sm text-red-600">{error.message}</div>}
        {status === "pending" && <div className="text-center text-sm text-blue-600">Loading places...</div>}
        {status === "success" && places.length === 0 && (
          <div className="text-center text-blue-600">No places found</div>
        )}
        {status === "success" && (
          <RadioGroup onValueChange={placesChangeHandler} className="pl-2">
            {places?.map((place, i) => (
              <div key={i} className="flex space-x-2">
                <RadioGroupItem
                  checked={
                    searchData.city === place || searchData.country === place || searchData.address === place
                  }
                  value={place}
                  id={place}
                />
                <Label htmlFor={place}>{place}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Payment Facilities</h1>
          <Button
            onClick={() => resetFilters("Payment_Facilities")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>

        <RadioGroup
          defaultValue={searchData.paymentFacilities || undefined}
          onValueChange={(value: PaymentFacilities) => {
            setSearchData((prev) => ({ ...prev, paymentFacilities: value }));
          }}
          className="pl-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Prepay_Online" id="Prepay_Online" />
            <Label htmlFor="Prepay_Online">Prepay Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Pay_At_Hotel" id="Pay_At_Hotel" />
            <Label htmlFor="Pay_At_Hotel">Pay at Hotel</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-3 pb-4 sm:border-b">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Room Facilities & Services</h1>
          <Button
            onClick={() => resetFilters("Room_Facilities_Services")}
            size={"sm"}
            variant={"secondary"}
            className={"text-blue-600"}
          >
            Reset
          </Button>
        </div>

        <div>
          {roomServicesList
            .map((service) => (
              <div key={service} className="flex items-center space-x-2 p-2">
                <Checkbox
                  // checked={searchData.roomServices?.includes(service)}
                  checked={(searchData.roomServices ?? []).includes(service)}
                  onCheckedChange={() => handleRoomServiceChange(service)}
                  id={service}
                />
                <label
                  htmlFor={service}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {service.replace(/_/g, " ")}
                </label>
              </div>
            ))
            .slice(0, skipRoomServices + roomServicesPerPage)}
          <Button
            onClick={() => setRoomServicesPage((prev) => prev + 1)}
            variant={"outline"}
            size={"sm"}
            className="mx-auto mt-2"
          >
            Load more
          </Button>
        </div>
      </div>
      <div className="space-y-3 border-b pb-4 max-sm:hidden">
        <h1 className="font-bold">Recently Viewed</h1>
        <div className="flex">
          <Image src={testImage} alt="" className="h-full w-[40%] object-cover" />
          <div className="flex-1 px-2">
            <h1 className="text-sm font-bold">Ramcaly Dubai Hotel</h1>
            <div className="flex items-center gap-x-2">
              <span className="rounded-s-lg rounded-b-lg bg-blue-900 p-0.75 text-[13px] font-medium text-white">
                4.2/5
              </span>
              <p className="text-muted-foreground text-xs leading-4 font-bold">Very good | 142 Review</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHotels;
