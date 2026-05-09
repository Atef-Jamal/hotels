// import BookNewView from "@/components/BookNewView";
// import Discount from "@/models/discount";
// import Room from "@/models/room";

// export default async function BookNew({ params }: any) {
//   const roomId = params.roomId;

//   const roomResponse = await Room.findById(roomId);
//   if (!roomResponse) throw new Error("room not found");

//   const discount = await Discount.exists({
//     hotel: roomResponse.hotel,
//     expiredAt: { $gt: new Date() },
//     type: "promo-code",
//   });

//   let discountId = null;

//   if (discount) discountId = JSON.parse(JSON.stringify(discount._id));

//   const room = JSON.parse(JSON.stringify(roomResponse));

//   return <BookNewView room={room} discountId={discountId} />;
// }
