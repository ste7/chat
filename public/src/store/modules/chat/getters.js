export const getConversations = (state) => {
    if (state.conversations !== null) {
        var items = state.conversations.sort(function(a,b){
            var dateA = new Date(a.updatedAt).getTime();
            var dateB = new Date(b.updatedAt).getTime();
            return dateA < dateB ? 1 : -1;
        });

        return items;
    }
}


export const getChat = (state) => {
    return state.chat;
}
