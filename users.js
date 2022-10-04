let users = [];

function userJoin(id,user,room){
    let User={id,user,room};
    users.push(User);
    return User;
}

function getCurrentUser(id){
    let user = users.find(i=>i.id===id);
    console.log(user)
    return user;
}

function leaveRoom(id){
    const index=users.findIndex(user=>user.id===id )
    return users.splice(index,1)[0];
}

function getRoomUsers(room)
{
    return users.filter(user=>user.room===room).map(i=>i.user)
}

module.exports={userJoin,getCurrentUser,leaveRoom,getRoomUsers}