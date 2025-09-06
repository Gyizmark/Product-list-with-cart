import React, { useState } from "react";
import CartIcon from "./icons/icon-add-to-cart.svg";
import addCart from "./icons/icon-increment-quantity.svg";
import removeCart from "./icons/icon-decrement-quantity.svg";
import data from "./data.json";
import DisplayProduct from "./DisplayProduct";
import { DisplayModel } from "./DisplayModel";

function ProductCard() {
  const [products, setProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const resetCart = () => setProducts([]);


  const addToCart = (item) => {
    setProducts((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      return existing
        ? prev.map((p) =>
            p.id === item.id ? { ...p, qty: p.qty + 1 } : p
          )
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const decreaseQty = (id) => {
    setProducts((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };


  return (
    <section className="flex flex-col sm:flex-row px-4 py-4 sm:px-24 sm:py-8 lg:px-24 lg:py-8 lg:flex-row justify-center gap-8">
      <div>
        <h1 className="font-bold text-2xl mb-4">Desserts</h1>

        <div className="gap-4 grid grid-cols-1  sm:grid-cols-3 lg:grid-cols-3">
          {data.map((card) => {
            const cartItem = products.find((p) => p.id === card.id);

            return (
              <div key={card.id} className="shadow-sm max-w-full w-full sm:w-[250px] lg:w-[280px] mb-8 rounded-lg">
                <picture>
                  <source media="(min-width: 1024px)" srcSet={card.image.desktop} />
                  <source media="(min-width: 768px)" srcSet={card.image.tablet} />
                  <img
                    className="rounded-lg w-full bg-no-repeat bg-cover"
                    src={card.image.thumbnail ?? card.image.mobile}
                    alt={card.name}
                  />
                </picture>

                <div className="mx-2 relative">
                  {!cartItem ? (
                    <button
                      className="bg-white border-2 border-rose-100 w-2/3 absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full px-2 py-2"
                      onClick={() => addToCart(card)}
                    >
                      <img className="inline mr-2" src={CartIcon} alt="add to cart" />
                      Add to cart
                    </button>
                  ) : (
                    <div className="flex justify-between items-center bg-red text-white w-2/3 absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full px-2 py-2">
                      <button onClick={() => decreaseQty(card.id)}>
                        <img className="py-2 px-2 h-8 w-8 border-2 rounded-full" src={removeCart} alt="remove" />
                      </button>
                      <span>{cartItem.qty}</span>
                      <button onClick={() => addToCart(card)}>
                        <img className="py-2 px-2 border-2 rounded-full" src={addCart} alt="add" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <h1>{card.category}</h1>
                  <p className="text-lg font-bold">{card.name}</p>
                  <p>${card.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <DisplayProduct
        products={products}
        setProducts={setProducts}
        setShowDialog={setShowDialog}
      />

      <DisplayModel
        show={showDialog}
        onClose={() => {
          setShowDialog(false);
          resetCart();
        
        }}
        products={products}
        setProducts={setProducts}
      />
    </section>
  );
}

export default ProductCard;
