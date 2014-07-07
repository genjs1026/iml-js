var iml = require('../lib/iml');


describe("basics data", function() {
  it("empty return empty", function() {
    var data = iml.iml2js("")
    expect(Object.keys(data).length).toBe(0);
  });
  it("gets one node", function() {
    var data = iml.iml2js("n1")
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1).toBe(null);
  });
  it("gets two nodes at the same level", function() {
    var data = iml.iml2js("n1\nn2")
    expect(Object.keys(data).length).toBe(2);
    expect(data.n1).toBe(null);
    expect(data.n2).toBe(null);
  });
  it("the first node has a value", function() {
    var data = iml.iml2js("n1\n value1\nn2")
    expect(Object.keys(data).length).toBe(2);
    expect(data.n1).toBe("value1");
    expect(data.n2).toBe(null);
  });
  it("the second node has a value", function() {
    var data = iml.iml2js("n1\nn2\n value2")
    expect(Object.keys(data).length).toBe(2);
    expect(data.n1).toBe(null);
    expect(data.n2).toEqual("value2");
  });
  it("the two nodes has value", function() {
    var data = iml.iml2js("n1\n value1\nn2\n value2")
    expect(Object.keys(data).length).toBe(2);
    expect(data.n1).toEqual("value1");
    expect(data.n2).toEqual("value2");
  });
  it("the first node has two children", function() {
    var data = iml.iml2js("n1\n n11\n n12")
    expect(Object.keys(data).length).toBe(1);
    expect(Object.keys(data.n1).length).toBe(2);
    expect(data.n1.n11).toBe(null);
    expect(data.n1.n12).toBe(null);
  });
  it("the first node has a list of values", function() {
    var data = iml.iml2js("n1\n -\n  n11\n  n12")
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1 instanceof Array).toBe(true);
    expect(Object.keys(data.n1).length).toBe(2);
    expect(data.n1[0]).toBe("n11");
    expect(data.n1[1]).toBe("n12");
  });
  it("one line has a tabulation", function() {
    var data = iml.iml2js("n1\n \t -\n \t \t n11\n         n12");
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1 instanceof Array).toBe(true);
    expect(Object.keys(data.n1).length).toBe(2);
    expect(data.n1[0]).toBe("n11");
    expect(data.n1[1]).toBe("n12");
  });
  it("the first list element is an object with a value", function() {
    var data = iml.iml2js("n1\n -\n  n11\n   n111")
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1 instanceof Array).toBe(true);
    expect(Object.keys(data.n1).length).toBe(1);
    expect(Object.keys(data.n1[0]).length).toBe(1);
    expect(data.n1[0].n11).toBe("n111");
  });
  it("the first list element has two children", function() {
    var data = iml.iml2js("n1\n -\n  n11\n   n111\n   n112")
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1 instanceof Array).toBe(true);
    expect(Object.keys(data.n1).length).toBe(1);
    expect(Object.keys(data.n1[0]).length).toBe(1);
    expect(Object.keys(data.n1[0].n11).length).toBe(2);
    expect(data.n1[0].n11.n111).toBe(null);
    expect(data.n1[0].n11.n112).toBe(null);
  });
  it("the first list element is a list", function() {
    var data = iml.iml2js("n1\n -\n  -\n   n11\n   n12")
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1 instanceof Array).toBe(true);
    expect(data.n1.length).toBe(1);
    expect(data.n1[0] instanceof Array).toBe(true);
    expect(data.n1[0].length).toBe(2);
    expect(data.n1[0][0]).toBe("n11");
    expect(data.n1[0][1]).toBe("n12");
  });
  it("list with an object which contains a list", function() {
    var data = iml.iml2js("n1\n -\n  n11\n   -\n    n111")
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1 instanceof Array).toBe(true);
    expect(data.n1.length).toBe(1);
    expect(Object.keys(data.n1[0]).length).toBe(1);
    expect(data.n1[0].n11 instanceof Array).toBe(true);
    expect(data.n1[0].n11.length).toBe(1);
    expect(data.n1[0].n11[0]).toBe("n111");
  });
  it("the first list element is a multiline string", function() {
    var data = iml.iml2js("n1\n -\n  >n11\n   l2")
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1 instanceof Array).toBe(true);
    expect(Object.keys(data.n1).length).toBe(1);
    expect(data.n1[0]).toBe("n11\nl2");
  });
  it("the list has two multiline string", function() {
    var data = iml.iml2js("n1\n -\n  >n11\n   l2\n  >n12")
    expect(Object.keys(data).length).toBe(1);
    expect(data.n1 instanceof Array).toBe(true);
    expect(Object.keys(data.n1).length).toBe(2);
    expect(data.n1[0]).toBe("n11\nl2");
    expect(data.n1[1]).toBe("n12");
  });
  it("return an empty object", function() {
    var data = iml.iml2js("*");
    expect(Object.keys(data).length).toBe(0);
  });
  it("return an object with one property", function() {
    var data = iml.iml2js("*\n  n1");
    expect(Object.keys(data).length).toBe(1);
    expect(data["n1"]).toBe(null);
  });
  it("return an object with one property and on value", function() {
    var data = iml.iml2js("*\n  n1\n    n11");
    expect(Object.keys(data).length).toBe(1);
    expect(data["n1"]).toBe("n11");
  });
  it("first property has an empty object", function() {
    var data = iml.iml2js("n1\n  *");
    expect(Object.keys(data).length).toBe(1);
    expect(Object.keys(data["n1"]).length).toBe(0);
  });
  it("first property has an object with one property", function() {
    var data = iml.iml2js("n1\n  *\n    n11");
    expect(Object.keys(data).length).toBe(1);
    expect(Object.keys(data["n1"]).length).toBe(1);
    expect(data["n1"]["n11"]).toBe(null);
  });
  it("first property has an object with one property and a value", function() {
    var data = iml.iml2js("n1\n  *\n    n11\n      n111");
    expect(Object.keys(data).length).toBe(1);
    expect(Object.keys(data["n1"]).length).toBe(1);
    expect(data["n1"]["n11"]).toBe("n111");
  });
  it("first property has an object with two properties", function() {
    var data = iml.iml2js("n1\n  *\n    n11\n    n12");
    expect(Object.keys(data).length).toBe(1);
    expect(Object.keys(data["n1"]).length).toBe(2);
    expect(data["n1"]["n11"]).toBe(null);
    expect(data["n1"]["n12"]).toBe(null);
  });
  it("first property has an object with two properties and values", function() {
    var data = iml.iml2js("n1\n  *\n    n11\n      n111\n    n12\n      n112");
    expect(Object.keys(data).length).toBe(1);
    expect(Object.keys(data["n1"]).length).toBe(2);
    expect(data["n1"]["n11"]).toBe("n111");
    expect(data["n1"]["n12"]).toBe("n112");
  });
  it("first array element is an empty object", function() {
    var data = iml.iml2js("-\n  *");
    expect(data instanceof Array).toBe(true);
    expect(data.length).toBe(1);
    expect(Object.keys(data[0]).length).toBe(0);
  });
  it("first array element is an object with one property", function() {
    var data = iml.iml2js("-\n  *\n    n11\n  n12");
    expect(data instanceof Array).toBe(true);
    expect(data.length).toBe(2);
    expect(Object.keys(data[0]).length).toBe(1);
    expect(data[0]["n11"]).toBe(null);
    expect(Object.keys(data[1]).length).toBe(0);
  });
  it("first array element is an object with one property and a value", function() {
    var data = iml.iml2js("-\n  *\n    n11\n      n111");
    expect(data instanceof Array).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0]["n11"]).toBe("n111");
  });
  it("first array element is an object with two properties", function() {
    var data = iml.iml2js("-\n  *\n    n11\n    n12");
    expect(data instanceof Array).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0]["n11"]).toBe(null);
    expect(data[0]["n12"]).toBe(null);
  });
  it("first array element is an object with two properties and values", function() {
    var data = iml.iml2js("-\n  *\n    n11\n      n111\n    n12\n      n112");
    expect(data instanceof Array).toBe(true);
    expect(data.length).toBe(1);
    expect(data[0]["n11"]).toBe("n111");
    expect(data[0]["n12"]).toBe("n112");
  });
});