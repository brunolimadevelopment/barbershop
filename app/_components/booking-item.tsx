import { Prisma, Booking } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";


interface BookItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true,
        }
    }>
}

const BookingItem = ({ booking }: BookItemProps) => {
    const isBookingConfirmed = isFuture(booking.date);

    return ( 
        <Sheet>
            <SheetTrigger asChild>
                <Card className="min-w-full">
                    <CardContent className="py-0 flex px-0">
                        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5"> 
                            <Badge variant={
                                isBookingConfirmed ? "default" : "secondary"
                            } className="w-fit">{
                                isBookingConfirmed ? "Confirmado" : "Finalizado"
                            }</Badge>
                            <h2 className="font-bold">{booking.service.name}</h2>

                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={booking.barbershop.imageUrl} />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>

                                <h3>{booking.barbershop.name}</h3>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center flex-[1] border-l border-solid  border-secondary">
                            <p className="text-sm">{format(booking.date, "MMMM", {
                                locale: ptBR,
                            })}</p>
                            <p className="text-2xl">{format(booking.date, "dd")}</p>
                            <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>

            <SheetContent className="px-0">
                <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
                    <SheetTitle>
                        Informações da Reserva
                    </SheetTitle>
                </SheetHeader>

                <div className="px-5">
                    <div className="relative h-[180px] w-full mt-6">
                        <Image src="/barbershop-map.png" fill style={{ objectFit: "contain", }} alt={booking.barbershop.name} />

                        <div className="w-full absolute bottom-4 left-0 px-5">
                            <Card>
                                <CardContent className="p-3 flex gap-2">
                                    <Avatar>
                                        <AvatarImage src={booking.barbershop.imageUrl} />
                                    </Avatar>

                                    <div>
                                        <h2 className="font-bold">{booking.barbershop.name}</h2>
                                        <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                    </div>
                    <Badge variant={
                        isBookingConfirmed ? "default" : "secondary"
                    } className="w-fit mt-3 mb-6">{
                        isBookingConfirmed ? "Confirmado" : "Finalizado"
                    }</Badge>
                </div>
                
            </SheetContent>
        </Sheet>
     );
}
 
export default BookingItem;