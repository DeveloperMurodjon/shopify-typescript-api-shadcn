import { useEffect, useState } from "react";
import {
  ProductAPIMobileAccessories,
  ProductAPISmartphones,
} from "../service/api.service";
import { ProductI } from "../lib/types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const OurProducts = () => {
  const [accessories, setAccessories] = useState<ProductI[] | null>(null);
  const [smartphones, setSmartphones] = useState<ProductI[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      try {
        const [accessoriesData, smartphonesData] = await Promise.all([
          ProductAPIMobileAccessories.getAll(),
          ProductAPISmartphones.getAll(),
        ]);
        console.log("Accessories:", accessoriesData.products);
        console.log("Smartphones:", smartphonesData.products);
        setAccessories(accessoriesData.products);
        setSmartphones(smartphonesData.products);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="flex justify-between items-center">
        <h2 className="font-medium text-[40px] mb-7">Popular Products</h2>
        <Button
          variant={"ghost"}
          className=" flex text-[27px] cursor-pointer underline items-center pr-2.5"
        >
          Show more <ArrowRight />
        </Button>
      </div>
      {isLoading ? (
        <div>
          <DotLottieReact
            className="mx-auto w-60"
            src="/lottieLoader.lottie"
            loop
            autoplay
          />
        </div>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <div className="overflow-auto max-h-[800px]">
          <div className="space-y-[65px]">
            {/* smartphones */}
            <div className="grid  grid-flow-col auto-cols-max gap-[62px]">
              {smartphones?.map((smartphone) => (
                <div
                  key={smartphone.id}
                  className="flex bg-[#F9F9F9] cursor-pointer flex-col items-center w-[284px] h-[334px] p-[20px]  border rounded-md shadow-md"
                >
                  <div className="w-full h-[200px] overflow-hidden">
                    {smartphone.images?.[0] && (
                      <img
                        src={smartphone.images[0]}
                        alt={smartphone.title}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <h3 className="mt-10 font-medium text-[16px]  truncate text-center">
                    {smartphone.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {smartphone.discountPercentage && (
                      <p className="font-medium text-[#D75300] text-[20px]">
                        $
                        {(
                          smartphone.price -
                          (smartphone.price * smartphone.discountPercentage) /
                            100
                        ).toFixed(2)}
                      </p>
                    )}

                    <p className="text-[#898989] line-through text-[12px]">
                      {smartphone.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* accessories */}
            <div className="grid  grid-flow-col auto-cols-max gap-[62px]">
              {accessories?.map((accessorie) => (
                <div
                  key={accessorie.id}
                  className="flex bg-[#F9F9F9] cursor-pointer flex-col items-center w-[284px] h-[334px] p-[20px]  border rounded-md shadow-md"
                >
                  <div className="w-full h-[200px] overflow-hidden">
                    {accessorie.images?.[0] && (
                      <img
                        src={accessorie.images[0]}
                        alt={accessorie.title}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <h3 className="mt-10 font-medium text-[16px]  truncate text-center">
                    {accessorie.title}
                  </h3>
                  <div className="flex items-center gap-2 ">
                    {accessorie.discountPercentage && (
                      <p className="font-medium text-[#D75300] text-[20px]">
                        $
                        {(
                          accessorie.price -
                          (accessorie.price * accessorie.discountPercentage) /
                            100
                        ).toFixed(2)}
                      </p>
                    )}

                    <p className="text-[#898989] line-through text-[12px]">
                      {accessorie.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurProducts;
