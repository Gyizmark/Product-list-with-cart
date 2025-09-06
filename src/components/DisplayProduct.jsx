import React from "react";
import { icon } from "./icons";

const DisplayProduct = ({ products, setProducts, setShowDialog }) => {
  const deleteItem = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="relative">
      <div className="bg-white max-w-full px-8 py-4">
        <h1 className="text-red text-2xl font-bold">
          Your cart <span>({products.length})</span>
        </h1>

        {products.length === 0 ? (
          <div className="flex items-center flex-col px-4">
            <img src={icon.emptyCart.src} alt={icon.emptyCart.alt} />
            <p>Your added items will appear here</p>
          </div>
        ) : (
          <>
            {products.map((item) => (
              <div key={item.id} className="mt-4">
                <h1 className="font-bold">{item.name}</h1>
                <div className="flex justify-between items-center">
                  <p className="flex gap-4">
                    <span>{item.qty}x</span>
                    <span>@ ${item.price.toFixed(2)}</span>
                    <span>${(item.qty * item.price).toFixed(2)}</span>
                  </p>
                  <button onClick={() => deleteItem(item.id)}>
                    <img
                      className="px-2 py-2 border-2 rounded-full"
                      src={icon.delete.src}
                      alt={icon.delete.alt}
                    />
                  </button>
                </div>
                <hr className="mt-2" />
              </div>
            ))}

            <p className="flex justify-between mt-2">
              <span>Order Total</span>
              <span className="font-bold text-xl">
                ${products.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2)}
              </span>
            </p>

            <p className="bg-rose-100 rounded-lg py-3 mt-4 px-4">
              <img className="inline mr-1" src={icon.carbon.src} alt={icon.carbon.alt} />
              This is a <span className="font-bold">carbon-neutral</span> delivery
            </p>

            <button
              className="bg-red text-white w-full py-2 rounded-full my-6"
              onClick={() => setShowDialog(true)}
            >
              Confirm Order
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default DisplayProduct;
