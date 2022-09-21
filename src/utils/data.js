export const userQuery = (userId) => {
    console.log(userId)
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
}