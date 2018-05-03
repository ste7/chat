import store from '../store'


export const namesOfFriends = (conversation_id) => {
    let me = store.getters.getMe.id;

    var conversations = store.getters.getConversations;

    let index = conversations.findIndex(c => c._id === conversation_id);

    if (conversations[index].friends.user_one.id === me) {
        return conversations[index].friends.user_two.name;
    } else {
        return conversations[index].friends.user_one.name;
    }
}


export const myMessage = (id) => {
    let me = store.getters.getMe.id;
    // let me = store.getters.getUser.id;

    if (me === id) {
        return true;
    } else {
        return false;
    }

    return 'My message';
}
