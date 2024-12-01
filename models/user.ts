import { IUserDoc } from "@/types/types";
import { Model, model, models, Schema } from "mongoose";

const userSchema: Schema<IUserDoc> = new Schema<IUserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  phone: { type: String },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUserDoc> =
  models.User || model<IUserDoc>("User", userSchema);

export default User;

// const DummyUsers = [
//   {
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "555-1234",
//   },
//   { name: "Bob Smith", email: "bob.smith@example.com", phone: "555-5678" },
//   {
//     name: "Carol Williams",
//     email: "carol.williams@example.com",
//     phone: "555-8765",
//   },
//   { name: "David Brown", email: "david.brown@example.com", phone: "555-4321" },
//   { name: "Eva Davis", email: "eva.davis@example.com", phone: "555-6789" },
//   {
//     name: "Frank Wilson",
//     email: "frank.wilson@example.com",
//     phone: "555-3456",
//   },
//   {
//     name: "Grace Martinez",
//     email: "grace.martinez@example.com",
//     phone: "555-7890",
//   },
//   {
//     name: "Hannah Moore",
//     email: "hannah.moore@example.com",
//     phone: "555-2345",
//   },
//   {
//     name: "Isaac Taylor",
//     email: "isaac.taylor@example.com",
//     phone: "555-3456",
//   },
//   {
//     name: "Jack Anderson",
//     email: "jack.anderson@example.com",
//     phone: "555-6543",
//   },
//   {
//     name: "Katherine Thomas",
//     email: "katherine.thomas@example.com",
//     phone: "555-7891",
//   },
//   {
//     name: "Liam Jackson",
//     email: "liam.jackson@example.com",
//     phone: "555-5671",
//   },
//   { name: "Mia Harris", email: "mia.harris@example.com", phone: "555-8901" },
//   { name: "Noah Martin", email: "noah.martin@example.com", phone: "555-3457" },
//   {
//     name: "Olivia Thompson",
//     email: "olivia.thompson@example.com",
//     phone: "555-1235",
//   },
//   {
//     name: "Paul Robinson",
//     email: "paul.robinson@example.com",
//     phone: "555-6780",
//   },
//   { name: "Quinn Clark", email: "quinn.clark@example.com", phone: "555-2346" },
//   {
//     name: "Rachel Lewis",
//     email: "rachel.lewis@example.com",
//     phone: "555-7892",
//   },
//   { name: "Sam Walker", email: "sam.walker@example.com", phone: "555-4567" },
//   { name: "Tina Allen", email: "tina.allen@example.com", phone: "555-8902" },
//   {
//     name: "Ursula Young",
//     email: "ursula.young@example.com",
//     phone: "555-3458",
//   },
//   { name: "Victor King", email: "victor.king@example.com", phone: "555-6781" },
//   {
//     name: "Wendy Wright",
//     email: "wendy.wright@example.com",
//     phone: "555-2347",
//   },
//   {
//     name: "Xander Scott",
//     email: "xander.scott@example.com",
//     phone: "555-7893",
//   },
//   { name: "Yara Green", email: "yara.green@example.com", phone: "555-4568" },
//   {
//     name: "Zachary Adams",
//     email: "zachary.adams@example.com",
//     phone: "555-8903",
//   },
//   { name: "Ava Nelson", email: "ava.nelson@example.com", phone: "555-6782" },
//   {
//     name: "Benjamin Carter",
//     email: "benjamin.carter@example.com",
//     phone: "555-2348",
//   },
//   {
//     name: "Chloe Mitchell",
//     email: "chloe.mitchell@example.com",
//     phone: "555-7894",
//   },
//   {
//     name: "Daniel Perez",
//     email: "daniel.perez@example.com",
//     phone: "555-4569",
//   },
//   {
//     name: "Ella Roberts",
//     email: "ella.roberts@example.com",
//     phone: "555-8904",
//   },
//   {
//     name: "Felix Morgan",
//     email: "felix.morgan@example.com",
//     phone: "555-6783",
//   },
//   {
//     name: "Georgia Bell",
//     email: "georgia.bell@example.com",
//     phone: "555-2349",
//   },
//   {
//     name: "Henry Murphy",
//     email: "henry.murphy@example.com",
//     phone: "555-7895",
//   },
//   { name: "Ivy Cooper", email: "ivy.cooper@example.com", phone: "555-4560" },
//   {
//     name: "Jacob Hughes",
//     email: "jacob.hughes@example.com",
//     phone: "555-8905",
//   },
//   {
//     name: "Kylie Powell",
//     email: "kylie.powell@example.com",
//     phone: "555-6784",
//   },
//   { name: "Leo Rivera", email: "leo.rivera@example.com", phone: "555-2340" },
//   {
//     name: "Maya Simmons",
//     email: "maya.simmons@example.com",
//     phone: "555-7896",
//   },
//   {
//     name: "Nathan Foster",
//     email: "nathan.foster@example.com",
//     phone: "555-4561",
//   },
//   {
//     name: "Olivia Richardson",
//     email: "olivia.richardson@example.com",
//     phone: "555-8906",
//   },
//   {
//     name: "Parker Murphy",
//     email: "parker.murphy@example.com",
//     phone: "555-6785",
//   },
//   { name: "Quinn Baker", email: "quinn.baker@example.com", phone: "555-2341" },
//   {
//     name: "Riley Jenkins",
//     email: "riley.jenkins@example.com",
//     phone: "555-7897",
//   },
//   { name: "Sophie Ross", email: "sophie.ross@example.com", phone: "555-4562" },
//   {
//     name: "Thomas Martinez",
//     email: "thomas.martinez@example.com",
//     phone: "555-8907",
//   },
//   { name: "Uma Davis", email: "uma.davis@example.com", phone: "555-6786" },
//   {
//     name: "Victor Collins",
//     email: "victor.collins@example.com",
//     phone: "555-2342",
//   },
//   {
//     name: "Willow Price",
//     email: "willow.price@example.com",
//     phone: "555-7898",
//   },
//   {
//     name: "Xavier Brooks",
//     email: "xavier.brooks@example.com",
//     phone: "555-4563",
//   },
//   {
//     name: "Yasmine Alexander",
//     email: "yasmine.alexander@example.com",
//     phone: "555-8908",
//   },
//   { name: "Zane Kelly", email: "zane.kelly@example.com", phone: "555-6787" },
//   {
//     name: "Aiden Sanders",
//     email: "aiden.sanders@example.com",
//     phone: "555-2343",
//   },
//   {
//     name: "Bella Walker",
//     email: "bella.walker@example.com",
//     phone: "555-7899",
//   },
//   {
//     name: "Cameron Long",
//     email: "cameron.long@example.com",
//     phone: "555-4564",
//   },
//   { name: "Diana Young", email: "diana.young@example.com", phone: "555-8909" },
//   { name: "Ethan Lee", email: "ethan.lee@example.com", phone: "555-6788" },
//   {
//     name: "Fiona Wright",
//     email: "fiona.wright@example.com",
//     phone: "555-2344",
//   },
//   { name: "George King", email: "george.king@example.com", phone: "555-7900" },
//   {
//     name: "Holly Harris",
//     email: "holly.harris@example.com",
//     phone: "555-4565",
//   },
//   { name: "Isaac Green", email: "isaac.green@example.com", phone: "555-8910" },
//   {
//     name: "Jasmine Adams",
//     email: "jasmine.adams@example.com",
//     phone: "555-6789",
//   },
//   {
//     name: "Kieran White",
//     email: "kieran.white@example.com",
//     phone: "555-2345",
//   },
//   { name: "Lila Carter", email: "lila.carter@example.com", phone: "555-7901" },
//   { name: "Mason Bell", email: "mason.bell@example.com", phone: "555-4566" },
//   {
//     name: "Nina Bennett",
//     email: "nina.bennett@example.com",
//     phone: "555-8911",
//   },
//   {
//     name: "Oscar Mitchell",
//     email: "oscar.mitchell@example.com",
//     phone: "555-6780",
//   },
//   {
//     name: "Penny Rivera",
//     email: "penny.rivera@example.com",
//     phone: "555-2346",
//   },
//   {
//     name: "Quentin Brooks",
//     email: "quentin.brooks@example.com",
//     phone: "555-7902",
//   },
//   {
//     name: "Rosa Johnson",
//     email: "rosa.johnson@example.com",
//     phone: "555-4567",
//   },
//   { name: "Sam Garcia", email: "sam.garcia@example.com", phone: "555-8912" },
//   { name: "Tina Clark", email: "tina.clark@example.com", phone: "555-6781" },
//   {
//     name: "Ulysses Davis",
//     email: "ulysses.davis@example.com",
//     phone: "555-2347",
//   },
//   {
//     name: "Victoria Allen",
//     email: "victoria.allen@example.com",
//     phone: "555-7903",
//   },
//   {
//     name: "William Turner",
//     email: "william.turner@example.com",
//     phone: "555-4568",
//   },
//   { name: "Xena Turner", email: "xena.turner@example.com", phone: "555-8913" },
//   {
//     name: "Yvonne Harris",
//     email: "yvonne.harris@example.com",
//     phone: "555-6782",
//   },
//   {
//     name: "Zachary Wilson",
//     email: "zachary.wilson@example.com",
//     phone: "555-2348",
//   },
//   {
//     name: "Amy Mitchell",
//     email: "amy.mitchell@example.com",
//     phone: "555-7904",
//   },
//   {
//     name: "Brian Taylor",
//     email: "brian.taylor@example.com",
//     phone: "555-4569",
//   },
//   {
//     name: "Caitlin Young",
//     email: "caitlin.young@example.com",
//     phone: "555-8914",
//   },
//   {
//     name: "Daniel Thompson",
//     email: "daniel.thompson@example.com",
//     phone: "555-6783",
//   },
//   { name: "Emily Lee", email: "emily.lee@example.com", phone: "555-2349" },
//   {
//     name: "Freddie Rogers",
//     email: "freddie.rogers@example.com",
//     phone: "555-7905",
//   },
//   { name: "Gina Kelly", email: "gina.kelly@example.com", phone: "555-4560" },
//   {
//     name: "Henry Parker",
//     email: "henry.parker@example.com",
//     phone: "555-8915",
//   },
//   { name: "Iris Evans", email: "iris.evans@example.com", phone: "555-6784" },
//   {
//     name: "Jackie Brooks",
//     email: "jackie.brooks@example.com",
//     phone: "555-2340",
//   },
//   {
//     name: "Kendall Morgan",
//     email: "kendall.morgan@example.com",
//     phone: "555-7906",
//   },
//   {
//     name: "Liam Johnson",
//     email: "liam.johnson@example.com",
//     phone: "555-4561",
//   },
//   {
//     name: "Maggie Campbell",
//     email: "maggie.campbell@example.com",
//     phone: "555-8916",
//   },
//   {
//     name: "Nate Mitchell",
//     email: "nate.mitchell@example.com",
//     phone: "555-6785",
//   },
//   {
//     name: "Olivia Brown",
//     email: "olivia.brown@example.com",
//     phone: "555-2341",
//   },
//   {
//     name: "Patrick Green",
//     email: "patrick.green@example.com",
//     phone: "555-7907",
//   },
//   {
//     name: "Quincy Wright",
//     email: "quincy.wright@example.com",
//     phone: "555-4562",
//   },
//   {
//     name: "Rachael Foster",
//     email: "rachael.foster@example.com",
//     phone: "555-8917",
//   },
//   { name: "Steve Adams", email: "steve.adams@example.com", phone: "555-6786" },
//   { name: "Tracy Lopez", email: "tracy.lopez@example.com", phone: "555-2342" },
//   {
//     name: "Ursula Adams",
//     email: "ursula.adams@example.com",
//     phone: "555-7908",
//   },
//   { name: "Vera Turner", email: "vera.turner@example.com", phone: "555-4563" },
//   { name: "Will Jordan", email: "will.jordan@example.com", phone: "555-8918" },
//   {
//     name: "Xander Cooper",
//     email: "xander.cooper@example.com",
//     phone: "555-6787",
//   },
//   { name: "Yara Davis", email: "yara.davis@example.com", phone: "555-2343" },
//   { name: "Zane Walker", email: "zane.walker@example.com", phone: "555-7909" },
// ];
