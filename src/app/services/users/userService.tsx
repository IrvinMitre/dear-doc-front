import axios from "axios";
import bcrypt from "bcryptjs";

export class UserService {
  async login(name: string, password: string) {
    const passwordCryp = await bcrypt.hashSync(
      password,
      Number(`${process.env.SALT_ROUNDS || 10}`)
    );
    const response = await axios.post("http://localhost:8002/v0/users/login", {
      name,
      password,
    });
    localStorage.setItem("jwt", response.data.jwt);
    localStorage.setItem("refresh_jwt", response.data.refresh_jwt);
  }
}
