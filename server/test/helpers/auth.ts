import hashVerifyPassword from "./auth.hash.verify.password";

const test = () => {
  describe("Auth", () => {
    hashVerifyPassword.test();
  });
};

export default { test };
