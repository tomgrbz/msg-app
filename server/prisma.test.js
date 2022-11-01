const { retrieveMsgs } = require("./db")

describe('sum module', () => {
  test('retrieveMsgsTest', async () => {
    const data = await retrieveMsgs('fseoonfsf', 'SpRpnB0epy6RL7gxAAAD')
    console.dir(data, {depth: null})
    expect(data).toBe(null);
  });
});