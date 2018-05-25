class DOMNodeCollection{
  constructor(HTMLElements){
    this.HTMLElements = HTMLElements;
  }
  
  toArray() {
    return this.HTMLElements;
  }
  
  html(innerHTML){
    if(innerHTML === undefined){
      return this.HTMLElements[0].innerHTML;
    }else{
      this.HTMLElements.forEach((element)=>{
        element.innerHTML = innerHTML;
      });
    }
  }
  
  empty(){
    this.html("");
  }
  
  append(content, ...otherArgs){
    if(content instanceof HTMLElement){
      this.HTMLElements.forEach((element)=>{
        element.innerHTML += content.outerHTML;
      });
    }
    else if(content instanceof String){
      this.HTMLElements.forEach((element)=>{
        element.innerHTML += content;
      });
    }else{//jQuery-lite wrapped collection
      this.HTMLElements.forEach((element)=>{
        Array.from(content).forEach((new_content)=>{
          element.innerHTML += new_content.outerHTML;
        });
      });
    }
  }
  
  attr(name, value){
    if (value === undefined) {
      for (let i = 0; i < this.HTMLElements.length; i++) {
        let currentEl = this.HTMLElements[i];
        if (currentEl.getAttribute(name)) return currentEl.getAttribute(name);
        return null;
      }
    } else {
      for (let i = 0; i < this.HTMLElements.length; i++) {
        let currentEl = this.HTMLElements[i];
        if(currentEl.getAttribute(name)) {
          newvvalue = currentEl.getAttribute(name) + " " + value;
        }
        else{
          newvvalue = value;
        }
        currentEl.setAttribute(name, newvalue);
      }
    }
    // this.HTMLElements[0]
  }
  
  addClass(classnames){
    this.attr("class", classnames);
  }
  
  removeClass(classnames){
    if ( classnames === undefined) {
      for (let i = 0; i < this.HTMLElements.length; i++) {
        let currentEl = this.HTMLElements[i];
        currentEl.setAttribute("class", "");
      }
    } else {
      let unwantedClassnames = classnames.split(" ");
      for (let i = 0; i < this.HTMLElements.length; i++) {
        let currentEl = this.HTMLElements[i];
        let classes = [];
        let currentClasses = currentEl.getAttribute("class").split(" ");
        for (let j = 0; j < currentClasses.length; j++) {
          if(!unwantedClassnames.includes(currentClasses[j] )) classes.push(currentClasses[j]);
        }
        currentEl.setAttribute(name, classes.join(" "));
      }
    }
  }
  
  children() {
    let children = [];
    this.HTMLElements.forEach((element) => {
      element.childNodes.forEach((node) => {
        if (!(node instanceof Text)) children.push(node);
      });
    });
    return children;
  }
  
  parent() {
    let parents = [];
    this.HTMLElements.forEach((element) => {
      
      if (!(parents.includes(element.parentNode()))) parents.push(element.parentNode());
    });
    return parents;
  }
  
  find(selector) {
    let result = [];
    this.HTMLElements.forEach((element)=>{
      Array.from(element.querySelectorAll(selector)).forEach((found)=>{
        if (!(result.includes(found))) result.push(found);
      });
    });
    return result; 
  }
  
  remove(){
    this.HTMLElements.forEach((el)=>{
      el.outerHTML="";
      el.remove();
    });
    this.HTMLElements = null; 
    return 'a silly string';
  }
  
}


module.exports = DOMNodeCollection;