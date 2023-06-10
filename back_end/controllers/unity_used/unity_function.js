// des: find missing attribute in an object
// para:
//  object: the object needed to check
//  fields: attributes're needed checking
// warning this function is not compatible with nested object
const colors = require("colors");

const fFindMissingField = (object, fields) => {
  // // Solution 1:
  // missing = [];
  // for (let attr of fields) {
  //   if (!object || !object[attr]) {
  //     missing.push(attr);
  //   }
  // }
  // Solution 2:
  missing = fields.filter((key) => !object.hasOwnProperty(key));

  result =
    missing.length === 0
      ? null
      : { fmessage: `missing fields: ${missing.join(", ")}`, missing };
  return result;
};

const fCompilationObjectType = (objects) => {
  result = {};
  for (attr in objects) {
    key = !Array.isArray(objects[attr])
      ? (typeof objects[attr]).toString()
      : "array";
    if (!result.hasOwnProperty(key)) result[key] = [];
    result[key].push(attr);
  }
  return result;
};

// des: find missing attribute in an object and object can be a nested object
// para:
//  object: the object needed to check
//  fields: attributes're needed checking
const fFindMissingFieldNested = (object, fields, trace = false) => {
  missing = [];
  path = [];
  queue = [object];
  qname = ["{root}"];
  not_found = fields;
  breaker = 0;
  path= []
  while (queue.length != 0 && breaker < 100) {
    console.log(`////////// ${breaker}`.blue.underline);
    obj = queue.shift();
    qn = qname.shift();
    console.log(`-> cur qn: ${qn}`.yellow);

    compile = fCompilationObjectType(obj);

    if (compile.hasOwnProperty("object")) {
      // qname.push(...compile["object"]);
      queue.push(
        ...compile["object"].map((key) => {
          qname.push(key);
          return obj[key];
        })
      );
    }
    console.log(`-> queue:`.yellow);
    console.log(queue);
    console.log(`-> qname:`.yellow);
    console.log(qname);
    console.log(`-> compile:`.yellow);
    console.log(compile);
    // filter out object type/array, then reduce/ accumulate all of them
    not_obj = Object.keys(compile)
      .filter((key) => key !== "object" && key !== "array")
      .reduce((acc, key) => acc.concat(compile[key]), []);
    console.log(`-> not_found 1 (cur):`.yellow);
    console.log(not_found);

    not_found = not_found.filter((key) => !not_obj.includes(key));
    console.log(`-> not_found 2 (didnt found in req):`.yellow);
    console.log(not_found);

    not_found = Array.from(
      new Set(
        not_found.flatMap((key) => {
          const holder = key.split(".");
          if (!qname.includes(holder[0]))
            return key
          if (holder.length > 1)
            return holder.slice(1).join('.')
          return 'in';
        })
      )
    ).filter((element) => element !== 'in');

    console.log(`-> not_found 3 (take out dir):`.yellow);
    console.log(not_found);
    breaker++;
  }

  result =
    missing.length === 0
      ? null
      : { fmessage: `missing fields: ${missing.join(", ")}`, missing };
  return result;
};

module.exports = {
  fFindMissingField,
  fFindMissingFieldNested,
  fCompilationObjectType,
};
