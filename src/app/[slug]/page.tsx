import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImgUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-xl font-semibold">Seja Bem vindo</h3>
        <p className="opacity-55">{restaurant.description}</p>
      </div>
      <div className="grid grid-cols-2 pt-14">
        <ConsumptionMethodOption
          buttonText="comer aqui"
          imgAlt="comer aqui"
          imgUrl="/dine-in.png"
          option="DINE_IN"
          slug={restaurant.slug}
        />
        <ConsumptionMethodOption
          buttonText="para levar"
          imgAlt="para levar"
          imgUrl="/take-away.png"
          option="TAKEAWAY"
          slug={restaurant.slug}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
