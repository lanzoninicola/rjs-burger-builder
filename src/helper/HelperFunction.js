
export const toArray = (_Object) => {
       let _Array = new Array();
       for(let name in _Object){
               _Array[name] = _Object[name];
       }
       return _Array;
}

export const toObject = (_Array) => {
        let _Object = new Object();
        for(let key in _Array){
               _Object[key] = _Array[key];
        }
        return _Object;
 }


