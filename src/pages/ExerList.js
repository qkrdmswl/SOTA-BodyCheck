import React from 'react';

function Exer({exer}) {
 
    return (
      <div>
        <b>{exer.name}</b> <span>({exer.weight} kg)</span>
        <span>({exer.count} 회)</span><span>({exer.sets} 세트)</span>
      </div>
    );
  }
function ExerList({ exers }) {
  return (
    <div>
      {exers.map(exer => (
        <Exer exer={exer} key={exer.id} />
      ))}
    </div>
  );
}


export default ExerList;