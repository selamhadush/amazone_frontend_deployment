import { Type } from "./action.type";
import React, { useReducer } from "react";
export const initialState = {
  basket: [],
  user: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      //check if the item exist
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        // If the item doesn't exi t, add it with an initial amount of 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        // If the item exists, update the amount
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );

        return {
          ...state,
          basket: updatedBasket,
        };
      }
    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // Decrease the amount by 1 if it's greater than 1
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // If amount is 1, remove the item from the basket
          newBasket.splice(index, 1);
        }
      }
      return {
        ...state,
        basket: newBasket,
      };
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

//const [state, dispatch] = useReducer(reducer, initialState);
