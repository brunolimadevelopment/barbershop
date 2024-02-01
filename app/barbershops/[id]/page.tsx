import Image from "next/image";
import { db } from "@/_lib/prisma";
import { Button } from "@/_components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";

interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    }
}
// params: é o [id] da pasta barbershops
const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPageProps) => {
    if(!params.id) {
        // TO DO redirecionar para home page
        return null;
    } 

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        }
    })

    // Se não existir nenhuma barbearia, retorne null
    if(!barbershop) {
        // TO DO redirecionar para home page
        return null;
    }

    return (  
        <div>
            <div className="h-[250px] w-full relative">
                <Button className="z-50 absolute top-4 left-4" variant="outline" size="icon">
                    <ChevronLeftIcon />
                </Button>
                <Button className="z-50 absolute top-4 right-4" variant="outline" size="icon">
                    <MenuIcon />
                </Button>
                <Image src={barbershop.imageUrl} fill alt={barbershop.name} style={{ objectFit: "cover", }} className="opacity-75"/>
            </div>

            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold">{barbershop.name}</h1>
                <div className="flex items-center gap-1 mt-2">
                    <MapPinIcon className="stroke-primary" size={18} />
                    <p className="text-sm">{barbershop.address}</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <StarIcon className="stroke-primary" size={18} />
                    <p className="text-sm">5,0 (899 avaliações)</p>
                </div>
            </div>
        </div>
    );
}
 
export default BarbershopDetailsPage;