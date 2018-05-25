const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = (arg) =>{
  // console.log(typeof arg);
  // console.log(this);
  // 
  if(typeof arg === 'string'){
    //css selector as string 
    // console.log('$(arg)', $(arg));
    elementList = Array.from(document.querySelectorAll(arg));
  }
  if(arg instanceof HTMLElement) { elementList = [arg]; } 
  // console.log(Array.from(elementList) instanceof Array);
  return new DOMNodeCollection(elementList);
  
};
