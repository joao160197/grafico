import "./styles.css";


function Header() {
  return (
    <div className="header-container">
      <header className="c-header">
        <div className="c-container c-container-right">
          <ul className="c-nav">
            <li>Home</li>
            <li>Sobre</li>
            <li>Localização</li>
            <button className="c-modal-button">Contato</button>
          </ul>
        </div>
        <img className="c-logo" src="https://firebasestorage.googleapis.com/v0/b/pessoal-8849f.appspot.com/o/blog%2Flogo%20(1).png?alt=media&token=d81ee79e-0623-4a96-9184-726787fb5655" alt="Logo" />
      </header>
    </div>
  );
}

export default Header;
