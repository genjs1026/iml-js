var ImlParser = require('../lib/imlparser');


describe("tabulation", function() {
  it("empty return empty", function() {
    var line = new ImlParser().lineWithoutTab("");
    expect(line).toBe("");
  });
  it("spaces return spaces", function() {
    var line = new ImlParser().lineWithoutTab("       ");
    expect(line).toBe("       ");
  });
  it("tab at column 0", function() {
    var line = new ImlParser().lineWithoutTab("\t");
    expect(line).toBe("    ");
  });
  it("tab at column 1", function() {
    var line = new ImlParser().lineWithoutTab(" \t");
    expect(line).toBe("    ");
  });
  it("tab at column 2", function() {
    var line = new ImlParser().lineWithoutTab("  \t");
    expect(line).toBe("    ");
  });
  it("tab at column 3", function() {
    var line = new ImlParser().lineWithoutTab("   \t");
    expect(line).toBe("    ");
  });
  it("tab at column 4", function() {
    var line = new ImlParser().lineWithoutTab("    \t");
    expect(line).toBe("        ");
  });
  it("tab at column 0 with space after", function() {
    var line = new ImlParser().lineWithoutTab("\t ");
    expect(line).toBe("     ");
  });
  it("tab at column 1 with space after", function() {
    var line = new ImlParser().lineWithoutTab(" \t ");
    expect(line).toBe("     ");
  });
  it("tab at column 2 with space after", function() {
    var line = new ImlParser().lineWithoutTab("  \t ");
    expect(line).toBe("     ");
  });
  it("tab at column 3 with space after", function() {
    var line = new ImlParser().lineWithoutTab("   \t ");
    expect(line).toBe("     ");
  });
  it("tab at column 4 with space after", function() {
    var line = new ImlParser().lineWithoutTab("    \t ");
    expect(line).toBe("         ");
  });
  it("tab at column 0 with letter after", function() {
    var line = new ImlParser().lineWithoutTab("\ta");
    expect(line).toBe("    a");
  });
  it("tab at column 1 with letter after", function() {
    var line = new ImlParser().lineWithoutTab(" \ta");
    expect(line).toBe("    a");
  });
  it("tab at column 2 with letter after", function() {
    var line = new ImlParser().lineWithoutTab("  \ta");
    expect(line).toBe("    a");
  });
  it("tab at column 3 with letter after", function() {
    var line = new ImlParser().lineWithoutTab("   \ta");
    expect(line).toBe("    a");
  });
  it("tab at column 4 with letter after", function() {
    var line = new ImlParser().lineWithoutTab("    \ta");
    expect(line).toBe("        a");
  });
  it("tab at column 0 with letter after", function() {
    var line = new ImlParser().lineWithoutTab("\ta");
    expect(line).toBe("    a");
  });
  it("multi tabs with letter after", function() {
    var line = new ImlParser().lineWithoutTab(" \t \t a");
    expect(line).toBe("         a");
  });
  it("multi tabs with tab after letter", function() {
    var line = new ImlParser().lineWithoutTab("  \ta\t");
    expect(line).toBe("    a\t");
  });
});