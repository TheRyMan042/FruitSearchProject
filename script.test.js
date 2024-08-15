//Ryan Hutchings
//Unit Testing Fruit AutoComplete Project

//For now, need to comment out the event listeners to make tests work
describe("Autocomplete Script", () => {
  it("get results from search fruit array", () => {
    expect(search('ap')).toEqual(['Apple', 'Apricot', 'Custard apple', 'Grape', 'Grapefruit', 'Papaya', 'Pineapple']);
    expect(search('pa')).toEqual(['Papaya', 'Passionfruit']);
  });

  //one part to uncomment return in showSuggestions
  it("get sugesstions to in a list item and show on the page", () => {
    expect(showSuggestions(['Apple', 'Apricot', 'Custard apple', 'Grape', 'Grapefruit', 'Papaya', 'Pineapple'], 'Ap')).toBe('<b>Ap</b>ple');
  });

  afterEach(() => {
    input.val = '';
    suggestions.innerText = '';
  });
});

//Also, some of the functions are for changing stuff on the webpage using the DOM. I'm not sure how to test this out for now. 