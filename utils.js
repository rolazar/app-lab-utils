function hideElement() {
  throw new Error("not yet implemented");
}

/**
 * @summary Adds an event listener to an element.
 * @param {string} id
 * @param {string} event
 * @param {function} callback
 */
function onEvent(id, event, callback) {
  try {
    if (!id) throw new Error("id is missing");
    if (!event) throw new Error("event is missing");
    if (!callback) throw new Error("callback is missing");
    const element = document.getElementById(id);
    if (!element) throw new Error("invalid id");
    element.addEventListener(event, callback);
  } catch (error) {
    console.error(error.stack);
  }
}

function playSound() {
  throw new Error("not yet implemented");
}

function randomNumber(minimum, maximum) {
  try {
    if (!minimum && minimum != 0) throw new Error("minimum number is missing");
    if (!maximum && maximum != 0) throw new Error("maximum number is missing");
    let number = Math.random() * (maximum - minimum) + minimum;
    number = Math.trunc(number);
    return number;
  } catch (error) {
    console.error(error.stack);
  }
}

function setImageURL() {
  throw new Error("not yet implemented");
}

/**
 * @summary Set the position and dimensions of an element.
 * @param {string} id
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
function setPosition(id, x, y, width, height) {
  try {
    if (!id) throw new Error("id is missing");
    if (!x) throw new Error("x is missing");
    if (!y) throw new Error("y is missing");
    const element = document.getElementById(id);
    if (!element) throw new Error("invalid id - " + id);
    set(element, "style.transform", `translate(${x}px,${y}px)`);
    if (width || width === 0) setProperty(id, "width", width);
    if (height || height === 0) setProperty(id, "height", height);
  } catch (error) {
    console.error(error.stack);
  }
}

/**
 * @summary Changes the property of an element.
 * @param {string} id The id of an element.
 * @param {string} property A property of the element.
 * @param {string} value The value for the property.
 * @description
 * Valid properties are:
 * background-color
 * font-size
 * text
 * x
 * y
 */
function setProperty(id, property, value) {
  try {
    if (!id) throw new Error("id is missing");
    if (!property) throw new Error("property is missing");
    const element = document.getElementById(id);
    if (!element) throw new Error("invalid id - " + id);
    const [newProperty, newValue] = getCorrespondingProperty(property, value);
    set(element, newProperty, newValue);
  } catch (error) {
    console.error(error.stack);
  }
}

function setScreen(htmlFile) {
  try {
    if (!htmlFile) throw new Error("html file is missing");
    window.location.assign(htmlFile);
  } catch (error) {
    console.error(error.stack);
  }
}

function setText() {
  throw new Error("not yet implemented");
}

function showElement() {
  throw new Error("not yet implemented");
}

function stopSound() {
  throw new Error("not yet implemented");
}

// INTERNAL FUNCTIONS ////////////////////////////////////////////////////

function getCorrespondingProperty(property, value) {
  switch (property) {
    case "background-color":
      return ["style.background-color", value];
    case "color":
      return ["style.color", value];
    case "font-size": {
      if (typeof value !== "number")
        throw new Error("value is not a number - " + value);
      return ["style.font-size", `${value}px`];
    }
    case "height": {
      if (typeof value !== "number")
        throw new Error("value is not a number - " + value);
      return ["style.height", `${value}px`];
    }
    case "image":
      throw new Error("not yet implemented");
    case "text":
      return ["innerText", value];
    case "width": {
      if (typeof value !== "number")
        throw new Error("value is not a number - " + value);
      return ["style.width", `${value}px`];
    }
    case "x": {
      if (typeof value !== "number")
        throw new Error("value is not a number - " + value);
      return ["style.transform", `translateX(${value}px)`];
    }
    case "y": {
      if (typeof value !== "number")
        throw new Error("value is not a number - " + value);
      return ["style.transform", `translateY(${value}px)`];
    }
    default:
      throw new Error("invalid property - " + property);
  }
}

function set(object, propertyPath, value) {
  const paths = propertyPath.split(".");
  let target = object;
  let path = "";
  for (path of paths) {
    if (typeof target[path] === "object") target = target[path];
  }
  target[path] = value;
}
