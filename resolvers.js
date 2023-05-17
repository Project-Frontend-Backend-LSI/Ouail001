const User = require('./user');

const resolvers = {
    Query: {
      users: async () => {//OK
          try {
            const allUsers = await User.find({});
            return allUsers;
          } catch (error) {
            console.log(error);
            return [];
          }
      },
      userById: async (_, { id }) => {//OK
          try {
            const user = await User.findById(id);
            return user;
          } catch (err) {
            throw new Error(`Failed to fetch user: ${err}`);
          }
        },
        userLogin: async (_, { username, password }) => {
          return User.findOne({ username: username, password: password });
        }
    },
    Mutation: {
      createUser: async (_, { username, email, password, country, phone, description }) => {
        // Check if a user with the same username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          throw new Error('User already exists');
        }
        // Create and save the new user
        const user = new User({ username, email, password, country, phone, description });
        return user.save();
      },
      updateUser: async (_, { id, username, email, password, country, phone, description }) => {//Ok
          try {
            const updatedUser = await User.findByIdAndUpdate(
              id,
              { username, email, password, country, phone, description },
              { new: true }
            );
            return updatedUser;
          } catch (err) {
            throw new Error(`Failed to update user: ${err}`);
          }
        }
        ,
      deleteUser: async (_, { id }) => {//OK
          try {
            const deletedUser = await User.findByIdAndRemove(id);
            return deletedUser;
          } catch (error) {
            throw new Error(`Failed to delete user: ${error}`);
          }
        },
    },
  };

module.exports = resolvers;