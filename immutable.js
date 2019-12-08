import { fromJS, Map, List } from 'immutable';

const initialState = Map({
    items: List(),
    item: Map({
        pending: true,
    }),
});

// const initialState = fromJS({
//   items: [],
//   item: {
//       pending: true,
//   },
// });

