import { assert } from "chai";
import {
  encryptPassword,
  isValidPassword,
} from "./../../api/controllers/Auth/helper";

const test = () => {
  describe(".encryptPassword(), .isValidPassword()", () => {
    it("should return false if we fail to verify hash", async () => {
      const isValid = await isValidPassword("password", "HASH");
      assert.isNotTrue(isValid);
    });
    it("should return true if we successfully verify hash", async () => {
      const encryptedMessage = await encryptPassword("HelloWorld");
      const isValid = await isValidPassword("HelloWorld", encryptedMessage);
      assert.isTrue(isValid);
    });
  });
};

export default { test };
