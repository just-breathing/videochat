import action from "./actions"
let lastId=0;
export default function reducer(state=[],action)
{
    switch(action.type)
    {
        case "bugAdded": return [...state,{
            id:++lastId,
            resolved:false,
            description:action.payload.description
        }];

        case "bugRemoved": return state.filter(item=>item.id!==action.payload.id);

        default :    return state;

    }

}