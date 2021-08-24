import React from 'react';

function Exer({exer, onRemove, onToggle, onRevise}) {
 
    return (
      <div>
        <b
               style={{
                cursor: 'pointer',
                color: exer.active ? 'red' : 'black'
              }}

        onClick={()=> onToggle(exer.id)}>
          {exer.name}
        </b>
        &nbsp;
        <span>({exer.weight} kg)</span>
        <span>({exer.count} 회)</span><span>({exer.sets} 세트)</span>
        <button onClick={() => onRemove(exer.id)}>삭제</button>
        <button onClick={() => onRevise(exer.id)}>수정</button>
   
      </div>
    );
  }
function ExerList({ exers , onRemove, onRevise,onToggle}) {
  return (
    <div>
      {exers.map(exer => (
        <Exer exer={exer} key={exer.id} onRemove={onRemove} onRevise={onRevise}  onToggle={onToggle}/>
      ))}
    </div>
  );
}


export default ExerList;