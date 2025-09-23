// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const normalizeOptions = (options = {}) => {
  // retourne une string stable pour comparaison (tri des clés)
  const keys = Object.keys(options).sort();
  const obj = {};
  keys.forEach((k) => (obj[k] = options[k]));
  return JSON.stringify(obj);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const findIndex = (productId, variantKey) =>
    cart.findIndex((it) => it.productId === productId && it.variantKey === variantKey);

  const addToCart = ({ product, variantIndex = 0, quantity = 1 }) => {
    if (!product) return;
    const variant = product.variantes?.[variantIndex];
    if (!variant) return;

    const options = variant.options || {};
    const variantKey = normalizeOptions(options);
    const productId = product.id;

    const prix = Number(variant.prix_promo || variant.prix || 0);
    const image = variant.images?.principale || variant.images?.image_1 || variant.images?.image_2 || null;

    setCart((prev) => {
      const idx = prev.findIndex((it) => it.productId === productId && it.variantKey === variantKey);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantite = Math.max(1, Number(copy[idx].quantite) + Number(quantity));
        return copy;
      } else {
        return [
          ...prev,
          {
            productId,
            variantKey,
            nom: product.nom,
            options,
            prix,
            image,
            quantite: Number(quantity),
          },
        ];
      }
    });
  };

  const updateQuantity = (productId, variantKey, newQty) => {
    setCart((prev) =>
      prev.map((it) =>
        it.productId === productId && it.variantKey === variantKey ? { ...it, quantite: Math.max(0, Number(newQty)) } : it
      ).filter(it => it.quantite > 0)
    );
  };

  const removeFromCart = (productId, variantKey) => {
    setCart((prev) => prev.filter((it) => !(it.productId === productId && it.variantKey === variantKey)));
  };

  const clearCart = () => setCart([]);

  const itemCount = cart.reduce((acc, it) => acc + Number(it.quantite || 0), 0);
  const total = cart.reduce((acc, it) => acc + (Number(it.prix || 0) * Number(it.quantite || 0)), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
