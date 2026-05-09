import HotelSliderCard from "@/components/HotelSliderCard";
import SearchBox from "@/components/SearchBox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <section className="relative flex-1 bg-purple-200">
      <div className="absolute top-0 h-60 w-full bg-linear-to-b from-[#623af3] via-[#623af3d2] to-purple-200"></div>
      <div className="relative mx-auto max-w-300 space-y-12">
        <div className="mx-2 overflow-hidden py-3 md:py-7">
          <h1 className="mx-auto mb-5 max-w-xl text-center text-lg font-medium text-[#f5efef]">
            Effortlessly book your perfect stay with our intuitive hotel booking platform.{" "}
            <span className="hidden sm:inline">
              offering seamless access to the best accommodations worldwide
            </span>
          </h1>
          <SearchBox />
        </div>
        <div className="ml-4 lg:ml-8">
          <h1 className="my-2 text-xl font-semibold">Popular 5-Star Hotels</h1>
          <div className="scrollbar-none space-x-2 overflow-x-auto rounded-s-xl bg-white px-2 pt-2 pb-1 whitespace-nowrap">
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
          </div>
        </div>
        <div className="ml-4 lg:ml-8">
          <h1 className="my-2 text-xl font-semibold">Popular 5-Star Hotels</h1>
          <div className="scrollbar-none space-x-2 overflow-x-auto rounded-s-xl bg-white px-2 pt-2 pb-1 whitespace-nowrap">
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
            <HotelSliderCard />
          </div>
        </div>
        <Card className="mx-2">
          <CardHeader className="p-2 sm:p-4">
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 font-medium sm:py-4">
                  How do I book a hotel on Trip.com?
                </AccordionTrigger>
                <AccordionContent>
                  To book a hotel on Trip.com, simply enter your destination, travel dates, and the number of
                  guests on the page. Then, browse through the available hotels and select the one you want to
                  book. Follow the prompts to enter your payment information and complete the booking.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 font-medium sm:py-4">
                  How to get cheap hotels on Trip.com?
                </AccordionTrigger>
                <AccordionContent>
                  There are several ways to discover affordable hotels on Trip.com. You can narrow down your
                  search results by filtering hotels according to your preferred price range, or you can sort
                  the results by price to view the least expensive options first.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 font-medium sm:py-4">
                  Where can I find hotel deals on Trip.com?
                </AccordionTrigger>
                <AccordionContent>
                  Trip.com offers a diverse selection of hotel deals and promotions that are available
                  throughout the year. You can easily find these special offers on our deals page. Moreover,
                  if you are a member of our loyalty program, you can log in to your account and discover
                  exclusive discounted rates at hotel list pages.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 font-medium sm:py-4">
                  What is the way to get lower prices at hotels?
                </AccordionTrigger>
                <AccordionContent>
                  Sometimes booking hotels in midweek is cheaper, but it also depends on the season.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 font-medium sm:py-4">
                  How many hotels are listed in Hotels com?
                </AccordionTrigger>
                <AccordionContent>
                  There are over 5000000 hotels in more than 230 countries or regions on Hotels com Do not
                  know which hotel to book? Browse the site to get ideas!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 font-medium sm:py-4">
                  Can I cancel or change my hotel reservation on Trip.com?
                </AccordionTrigger>
                <AccordionContent>
                  It depends on the hotel policy and cancellation date. Kindly check the policy section of
                  related hotel pages. To cancel or change your reservation, log in to your Hotels com account
                  go to My Bookings and follow the instructions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-2 font-medium sm:py-4">
                  How do I contact trip.com customer service?
                </AccordionTrigger>
                <AccordionContent>
                  You can contact Hotels com 24/7 customer service by visiting the Hotels com help center and
                  submitting a support request. You can also contact them by phone or chat depending on your
                  location.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
