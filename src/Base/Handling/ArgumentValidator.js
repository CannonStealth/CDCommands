const { Message } = require("discord.js");
const { CDClient } = require("../CDClient");

module.exports = class ArgumentValidator {
  /**
   * @private
   * @type {({ message, args, client, prefix, language }: { message: Message; args: string[]; client: CDClient, prefix: string; language: keyof import("./Languages.json") }) => boolean | string | Promise<boolean | string>}
   */
  _validate;
  /**
   * @private
   * @type {({ error, client, message, prefix, args, language }: { error: string; client: CDClient; message: Message, prefix: string; args: string[]; language: keyof import("./Languages.json") }) => void | Promise<void>}
   */
  _onError;
  /**
   * @private
   * @type {(message: Message) => void | Promise<void>}
   */
  _onSuccess;

  /**
   * @public
   * @param {Object} param0
   * @param {({ message, args, client, prefix, language }: { message: Message; args: string[]; client: CDClient, prefix: string; language: keyof import("./Languages.json") }) => boolean | string | Promise<boolean | string>} param0.validate
   * @param {({ error, client, message, prefix, args, language }: { error: string; client: CDClient; message: Message, prefix: string; args: string[]; language: keyof import("./Languages.json") }) => void | Promise<void>} param0.onError
   * @param {(message: Message) => void | Promise<void>=} param0.onSuccess
   */
  constructor({ validate, onError, onSuccess }) {
    this._onError = onError;
    this._onSuccess = onSuccess;
    this._validate = validate;
  }

  get onError() {
    return this._onError;
  }
  get onSuccess() {
    return this._onSuccess;
  }
  get validate() {
    return this._validate;
  }
};
