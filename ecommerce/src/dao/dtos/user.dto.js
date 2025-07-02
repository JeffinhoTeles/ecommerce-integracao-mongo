class UserDTO {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.role = user.role || "user";
  }
}

module.exports = UserDTO;
