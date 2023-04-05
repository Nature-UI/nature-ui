// import '@testing-library/jest-dom/extend-expect'
//@ts-expect-error
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
