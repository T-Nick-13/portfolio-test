import React from 'react';
import { Routes, Route, useNavigate  } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Loading from '../Loading/Loading';
import PopupDel from '../PopupDel/PopupDel';
import Statistic from '../Statistic/Statistic';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute';
import { MAIN_API } from '../../utils/config';
import Api from '../../utils/Api';

let selectedCardsSet = new Set([]);

function App() {

  const [cardsList, setCardsList] = React.useState([]);
  const [deletingActive, setDeletingActive] = React.useState(false);
  const [selectBtnActive, setSelectBtnActive] = React.useState(false);
  const [cardsAmount, setCardsAmount] = React.useState(0);
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [activePopup, setPopupActive] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [unauthorized, setUnauthorized] = React.useState(false);

  const btnContent = selectBtnActive ? 'Отменить' : 'Выбрать';
  const navigate = useNavigate();

  const api = new Api ({
    baseUrl: MAIN_API,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  React.useEffect(() => {
    Promise.all([
      api.getCards()
    ])
    .then(([cards]) => {
      localStorage.setItem('cards', JSON.stringify(cards));
      setCardsList(JSON.parse(localStorage.getItem('cards')));
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  function handleLoading() {
    setDeletingActive(false);
    cancelSelection();
  }

  function handleLogoClick() {
    setDeletingActive(false);
    cancelSelection();
  }

  function handleClickDelete() {
    if(deletingActive) {
      setDeletingActive(false);
      cancelSelection();
    } else {
      setDeletingActive(true);
    }
  }

  function clickStat() {
    cancelSelection();
    setDeletingActive(false);
  }

  function cancelSelection() {
    setSelectBtnActive(false);
    selectedCardsSet.clear();
    setCardsAmount(0);
    setSelectedCards(Array.from(selectedCardsSet));
  }

  function handleChoiceClick() {
    if (selectBtnActive) {
      cancelSelection();
    }
    else {
      setSelectBtnActive(true);
    }
  }

  function selectCard(card) {
    selectedCardsSet.has(card) ? selectedCardsSet.delete(card) : selectedCardsSet.add(card);
    setCardsAmount(selectedCardsSet.size);
    setSelectedCards(Array.from(selectedCardsSet));
  }

  function deleteCard() {
    setPopupActive(true);
  }

  function closePopup() {
    setPopupActive(false);
  }

  function submitDeleting() {
    handleChoiceClick();
    closePopup();

    const delCard = selectedCards.map((c) => {
      return c._id;
    })

    api.deleteCard(delCard)
      .then(() => {
        const newCards = cardsList.filter(c => !delCard.includes(c._id));
        setCardsList(newCards);
        setDeletingActive(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogin(data) {
    const { email, password } = data;
    api.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        if (err.statusText === "Unauthorized") {
          setUnauthorized(true);
        } else {
          console.log(err);
        }
      })
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      api.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function addNewCard(fileArr, nameSet, tagSet) {

    const data = new FormData();

    fileArr.forEach((f) => {
      data.append('link', f);
    })

    nameSet.forEach((f) => {
      data.append('name', f);
    })

    tagSet.forEach((f) => {
      data.append('tag', f);
    })

    api.saveCard(data)
      .then((m) => {
        setCardsList([...m, ...cardsList]);
        setDeletingActive(false);
        navigate('/');
    })
      .catch((err) => {
      console.log(err)
      })
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    }
    function handleOverlayClose (evt) {
      if (evt.target.classList.contains('popup_active')) {
        closePopup();
      }
    }
    document.addEventListener('keyup', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
  }, [])

  React.useEffect(() => {
    tokenCheck();
  }, [])

  return (
    <div className="page">
      <div className="page__wrapper">
        <Navigation
          handleLoading={handleLoading}
          onLogoClick={handleLogoClick}
          onDeleteClick={handleClickDelete}
          onStatClick={clickStat}
          deletingActive={deletingActive}
          loggedIn={loggedIn}
        />

        <PopupDel
          activePopup={activePopup}
          amountSelectedCards={cardsAmount}
          onPopupClose={closePopup}
          onSubmit={submitDeleting}
        />

        <Routes>

          <Route
            path="/signin"
            element={
              <Login
                handleLogin={handleLogin}
                unauthorized={unauthorized}
              />
            }
          />

          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route
              path="/"
              element={
                <Main
                  pic={cardsList}
                  deletingActive={deletingActive}
                  onChoiceClick={handleChoiceClick}
                  btnContent={btnContent}
                  btnChoiceActve={selectBtnActive}
                  onCardSelect={selectCard}
                  amountSelectedCards={cardsAmount}
                  selectedCards={selectedCards}
                  onCardDelete={deleteCard}
                  selectBtnActive={selectBtnActive}
                />
              }
            />
          </Route>

          <Route path="/upload" element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route
              path="/upload"
              element={
                <Loading
                  addNewCard={addNewCard}
                />
              }
            />
          </Route>

          <Route path="/statistic" element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route
              path="/statistic"
              element={
                <Statistic
                  cards={cardsList}
                />
              }
            />
          </Route>

        </Routes>

      </div>
    </div>
  );
}


export default App;
