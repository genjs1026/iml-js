var iml = require('../lib/iml');


describe("basics data", function() {
  it("null return empty", function() {
    // Given
    var data = null;
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("");
  });
  it("empty object return empty", function() {
    // Given
    var data = {};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("");
  });
  it("empty array return empty array", function() {
    // Given
    var data = [];
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("-");
  });
  it("string value", function() {
    // Given
    var data = "n1";
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1");
  });
  it("number value", function() {
    // Given
    var data = 1;
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("1");
  });
  it("decimal value", function() {
    // Given
    var data = 12.345;
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("12.345");
  });
  it("date value", function() {
    // Given
    var date = new Date(2000,12,31,23,59,59,999);
    var data = date;
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe(""+date.getTime());
  });
  it("boolean value : true", function() {
    // Given
    var data = true;
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("true");
  });
  it("boolean value : false", function() {
    // Given
    var data = false;
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("false");
  });
  it("return an object with one property without value", function() {
    // Given
    var data = {n1:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1");
  });
  it("return an object with two properties without value", function() {
    // Given
    var data = {n1:null,n2:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\nn2");
  });
  it("return an object with three properties without value", function() {
    // Given
    var data = {n1:null,n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\nn2\nn3");
  });
  it("first property has a string value", function() {
    // Given
    var data = {n1:"n12",n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  n12\nn2\nn3");
  });
  it("first property has a number value", function() {
    // Given
    var data = {n1:12,n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  12\nn2\nn3");
  });
  it("first property has a decimal value", function() {
    // Given
    var data = {n1:12.345,n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  12.345\nn2\nn3");
  });
  it("first property has a date value", function() {
    // Given
    var date = new Date(2000,12,31,23,59,59,999);
    var data = {n1:date,n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  "+date.getTime()+"\nn2\nn3");
  });
  it("first property has the boolean value : true", function() {
    // Given
    var data = {n1:true,n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  true\nn2\nn3");
  });
  it("first property has the boolean value : false", function() {
    // Given
    var data = {n1:false,n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  false\nn2\nn3");
  });
  it("second property has a string value", function() {
    // Given
    var data = {n1:null,n2:"n21",n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\nn2\n  n21\nn3");
  });
  it("third property has a string value", function() {
    // Given
    var data = {n1:null,n2:null,n3:"n31"};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\nn2\nn3\n  n31");
  });
  it("first property is an object", function() {
    // Given
    var data = {n1:{n11:null,n12:null},n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  n11\n  n12\nn2\nn3");
  });
  it("first property is an object with values", function() {
    // Given
    var data = {n1:{n11:"n111",n12:13},n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  n11\n    n111\n  n12\n    13\nn2\nn3");
  });
  it("string array with one element", function() {
    // Given
    var data = ["n1"];
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("-\n  n1");
  });
  it("string array with two elements", function() {
    // Given
    var data = ["n1","n2"];
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("-\n  n1\n  n2");
  });
  it("string array with three elements", function() {
    // Given
    var data = ["n1","n2","n3"];
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("-\n  n1\n  n2\n  n3");
  });
  it("array with different types", function() {
    // Given
    var date = new Date(2000,12,31,23,59,59,999);
    var data = ["n1",2,true,date];
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("-\n  n1\n  2\n  true\n  "+date.getTime());
  });
  it("first property is an array", function() {
    // Given
    var data = {n1:["n11","n12","n13"],n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  -\n    n11\n    n12\n    n13\nn2\nn3");
  });
  it("first property is an obkect with an array", function() {
    // Given
    var data = {n1:{n11:["n111","n112","n113"]},n2:null,n3:null};
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  n11\n    -\n      n111\n      n112\n      n113\nn2\nn3");
  });
  it("complex data", function() {
    // Given
    var data = {
      n1:{
        n11: ["n111",112,"n113"],
        n12: null
      },
      n2: {n21:null, n22: 4},
      n3: {}
    };
    // When
    var out = iml.js2iml(data);
    // Then
    expect(out).toBe("n1\n  n11\n    -\n      n111\n      112\n      n113\n  n12\nn2\n  n21\n  n22\n    4\nn3");
  });
});