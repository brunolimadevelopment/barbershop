import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";


const BookingsPage = async () => {
    // recupera a sessão do usuário (ver se ele está logado ou não)
    const session = await getServerSession(authOptions)

    // se ele não estiver logado, redireciona para a página de login
    if(!session?.user) {
        return redirect("/");
    }

    // pega os agendamentos confirmados e finalizados do usuário
    // 2 Promise paralelamente - fica mais rápido
    const [confirmedBookings, fineshidBookings] = await Promise.all([
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date(),
                }
            },
            include: {
                service: true,
                barbershop: true,  
            }
        }),
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date(),
                }
            },
            include: {
                service: true,
                barbershop: true,  
            }
        })
    ])
    // fazer o filter com o date-ns via js consome mais memoria.
    //const confirmedBookings = bookings.filter(booking => isFuture(booking.date))
    //const finishedBookings = bookings.filter(booking => isPast(booking.date))
    

    return ( 
        <>
            <Header />
            <div className="px-5 py-6">
                <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

                {confirmedBookings.length > 0 && (
                    <>
                        <h2 className="text-gray-400 uppercase font-bold text-sm mb-3">Confirmados</h2>
                        <div className="flex flex-col gap-3">
                            {confirmedBookings.map(booking =>(
                                <BookingItem key={booking.id} booking={booking} />
                            ))}
                        </div>
                    </>
                )}                

                

                {fineshidBookings.length > 0 && (
                    <>
                        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">Finalizados</h2>
                        <div className="flex flex-col gap-3">
                            {fineshidBookings.map(booking =>(
                                <BookingItem key={booking.id} booking={booking} />
                            ))}
                        </div>
                    </>
                )}

                
            </div>
        </>
     );
}
 
export default BookingsPage;