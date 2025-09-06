import React from "react";
import { icon } from "./icons";

export const DisplayModel = ({ show, onClose,setProducts, products }) => {
  if (!show) return null;

  const orderTotal = products.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const  deleteItem = (id) =>{
    
      setProducts((prev) => prev.filter((item) => item.id !== id));

  
  }

  return (
    <dialog
      open={show}
      className="absolute left-1/2 -translate-x-1/2 top-1/4 transition-all duration-300  bg-white z-60 shadow-2xl px-6 py-8 w-11/12 sm:w-2/6 rounded-lg"
    >
      <div>
        <img src={icon.order.src} className="w-8 mb-2" alt={icon.order.alt} />
        <h1 className="font-bold text-2xl">Order Confirmed</h1>
        <p className="text-rose-400">We hope you enjoy your food!</p>
      </div>

      <div className="mt-6">
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

        <div className="flex justify-between mt-4 mb-4 bg-rose-100 py-2 px-4 rounded-lg">
          <span>Order Total</span>
          <span className="font-bold text-xl">${orderTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="bg-red hover:bg-rose-900 text-center py-2 w-full rounded-full text-white mt-6"
      >
        Start New Order
      </button>
    </dialog>
  );
};
