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

function setProperty(id, property, value) {
  try {
    if (!id) throw new Error("id is missing");
    if (!property) throw new Error("property is missing");
    const element = document.getElementById(id);
    if (!element) throw new Error("invalid id - " + id);
    const prop = getCorrespondingProperty(property);
    if (!prop) throw new Error("invalid property - " + property);
    set(element, prop, value);
  } catch (error) {
    console.error(error.stack);
  }
}

function getCorrespondingProperty(property) {
  switch (property) {
    case "text":
      return "innerText";
    case "background-color":
      return "style.background-color";
    case "font-size":
      return "style.font-size";
    default:
      return "";
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
