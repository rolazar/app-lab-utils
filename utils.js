function getText(id) {
  const text = get(id, "value");
  return text;
}

function hideElement(id) {
  setProperty(id, "hidden", true);
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

function playSound(url, loop = false) {
  const audio = getSound(url);
  audio.loop = loop;
  audio.play().catch((error) => {
    console.log(
      "Playback failed. Note: Browsers usually require a user gesture (like a click) first!",
    );
  });
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

function setImageURL(id, url) {
  setProperty(id, "image", url);
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

    if (typeof x === "number") x = x + "px";
    if (typeof y === "number") y = y + "px";
    set(element, "style.transform", `translate(${x},${y})`);
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

function setText(id, text) {
  setProperty(id, "text", text);
}

function showElement(id) {
  setProperty(id, "hidden", false);
}

function stopSound(url) {
  const audio = getSound(url);
  audio.pause();
}

// INTERNAL FUNCTIONS ////////////////////////////////////////////////////

let x = "0px";
let y = "0px";
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
    case "hidden": {
      if (typeof value !== "boolean")
        throw new Error("value is not a Boolean - " + value);
      const shouldHide = value === true ? "none" : "initial";
      return ["style.display", `${shouldHide}`];
    }
    case "image":
      if (typeof value !== "string")
        throw new Error("value is not a string - " + value);
      return ["src", value];
    case "text":
      return ["innerText", value];
    case "width": {
      if (typeof value !== "number")
        throw new Error("value is not a number - " + value);
      return ["style.width", `${value}px`];
    }
    case "x": {
      if (typeof value === "number") x = value + "px";
      else x = value;
      return ["style.transform", `translate(${x},${y})`];
    }
    case "y": {
      if (typeof value === "number") y = value + "px";
      else y = value;
      return ["style.transform", `translate(${x},${y})`];
    }
    default:
      throw new Error("invalid property - " + property);
  }
}

function set(element, propertyPath, value) {
  const paths = propertyPath.split(".");
  let target = element;
  let path = "";
  for (path of paths) {
    if (typeof target[path] === "object") target = target[path];
  }
  target[path] = value;
}

const sounds = {};
function getSound(file) {
  let sound = sounds[file];
  if (!sound) {
    sound = new Audio(file);
    sounds[file] = sound;
  }
  return sound;
}

function get(id, propertyPath) {
  const element = document.getElementById(id);
  if (!element) throw new Error("invalid id - " + id);
  const paths = propertyPath.split(".");

  let target = element;
  let path = "";

  for (path of paths) {
    if (typeof target[path] === "object") target = target[path];
  }
  const value = target[path];
  return value;
}
