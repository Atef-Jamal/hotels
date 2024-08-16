import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Calendar, SearchIcon, SendIcon, User } from "lucide-react";
import { Badge } from "./ui/badge";

const SearchBox = () => {
  return (
    <Card className="shadow-xl">
      <CardContent className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2">
        <div className="space-y-2 lg:space-x-2 lg:space-y-0 lg:flex lg:items-center lg:w-[60%]">
          <Dialog>
            <DialogTrigger className="w-full">
              <span className="font-[500] text-muted-foreground border w-full flex items-center justify-between py-2 px-4 rounded-sm truncate">
                <SearchIcon size={18} className="mr-2" /> Enter destination{" "}
                <SendIcon size={20} className="ml-auto" />
              </span>
            </DialogTrigger>
            <DialogContent className="h-full">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="w-full">
              <span className="font-[500] text-muted-foreground border w-full flex items-center justify-between py-2 px-4 rounded-sm truncate">
                <Calendar size={18} className="mr-2" /> Wed, Aug 14 - Thu, Aug
                15
                <Badge variant={"secondary"} className="ml-auto">
                  1 night
                </Badge>
              </span>
            </DialogTrigger>
            <DialogContent className="h-full">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-2 lg:space-x-2 lg:space-y-0 lg:flex lg:items-center lg:w-[30%]">
          <Dialog>
            <DialogTrigger className="w-full">
              <span className="font-[500] text-muted-foreground border w-full flex items-center gap-x-2 py-2 px-4 rounded-sm truncate">
                <User size={18} /> 1 Room 2 Adults 0 Children
              </span>
            </DialogTrigger>
            <DialogContent className="h-full">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="w-full lg:hidden">
              <span className="font-[500] text-muted-foreground border w-full flex items-center gap-x-2 py-2 px-4 rounded-sm truncate">
                <User size={18} /> Price, Guest rating, star rating
              </span>
            </DialogTrigger>
            <DialogContent className="h-full">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Button className="w-full sm:col-span-2 lg:col-span-1 lg:w-[10%]">
          Search
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchBox;
