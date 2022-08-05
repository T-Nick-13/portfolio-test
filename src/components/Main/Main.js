import Card from '../Card/Card';

import bin from '../../images/light/free-icon-delete-5613811.png';

function Main(props) {

  const deletingClass = props.deletingActive ? '' : 'deleting_inactive';
  const counterClass = props.btnChoiceActve ? '' : 'deleting__counter_inactive';
  const binClass = props.amountSelectedCards > 0 ? '' : 'deleting__bin_inactive';
  const objectsAmount = props.amountSelectedCards === 1 ? 'объект'
    : props.amountSelectedCards > 1 && props.amountSelectedCards < 5 ? 'объекта' : 'объектов';

  function handleChoiceClick() {
    props.onChoiceClick();
  }

  function deleteCard() {
    props.onCardDelete();
  }

  return (
    <main className="main" >
      <div className={`deleting ${deletingClass}`}>
        <div className="deleting__container">
          <button className="deleting__btn" onClick={handleChoiceClick}>{props.btnContent}</button>
          <p className={`deleting__counter ${counterClass}`}>Выбрано {props.amountSelectedCards} {objectsAmount}</p>
          <img className={`deleting__bin ${binClass}`} src={bin} alt="trash bin" onClick={deleteCard}></img>
        </div>
      </div>
      {props.pic.map((card) =>{
        return (
          <Card
            card={card}
            tag={card.tag}
            key={card._id}
            onCardSelect={props.onCardSelect}
            btnChoiceActve={props.btnChoiceActve}
            amountSelectedCards={props.amountSelectedCards}
            selectedCards={props.selectedCards}
            selectBtnActive={props.selectBtnActive}
          />
        )
      })}
    </main>

  );

}


export default Main;
