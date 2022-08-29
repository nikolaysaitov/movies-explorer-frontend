import './ValidText.css';

function ValidText({ children, type }) {
    return (
        <p className={`valid-text valid-text_${type}`}>{children}</p>
    );
}

export default ValidText;