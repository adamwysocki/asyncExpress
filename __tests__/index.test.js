const request = require("supertest");
const app = require("../dist/index.js");
const _ = require("lodash");

describe("index route", () => {
  expect.extend({
    toLookLike(received, expected) {
      received = JSON.parse(received);
      const pass = _.isEqual(received, expected);

      const message = pass
        ? () =>
            `${this.utils.matcherHint(".not.toLookLike")}
                \n\n
                Expected value to not be (using Object.is):\n
                  ${this.utils.printExpected(expected)}\n
                Received:\n
                  ${this.utils.printReceived(received)}`
        : () => {
            const diffString = diff(expected, received, {
              expand: this.expand
            });
            return `${this.utils.matcherHint(".toLookLike")} 
                  \n\n
                  Expected value to be (using Object.is):
                    ${this.utils.printExpected(expected)}
                    Received:
                    ${this.utils.printReceived(received)}
                  ${diffString} ? \n\nDifference:\n\n${diffString}}`;
          };

      return { actual: received, message, pass };
    }
  });

  afterAll(() => {
    app.server.close();
  });

  it("should respond with a 200", () => {
    return request(app)
      .get("/")
      .expect(200)
      .expect(response => {
        expect(response.text).toMatch(/title/);
        expect(response.text).toMatch(/Google/);
      });
  });

  it("should respond with a title", () => {
    return request(app)
      .get("/")
      .expect(response => {
        expect(response.text).toMatch(/title/);
      });
  });

  it("should respond with the correct JSON data", () => {
    return request(app)
      .get("/")
      .expect(response => {
        expect(response.text).toLookLike({ result: "success", code: 200, data: { title: "Google" } });
      });
  });

  it("should render correctly", () => {
    return request(app)
      .get("/")
      .expect(response => {
        expect(response.text).toMatchSnapshot();
      });
  });
});
