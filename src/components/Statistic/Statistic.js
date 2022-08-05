import React from 'react';

import { tags } from '../../utils/constants';

const tagSet = new Map();

function Statistic(props) {
  const cards = props.cards;
  let maxValue = 0;

  function test(e) {
    e.target.style.width = '80%'
    console.log(cards)

    tags.forEach((c) => {
      const tagValue = cards.filter(i => i.tag===c).length;
      tagSet.set(c, tagValue);
    })
    console.log(Math.max(...tagSet.values()))

  }

  tags.forEach((c) => {
    const tagValue = cards.filter(i => i.tag===c).length;
    tagSet.set(c, tagValue);
    maxValue = Math.max(...tagSet.values());
  })

  return (
    <div className="stat">

      <div className="stat__works">
        <div className="stat__main">
          <h2 className="stat__heading">{props.cards.length}</h2>
          <p className="stat__parag">Всего работ</p>
        </div>
        <div className="stat__tags">
          {Array.from(tagSet).map((i) => {
            return (
              <div className="stat__tags-container" key={i} >
                <h2 className="stat__tag">{i[0]}</h2>
                <span className="stat__value">{i[1]}</span>
                <div className="stat__progress">
                  <div className="stat__progress_filled" onClick={test} style={{width: i[1]/maxValue * 100 + '%'}}></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

{/*       <div className="stat__views stat__works">

        <div className="stat__main">
          <h2 className="stat__heading">13</h2>
          <p className="stat__parag">Просмотров</p>
        </div>

        <div className="stat__card">
          <img src={selectedLogo} alt="top views card" className="stat__img"></img>
          <div className="stat__overlay">
            <div className="stat__info">
              <p className="stat__raiting">1</p>
              <p className="stat__views-count">68
                <span> просмотров</span>
              </p>
           </div>
          </div>
        </div>

      </div> */}

    </div>
  );
}


export default Statistic;
