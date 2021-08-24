import React from 'react';

function CreateExerLabel({ name, weight,count, sets,onChange, onCreate }) {
  return (
    <div>  
      
     <input
    name="name"
    placeholder="운동이름"
    onChange={onChange}
    value={name}
    />
    <input
    name="weight"
    placeholder="무게"
    onChange={onChange}
    value={weight}
    />
       <input

    name="count"
    placeholder="횟수"
    onChange={onChange}
    value={count}
    />
       <input

    name="sets"
    placeholder="셋트"
    onChange={onChange}
    value={sets}
    />
      <button onClick={onCreate}>등록</button>
    
    </div>
  );
}

export default CreateExerLabel;