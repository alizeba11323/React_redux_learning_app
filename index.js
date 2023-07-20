const redux = require("redux");
const combineReducer = redux.combineReducers;
const ORDER_CAKE = "ORDER_CAKE";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const ORDER_ICECREAM = "ORDER_ICECREAM";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";
const OrderCake = (qty) => {
  return {
    type: ORDER_CAKE,
    payload: qty,
  };
};

const OrderIceCream = (qty) => {
  return {
    type: ORDER_ICECREAM,
    payload: qty,
  };
};
const RESTOCKIceCream = (qty) => {
  return {
    type: RESTOCK_ICECREAM,
    payload: qty,
  };
};

//reducer  function (state,action)
const intialState = {
  cake: 10,
};
const CakeReducer = (state = intialState, action) => {
  switch (action.type) {
    case ORDER_CAKE:
      return {
        cake: state.cake - action.payload,
      };
    case RESTOCK_CAKE:
      return {
        cake: state.cake + action.payload,
      };
    default:
      return state;
  }
};

const initialStateIceCream = {
  noOfIceCream: 20,
};

const IceCreamReducer = (state = initialStateIceCream, action) => {
  switch (action.type) {
    case ORDER_ICECREAM:
      return {
        noOfIceCream: state.noOfIceCream - action.payload,
      };
    case RESTOCK_ICECREAM:
      return {
        noOfIceCream: state.noOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

const store = redux.createStore(
  combineReducer({
    cake: CakeReducer,
    icecream: IceCreamReducer,
  })
);

const unsubscribe = store.subscribe(() => {
  const cake = store.getState();
  console.log(cake.cake.cake);
});
store.dispatch(OrderCake(3));
store.dispatch({ type: ORDER_CAKE, payload: 2 });
store.dispatch({ type: RESTOCK_CAKE, payload: 50 });
store.dispatch(OrderIceCream(10));
store.dispatch(RESTOCKIceCream(50));
unsubscribe();
